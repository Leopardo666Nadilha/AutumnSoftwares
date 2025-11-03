import '../styles/globals.css';
import Layout from '../components/Layout';
import { ThemeProvider } from '../context/ThemeContext';
import { Inter, Merriweather } from 'next/font/google';

// Configuração da fonte para o corpo do texto
const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-family-body', // Define a variável CSS
});

// Configuração da fonte para os títulos
const merriweather = Merriweather({
    subsets: ['latin'],
    weight: ['300', '400', '700', '900'],
    style: ['normal', 'italic'],
    display: 'swap',
    variable: '--font-family-headings', // Define a variável CSS
});

function MyApp({ Component, pageProps }) {
    return (
        <>
            <style jsx global>{`
                :root {
                    --font-family-body: ${inter.style.fontFamily};
                    --font-family-headings: ${merriweather.style.fontFamily};
                }
            `}
            </style>
            <ThemeProvider>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </ThemeProvider>
        </>
    );
}

export default MyApp;