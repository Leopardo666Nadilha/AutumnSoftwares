import Head from 'next/head';
import Link from 'next/link';
import ThemeToggleButton from './ThemeToggleButton';
import { FaEnvelope, FaWhatsapp, FaMapMarkerAlt } from 'react-icons/fa';
import { useRouter } from 'next/router';
import styles from './Layout.module.css';
import typography from '../styles/shared/typography.module.css';

const Header = () => {
    const router = useRouter(); // Hook para obter a rota atual

    return (
        <header className={styles.mainHeader}>
            <nav>
                <Link href="/" className={styles.titleFull}><strong className={typography.titleHeader}>Autumn</strong> Softwares</Link>
            </nav>
            <nav className={styles.mainNav}>
                <div className={styles.navLinksGroup}>
                    {/* Adicionamos a classe 'active' condicionalmente */}
                    <Link href="/" className={`${styles.navLink} ${router.pathname === '/' ? styles.active : ''}`}>Início</Link>
                    <Link href="/sobre" className={`${styles.navLink} ${router.pathname === '/sobre' ? styles.active : ''}`}>Sobre</Link>
                    <Link href="/portfolio" className={`${styles.navLink} ${router.pathname === '/portfolio' ? styles.active : ''}`}>Portfólio</Link>
                </div>
                <div className={styles.navActionsGroup}>
                    <Link href="/solicitacao" className={styles.ctaLink}>Solicitar Projeto</Link>
                    <ThemeToggleButton />
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
                        <li><a href="https://wa.me/5547991739602" target="_blank" rel="noopener noreferrer"><FaWhatsapp /> (47) 99173-9602</a></li>
                        <li><a href="mailto:softwares.autumn@gmail.com"><FaEnvelope /> softwares.autumn@gmail.com</a></li>
                        <li><a href="https://maps.google.com/?q=Papanduva/SC" target="_blank" rel="noopener noreferrer"><FaMapMarkerAlt /> Papanduva/SC - Brasil</a></li>
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
                <title>Autumn Softwares</title>
                <meta name="description" content="Portfólio de projetos da Autumn Softwares" />
                <link rel="icon" href="/icon.svg"/>
            </Head>
            <Header />
            <main>{children}</main>
            <Footer />
        </>
    );
}