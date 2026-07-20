// Configuração central de SEO. Defina NEXT_PUBLIC_SITE_URL no .env.local
// (e nas variáveis de ambiente de produção) com o domínio real do site —
// esse valor abaixo é só um fallback pra desenvolvimento/preview.
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.autumnsoftwares.com';
export const SITE_NAME = 'Autumn Softwares';
export const DEFAULT_OG_IMAGE = `${SITE_URL}/main-bg.jpg`;
