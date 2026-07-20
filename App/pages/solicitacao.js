import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { PiCheckCircle } from 'react-icons/pi';
import Link from 'next/link';
import Head from 'next/head';
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import styles from '../styles/Solicitacao.module.css';
import typography from '../styles/shared/typography.module.css';
import { SITE_URL } from '../lib/siteConfig';

const steps = ["Seus Dados", "O Desafio", "Detalhes Técnicos", "Escopo & Prazos"];

// --- Componente Reformulado para a Etapa 1 ---
function Step1ContactInfo({ formData, handleChange, handleEmailBlur, emailError }) {
    return (
        <div className={styles.formStep}>
            <h2 className={styles.formStepTitle}>Informações para Contato</h2>
            <p className={styles.formStepSubtitle}>Precisamos saber quem você é e como podemos te encontrar.</p>
            <div className={styles.formFieldsContainer}>
                <div className={styles.formGroup}>
                    <label htmlFor="fullName" className={styles.formLabel}>Nome completo *</label>
                    <input type="text" id="fullName" name="fullName" className={styles.formInput} placeholder="Seu nome" value={formData.fullName} onChange={handleChange} required />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="company" className={styles.formLabel}>Empresa *</label>
                    <input type="text" id="company" name="company" className={styles.formInput} placeholder="Nome da sua empresa" value={formData.company} onChange={handleChange} required />
                </div>
                <div className={`${styles.formGroup} ${emailError ? styles.hasError : ''}`}>
                    <label htmlFor="email" className={styles.formLabel}>E-mail *</label>
                    <input type="email" id="email" name="email" className={styles.formInput} placeholder="seuemail@aqui.com" value={formData.email} onChange={handleChange} onBlur={handleEmailBlur} required />
                    {emailError && <p className={styles.formErrorMessage}>{emailError}</p>}
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="phone" className={styles.formLabel}>Telefone *</label>
                    <input type="tel" id="phone" name="phone" className={styles.formInput} placeholder="(00) 00000-0000" value={formData.phone} onChange={handleChange} required maxLength="15" />
                </div>
            </div>
            <p className={styles.formNote}>* Campos obrigatórios</p>
        </div>
    );
}

function SolicitacaoForm() {
    const [currentStep, setCurrentStep] = useState(1);
    const { executeRecaptcha } = useGoogleReCaptcha();

    const [formData, setFormData] = useState({
        fullName: '',
        company: '',
        email: '',
        phone: '',
        challenge: '',
        solutionType: '',
        integrationNeeded: '',
        investmentRange: '',
        urgency: '',
        services: {
            website: false,
            webapp: false,
            mobile: false,
            automation: false,
            consulting: false,
        },
    });
    const [submissionStatus, setSubmissionStatus] = useState('idle'); // idle, loading, success, error
    const [emailError, setEmailError] = useState('');
    const [apiError, setApiError] = useState(''); // Novo estado para erros da API
    const pageTopRef = useRef(null); // Ref para o topo da página

    const nextStep = () => {
        if (currentStep < steps.length) {
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (apiError) setApiError(''); // Limpa o erro da API ao digitar
        if (name === 'phone') {
            const formattedPhone = formatPhoneNumber(value);
            setFormData(prevState => ({ ...prevState, [name]: formattedPhone }));
        } else if (name === 'email') {
            if (emailError) setEmailError(''); // Limpa o erro ao começar a digitar
            setFormData(prevState => ({ ...prevState, [name]: value }));
        } else {
            setFormData(prevState => ({ ...prevState, [name]: value }));
        }
    };

    const formatPhoneNumber = (value) => {
        if (!value) return value;
        const phoneNumber = value.replace(/[^\d]/g, '');
        const phoneNumberLength = phoneNumber.length;
        if (phoneNumberLength < 3) return `(${phoneNumber}`;
        if (phoneNumberLength < 8) return `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(2)}`;
        return `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(2, 7)}-${phoneNumber.slice(7, 11)}`;
    };

    const handleEmailBlur = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (formData.email && !emailRegex.test(formData.email)) {
            setEmailError('E-mail inválido');
        } else {
            setEmailError('');
        }
    };

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setFormData(prevState => ({
            ...prevState,
            services: {
                ...prevState.services,
                [name]: checked,
            }
        }));
    };

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });

        const sections = document.querySelectorAll('.fade-in-section');
        sections.forEach(section => observer.observe(section));

        // Limpeza ao desmontar o componente
        return () => sections.forEach(section => observer.unobserve(section));
    }, []);

    // Efeito para rolar para o topo na tela de sucesso
    useEffect(() => {
        if (submissionStatus === 'success' && pageTopRef.current) {
            pageTopRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [submissionStatus]);

    // Placeholder para a função de envio
    const handleSubmit = async (e) => {
        // Previne o recarregamento da página ao submeter o formulário
        e.preventDefault();

        if (!executeRecaptcha) {
            console.error("reCAPTCHA não está pronto.");
            setSubmissionStatus('error');
            return;
        }

        const recaptchaToken = await executeRecaptcha('solicitacaoForm');
        setSubmissionStatus('loading');

        try {
            const response = await fetch('/api/enviarProjeto', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    recaptchaToken, // Envia o token para o backend
                }),
            });

            if (response.ok) {
                setSubmissionStatus('success');
            } else {
                // Lê a mensagem de erro detalhada que a API agora nos envia.
                const errorData = await response.json();
                const userFriendlyMessage = errorData.message.includes('robô') 
                    ? 'A verificação falhou. Por favor, recarregue a página e tente novamente.'
                    : 'Ocorreu um erro no servidor. Por favor, tente mais tarde.';
                setApiError(userFriendlyMessage); // Define a mensagem de erro no estado
                console.error("Erro retornado pela API:", errorData.message);
                setSubmissionStatus('error');
            }
        } catch (error) {
            // Este erro ocorre se a API estiver totalmente offline.
            setApiError('Erro de conexão. Verifique sua internet e tente novamente.');
            console.error("Falha no envio:", error);
            // Aqui você poderia exibir uma mensagem genérica para o usuário
            setSubmissionStatus('error');
        }
    };
    const isStepValid = () => {
        switch (currentStep) {
            case 1: {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                const isEmailValid = emailRegex.test(formData.email);
                return formData.fullName.trim() !== '' && formData.company.trim() !== '' && isEmailValid && formData.phone.length >= 14; // Verifica se o telefone está preenchido
            }
            case 2:
                return formData.challenge.trim() !== '';
            case 3:
                // Apenas solutionType é obrigatório
                return formData.solutionType !== '';
            case 4:
                // A validação é válida se:
                // 1. O usuário preencheu investimento e urgência.
                // 2. E (pelo menos um serviço foi selecionado OU a opção de consultoria foi marcada).
                const otherServices = ['website', 'webapp', 'mobile', 'automation'];
                const anyOtherServiceSelected = otherServices.some(s => formData.services[s]);
                return formData.investmentRange !== '' && formData.urgency !== '' && (anyOtherServiceSelected || formData.services.consulting);
            default:
                return false;
        }
    };

    const handleNextStep = () => {
        if (isStepValid()) {
            nextStep();
        }
    };

    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return <Step1ContactInfo 
                    formData={formData} 
                    handleChange={handleChange} 
                    handleEmailBlur={handleEmailBlur} 
                    emailError={emailError} 
                />;
            case 2:
                return (
                    <div className={styles.formStep}>
                        <h2 className={styles.formStepTitle}>O Problema ou a Ideia</h2>
                        <div className={`${styles.formFieldsContainer} ${styles.singleField}`}>
                            <div className={styles.formGroup}>
                                <label htmlFor="challenge" className={styles.formLabel}>Precisamos entender seu desafio para propor a melhor solução. *</label>
                                <textarea
                                    required
                                    id="challenge" name="challenge" className={`${styles.formInput} ${styles.formTextarea}`}
                                    placeholder="Nos ajude a entender seu desafio. Qual é o problema principal e qual é o resultado ideal que você espera alcançar?"
                                    value={formData.challenge} onChange={handleChange} />
                            </div>
                        </div>
                        <p className={styles.formNote}>* Campo obrigatório</p>
                    </div>
                );
            case 3:
                return (
                    <div className={styles.formStep}>
                        <h2 className={styles.formStepTitle}>Requisitos e Detalhes Técnicos</h2>
                        <p className={styles.formStepSubtitle}>Nos ajude a entender a natureza técnica do seu projeto.</p>
                        <div className={`${styles.formFieldsContainer} ${styles.singleField}`}>
                            <div className={styles.formGroup}>
                                <label htmlFor="solutionType" className={styles.formLabel}>Tipo de solução *</label>
                                <select id="solutionType" name="solutionType" className={styles.formInput} value={formData.solutionType} onChange={handleChange} required>
                                    <option value="" disabled>Selecione o tipo</option>
                                    <option value="plataforma-web">Plataforma web</option>
                                    <option value="aplicativo-mobile">Aplicativo Mobile</option>
                                    <option value="web-mobile">Web + Mobile</option>
                                    <option value="software-desktop">Software para desktop</option>
                                    <option value="integracao-sistemas">Integração de sistemas</option>
                                </select>
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="integrationNeeded" className={styles.formLabel}>Precisa de integração com outros sistemas?</label> {/* Removido o '*' */}
                                <select id="integrationNeeded" name="integrationNeeded" className={styles.formInput} value={formData.integrationNeeded} onChange={handleChange}> {/* Removido o 'required' */}
                                    <option value="" disabled>Selecione uma opção</option>
                                    <option value="nao">Não, é um sistema novo</option>
                                    <option value="sim-1-2">Sim, 1-2</option>
                                    <option value="sim-3-mais">Sim, 3+</option>
                                </select>
                            </div>
                        </div>
                        <p className={styles.formNote}>* Campo obrigatório</p>
                    </div>
                );
            case 4:
                return (
                    <div className={styles.formStep}>
                        <h2 className={styles.formStepTitle}>Escopo, Prazos e Orçamento</h2>
                        <p className={styles.formStepSubtitle}>Suas respostas nos ajudam a calibrar nossa proposta inicial.</p>
                        <div className={`${styles.formFieldsContainer} ${styles.singleField} ${styles.formStepLast}`}>
                            {/* Faixa de Investimento */}
                            <fieldset className={styles.formGroup}>
                                <legend className={styles.formLabel}>Qual é a sua faixa de investimento para este projeto? *</legend>
                                <div className={styles.formOptionsGroup}>
                                    {['Até R$ 5.000', 'R$ 5.000 - R$ 15.000', 'R$ 15.000 - R$ 30.000', 'Acima de R$ 30.000', 'Ainda não tenho um orçamento / Prefiro discutir'].map(option => (
                                        <label key={option} className={styles.formOptionLabel}>
                                            <input type="radio" name="investmentRange" value={option} checked={formData.investmentRange === option} onChange={handleChange} />
                                            <span className={styles.formOptionText}>{option}</span>
                                        </label>
                                    ))}
                                </div>
                            </fieldset>

                            {/* Urgência */}
                            <fieldset className={styles.formGroup}>
                                <legend className={styles.formLabel}>Qual é a urgência para este projeto? *</legend>
                                <div className={styles.formOptionsGroup}>
                                    {['Muito Urgente (Preciso começar nos próximos 30 dias)', 'Flexível (Posso começar em 1-3 meses)', 'Planejamento (Início em 3-6 meses)', 'Apenas Pesquisando (Sem prazo definido)'].map(option => (
                                        <label key={option} className={styles.formOptionLabel}>
                                            <input type="radio" name="urgency" value={option} checked={formData.urgency === option} onChange={handleChange} />
                                            <span className={styles.formOptionText}>{option}</span>
                                        </label>
                                    ))}
                                </div>
                            </fieldset>

                            {/* Serviços */}
                            <fieldset className={styles.formGroup}>
                                <legend className={styles.formLabel}>Quais serviços você já sabe que vai precisar? *</legend>
                                <div className={styles.formOptionsGroup}>
                                    {[
                                        { name: 'website', text: 'Desenvolvimento de Website / Landing Page' },
                                        { name: 'webapp', text: 'Desenvolvimento de Aplicação Web (SaaS, Dashboard)' },
                                        { name: 'mobile', text: 'Desenvolvimento de Aplicativo Mobile (iOS/Android)' },
                                        { name: 'automation', text: 'Automação de Processos / Integrações' },
                                        { name: 'consulting', text: 'Ainda não sei, preciso de consultoria para definir' },
                                    ].map(service => (
                                        <label key={service.name} className={styles.formOptionLabel}>
                                            <input type="checkbox" name={service.name} checked={formData.services[service.name]} onChange={handleCheckboxChange} />
                                            <span className={styles.formOptionText}>{service.text}</span>
                                        </label>
                                    ))}
                                </div>
                            </fieldset>
                        </div>
                        <p className={styles.formNote}>* Campos obrigatórios</p>
                    </div>
                );
            default:
                return null;
        }
    };

    if (submissionStatus === 'success') {
        return (
            <section ref={pageTopRef} className={styles.solicitacaoPageContent}>
                <Head>
                    <title>Solicitar Projeto | Autumn Softwares</title>
                </Head>
                <div className={`${styles.submissionFeedbackContainer} fade-in-section is-visible`}>
                    <PiCheckCircle className={styles.submissionFeedbackIcon} aria-hidden="true" />
                    <h2 className={styles.submissionFeedbackTitle}>Projeto enviado com sucesso!</h2>
                    <p className={styles.submissionFeedbackText}>
                        Obrigado por compartilhar sua ideia conosco. Nossa equipe analisará as informações e entrará em contato em breve para discutir os próximos passos.
                    </p>
                    <Link href="/" className={styles.formButton}>Voltar para o Início</Link>
                </div>
            </section>
        );
    }

    return (
        <section ref={pageTopRef} className={styles.solicitacaoPageContent}>
            <Head>
                <title>Solicitar Projeto | Autumn Softwares</title>
                <meta name="description" content="Conte sobre o seu projeto e receba uma proposta personalizada da Autumn Softwares." />
                <meta property="og:title" content="Solicitar Projeto | Autumn Softwares" />
                <meta property="og:description" content="Vamos cultivar juntos o seu próximo projeto de software." />
                <meta property="og:url" content={`${SITE_URL}/solicitacao`} />
                <link rel="canonical" href={`${SITE_URL}/solicitacao`} />
            </Head>
            <h1 className={`${styles.solicitacaoPageTitle} ${typography.titleSectionAbout} fade-in-section`}>Vamos cultivar o seu <strong className={typography.titleHeader}>próximo projeto?</strong></h1>
            <p className={`${styles.solicitacaoPageSubtitle} ${typography.subtitleSectionAbout} fade-in-section`}>Suas respostas nos ajudam a preparar uma análise mais precisa. Após o envio, entraremos em contato para seguir com o projeto.</p>

            <div className={`${styles.solicitacaoFormContainer} fade-in-section`}>
                {/* Indicador de Etapas */}
                <div className={styles.stepIndicatorContainer}>
                    {steps.map((step, index) => (
                        <div key={index} className={`${styles.stepItem} ${index + 1 === currentStep ? styles.active : ''} ${index + 1 < currentStep ? styles.completed : ''}`}>
                            <div className={styles.stepNumber}>{index + 1}</div>
                            <p className={styles.stepTitle}>{step}</p>
                            {index < steps.length - 1 && <div className={styles.stepConnector}></div>}
                        </div>
                    ))}
                </div>

                {/* Conteúdo da Etapa */}
                <form className="solicitacao-form" onSubmit={handleSubmit}>
                    {renderStepContent()}

                    {/* Navegação movida para dentro do formulário */}
                    <div className={styles.formNavigation}>
                        {currentStep > 1 && (
                            // Usamos type="button" para evitar que ele submeta o formulário
                            <button type="button" onClick={prevStep} className={`${styles.formButton} ${styles.formButtonSecondary}`}>
                                Voltar
                            </button>
                        )}
                        {currentStep < steps.length ? (
                            // Usamos type="button" para evitar que ele submeta o formulário
                            <button type="button" onClick={handleNextStep} className={styles.formButton} disabled={!isStepValid()}>
                                Avançar
                            </button>
                        ) : (
                            <button type="submit" id='submit-button' className={styles.formButton} disabled={!isStepValid() || !executeRecaptcha || submissionStatus === 'loading'}>
                                {(() => {
                                    if (submissionStatus === 'loading') return 'Enviando...';
                                    if (!executeRecaptcha) return 'Aguardando reCAPTCHA...';
                                    if (!isStepValid()) return 'Preencha os campos';
                                    return 'Enviar Solicitação';
                                })()}
                            </button>
                        )}
                        {/* Exibe a mensagem de erro da API aqui */}
                        {apiError && (
                            <p className={styles.formErrorMessage} style={{ width: '100%', textAlign: 'center', marginTop: '15px' }}>
                                {apiError}
                            </p>
                        )}
                    </div>
                </form>
            </div>

            <div className={`${styles.directContactSection} fade-in-section`}>
                <h3 className={styles.directContactTitle}>Prefere uma conversa mais direta?</h3>
                <p className={styles.directContactText}>
                    Entendemos perfeitamente. Se o formulário não for o ideal para você, sinta-se à vontade para enviar um resumo da sua ideia diretamente para o nosso e-mail ou WhatsApp. Estamos prontos para ouvir.
                </p>
                <div className={styles.directContactInfo}>
                    <a href="mailto:softwares.autumn@gmail.com" className={styles.contactLink}>
                        E-mail: softwares.autumn@gmail.com
                    </a>
                    <a href="https://wa.me/5547991739602" target="_blank" rel="noopener noreferrer" className={styles.contactLink} aria-label="WhatsApp: (47) 99173-9602 (abre em nova guia)">
                        WhatsApp: (47) 99173-9602
                    </a>
                </div>
            </div>
        </section>
    );
}

export default function SolicitacaoPage() {
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

    // Adiciona uma verificação para garantir que a chave do reCAPTCHA foi carregada.
    if (!siteKey) {
        return (
            <section className={styles.solicitacaoPageContent}>
                <div className={styles.solicitacaoFormContainer} style={{ textAlign: 'center', padding: '40px' }}>
                    <h2 className={styles.formStepTitle} style={{ color: 'var(--color-primary)' }}>Erro de Configuração</h2>
                    <p className={styles.formStepSubtitle} style={{ marginTop: '20px' }}>
                        A chave do site Google reCAPTCHA não foi encontrada. Verifique se a variável de ambiente
                        <code style={{ backgroundColor: 'var(--color-accent)', color: 'var(--color-text-title)', padding: '2px 6px', borderRadius: '4px', margin: '0 5px' }}>NEXT_PUBLIC_RECAPTCHA_SITE_KEY</code>
                        está configurada corretamente.
                    </p>
                </div>
            </section>
        );
    }

    return (
        <GoogleReCaptchaProvider reCaptchaKey={siteKey}>
            <SolicitacaoForm />
        </GoogleReCaptchaProvider>
    );
}