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
                            {/* Adiciona um link para o repositório no GitHub */}
                            <h2><a href={project.url} target="_blank" rel="noopener noreferrer">{project.title}</a></h2>
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
    'code-connect': {
        title: 'Sistema de Upload de Projetos com UI Moderna',
        body: 'Estudo de caso sobre a criação de um formulário multi-etapas com interface intuitiva para upload e gerenciamento de projetos, focado na experiência do usuário.',
    },
    'alura-books': {
        title: 'Livraria Digital Mobile-First',
        body: 'Conceito de um aplicativo de e-commerce para venda de livros, projetado com uma abordagem mobile-first para garantir uma experiência de compra e leitura fluida em qualquer dispositivo.',
    },
    'alura-plus':{
        title: 'Plataforma de subscrição de vídeos educacionais',
        body: 'Conceito de uma plataforma de streaming focada em vídeos educacionais.',
    }
};

// Lista dos repositórios que você quer que apareçam no portfólio.
const portfolioRepoNames = [
    'code-connect',
    'alura-books',
    'alura-plus',
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

    return {
        props: { 
            projects 
        },
    };
}

export default PortfolioPage;