module.exports = [
"[project]/pages/portfolio.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__,
    "getStaticProps",
    ()=>getStaticProps
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
;
;
function PortfolioPage({ projects }) {
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
        return ()=>sections.forEach((section)=>observer.unobserve(section));
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        style: {
            padding: '20px 40px'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
                className: "portfolio-section-title title-section-about fade-in-section",
                children: "Estudos de Caso & Conceitos"
            }, void 0, false, {
                fileName: "[project]/pages/portfolio.js",
                lineNumber: 23,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                className: "portfolio-section-subtitle subtitle-section-about fade-in-section",
                children: "Conheça nossa forma de pensar e nossa excelência técnica em projetos-conceito realistas."
            }, void 0, false, {
                fileName: "[project]/pages/portfolio.js",
                lineNumber: 24,
                columnNumber: 13
            }, this),
            projects.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                children: "Nenhum projeto encontrado."
            }, void 0, false, {
                fileName: "[project]/pages/portfolio.js",
                lineNumber: 26,
                columnNumber: 17
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("ul", {
                className: "projects-portfolio",
                children: projects.map((project)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("li", {
                        id: project.id.toString(),
                        className: "portfolio-list-item fade-in-section",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
                                    href: project.url,
                                    target: "_blank",
                                    rel: "noopener noreferrer",
                                    children: project.title
                                }, void 0, false, {
                                    fileName: "[project]/pages/portfolio.js",
                                    lineNumber: 32,
                                    columnNumber: 33
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/pages/portfolio.js",
                                lineNumber: 32,
                                columnNumber: 29
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                children: project.body
                            }, void 0, false, {
                                fileName: "[project]/pages/portfolio.js",
                                lineNumber: 33,
                                columnNumber: 29
                            }, this),
                            project.liveUrl && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
                                href: project.liveUrl,
                                target: "_blank",
                                rel: "noopener noreferrer",
                                className: "portfolio-button-live portfolio-button",
                                children: [
                                    "Ver projeto ao vivo ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                        style: {
                                            marginLeft: '5px'
                                        },
                                        children: "🚀"
                                    }, void 0, false, {
                                        fileName: "[project]/pages/portfolio.js",
                                        lineNumber: 37,
                                        columnNumber: 57
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/portfolio.js",
                                lineNumber: 36,
                                columnNumber: 33
                            }, this)
                        ]
                    }, project.id, true, {
                        fileName: "[project]/pages/portfolio.js",
                        lineNumber: 30,
                        columnNumber: 25
                    }, this))
            }, void 0, false, {
                fileName: "[project]/pages/portfolio.js",
                lineNumber: 28,
                columnNumber: 17
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/pages/portfolio.js",
        lineNumber: 22,
        columnNumber: 9
    }, this);
}
const customProjectDetails = {
    'code-connect': {
        title: 'Sistema de Upload de Projetos com UI Moderna',
        body: 'Estudo de caso sobre a criação de um formulário multi-etapas com interface intuitiva para upload e gerenciamento de projetos, focado na experiência do usuário.'
    },
    'alura-books': {
        title: 'Livraria Digital Mobile-First',
        body: 'Conceito de um aplicativo de e-commerce para venda de livros, projetado com uma abordagem mobile-first para garantir uma experiência de compra e leitura fluida em qualquer dispositivo.'
    },
    'alura-plus': {
        title: 'Plataforma de subscrição de vídeos educacionais',
        body: 'Conceito de uma plataforma de streaming focada em vídeos educacionais.'
    }
};
// Lista dos repositórios que você quer que apareçam no portfólio.
const portfolioRepoNames = [
    'code-connect',
    'alura-books',
    'alura-plus'
];
async function getStaticProps() {
    const GITHUB_USERNAME = 'leopardo666nadilha';
    const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&direction=desc`);
    const repos = await res.json();
    const projects = repos.filter((repo)=>repo.description && repo.homepage)// Adiciona um novo filtro para incluir apenas os repositórios da nossa lista
    .filter((repo)=>portfolioRepoNames.includes(repo.name)).map((repo)=>{
        const customDetails = customProjectDetails[repo.name];
        return {
            id: repo.id,
            title: customDetails?.title || repo.name,
            body: customDetails?.body || repo.description,
            url: repo.html_url,
            liveUrl: repo.homepage
        };
    });
    return {
        props: {
            projects
        }
    };
}
const __TURBOPACK__default__export__ = PortfolioPage;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__cfb5cc73._.js.map