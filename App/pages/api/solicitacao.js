import nodemailer from 'nodemailer';
import { LRUCache } from 'lru-cache';
import path from 'path';

// --- Início da Implementação do Rate Limiter ---

const rateLimit = (options) => {
  const tokenCache = new LRUCache({
    max: options.uniqueTokenPerInterval || 500,
    ttl: options.interval || 60000,
  });

  return {
    check: (res, limit, token) =>
      new Promise((resolve, reject) => {
        const tokenCount = tokenCache.get(token) || [0];
        if (tokenCount[0] === 0) {
          tokenCache.set(token, tokenCount);
        }
        tokenCount[0] += 1;

        const currentUsage = tokenCount[0];
        const isRateLimited = currentUsage >= limit;
        res.setHeader('X-RateLimit-Limit', limit);
        res.setHeader('X-RateLimit-Remaining', isRateLimited ? 0 : limit - currentUsage);

        return isRateLimited ? reject() : resolve();
      }),
  };
};

const limiter = rateLimit({
  interval: 60 * 1000, // 1 minuto
  uniqueTokenPerInterval: 500, // Máximo de 500 IPs únicos por minuto
});

// --- Fim da Implementação do Rate Limiter ---

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    // 1. Proteção contra Abuso (Rate Limiting)
    // Permite no máximo 5 requisições por IP a cada 1 minuto.
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    await limiter.check(res, 5, ip);
  } catch {
    return res.status(429).json({ message: 'Muitas requisições. Tente novamente em um minuto.' });
  }

  // 2. Validação do reCAPTCHA
  const { recaptchaToken } = req.body;
  try {
    const recaptchaResponse = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`,
    });

    const recaptchaData = await recaptchaResponse.json();

    // Verificamos se a requisição foi bem-sucedida e se o score é aceitável (reCAPTCHA v3)
    if (!recaptchaData.success || recaptchaData.score < 0.5) {
      console.warn('Falha na verificação do reCAPTCHA', recaptchaData['error-codes']);
      return res.status(403).json({ message: 'Falha na verificação. Você parece ser um robô.' });
    }
  } catch (error) {
    console.error('Erro ao verificar reCAPTCHA:', error);
    return res.status(500).json({ message: 'Erro interno ao verificar o reCAPTCHA.' });
  }

  // 3. Validação e Sanitização dos Dados
  const { fullName, email, company, phone, challenge, solutionType, integrationNeeded, investmentRange, urgency, services } = req.body;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!fullName || !email || !challenge || !solutionType || !investmentRange || !urgency || !services) {
    return res.status(400).json({ message: 'Todos os campos obrigatórios devem ser preenchidos.' });
  }
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'O formato do e-mail é inválido.' });
  }

  // Configuração do Nodemailer
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SERVER_HOST,
    port: process.env.EMAIL_SERVER_PORT,
    secure: true, // true para porta 465, false para outras
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD,
    },
  });

  // Mapeia os serviços selecionados para uma lista legível
  const selectedServices = Object.entries(services || {})
    .filter(([, isSelected]) => isSelected)
    .map(([serviceName]) => {
      switch (serviceName) {
        case 'website': return 'Desenvolvimento de Website / Landing Page';
        case 'webapp': return 'Desenvolvimento de Aplicação Web (SaaS, Dashboard)';
        case 'mobile': return 'Desenvolvimento de Aplicativo Mobile (iOS/Android)';
        case 'automation': return 'Automação de Processos / Integrações';
        case 'consulting': return 'Consultoria para definição de escopo';
        default: return serviceName;
      }
    })
    .join(', ');

  // Corpo do e-mail para a notificação interna
  // Usamos uma função simples para sanitizar e evitar XSS
  const sanitize = (text) => text ? text.replace(/</g, '&lt;').replace(/>/g, '&gt;') : '';

  const mailToCompany = {
    from: `"${fullName}" <${email}>`,
    to: process.env.EMAIL_TO,
    replyTo: email,
    subject: `Nova Solicitação de Projeto: ${sanitize(company) || 'Empresa não informada'}`,
    html: `
      <h1>Nova Solicitação de Projeto</h1>
      <p><strong>Nome:</strong> ${sanitize(fullName)}</p>
      <p><strong>Empresa:</strong> ${sanitize(company) || 'Não informado'}</p>
      <p><strong>E-mail:</strong> ${email}</p>
      <p><strong>Telefone:</strong> ${sanitize(phone) || 'Não informado'}</p>
      <hr>
      <h2>Detalhes do Projeto</h2>
      <p><strong>Desafio/Ideia:</strong><br>${sanitize(challenge).replace(/\n/g, '<br>')}</p>
      <p><strong>Tipo de Solução:</strong> ${sanitize(solutionType)}</p>
      <p><strong>Necessita Integração:</strong> ${sanitize(integrationNeeded) || 'Não informado'}</p>
      <p><strong>Faixa de Investimento:</strong> ${sanitize(investmentRange)}</p>
      <p><strong>Urgência:</strong> ${sanitize(urgency)}</p>
      <p><strong>Serviços de Interesse:</strong> ${selectedServices || 'Nenhum especificado'}</p>
    `,
  };

  // Corpo do e-mail de confirmação para o cliente
  const mailToClient = {
    from: `"Autumn Softwares" <${process.env.EMAIL_SERVER_USER}>`,
    to: email,
    subject: 'Recebemos sua solicitação de projeto!',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          /* Estilos para telas maiores (desktop) */
          @media screen and (min-width: 601px) {
            .email-container {
              width: 100% !important;
              background-color: #000000d6 !important; /* Cor do banner no desktop */
            }
            .content-wrapper {
              max-width: 600px !important;
              background-color: #ffffff !important; /* Fundo branco para o texto no desktop */
              border-radius: 8px;
              margin-top: 40px !important;
              margin-bottom: 40px !important;
            }
          }
        </style>
      </head>
      <body style="margin: 0; padding: 0; font-family: sans-serif; background-color: #f5f5f5;">
        <!-- Contêiner principal que se adapta -->
        <div class="email-container" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px;">
          <!-- Wrapper de conteúdo para desktop -->
          <div class="content-wrapper" style="margin: 0 auto;">
            <div style="padding: 20px;">
              <h1>Olá, ${sanitize(fullName)}!</h1>
              <p>Confirmamos o recebimento da sua solicitação de projeto. Agradecemos por compartilhar sua ideia conosco!</p>
              <p>Nossa equipe analisará as informações que você enviou e entraremos em contato o mais breve possível para discutir os próximos passos.</p>
              <p>Atenciosamente,<br>Equipe Autumn Softwares</p>
            </div>
            <hr style="border: none; border-top: 1px solid #dddddd; margin: 0 20px;">
            <div style="text-align: center; padding: 30px 20px;">
              <img src="cid:logo" alt="Autumn Softwares Logo" style="width: 100%; max-width: 300px; height: auto;" />
            </div>
          </div>
        </div>
      </body>
      </html>
    `,
    attachments: [
      {
        filename: 'logo-email.png',
        path: path.join(process.cwd(), 'public', 'logo-email.png'),
        cid: 'logo' // O mesmo 'cid' usado na tag <img>
      }
    ]
  };

  try {
    // Envia os dois e-mails
    await transporter.sendMail(mailToCompany);
    await transporter.sendMail(mailToClient);

    res.status(200).json({ message: 'Solicitação enviada com sucesso!' });
  } catch (error) {
    console.error('Falha ao enviar e-mail:', error);
    res.status(500).json({ message: 'Ocorreu um erro ao enviar sua solicitação. Tente novamente mais tarde.' });
  }
}