module.exports = [
"[project]/pages/solicitacao.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SolicitacaoPage
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$pi$2f$index$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-icons/pi/index.mjs [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/link.js [ssr] (ecmascript)");
;
;
;
;
const steps = [
    "Seus Dados",
    "O Desafio",
    "Detalhes Técnicos",
    "Escopo & Prazos"
];
function SolicitacaoPage() {
    const [currentStep, setCurrentStep] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(1);
    const [formData, setFormData] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])({
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
            consulting: false
        }
    });
    const [submissionStatus, setSubmissionStatus] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('idle'); // idle, loading, success, error
    const [emailError, setEmailError] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
    const pageTopRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null); // Ref para o topo da página
    const nextStep = ()=>{
        if (currentStep < steps.length) {
            setCurrentStep(currentStep + 1);
        }
    };
    const prevStep = ()=>{
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };
    const handleChange = (e)=>{
        const { name, value } = e.target;
        if (name === 'phone') {
            const formattedPhone = formatPhoneNumber(value);
            setFormData((prevState)=>({
                    ...prevState,
                    [name]: formattedPhone
                }));
        } else if (name === 'email') {
            if (emailError) setEmailError(''); // Limpa o erro ao começar a digitar
            setFormData((prevState)=>({
                    ...prevState,
                    [name]: value
                }));
        } else {
            setFormData((prevState)=>({
                    ...prevState,
                    [name]: value
                }));
        }
    };
    const formatPhoneNumber = (value)=>{
        if (!value) return value;
        const phoneNumber = value.replace(/[^\d]/g, '');
        const phoneNumberLength = phoneNumber.length;
        if (phoneNumberLength < 3) return `(${phoneNumber}`;
        if (phoneNumberLength < 8) return `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(2)}`;
        return `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(2, 7)}-${phoneNumber.slice(7, 11)}`;
    };
    const handleEmailBlur = ()=>{
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (formData.email && !emailRegex.test(formData.email)) {
            setEmailError('E-mail inválido');
        } else {
            setEmailError('');
        }
    };
    const handleCheckboxChange = (e)=>{
        const { name, checked } = e.target;
        setFormData((prevState)=>({
                ...prevState,
                services: {
                    ...prevState.services,
                    [name]: checked
                }
            }));
    };
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        const observer = new IntersectionObserver((entries)=>{
            entries.forEach((entry)=>{
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });
        const sections = document.querySelectorAll('.fade-in-section');
        sections.forEach((section)=>observer.observe(section));
        // Limpeza ao desmontar o componente
        return ()=>sections.forEach((section)=>observer.unobserve(section));
    }, []);
    // Efeito para rolar para o topo na tela de sucesso
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        if (submissionStatus === 'success' && pageTopRef.current) {
            pageTopRef.current.scrollIntoView({
                behavior: 'smooth'
            });
        }
    }, [
        submissionStatus
    ]);
    // Placeholder para a função de envio
    const handleSubmit = async ()=>{
        if (!isStepValid()) return;
        setSubmissionStatus('loading');
        // Simulação de chamada de API
        try {
            // Envia os dados para sua API aqui. No momento apenas simulando envio.
            // ex: await fetch('/api/solicitacoes', { method: 'POST', body: JSON.stringify(formData) });
            await new Promise((resolve)=>setTimeout(resolve, 2000)); // Simula um atraso de 2 segundos
            setSubmissionStatus('success');
        } catch (error) {
            console.error("Falha no envio:", error);
            setSubmissionStatus('error');
        }
    };
    const isStepValid = ()=>{
        switch(currentStep){
            case 1:
                {
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
                const oneServiceSelected = Object.values(formData.services).some((v)=>v === true);
                return formData.investmentRange !== '' && formData.urgency !== '' && oneServiceSelected;
            default:
                return false;
        }
    };
    const handleNextStep = ()=>{
        if (isStepValid()) {
            nextStep();
        }
    };
    const renderStepContent = ()=>{
        switch(currentStep){
            case 1:
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "form-step",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                            className: "form-step-title",
                            children: "Informações para Contato"
                        }, void 0, false, {
                            fileName: "[project]/pages/solicitacao.js",
                            lineNumber: 161,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                            className: "form-step-subtitle",
                            children: "Precisamos saber quem você é e como podemos te encontrar."
                        }, void 0, false, {
                            fileName: "[project]/pages/solicitacao.js",
                            lineNumber: 162,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "form-fields-container",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "form-group",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                            htmlFor: "fullName",
                                            className: "form-label",
                                            children: "Nome completo *"
                                        }, void 0, false, {
                                            fileName: "[project]/pages/solicitacao.js",
                                            lineNumber: 165,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            id: "fullName",
                                            name: "fullName",
                                            className: "form-input",
                                            placeholder: "Seu nome",
                                            value: formData.fullName,
                                            onChange: handleChange,
                                            required: true
                                        }, void 0, false, {
                                            fileName: "[project]/pages/solicitacao.js",
                                            lineNumber: 166,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/pages/solicitacao.js",
                                    lineNumber: 164,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "form-group",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                            htmlFor: "company",
                                            className: "form-label",
                                            children: "Empresa *"
                                        }, void 0, false, {
                                            fileName: "[project]/pages/solicitacao.js",
                                            lineNumber: 169,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            id: "company",
                                            name: "company",
                                            className: "form-input",
                                            placeholder: "Nome da sua empresa",
                                            value: formData.company,
                                            onChange: handleChange,
                                            required: true
                                        }, void 0, false, {
                                            fileName: "[project]/pages/solicitacao.js",
                                            lineNumber: 170,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/pages/solicitacao.js",
                                    lineNumber: 168,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: `form-group ${emailError ? 'has-error' : ''}`,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                            htmlFor: "email",
                                            className: "form-label",
                                            children: "E-mail *"
                                        }, void 0, false, {
                                            fileName: "[project]/pages/solicitacao.js",
                                            lineNumber: 173,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                            type: "email",
                                            id: "email",
                                            name: "email",
                                            className: "form-input",
                                            placeholder: "seuemail@aqui.com",
                                            value: formData.email,
                                            onChange: handleChange,
                                            onBlur: handleEmailBlur,
                                            required: true
                                        }, void 0, false, {
                                            fileName: "[project]/pages/solicitacao.js",
                                            lineNumber: 174,
                                            columnNumber: 33
                                        }, this),
                                        emailError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                            className: "form-error-message",
                                            children: emailError
                                        }, void 0, false, {
                                            fileName: "[project]/pages/solicitacao.js",
                                            lineNumber: 175,
                                            columnNumber: 48
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/pages/solicitacao.js",
                                    lineNumber: 172,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "form-group",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                            htmlFor: "phone",
                                            className: "form-label",
                                            children: "Telefone *"
                                        }, void 0, false, {
                                            fileName: "[project]/pages/solicitacao.js",
                                            lineNumber: 178,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                            type: "tel",
                                            id: "phone",
                                            name: "phone",
                                            className: "form-input",
                                            placeholder: "(00) 00000-0000",
                                            value: formData.phone,
                                            onChange: handleChange,
                                            required: true,
                                            maxLength: "15"
                                        }, void 0, false, {
                                            fileName: "[project]/pages/solicitacao.js",
                                            lineNumber: 179,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/pages/solicitacao.js",
                                    lineNumber: 177,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/pages/solicitacao.js",
                            lineNumber: 163,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                            className: "form-note",
                            children: "* Campos obrigatórios"
                        }, void 0, false, {
                            fileName: "[project]/pages/solicitacao.js",
                            lineNumber: 182,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/pages/solicitacao.js",
                    lineNumber: 160,
                    columnNumber: 21
                }, this);
            case 2:
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "form-step",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                            className: "form-step-title",
                            children: "O Problema ou a Ideia"
                        }, void 0, false, {
                            fileName: "[project]/pages/solicitacao.js",
                            lineNumber: 188,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "form-fields-container single-field",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "form-group",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                        htmlFor: "challenge",
                                        className: "form-label",
                                        children: "Precisamos entender seu desafio para propor a melhor solução. *"
                                    }, void 0, false, {
                                        fileName: "[project]/pages/solicitacao.js",
                                        lineNumber: 191,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("textarea", {
                                        required: true,
                                        id: "challenge",
                                        name: "challenge",
                                        className: "form-input form-textarea",
                                        placeholder: "Nos ajude a entender seu desafio. Qual é o problema principal e qual é o resultado ideal que você espera alcançar?",
                                        value: formData.challenge,
                                        onChange: handleChange
                                    }, void 0, false, {
                                        fileName: "[project]/pages/solicitacao.js",
                                        lineNumber: 192,
                                        columnNumber: 33
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/solicitacao.js",
                                lineNumber: 190,
                                columnNumber: 29
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/pages/solicitacao.js",
                            lineNumber: 189,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                            className: "form-note",
                            children: "* Campo obrigatório"
                        }, void 0, false, {
                            fileName: "[project]/pages/solicitacao.js",
                            lineNumber: 199,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/pages/solicitacao.js",
                    lineNumber: 187,
                    columnNumber: 21
                }, this);
            case 3:
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "form-step",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                            className: "form-step-title",
                            children: "Requisitos e Detalhes Técnicos"
                        }, void 0, false, {
                            fileName: "[project]/pages/solicitacao.js",
                            lineNumber: 205,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                            className: "form-step-subtitle",
                            children: "Nos ajude a entender a natureza técnica do seu projeto."
                        }, void 0, false, {
                            fileName: "[project]/pages/solicitacao.js",
                            lineNumber: 206,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "form-fields-container single-field",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "form-group",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                            htmlFor: "solutionType",
                                            className: "form-label",
                                            children: "Tipo de solução *"
                                        }, void 0, false, {
                                            fileName: "[project]/pages/solicitacao.js",
                                            lineNumber: 209,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("select", {
                                            id: "solutionType",
                                            name: "solutionType",
                                            className: "form-input",
                                            value: formData.solutionType,
                                            onChange: handleChange,
                                            required: true,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                    value: "",
                                                    disabled: true,
                                                    children: "Selecione o tipo"
                                                }, void 0, false, {
                                                    fileName: "[project]/pages/solicitacao.js",
                                                    lineNumber: 211,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                    value: "plataforma-web",
                                                    children: "Plataforma web"
                                                }, void 0, false, {
                                                    fileName: "[project]/pages/solicitacao.js",
                                                    lineNumber: 212,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                    value: "aplicativo-mobile",
                                                    children: "Aplicativo Mobile"
                                                }, void 0, false, {
                                                    fileName: "[project]/pages/solicitacao.js",
                                                    lineNumber: 213,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                    value: "web-mobile",
                                                    children: "Web + Mobile"
                                                }, void 0, false, {
                                                    fileName: "[project]/pages/solicitacao.js",
                                                    lineNumber: 214,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                    value: "software-desktop",
                                                    children: "Software para desktop"
                                                }, void 0, false, {
                                                    fileName: "[project]/pages/solicitacao.js",
                                                    lineNumber: 215,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                    value: "integracao-sistemas",
                                                    children: "Integração de sistemas"
                                                }, void 0, false, {
                                                    fileName: "[project]/pages/solicitacao.js",
                                                    lineNumber: 216,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/pages/solicitacao.js",
                                            lineNumber: 210,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/pages/solicitacao.js",
                                    lineNumber: 208,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "form-group",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                            htmlFor: "integrationNeeded",
                                            className: "form-label",
                                            children: "Precisa de integração com outros sistemas?"
                                        }, void 0, false, {
                                            fileName: "[project]/pages/solicitacao.js",
                                            lineNumber: 220,
                                            columnNumber: 33
                                        }, this),
                                        " ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("select", {
                                            id: "integrationNeeded",
                                            name: "integrationNeeded",
                                            className: "form-input",
                                            value: formData.integrationNeeded,
                                            onChange: handleChange,
                                            children: [
                                                " ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                    value: "",
                                                    disabled: true,
                                                    children: "Selecione uma opção"
                                                }, void 0, false, {
                                                    fileName: "[project]/pages/solicitacao.js",
                                                    lineNumber: 222,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                    value: "nao",
                                                    children: "Não, é um sistema novo"
                                                }, void 0, false, {
                                                    fileName: "[project]/pages/solicitacao.js",
                                                    lineNumber: 223,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                    value: "sim-1-2",
                                                    children: "Sim, 1-2"
                                                }, void 0, false, {
                                                    fileName: "[project]/pages/solicitacao.js",
                                                    lineNumber: 224,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                    value: "sim-3-mais",
                                                    children: "Sim, 3+"
                                                }, void 0, false, {
                                                    fileName: "[project]/pages/solicitacao.js",
                                                    lineNumber: 225,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/pages/solicitacao.js",
                                            lineNumber: 221,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/pages/solicitacao.js",
                                    lineNumber: 219,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/pages/solicitacao.js",
                            lineNumber: 207,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                            className: "form-note",
                            children: "* Campo obrigatório"
                        }, void 0, false, {
                            fileName: "[project]/pages/solicitacao.js",
                            lineNumber: 229,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/pages/solicitacao.js",
                    lineNumber: 204,
                    columnNumber: 21
                }, this);
            case 4:
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "form-step",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                            className: "form-step-title",
                            children: "Escopo, Prazos e Orçamento"
                        }, void 0, false, {
                            fileName: "[project]/pages/solicitacao.js",
                            lineNumber: 235,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                            className: "form-step-subtitle",
                            children: "Suas respostas nos ajudam a calibrar nossa proposta inicial."
                        }, void 0, false, {
                            fileName: "[project]/pages/solicitacao.js",
                            lineNumber: 236,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "form-fields-container single-field form-step-last",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "form-group",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                            className: "form-label",
                                            children: "Qual é a sua faixa de investimento para este projeto? *"
                                        }, void 0, false, {
                                            fileName: "[project]/pages/solicitacao.js",
                                            lineNumber: 240,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            className: "form-options-group",
                                            children: [
                                                'Até R$ 5.000',
                                                'R$ 5.000 - R$ 15.000',
                                                'R$ 15.000 - R$ 30.000',
                                                'Acima de R$ 30.000',
                                                'Ainda não tenho um orçamento / Prefiro discutir'
                                            ].map((option)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                    className: "form-option-label",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                            type: "radio",
                                                            name: "investmentRange",
                                                            value: option,
                                                            checked: formData.investmentRange === option,
                                                            onChange: handleChange
                                                        }, void 0, false, {
                                                            fileName: "[project]/pages/solicitacao.js",
                                                            lineNumber: 244,
                                                            columnNumber: 45
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                            className: "form-option-text",
                                                            children: option
                                                        }, void 0, false, {
                                                            fileName: "[project]/pages/solicitacao.js",
                                                            lineNumber: 245,
                                                            columnNumber: 45
                                                        }, this)
                                                    ]
                                                }, option, true, {
                                                    fileName: "[project]/pages/solicitacao.js",
                                                    lineNumber: 243,
                                                    columnNumber: 41
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/pages/solicitacao.js",
                                            lineNumber: 241,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/pages/solicitacao.js",
                                    lineNumber: 239,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "form-group",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                            className: "form-label",
                                            children: "Qual é a urgência para este projeto? *"
                                        }, void 0, false, {
                                            fileName: "[project]/pages/solicitacao.js",
                                            lineNumber: 253,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            className: "form-options-group",
                                            children: [
                                                'Muito Urgente (Preciso começar nos próximos 30 dias)',
                                                'Flexível (Posso começar em 1-3 meses)',
                                                'Planejamento (Início em 3-6 meses)',
                                                'Apenas Pesquisando (Sem prazo definido)'
                                            ].map((option)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                    className: "form-option-label",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                            type: "radio",
                                                            name: "urgency",
                                                            value: option,
                                                            checked: formData.urgency === option,
                                                            onChange: handleChange
                                                        }, void 0, false, {
                                                            fileName: "[project]/pages/solicitacao.js",
                                                            lineNumber: 257,
                                                            columnNumber: 45
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                            className: "form-option-text",
                                                            children: option
                                                        }, void 0, false, {
                                                            fileName: "[project]/pages/solicitacao.js",
                                                            lineNumber: 258,
                                                            columnNumber: 45
                                                        }, this)
                                                    ]
                                                }, option, true, {
                                                    fileName: "[project]/pages/solicitacao.js",
                                                    lineNumber: 256,
                                                    columnNumber: 41
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/pages/solicitacao.js",
                                            lineNumber: 254,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/pages/solicitacao.js",
                                    lineNumber: 252,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "form-group",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                            className: "form-label",
                                            children: "Quais serviços você já sabe que vai precisar? *"
                                        }, void 0, false, {
                                            fileName: "[project]/pages/solicitacao.js",
                                            lineNumber: 266,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            className: "form-options-group",
                                            children: [
                                                {
                                                    name: 'website',
                                                    text: 'Desenvolvimento de Website / Landing Page'
                                                },
                                                {
                                                    name: 'webapp',
                                                    text: 'Desenvolvimento de Aplicação Web (SaaS, Dashboard)'
                                                },
                                                {
                                                    name: 'mobile',
                                                    text: 'Desenvolvimento de Aplicativo Mobile (iOS/Android)'
                                                },
                                                {
                                                    name: 'automation',
                                                    text: 'Automação de Processos / Integrações'
                                                },
                                                {
                                                    name: 'consulting',
                                                    text: 'Ainda não sei, preciso de consultoria'
                                                }
                                            ].map((service)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                    className: "form-option-label",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                            type: "checkbox",
                                                            name: service.name,
                                                            checked: formData.services[service.name],
                                                            onChange: handleCheckboxChange
                                                        }, void 0, false, {
                                                            fileName: "[project]/pages/solicitacao.js",
                                                            lineNumber: 276,
                                                            columnNumber: 45
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                            className: "form-option-text",
                                                            children: service.text
                                                        }, void 0, false, {
                                                            fileName: "[project]/pages/solicitacao.js",
                                                            lineNumber: 277,
                                                            columnNumber: 45
                                                        }, this)
                                                    ]
                                                }, service.name, true, {
                                                    fileName: "[project]/pages/solicitacao.js",
                                                    lineNumber: 275,
                                                    columnNumber: 41
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/pages/solicitacao.js",
                                            lineNumber: 267,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/pages/solicitacao.js",
                                    lineNumber: 265,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/pages/solicitacao.js",
                            lineNumber: 237,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                            className: "form-note",
                            children: "* Campos obrigatórios"
                        }, void 0, false, {
                            fileName: "[project]/pages/solicitacao.js",
                            lineNumber: 283,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/pages/solicitacao.js",
                    lineNumber: 234,
                    columnNumber: 21
                }, this);
            default:
                return null;
        }
    };
    if (submissionStatus === 'success') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("section", {
            ref: pageTopRef,
            className: "solicitacao-page-content",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "submission-feedback-container fade-in-section is-visible",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$pi$2f$index$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__["PiCheckCircle"], {
                        className: "submission-feedback-icon"
                    }, void 0, false, {
                        fileName: "[project]/pages/solicitacao.js",
                        lineNumber: 295,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                        className: "submission-feedback-title",
                        children: "Projeto enviado com sucesso!"
                    }, void 0, false, {
                        fileName: "[project]/pages/solicitacao.js",
                        lineNumber: 296,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                        className: "submission-feedback-text",
                        children: "Obrigado por compartilhar sua ideia conosco. Nossa equipe analisará as informações e entrará em contato em breve para discutir os próximos passos."
                    }, void 0, false, {
                        fileName: "[project]/pages/solicitacao.js",
                        lineNumber: 297,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                        href: "/",
                        className: "form-button",
                        children: "Voltar para o Início"
                    }, void 0, false, {
                        fileName: "[project]/pages/solicitacao.js",
                        lineNumber: 300,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pages/solicitacao.js",
                lineNumber: 294,
                columnNumber: 17
            }, this)
        }, void 0, false, {
            fileName: "[project]/pages/solicitacao.js",
            lineNumber: 293,
            columnNumber: 13
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("section", {
        ref: pageTopRef,
        className: "solicitacao-page-content",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
                className: "solicitacao-page-title title-section-about fade-in-section",
                children: [
                    "Vamos cultivar o seu ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("strong", {
                        className: "title-header",
                        children: "próximo projeto?"
                    }, void 0, false, {
                        fileName: "[project]/pages/solicitacao.js",
                        lineNumber: 308,
                        columnNumber: 109
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pages/solicitacao.js",
                lineNumber: 308,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                className: "solicitacao-page-subtitle subtitle-section-about fade-in-section",
                children: "Suas respostas nos ajudam a preparar uma análise mais precisa. Após o envio, entraremos em contato para seguir com o projeto."
            }, void 0, false, {
                fileName: "[project]/pages/solicitacao.js",
                lineNumber: 309,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "solicitacao-form-container fade-in-section",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "step-indicator-container",
                        children: steps.map((step, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: `step-item ${index + 1 === currentStep ? 'active' : ''} ${index + 1 < currentStep ? 'completed' : ''}`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "step-number",
                                        children: index + 1
                                    }, void 0, false, {
                                        fileName: "[project]/pages/solicitacao.js",
                                        lineNumber: 316,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                        className: "step-title",
                                        children: step
                                    }, void 0, false, {
                                        fileName: "[project]/pages/solicitacao.js",
                                        lineNumber: 317,
                                        columnNumber: 29
                                    }, this),
                                    index < steps.length - 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "step-connector"
                                    }, void 0, false, {
                                        fileName: "[project]/pages/solicitacao.js",
                                        lineNumber: 318,
                                        columnNumber: 58
                                    }, this)
                                ]
                            }, index, true, {
                                fileName: "[project]/pages/solicitacao.js",
                                lineNumber: 315,
                                columnNumber: 25
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/pages/solicitacao.js",
                        lineNumber: 313,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("form", {
                        className: "solicitacao-form",
                        children: renderStepContent()
                    }, void 0, false, {
                        fileName: "[project]/pages/solicitacao.js",
                        lineNumber: 324,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "form-navigation",
                        children: [
                            currentStep > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                onClick: prevStep,
                                className: "form-button form-button-secondary",
                                children: "Voltar"
                            }, void 0, false, {
                                fileName: "[project]/pages/solicitacao.js",
                                lineNumber: 331,
                                columnNumber: 25
                            }, this),
                            currentStep < steps.length ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                onClick: handleNextStep,
                                className: "form-button",
                                disabled: !isStepValid(),
                                children: "Avançar"
                            }, void 0, false, {
                                fileName: "[project]/pages/solicitacao.js",
                                lineNumber: 336,
                                columnNumber: 25
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                onClick: handleSubmit,
                                id: "submit-button",
                                className: "form-button",
                                disabled: !isStepValid() || submissionStatus === 'loading',
                                children: submissionStatus === 'loading' ? 'Enviando...' : 'Enviar Solicitação'
                            }, void 0, false, {
                                fileName: "[project]/pages/solicitacao.js",
                                lineNumber: 340,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/pages/solicitacao.js",
                        lineNumber: 329,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pages/solicitacao.js",
                lineNumber: 311,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "direct-contact-section fade-in-section",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                        className: "direct-contact-title",
                        children: "Prefere uma conversa mais direta?"
                    }, void 0, false, {
                        fileName: "[project]/pages/solicitacao.js",
                        lineNumber: 350,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                        className: "direct-contact-text",
                        children: "Entendemos perfeitamente. Se o formulário não for o ideal para você, sinta-se à vontade para enviar um resumo da sua ideia diretamente para o nosso e-mail ou WhatsApp. Estamos prontos para ouvir."
                    }, void 0, false, {
                        fileName: "[project]/pages/solicitacao.js",
                        lineNumber: 351,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "direct-contact-info",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
                                href: "mailto:contato@autumnsoftwares.com",
                                className: "contact-link",
                                children: "E-mail: contato@autumnsoftwares.com"
                            }, void 0, false, {
                                fileName: "[project]/pages/solicitacao.js",
                                lineNumber: 355,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
                                href: "https://wa.me/5547991739602",
                                target: "_blank",
                                rel: "noopener noreferrer",
                                className: "contact-link",
                                children: "WhatsApp: (47) 99173-9602"
                            }, void 0, false, {
                                fileName: "[project]/pages/solicitacao.js",
                                lineNumber: 358,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/pages/solicitacao.js",
                        lineNumber: 354,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pages/solicitacao.js",
                lineNumber: 349,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/pages/solicitacao.js",
        lineNumber: 307,
        columnNumber: 9
    }, this);
}
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__72d88d24._.js.map