import '../styles/globals.css';
import Layout from '../components/Layout';
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"
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
                    <Analytics />
                    <SpeedInsights />
                </Layout>
            </ThemeProvider>
        </>
    );
}

export default MyApp;