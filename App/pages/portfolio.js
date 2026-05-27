import { useEffect } from 'react';

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
    return (
        <div style={{ padding: '20px 40px' }}>
            <h1 className='portfolio-section-title title-section-about fade-in-section'>Estudos de Caso & Conceitos</h1>
            <p className='portfolio-section-subtitle subtitle-section-about fade-in-section'>Conheça nossa forma de pensar e nossa excelência técnica em projetos-conceito realistas.</p>
            {projects.length === 0 ? (
                <p>Nenhum projeto encontrado.</p>
            ) : (
                <ul className='projects-portfolio'>
                    {projects.map((project) => ( 
                        <li key={project.id} id={project.id.toString()} className="portfolio-list-item fade-in-section">
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
                                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="portfolio-button-live portfolio-button">
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

// Lista dos repositórios que você quer que apareçam no portfólio.
const portfolioRepoNames = [
    'PresalePrimeCare',
    'GremioForcaJovem',
    'Aeris'
];

const manualProjects = [
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
                id: repo.id,
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