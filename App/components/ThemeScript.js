import Script from 'next/script';

// Este script é injetado diretamente no HTML para evitar o "flicker" do tema.
// Ele roda antes do React carregar.
const ThemeScript = () => {
  const script = `
    const savedTheme = window.localStorage.getItem('theme') || 'dark';
    document.documentElement.classList.add(savedTheme);
  `.trim();

  return (
    <Script id="theme-switcher" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: script }} />
  );
};

export default ThemeScript;