import Script from 'next/script';

// Este script será injetado no <head> e rodará antes do React.
const themeScript = `
  (function() {
    try {
      var theme = localStorage.getItem('theme');
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      }
    } catch (e) {
      console.error('Could not set theme from localStorage', e);
    }
  })();
`;

const ThemeScript = () => {
  return (
    // Usamos a estratégia 'beforeInteractive' para garantir que o script rode o mais cedo possível.
    <Script id="theme-switcher" strategy="beforeInteractive">
      {themeScript}
    </Script>
  );
};

export default ThemeScript;
