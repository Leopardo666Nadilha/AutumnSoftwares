import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { fullName, email, company, phone, challenge, solutionType, integrationNeeded, investmentRange, urgency, services } = req.body;

  // Validação simples no servidor
  if (!fullName || !email || !challenge) {
    return res.status(400).json({ message: 'Campos obrigatórios estão faltando.' });
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
  const mailToCompany = {
    from: `"${fullName}" <${email}>`,
    to: process.env.EMAIL_TO,
    replyTo: email,
    subject: `Nova Solicitação de Projeto: ${company}`,
    html: `
      <h1>Nova Solicitação de Projeto</h1>
      <p><strong>Nome:</strong> ${fullName}</p>
      <p><strong>Empresa:</strong> ${company}</p>
      <p><strong>E-mail:</strong> ${email}</p>
      <p><strong>Telefone:</strong> ${phone}</p>
      <hr>
      <h2>Detalhes do Projeto</h2>
      <p><strong>Desafio/Ideia:</strong><br>${challenge.replace(/\n/g, '<br>')}</p>
      <p><strong>Tipo de Solução:</strong> ${solutionType}</p>
      <p><strong>Necessita Integração:</strong> ${integrationNeeded || 'Não informado'}</p>
      <p><strong>Faixa de Investimento:</strong> ${investmentRange}</p>
      <p><strong>Urgência:</strong> ${urgency}</p>
      <p><strong>Serviços de Interesse:</strong> ${selectedServices || 'Nenhum especificado'}</p>
    `,
  };

  // Corpo do e-mail de confirmação para o cliente
  const mailToClient = {
    from: `"Autumn Softwares" <${process.env.EMAIL_SERVER_USER}>`,
    to: email,
    subject: 'Recebemos sua solicitação de projeto!',
    html: `
      <h1>Olá, ${fullName}!</h1>
      <p>Confirmamos o recebimento da sua solicitação de projeto. Agradecemos por compartilhar sua ideia conosco!</p>
      <p>Nossa equipe analisará as informações que você enviou e entraremos em contato o mais breve possível para discutir os próximos passos.</p>
      <p>Atenciosamente,<br>Equipe Autumn Softwares</p>
    `,
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