import { useEffect } from 'react';
import ScrollDownIndicator from '../components/ScrollDownIndicator';
import PortfolioHighlights from '../components/PortfolioHighlights';
import Link from 'next/link';
import Image from 'next/image';
import { PiCompass, PiClock, PiCode } from 'react-icons/pi';
import { RiDoubleQuotesR } from 'react-icons/ri';
import mainBg from '../public/main-bg.jpg';
import portfolioPreview2 from '../public/portfolio-preview-2.jpg';
import portfolioPreview3 from '../public/portfolio-preview-3.jpg';
import portfolioPreview4 from '../public/portfolio-preview-4.jpg';

// Dados dos projetos para a prévia
const portfolioData = [
    {
        id: 'MotorTributario',
        title: 'Motor Tributário Autumn',
        description: 'Plataforma para emissão e consulta de notas fiscais já no novo modelo da reforma tributária, com aprovação pela SEFAZ. Conta com um dashboard e ferramentas de gestão aprimoradas para o fluxo e controle tributário.',
        image: portfolioPreview4,
    },
    {
        id: 'PrimeCareAI',
        title: 'Página de pré-lançamento para o PrimeCare.AI',
        description: 'Página criada para promover o pré-lançamento do PrimeCare.AI, um sistema de IA para otimizar documentação clínica e transcrições de áudio. Acesse para ver a solução em funcionamento.',
        image: portfolioPreview3,
    },
    {
        id: 'GremioForcaJovem',
        title: 'Site oficial do Grêmio Força Jovem',
        description: 'Criação de um site para o Grêmio escolar com tema dark e paleta de cores estilo Cyberpunk, com sistema de blog integrado para notícias e eventos, utilizando Next.js e Google Sheets para atualizações fáceis. Inclui medidas anti-spam com HoneyPot.',
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
                    fill
                    quality={75}
                    placeholder="blur"
                    priority
                    style={{ zIndex: 0, objectFit: 'cover' }}
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
            <PortfolioHighlights projects={portfolioData} />
            <section className='service-offer fade-in-section'>
                <p className='title-section-offer'>Pronto para tirar o seu projeto do papel?</p>
                <p className='subtitle-section-offer'>Vamos cultivar juntos uma solução que transforme o seu negócio.</p>
                <Link href="/solicitacao" className="solicitacao-cta">Iniciar projeto</Link>
            </section>
        </>
    );
}