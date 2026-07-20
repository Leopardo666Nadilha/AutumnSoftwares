import { useEffect } from 'react';
import Head from 'next/head';
import ScrollDownIndicator from '../components/ScrollDownIndicator';
import PortfolioHighlights from '../components/PortfolioHighlights';
import Link from 'next/link';
import Image from 'next/image';
import { PiCompass, PiClock, PiCode } from 'react-icons/pi';
import { RiDoubleQuotesR } from 'react-icons/ri';
import styles from '../styles/Home.module.css';
import sections from '../styles/shared/sections.module.css';
import typography from '../styles/shared/typography.module.css';
import { SITE_URL } from '../lib/siteConfig';
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

        const fadeSections = document.querySelectorAll('.fade-in-section');
        fadeSections.forEach(section => observer.observe(section));

        // Limpeza ao desmontar o componente
        return () => fadeSections.forEach(section => observer.unobserve(section));
    }, []);

    return (
        <>
            <Head>
                <title>Autumn Softwares | Software sob medida, do zero à entrega</title>
                <meta name="description" content="Desenvolvimento de software sob demanda: aplicações web, mobile e automações personalizadas, com processo transparente do início ao fim." />
                <meta property="og:title" content="Autumn Softwares | Software sob medida" />
                <meta property="og:description" content="Transformamos ideias em soluções digitais robustas e personalizadas." />
                <meta property="og:url" content={SITE_URL} />
                <link rel="canonical" href={SITE_URL} />
            </Head>
            {/*Seção que terá a imagem de fundo */}
            <section className={styles.heroSection}>
                <Image
                    src={mainBg}
                    alt="Folhas de outono em primeiro plano com um prédio moderno ao fundo"
                    fill
                    sizes="100vw"
                    quality={75}
                    placeholder="blur"
                    priority
                    style={{ zIndex: 0, objectFit: 'cover' }}
                />
                <div className={styles.heroOverlay}></div>
                <div className={styles.heroContent} style={{ zIndex: 1 }}>
                    <h1>Suas ideias <strong className={styles.destaqueTitle}>amadurecidas</strong> em software.</h1>
                    <p>Transformando ideias em soluções digitais robustas e personalizadas.</p>
                    <div className={styles.heroButtons}>
                        <Link href="/solicitacao" className={styles.heroCtaPrimary}>Solicitar Projeto</Link>
                        <Link href="/portfolio" className={styles.heroCtaSecondary}>Conheça nosso Portfólio</Link>
                    </div>
                </div>
                <ScrollDownIndicator />
            </section>

            {/* Seção de destino para a rolagem */}
            <section id="next-section" className={`${sections.nextSection} fade-in-section`}>
                <div><h2 className={typography.titleSectionAbout}>A precisão do <strong className={typography.titleHeader}>Software sob demanda</strong></h2>
                <p className={typography.subtitleSectionAbout}>
                    Nosso processo é focado em transparência, excelência técnica e resultados reais.
                </p>
                </div>
                <div className={sections.benefitsContainer}>
                    <div className={sections.benefitItem}>
                        <PiCompass className={sections.benefitIcon} aria-hidden="true" />
                        <h3 className={sections.titleBenefits}>Maturidade técnica</h3>
                        <p className={sections.textBenefits}>Antes da primeira linha de código, mergulhamos no seu negócio. Entendemos seu desafio para desenhar a arquitetura exata que sua operação precisa.</p>
                    </div>
                    <div className={sections.benefitItem}>
                        <PiClock className={sections.benefitIcon} aria-hidden="true" />
                        <h3 className={sections.titleBenefits}>Entrega pontual</h3>
                        <p className={sections.textBenefits}>Prazos definidos e cumpridos. Como os ciclos do outono, nossas entregas são previsíveis e transparentes.</p>
                    </div>
                    <div className={sections.benefitItem}>
                        <PiCode className={sections.benefitIcon} aria-hidden="true" />
                        <h3 className={sections.titleBenefits}>Código limpo</h3>
                        <p className={sections.textBenefits}>Cada linha de código é escrita pensando em manutenibilidade e performance a longo prazo.</p>
                    </div>
                </div>
            </section>
            <section className={`${styles.compromiseContainer} fade-in-section`}>
                <div>
                    <h2 className={styles.titleSectionCompromise}>Como <strong className={styles.titleCompromise}>cultivamos</strong> seu software</h2>
                </div>
                <div className={styles.compromiseBanner}>
                    <div className={styles.compromiseCard}>
                        <RiDoubleQuotesR className={styles.compromiseQuoteIcon} aria-hidden="true" />
                        <h3 className={styles.compromiseItem}>"Iniciamos com uma imersão profunda no seu desafio. Não pulamos para o código antes de mapear a estratégia e a arquitetura ideal para o seu sucesso."</h3>
                        <p className={styles.compromisePhase}>Fase 1: Estratégia e Descoberta</p>
                        <p className={styles.compromiseDescription}>O alicerce de todo projeto.</p>
                    </div>
                    <div className={styles.compromiseCard}>
                        <RiDoubleQuotesR className={styles.compromiseQuoteIcon} aria-hidden="true" />
                        <h3 className={styles.compromiseItem}>"Desenvolvimento ágil com ciclos curtos e entregas previsíveis. Você vê o progresso, valida as etapas e tem total visibilidade do produto do início ao fim."</h3>
                        <p className={styles.compromisePhase}>Fase 2: Desenvolvimento e Colaboração</p>
                        <p className={styles.compromiseDescription}>Transparência e qualidade em primeiro lugar.</p>
                    </div>
                </div>
            </section>
            <PortfolioHighlights projects={portfolioData} />
            <section className={`${styles.serviceOffer} fade-in-section`}>
                <h2 className={styles.titleSectionOffer}>Pronto para tirar o seu projeto do papel?</h2>
                <p className={styles.subtitleSectionOffer}>Vamos cultivar juntos uma solução que transforme o seu negócio.</p>
                <Link href="/solicitacao" className={styles.solicitacaoCta}>Iniciar projeto</Link>
            </section>
        </>
    );
}