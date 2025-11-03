import { Html, Head, Main, NextScript } from 'next/document'
import ThemeScript from '../components/ThemeScript';

export default function Document() {
  return (
    <Html lang="pt-BR">
        <Head>
        </Head>
        <body>
            <ThemeScript />
            <Main />
            <NextScript />
        </body>
    </Html>
  )
}