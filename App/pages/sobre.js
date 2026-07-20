import Image from 'next/image';
import Head from 'next/head';
import aboutBg from '../public/about-bg.jpg';
import { PiHandshake, PiChatCircleDots, PiCrosshair } from 'react-icons/pi';
import { useEffect } from 'react';
import styles from '../styles/Sobre.module.css';
import sections from '../styles/shared/sections.module.css';
import typography from '../styles/shared/typography.module.css';
import { SITE_URL } from '../lib/siteConfig';

export default function AboutPage() {
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

        const fadeSections = document.querySelectorAll('.fade-in-section');
        fadeSections.forEach(section => observer.observe(section));

        return () => fadeSections.forEach(section => observer.unobserve(section));
    }, []);
    return (
        <div className={styles.aboutPageContent}>
            <Head>
                <title>Sobre nós | Autumn Softwares</title>
                <meta name="description" content="Conheça a Autumn Softwares: parceria real, transparência contínua e foco no valor entregue ao seu negócio." />
                <meta property="og:title" content="Sobre a Autumn Softwares" />
                <meta property="og:description" content="Nossa filosofia não é apenas entregar código, mas cultivar uma parceria estratégica com o seu negócio." />
                <meta property="og:url" content={`${SITE_URL}/sobre`} />
                <link rel="canonical" href={`${SITE_URL}/sobre`} />
            </Head>
            <section className={`${styles.aboutIntroSection} fade-in-section`}>
                <div className={styles.aboutTextBlock}>
                    <h1 className={typography.titleSectionAbout}>Amadurecendo ideias desde <strong className={typography.titleHeader}>2025</strong></h1>
                    <p className={typography.subtitleSectionAbout}>Nossa filosofia não é apenas entregar código, mas cultivar uma parceria estratégica para entender o problema a fundo.</p>
                </div>
                <div className={styles.aboutImageContainer}>
                    <Image
                        src={aboutBg}
                        alt="Colegas de trabalho discutindo um projeto em um ambiente casual"
                        placeholder="blur"
                        className={styles.aboutImage}
                    />
                    <div className={styles.aboutImageOverlay}></div>
                </div>
            </section>

            {/* Seção de benefícios/valores reutilizada da página inicial */}
            <section className={`${sections.benefitsContainer} ${styles.aboutBenefits} fade-in-section`}>
                <div className={sections.benefitItem}>
                    <PiHandshake className={sections.benefitIcon} aria-hidden="true" />
                    <h3 className={sections.titleBenefits}>Parceria Real</h3>
                    <p className={sections.textBenefits}>Não somos apenas fornecedores; somos uma extensão da sua equipe. Trabalhamos lado a lado para garantir que a solução reflita sua visão e cultura.</p>
                </div>
                <div className={sections.benefitItem}>
                    <PiChatCircleDots className={sections.benefitIcon} aria-hidden="true" />
                    <h3 className={sections.titleBenefits}>Transparência Contínua</h3>
                    <p className={sections.textBenefits}>Comunicação clara e ciclos de feedback abertos. Você sempre sabe o que está acontecendo e tem visibilidade total do progresso, sem surpresas.</p>
                </div>
                <div className={sections.benefitItem}>
                    <PiCrosshair className={sections.benefitIcon} aria-hidden="true" />
                    <h3 className={sections.titleBenefits}>Foco no Valor</h3>
                    <p className={sections.textBenefits}>Mais do que código, entregamos o resultado que seu negócio precisa. Nosso sucesso é medido pelo impacto real e positivo que o software traz para sua operação.</p>
                </div>
            </section>
            <section className={`${styles.historySection} fade-in-section`}>
                <h2 className={typography.titleSectionAbout}>Nossa <strong className={typography.titleHeader}>Jornada</strong></h2>
                <div className={styles.historyTextContainer}>
                    <p className={`${typography.subtitleSectionAbout} ${styles.historyParagraph}`} style={{ textAlign: 'left' }}>Mais do que uma empresa, a Autumn Softwares é a materialização de uma paixão.</p>
                    <p className={`${typography.subtitleSectionAbout} ${styles.historyParagraph}`}>Nossa história não começa oficialmente em 2025, mas sim no entusiasmo do primeiro contato com um computador, no fascínio de ver linhas de código se transformarem em ferramentas funcionais e na busca incessante por entender como a tecnologia poderia resolver problemas reais.</p>
                    <p className={`${typography.subtitleSectionAbout} ${styles.historyParagraph}`}>Essa fascinação evoluiu. Percebemos que, no mercado atual, muitas empresas enfrentam desafios complexos que soluções prontas simplesmente não conseguem resolver. Elas não precisam apenas de código; elas precisam de parceiros estratégicos.</p>
                    <p className={`${typography.subtitleSectionAbout} ${styles.historyParagraph}`} style={{ textAlign: 'left' }}>A Autumn Softwares nasceu em 2025 exatamente para preencher essa lacuna.</p>
                    <p className={`${typography.subtitleSectionAbout} ${styles.historyParagraph}`}>Fundamos esta empresa para unir esse entusiasmo pela inovação tecnológica com a disciplina de um processo focado em resultados. Vemos o fato de sermos novos como nossa maior força: não estamos presos a métodos antigos. Nascemos ágeis, modernos e com um foco absoluto em ouvir, entender e arquitetar a solução exata que o seu negócio precisa para amadurecer e prosperar.</p>
                </div>
            </section>
        </div>
    );
}