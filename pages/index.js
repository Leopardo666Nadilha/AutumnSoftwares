import { useEffect } from 'react';
import ScrollDownIndicator from '../components/ScrollDownIndicator';
import Link from 'next/link';
import Image from 'next/image';
import { PiCompass, PiClock, PiCode } from 'react-icons/pi';
import { RiDoubleQuotesR } from 'react-icons/ri';
import mainBg from '../public/main-bg.jpg';
// Importe as imagens dos projetos
import portfolioPreview1 from '../public/portfolio-preview-1.jpg';
import portfolioPreview2 from '../public/portfolio-preview-2.jpg';

// Dados dos projetos para a prévia
const portfolioData = [
    {
        id: 'project-UI-form-system',
        title: 'Sistema de upload de formulários',
        description: 'Desenvolvimento de um sistema de upload de projetos via formulário.',
        image: portfolioPreview1,
    },
    {
        id: 'project-books-library',
        title: 'Aplicativo de venda de Livros',
        description: 'Criação de um aplicativo desenvolvido no modelo mobile-first, oferecendo uma experiência intuitiva para compra e leitura de livros digitais.',
        image: portfolioPreview2,
    }
];

export default function HomePage() {
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target); // Opcional: para a animação acontecer apenas uma vez
                }
            });
        }, {
            threshold: 0.1 // A animação começa quando 10% do elemento está visível
        });

        const sections = document.querySelectorAll('.fade-in-section');
        sections.forEach(section => observer.observe(section));

        // Limpeza ao desmontar o componente
        return () => sections.forEach(section => observer.unobserve(section));
    }, []);

    return (
        <>
            {/*Seção que terá a imagem de fundo */}
            <section className="hero-section">
                <Image
                    src={mainBg}
                    alt="Folhas de outono em primeiro plano com um prédio moderno ao fundo"
                    layout="fill"
                    objectFit="cover"
                    quality={75}
                    placeholder="blur"
                    style={{ zIndex: 0 }}
                />
                <div className="hero-overlay"></div>
                <div className="hero-content" style={{ zIndex: 1 }}>
                    <h1>Suas ideias <strong className='destaque-title'>amadurecidas</strong> em software.</h1>
                    <p>Transformando ideias em soluções digitais robustas e personalizadas.</p>
                    <div className="hero-buttons">
                        <Link href="/solicitacao" className="hero-cta-primary">Solicitar Projeto</Link>
                        <Link href="/portfolio" className="hero-cta-secondary">Conheça nosso Portfólio</Link>
                    </div>
                </div>
                <ScrollDownIndicator />
            </section>

            {/* Seção de destino para a rolagem */}
            <section id="next-section" className="next-section fade-in-section">
                <div><h2 className='title-section-about'>A precisão do <strong className='title-header'>Software sob demanda</strong></h2>
                <p className='subtitle-section-about'>
                    Nosso processo é focado em transparência, excelência técnica e resultados reais.
                </p>
                </div>
                <div className="benefits-container">
                    <div className="benefit-item">
                        <PiCompass className="benefit-icon" />
                        <h3 className="title-benefits">Maturidade técnica</h3>
                        <p className="text-benefits">Antes da primeira linha de código, mergulhamos no seu negócio. Entendemos seu desafio para desenhar a arquitetura exata que sua operação precisa.</p>
                    </div>
                    <div className="benefit-item">
                        <PiClock className="benefit-icon" />
                        <h3 className="title-benefits">Entrega pontual</h3>
                        <p className="text-benefits">Prazos definidos e cumpridos. Como os ciclos do outono, nossas entregas são previsíveis e transparentes.</p>
                    </div>
                    <div className="benefit-item">
                        <PiCode className="benefit-icon" />
                        <h3 className="title-benefits">Código limpo</h3>
                        <p className="text-benefits">Cada linha de código é escrita pensando em manutenibilidade e performance a longo prazo.</p>
                    </div>
                </div>
            </section>
            <section className='compromise-container fade-in-section'>
                <div>
                    <h2 className='title-section-compromise'>Como <strong className='title-compromise'>cultivamos</strong> seu software</h2>
                </div>
                <div className='compromise-banner'>
                    <div className='compromise-card'>
                        <RiDoubleQuotesR className="compromise-quote-icon" />
                        <h3 className='compromise-item'>"Iniciamos com uma imersão profunda no seu desafio. Não pulamos para o código antes de mapear a estratégia e a arquitetura ideal para o seu sucesso."</h3>
                        <p className='compromise-phase'>Fase 1: Estratégia e Descoberta</p>
                        <p className='compromise-description'>O alicerce de todo projeto.</p>
                    </div>
                    <div className='compromise-card'>
                        <RiDoubleQuotesR className="compromise-quote-icon" />
                        <h3 className='compromise-item'>"Desenvolvimento ágil com ciclos curtos e entregas previsíveis. Você vê o progresso, valida as etapas e tem total visibilidade do produto do início ao fim."</h3>
                        <p className='compromise-phase'>Fase 2: Desenvolvimento e Colaboração</p>
                        <p className='compromise-description'>Transparência e qualidade em primeiro lugar.</p>
                    </div>
                </div>
            </section>
            <section className="portfolio-section next-section fade-in-section">
                <div><h2 className='title-section-portfolio title-section-about'>Projetos de <strong className='title-header-portfolio title-header'>Destaque</strong></h2>
                <p className='subtitle-section-about'>
                    Estes são alguns dos projetos que cultivamos com dedicação e excelência.
                </p>
                </div>
                <div className="portfolio-preview-container">
                    {portfolioData.map((project) => (
                        <div key={project.id} className="portfolio-card">
                            <Image src={project.image} alt={project.title} className="portfolio-card-image" placeholder="blur" />
                            <div className="portfolio-card-content">
                                <h3 className="title-benefits">{project.title}</h3>
                                <p className="text-benefits">{project.description}</p>
                                <Link href={`/portfolio#${project.id}`} className="portfolio-button">
                                    Ver detalhes
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
                <Link href="/portfolio" className="portfolio-cta">Ver portfólio completo</Link>
            </section>
            <section className='service-offer fade-in-section'>
                <p className='title-section-offer'>Pronto para tirar o seu projeto do papel?</p>
                <p className='subtitle-section-offer'>Vamos cultivar juntos uma solução que transforme o seu negócio.</p>
                <Link href="/solicitacao" className="solicitacao-cta">Iniciar projeto</Link>
            </section>
        </>
    );
}