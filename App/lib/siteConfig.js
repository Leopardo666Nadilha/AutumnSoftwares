// Configuração central de SEO. Defina NEXT_PUBLIC_SITE_URL no .env.local
// (e nas variáveis de ambiente de produção) com o domínio real do site —
// esse valor abaixo é só um fallback pra desenvolvimento/preview.
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.autumnsoftwares.com';
export const SITE_NAME = 'Autumn Softwares';
// Versão 1200x630 do main-bg.jpg, no tamanho recomendado para prévias de link.
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`;

// Dados estruturados (schema.org) da empresa, lidos pelo Google e por IAs
// para identificar nome, logo, contato e serviços. Injetados no <Layout>.
export const STRUCTURED_DATA = {
    '@context': 'https://schema.org',
    '@graph': [
        {
            '@type': 'ProfessionalService',
            '@id': `${SITE_URL}/#organization`,
            name: SITE_NAME,
            url: SITE_URL,
            logo: `${SITE_URL}/logo-email.png`,
            image: DEFAULT_OG_IMAGE,
            description: 'Desenvolvimento de software sob demanda: aplicações web, aplicativos mobile, automações de processos e integrações personalizadas.',
            foundingDate: '2025',
            email: 'softwares.autumn@gmail.com',
            telephone: '+55-47-99173-9602',
            address: {
                '@type': 'PostalAddress',
                addressLocality: 'Papanduva',
                addressRegion: 'SC',
                addressCountry: 'BR',
            },
            areaServed: 'BR',
            knowsAbout: [
                'Desenvolvimento de software sob medida',
                'Aplicações web',
                'Aplicativos mobile',
                'Automação de processos',
                'Integrações de sistemas',
            ],
        },
        {
            '@type': 'WebSite',
            '@id': `${SITE_URL}/#website`,
            name: SITE_NAME,
            url: SITE_URL,
            inLanguage: 'pt-BR',
            publisher: { '@id': `${SITE_URL}/#organization` },
        },
    ],
};
