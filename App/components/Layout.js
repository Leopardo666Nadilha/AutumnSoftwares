import Head from 'next/head';
import Link from 'next/link';
import ThemeToggleButton from './ThemeToggleButton';
import { FaEnvelope, FaWhatsapp, FaMapMarkerAlt } from 'react-icons/fa';
import { useRouter } from 'next/router';
import styles from './Layout.module.css';
import typography from '../styles/shared/typography.module.css';
import { SITE_NAME, DEFAULT_OG_IMAGE, STRUCTURED_DATA } from '../lib/siteConfig';

const NAV_LINKS = [
    { href: '/', label: 'Início' },
    { href: '/sobre', label: 'Sobre' },
    { href: '/portfolio', label: 'Portfólio' },
];

const Header = () => {
    const router = useRouter(); // Hook para obter a rota atual

    return (
        <header className={styles.mainHeader}>
            <nav className={styles.brandRow}>
                <Link href="/" className={styles.titleFull}><strong className={typography.titleHeader}>Autumn</strong> Softwares</Link>
                {/* Só aparece abaixo de 480px — sobe pro lado do título pra
                    sobrar espaço e o resto do nav caber numa linha só. */}
                <span className={styles.mobileThemeToggle}>
                    <ThemeToggleButton />
                </span>
            </nav>
            <nav className={styles.mainNav}>
                <div className={styles.navLinksGroup}>
                    {NAV_LINKS.map(({ href, label }) => {
                        const isActive = router.pathname === href;
                        return (
                            <Link
                                key={href}
                                href={href}
                                className={`${styles.navLink} ${isActive ? styles.active : ''}`}
                                aria-current={isActive ? 'page' : undefined}
                            >
                                {label}
                            </Link>
                        );
                    })}
                </div>
                <div className={styles.navActionsGroup}>
                    <Link href="/solicitacao" className={styles.ctaLink}>Solicitar Projeto</Link>
                    <span className={styles.desktopThemeToggle}>
                        <ThemeToggleButton />
                    </span>
                </div>
            </nav>
        </header>
    );
};

const Footer = () => {
    return (
        <footer className={styles.mainFooter}>
            <div className={styles.footerContainer}>
                <div className={styles.footerColumn}>
                    <Link href="/" className={styles.titleFull}><strong className={styles.footerBrandHeader}>Autumn</strong> Softwares</Link>
                    <p id='footer_text'>Amadurecendo ideias em software sob demanda. Transformamos seus desafios de negócio em soluções digitais robustas.</p>
                </div>

                <div className={styles.footerColumn}>
                    <h3 className={styles.footerHeading}>Links Rápidos</h3>
                    <ul className={styles.footerLinks}>
                        <li><Link href="/">Início</Link></li>
                        <li><Link href="/sobre">Sobre nós</Link></li>
                        <li><Link href="/portfolio">Portfólio</Link></li>
                        <li><Link href="/solicitacao">Solicitar Projeto</Link></li>
                    </ul>
                </div>

                <div className={styles.footerColumn}>
                    <h3 className={styles.footerHeading}>Contato</h3>
                    <ul className={styles.footerContact}>
                        <li><a href="https://wa.me/5547991739602" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp: (47) 99173-9602 (abre em nova guia)"><FaWhatsapp aria-hidden="true" /> (47) 99173-9602</a></li>
                        <li><a href="mailto:softwares.autumn@gmail.com"><FaEnvelope aria-hidden="true" /> softwares.autumn@gmail.com</a></li>
                        <li><a href="https://maps.google.com/?q=Papanduva/SC" target="_blank" rel="noopener noreferrer" aria-label="Ver localização no mapa (abre em nova guia)"><FaMapMarkerAlt aria-hidden="true" /> Papanduva/SC - Brasil</a></li>
                    </ul>
                </div>
            </div>
            <p className={styles.copyright}>© {new Date().getFullYear()} Autumn Softwares. Todos os direitos reservados.</p>
        </footer>
    );
};

export default function Layout({ children }) {
    return (
        <>
            <Head>
                {/* Defaults — cada página sobrescreve title/description/og:*
                    com o próprio <Head> (o último valor declarado na árvore
                    vence, e o <Head> da página vem depois deste, dentro de
                    {children}). */}
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="theme-color" content="#D95F43" />
                <title>Autumn Softwares</title>
                <meta name="description" content="Portfólio de projetos da Autumn Softwares" />
                <meta property="og:site_name" content={SITE_NAME} />
                <meta property="og:type" content="website" />
                <meta property="og:locale" content="pt_BR" />
                <meta property="og:image" content={DEFAULT_OG_IMAGE} />
                <meta name="twitter:card" content="summary_large_image" />
                <link rel="icon" href="/favicon.ico" sizes="48x48" />
                <link rel="icon" href="/icon.svg" type="image/svg+xml" />
                <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
                <script
                    key="structured-data"
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA) }}
                />
            </Head>
            {/* Link de pular navegação — só fica visível ao receber foco
                (teclado/leitor de tela); ver .skipLink em Layout.module.css */}
            <a href="#main-content" className={styles.skipLink}>Pular para o conteúdo</a>
            <Header />
            <main id="main-content">{children}</main>
            <Footer />
        </>
    );
}