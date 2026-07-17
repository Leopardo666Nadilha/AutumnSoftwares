import { useEffect } from 'react';
import styles from '../styles/Portfolio.module.css';
import typography from '../styles/shared/typography.module.css';

function PortfolioPage({ projects }) {
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

        return () => sections.forEach(section => observer.unobserve(section));
    }, []);

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
                                    <a href={project.url} target="_blank" rel="noopener noreferrer">{project.title}</a>
                                ) : (
                                    project.title
                                )}
                            </h2>
                            <p>{project.body}</p>
                            {/* Adiciona o link para o projeto ao vivo (deploy) */}
                            {project.liveUrl && (
                                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className={`${styles.portfolioButtonLive} ${styles.portfolioButton}`}>
                                    Ver projeto ao vivo <span style={{ marginLeft: '5px' }}>🚀</span>
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
    'PresalePrimeCare': {
        title: 'Página de pré-lançamento para o PrimeCare.AI',
        body: 'Landing page construída para o pré-lançamento do PrimeCare.AI, um sistema de IA criado para otimizar a documentação clínica e a transcrição de áudio das consultas. Desenvolvido com Next.js, a página apresenta um design moderno e responsivo, destacando os principais benefícios do produto e incentivando os visitantes a se inscreverem para atualizações e acesso antecipado.',
    },
    'GremioForcaJovem': {
        title: 'Site oficial do Grêmio Força Jovem',
        body: 'Site do Grêmio Força Jovem da escola EEB Alinor Vieira Côrte, desenvolvido com Next.js. Possui um sistema de blog integrado para notícias e eventos com atualização instantânea pelo Google Sheets (escolha devido a facilidade para os jovens utilizarem), além de um sistema HoneyPot para evitar spam de bots.',
    },
    'Aeris':{
        title: 'Sistema de Finanças Pessoais',
        body: 'Plataforma PWA para controle das finanças pessoais, desenvolvido com Next.js em uma abordagem mobile-first.',
    }
};

// Lista dos repositórios no portfólio.
const portfolioRepoNames = [
    'PresalePrimeCare',
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
        title: 'Página de pré-lançamento para o PrimeCare.AI',
        body: 'Landing page construída para o pré-lançamento do PrimeCare.AI, um sistema de IA criado para otimizar a documentação clínica e a transcrição de áudio das consultas. Desenvolvido com Next.js, a página apresenta um design moderno e responsivo, destacando os principais benefícios do produto e incentivando os visitantes a se inscreverem para atualizações e acesso antecipado.',
        url: null,
        liveUrl: 'https://www.primecareai.com.br',
    }
];

export async function getStaticProps() {
    const GITHUB_USERNAME = 'leopardo666nadilha';
    const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&direction=desc`);
    const repos = await res.json();

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