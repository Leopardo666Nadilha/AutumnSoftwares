import { useState, useEffect, useRef } from 'react';
import { PiCheckCircle } from 'react-icons/pi';
import Link from 'next/link';
const steps = ["Seus Dados", "O Desafio", "Detalhes Técnicos", "Escopo & Prazos"];

export default function SolicitacaoPage() {
    const [currentStep, setCurrentStep] = useState(1);
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
    const handleSubmit = async () => {
        if (!isStepValid()) return;

        setSubmissionStatus('loading');

        // Simulação de chamada de API
        try {
            // Envia os dados para sua API aqui. No momento apenas simulando envio.
            // ex: await fetch('/api/solicitacoes', { method: 'POST', body: JSON.stringify(formData) });
            await new Promise(resolve => setTimeout(resolve, 2000)); // Simula um atraso de 2 segundos

            setSubmissionStatus('success');
        } catch (error) {
            console.error("Falha no envio:", error);
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
                // Para os checkboxes, verificamos se pelo menos um está marcado
                const oneServiceSelected = Object.values(formData.services).some(v => v === true);
                return formData.investmentRange !== '' && formData.urgency !== '' && oneServiceSelected;
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
                return (
                    <div className="form-step">
                        <h2 className="form-step-title">Informações para Contato</h2>
                        <p className="form-step-subtitle">Precisamos saber quem você é e como podemos te encontrar.</p>
                        <div className="form-fields-container">
                            <div className="form-group">
                                <label htmlFor="fullName" className="form-label">Nome completo *</label>
                                <input type="text" id="fullName" name="fullName" className="form-input" placeholder="Seu nome" value={formData.fullName} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="company" className="form-label">Empresa *</label>
                                <input type="text" id="company" name="company" className="form-input" placeholder="Nome da sua empresa" value={formData.company} onChange={handleChange} required />
                            </div>
                            <div className={`form-group ${emailError ? 'has-error' : ''}`}>
                                <label htmlFor="email" className="form-label">E-mail *</label>
                                <input type="email" id="email" name="email" className="form-input" placeholder="seuemail@aqui.com" value={formData.email} onChange={handleChange} onBlur={handleEmailBlur} required />
                                {emailError && <p className="form-error-message">{emailError}</p>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone" className="form-label">Telefone *</label>
                                <input type="tel" id="phone" name="phone" className="form-input" placeholder="(00) 00000-0000" value={formData.phone} onChange={handleChange} required maxLength="15" />
                            </div>
                        </div>
                        <p className="form-note">* Campos obrigatórios</p>
                    </div>
                );
            case 2:
                return (
                    <div className="form-step">
                        <h2 className="form-step-title">O Problema ou a Ideia</h2>                        
                        <div className="form-fields-container single-field">
                            <div className="form-group">
                                <label htmlFor="challenge" className="form-label">Precisamos entender seu desafio para propor a melhor solução. *</label>
                                <textarea 
                                    required
                                    id="challenge" name="challenge" className="form-input form-textarea" 
                                    placeholder="Nos ajude a entender seu desafio. Qual é o problema principal e qual é o resultado ideal que você espera alcançar?" 
                                    value={formData.challenge} onChange={handleChange} />
                            </div>
                        </div>
                        <p className="form-note">* Campo obrigatório</p>
                    </div>
                );
            case 3:
                return (
                    <div className="form-step">
                        <h2 className="form-step-title">Requisitos e Detalhes Técnicos</h2>
                        <p className="form-step-subtitle">Nos ajude a entender a natureza técnica do seu projeto.</p>                        
                        <div className="form-fields-container single-field">
                            <div className="form-group">
                                <label htmlFor="solutionType" className="form-label">Tipo de solução *</label>
                                <select id="solutionType" name="solutionType" className="form-input" value={formData.solutionType} onChange={handleChange} required>
                                    <option value="" disabled>Selecione o tipo</option>
                                    <option value="plataforma-web">Plataforma web</option>
                                    <option value="aplicativo-mobile">Aplicativo Mobile</option>
                                    <option value="web-mobile">Web + Mobile</option>
                                    <option value="software-desktop">Software para desktop</option>
                                    <option value="integracao-sistemas">Integração de sistemas</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="integrationNeeded" className="form-label">Precisa de integração com outros sistemas?</label> {/* Removido o '*' */}
                                <select id="integrationNeeded" name="integrationNeeded" className="form-input" value={formData.integrationNeeded} onChange={handleChange}> {/* Removido o 'required' */}
                                    <option value="" disabled>Selecione uma opção</option>
                                    <option value="nao">Não, é um sistema novo</option>
                                    <option value="sim-1-2">Sim, 1-2</option>
                                    <option value="sim-3-mais">Sim, 3+</option>
                                </select>
                            </div>
                        </div>
                        <p className="form-note">* Campo obrigatório</p>
                    </div>
                );
            case 4:
                return (
                    <div className="form-step">
                        <h2 className="form-step-title">Escopo, Prazos e Orçamento</h2>
                        <p className="form-step-subtitle">Suas respostas nos ajudam a calibrar nossa proposta inicial.</p>
                        <div className="form-fields-container single-field form-step-last">
                            {/* Faixa de Investimento */}
                            <div className="form-group">
                                <label className="form-label">Qual é a sua faixa de investimento para este projeto? *</label>
                                <div className="form-options-group">
                                    {['Até R$ 5.000', 'R$ 5.000 - R$ 15.000', 'R$ 15.000 - R$ 30.000', 'Acima de R$ 30.000', 'Ainda não tenho um orçamento / Prefiro discutir'].map(option => (
                                        <label key={option} className="form-option-label">
                                            <input type="radio" name="investmentRange" value={option} checked={formData.investmentRange === option} onChange={handleChange} />
                                            <span className="form-option-text">{option}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Urgência */}
                            <div className="form-group">
                                <label className="form-label">Qual é a urgência para este projeto? *</label>
                                <div className="form-options-group">
                                    {['Muito Urgente (Preciso começar nos próximos 30 dias)', 'Flexível (Posso começar em 1-3 meses)', 'Planejamento (Início em 3-6 meses)', 'Apenas Pesquisando (Sem prazo definido)'].map(option => (
                                        <label key={option} className="form-option-label">
                                            <input type="radio" name="urgency" value={option} checked={formData.urgency === option} onChange={handleChange} />
                                            <span className="form-option-text">{option}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Serviços */}
                            <div className="form-group">
                                <label className="form-label">Quais serviços você já sabe que vai precisar? *</label>
                                <div className="form-options-group">
                                    {[
                                        { name: 'website', text: 'Desenvolvimento de Website / Landing Page' },
                                        { name: 'webapp', text: 'Desenvolvimento de Aplicação Web (SaaS, Dashboard)' },
                                        { name: 'mobile', text: 'Desenvolvimento de Aplicativo Mobile (iOS/Android)' },
                                        { name: 'automation', text: 'Automação de Processos / Integrações' },
                                        { name: 'consulting', text: 'Ainda não sei, preciso de consultoria' },
                                    ].map(service => (
                                        <label key={service.name} className="form-option-label">
                                            <input type="checkbox" name={service.name} checked={formData.services[service.name]} onChange={handleCheckboxChange} />
                                            <span className="form-option-text">{service.text}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <p className="form-note">* Campos obrigatórios</p>
                    </div>
                );
            default:
                return null;
        }
    };

    if (submissionStatus === 'success') {
        return (
            <section ref={pageTopRef} className="solicitacao-page-content">
                <div className="submission-feedback-container fade-in-section is-visible">
                    <PiCheckCircle className="submission-feedback-icon" />
                    <h2 className="submission-feedback-title">Projeto enviado com sucesso!</h2>
                    <p className="submission-feedback-text">
                        Obrigado por compartilhar sua ideia conosco. Nossa equipe analisará as informações e entrará em contato em breve para discutir os próximos passos.
                    </p>
                    <Link href="/" className="form-button">Voltar para o Início</Link>
                </div>
            </section>
        );
    }

    return (
        <section ref={pageTopRef} className="solicitacao-page-content">
            <h1 className="solicitacao-page-title title-section-about fade-in-section">Vamos cultivar o seu <strong className="title-header">próximo projeto?</strong></h1>
            <p className="solicitacao-page-subtitle subtitle-section-about fade-in-section">Suas respostas nos ajudam a preparar uma análise mais precisa. Após o envio, entraremos em contato para seguir com o projeto.</p>

            <div className="solicitacao-form-container fade-in-section">
                {/* Indicador de Etapas */}
                <div className="step-indicator-container">
                    {steps.map((step, index) => (
                        <div key={index} className={`step-item ${index + 1 === currentStep ? 'active' : ''} ${index + 1 < currentStep ? 'completed' : ''}`}>
                            <div className="step-number">{index + 1}</div>
                            <p className="step-title">{step}</p>
                            {index < steps.length - 1 && <div className="step-connector"></div>}
                        </div>
                    ))}
                </div>

                {/* Conteúdo da Etapa */}
                <form className="solicitacao-form">
                    {renderStepContent()}
                </form>

                {/* Navegação */}
                <div className="form-navigation">
                    {currentStep > 1 && (
                        <button onClick={prevStep} className="form-button form-button-secondary">
                            Voltar
                        </button>
                    )}
                    {currentStep < steps.length ? (
                        <button onClick={handleNextStep} className="form-button" disabled={!isStepValid()}>
                            Avançar
                        </button>
                    ) : (
                        <button onClick={handleSubmit} id='submit-button' className="form-button" disabled={!isStepValid() || submissionStatus === 'loading'}>
                            {submissionStatus === 'loading' 
                                ? 'Enviando...' 
                                : 'Enviar Solicitação'}
                        </button>
                    )}
                </div>
            </div>

            <div className="direct-contact-section fade-in-section">
                <h3 className="direct-contact-title">Prefere uma conversa mais direta?</h3>
                <p className="direct-contact-text">
                    Entendemos perfeitamente. Se o formulário não for o ideal para você, sinta-se à vontade para enviar um resumo da sua ideia diretamente para o nosso e-mail ou WhatsApp. Estamos prontos para ouvir.
                </p>
                <div className="direct-contact-info">
                    <a href="mailto:contato@autumnsoftwares.com" className="contact-link">
                        E-mail: contato@autumnsoftwares.com
                    </a>
                    <a href="https://wa.me/5547991739602" target="_blank" rel="noopener noreferrer" className="contact-link">
                        WhatsApp: (47) 99173-9602
                    </a>
                </div>
            </div>
        </section>
    );
}