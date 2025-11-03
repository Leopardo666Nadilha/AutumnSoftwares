import Head from 'next/head';
import Link from 'next/link';
import ThemeToggleButton from './ThemeToggleButton';
import { FaEnvelope, FaWhatsapp, FaMapMarkerAlt } from 'react-icons/fa';
import { useRouter } from 'next/router';

const Header = () => {
    const router = useRouter(); // Hook para obter a rota atual

    return (
        <header className="main-header">
            <nav>
                <Link href="/" className='title-full'><strong className='title-header'>Autumn</strong> Softwares</Link>
            </nav>
            <nav className="main-nav" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div className="nav-links-group">
                    {/* Adicionamos a classe 'nav-link' e a classe 'active' condicionalmente */}
                    <Link href="/" className={`nav-link ${router.pathname === '/' ? 'active' : ''}`}>Início</Link>
                    <Link href="/sobre" className={`nav-link ${router.pathname === '/sobre' ? 'active' : ''}`}>Sobre</Link>
                    <Link href="/portfolio" className={`nav-link ${router.pathname === '/portfolio' ? 'active' : ''}`}>Portfólio</Link>
                </div>
                <div className="nav-actions-group">
                    <Link href="/solicitacao" className="cta-link">Solicitar Projeto</Link>
                    <ThemeToggleButton />
                </div>
            </nav>
        </header>
    );
};

const Footer = () => {
    return (
        <footer className="main-footer">
            <div className="footer-container">
                <div className="footer-column">
                    <Link href="/" className='title-full'><strong className='title-header'>Autumn</strong> Softwares</Link>
                    <p id='footer_text'>Amadurecendo ideias em software sob demanda. Transformamos seus desafios de negócio em soluções digitais robustas.</p>
                </div>

                <div className="footer-column">
                    <h3 className="footer-heading">Links Rápidos</h3>
                    <ul className="footer-links">
                        <li><Link href="/">Início</Link></li>
                        <li><Link href="/sobre">Sobre nós</Link></li>
                        <li><Link href="/portfolio">Portfólio</Link></li>
                        <li><Link href="/solicitacao">Solicitar Projeto</Link></li>
                    </ul>
                </div>

                <div className="footer-column">
                    <h3 className="footer-heading">Contato</h3>
                    <ul className="footer-contact">
                        <li><a href="https://wa.me/5547991739602" target="_blank" rel="noopener noreferrer"><FaWhatsapp /> (47) 99173-9602</a></li>
                        <li><a href="mailto:contato@autumnsoftwares.com"><FaEnvelope /> contato@autumnsoftwares.com</a></li>
                        <li><a href="https://maps.google.com/?q=Papanduva/SC" target="_blank" rel="noopener noreferrer"><FaMapMarkerAlt /> Papanduva/SC - Brasil</a></li>
                    </ul>
                </div>
            </div>
            <p className="copyright">© {new Date().getFullYear()} Autumn Softwares. Todos os direitos reservados.</p>
        </footer>
    );
};

export default function Layout({ children }) {
    return (
        <>
            <Head>
                <title>Autumn Softwares</title>
                <meta name="description" content="Portfólio de projetos da Autumn Softwares" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <main>{children}</main>
            <Footer />
        </>
    );
}