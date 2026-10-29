import { useEffect } from 'react';
import Head from 'next/head';
import styles from '../styles/Portfolio.module.css';
import typography from '../styles/shared/typography.module.css';
import { SITE_URL } from '../lib/siteConfig';
import useFadeIn from '../lib/useFadeIn';

function PortfolioPage({ projects }) {
    useFadeIn();

    useEffect(() => {
        const hash = window.location.hash.replace('#', '');
        if (!hash) return;

        const target = document.getElementById(hash);
        if (!target) return;

        // Torna o card visível imediatamente (sem esperar o fade-in-section
        // entrar em cena) e rola até ele antes de tocar o pulso.
        target.classList.add('is-visible');
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
        target.classList.add(styles.pulse);

        const timeout = setTimeout(() => {
            target.classList.remove(styles.pulse);
        }, 1700);

        return () => clearTimeout(timeout);
    }, []);

    return (
        <div style={{ padding: '20px 40px' }}>
            <Head>
                <title>Portfólio | Autumn Softwares</title>
                <meta name="description" content="Estudos de caso e projetos desenvolvidos pela Autumn Softwares: sistemas web, automações e soluções sob medida." />
                <meta property="og:title" content="Portfólio | Autumn Softwares" />
                <meta property="og:description" content="Conheça nossa forma de pensar e nossa excelência técnica em projetos reais e conceituais." />
                <meta property="og:url" content={`${SITE_URL}/portfolio`} />
                <link rel="canonical" href={`${SITE_URL}/portfolio`} />
            </Head>
            <h1 className={`${styles.portfolioSectionTitle} ${typography.titleSectionAbout} fade-in-section`}>Estudos de Caso & Conceitos</h1>
            <p className={`${styles.portfolioSectionSubtitle} ${typography.subtitleSectionAbout} fade-in-section`}>Conheça nossa forma de pensar e nossa excelência técnica em projetos-conceito realistas.</p>
            {projects.length === 0 ? (
                <p>Nenhum projeto encontrado.</p>
            ) : (
                <ul className={styles.projectsPortfolio}>
                    {projects.map((project) => (
                        <li key={project.id} id={project.id.toString()} className={`${styles.portfolioListItem} fade-in-section`}>
                            {/* Adiciona um link para o repositório no GitHub, se existir */}
                            <h2>
                                {project.url ? (
                                    <a href={project.url} target="_blank" rel="noopener noreferrer" aria-label={`Ver repositório de ${project.title} no GitHub (abre em nova guia)`}>{project.title}</a>
                                ) : (
                                    project.title
                                )}
                            </h2>
                            <p>{project.body}</p>
                            {/* Adiciona o link para o projeto ao vivo (deploy) */}
                            {project.liveUrl && (
                                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className={`${styles.portfolioButtonLive} ${styles.portfolioButton}`} aria-label={`Ver ${project.title} ao vivo (abre em nova guia)`}>
                                    Ver projeto ao vivo <span style={{ marginLeft: '5px' }} aria-hidden="true">🚀</span>
                                </a>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

const customProjectDetails = {
    'GremioForcaJovem': {
        title: 'Site oficial do Grêmio Força Jovem',
        body: 'Site do Grêmio Força Jovem da escola EEB Alinor Vieira Côrte, desenvolvido com Next.js. Possui um sistema de blog integrado para notícias e eventos com atualização instantânea, além de um sistema HoneyPot para evitar spam de bots.',
    },
    'Aeris':{
        title: 'Sistema de Finanças Pessoais',
        body: 'Plataforma PWA para controle das finanças pessoais, desenvolvido com Next.js em uma abordagem mobile-first.',
    }
};

// Lista dos repositórios no portfólio.
const portfolioRepoNames = [
    'GremioForcaJovem',
    'Aeris'
];

const manualProjects = [
    {
        id: 'MotorTributario',
        title: 'Motor Tributário Autumn',
        body: 'Plataforma para emissão e consulta de notas fiscais já no novo modelo da reforma tributária, com aprovação pela SEFAZ. Conta com um dashboard e ferramentas de gestão aprimoradas para o fluxo e controle tributário.',
        url: null,
        liveUrl: 'https://fiscal.autumnsoftwares.com',
    },
    {
        id: 'PrimeCareAI',
        title: 'PrimeCare.AI: gestão para consultórios médicos',
        body: 'Software gerencial para microclínicas e consultórios médicos que conecta rotina clínica e gestão em um só sistema. Cuida da receita do consultório com controle de faturamento e análise de dados, oferece acesso a literatura científica integrada com IA e mantém a documentação clínica organizada para uma atuação criteriosa.',
        url: null,
        liveUrl: 'https://www.primecareai.com.br',
    },
    {
        id: 'AutumnRunes',
        title: 'Autumn Runes: dashboard de criptoativos Runes',
        body: 'Dashboard para acompanhar os criptoativos do protocolo Runes na rede Bitcoin. Exibe preço, valor de mercado, volume e variação das runas em destaque, gráfico de velas do Bitcoin com dados OHLC em vários períodos e métricas do ecossistema, com conexão de carteira e suporte a múltiplos idiomas. Desenvolvido com Next.js e TypeScript, segue em evolução com funcionalidades de compra e venda a caminho.',
        url: 'https://github.com/Leopardo666Nadilha/AutumnRunes',
        liveUrl: 'https://autumn-runes.vercel.app',
    }
];

export async function getStaticProps() {
    const GITHUB_USERNAME = 'leopardo666nadilha';

    // Se a API do GitHub falhar (ex.: limite de requisições no build), o
    // portfólio segue só com os projetos manuais em vez de quebrar o deploy.
    let repos = [];
    try {
        const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&direction=desc&per_page=100`);
        const data = await res.json();
        if (res.ok && Array.isArray(data)) {
            repos = data;
        } else {
            console.warn('GitHub API retornou erro ao buscar repositórios:', res.status, data?.message);
        }
    } catch (error) {
        console.warn('Falha ao buscar repositórios do GitHub:', error);
    }

    const projects = repos
        .filter(repo => repo.description && repo.homepage) 
        // Adiciona um novo filtro para incluir apenas os repositórios da nossa lista
        .filter(repo => portfolioRepoNames.includes(repo.name))
        .map(repo => {
            const customDetails = customProjectDetails[repo.name];
            return {
                // Usa o nome do repositório (slug estável) como id, não o repo.id
                // numérico do GitHub — é esse slug que os links de destaque da Home
                // usam em /portfolio#slug, então precisa bater exatamente.
                id: repo.name,
                title: customDetails?.title || repo.name, // Usa o título customizado ou o nome do repo
                body: customDetails?.body || repo.description, // Usa o body customizado ou a descrição do repo
                url: repo.html_url,
                liveUrl: repo.homepage,
            };
        });

    const allProjects = [...manualProjects, ...projects];

    return {
        props: { 
            projects: allProjects 
        },
    };
}

export default PortfolioPage;