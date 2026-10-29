import '../styles/globals.css';
import Layout from '../components/Layout';
import ThemeScript from '../components/ThemeScript';
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"
import { ThemeProvider } from '../context/ThemeContext';
import { Inter, Merriweather } from 'next/font/google';

// Configuração da fonte para o corpo do texto
// As variáveis CSS são definidas no <style jsx global> abaixo.
const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
});

// Configuração da fonte para os títulos
// Só o peso 400 é usado: o reset do globals.css faz os títulos herdarem o
// peso do body. O itálico aparece nas citações da Home (.compromiseItem).
const merriweather = Merriweather({
    subsets: ['latin'],
    weight: ['400'],
    style: ['normal', 'italic'],
    display: 'swap',
});

function MyApp({ Component, pageProps }) {
    return (
        <>
            <ThemeScript />
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