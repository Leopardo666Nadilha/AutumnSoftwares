import { createContext, useState, useContext, useEffect } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  // Sincroniza o estado do React com o tema que o ThemeScript já aplicou no
  // <html> antes da hidratação. Lemos a classe em vez do localStorage para não
  // remover o 'dark' no primeiro render (o que causava uma piscada do tema claro).
  useEffect(() => {
    if (document.documentElement.classList.contains('dark')) {
      setTheme('dark');
    }
  }, []); // O array vazio [] garante que este efeito rode apenas uma vez.

  // Função para alternar o tema, chamada pelo botão no Header.
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    const root = document.documentElement;
    root.classList.remove('light', 'dark'); // Limpa classes antigas
    root.classList.add(newTheme); // Adiciona a classe do tema atual
    setTheme(newTheme);
    try {
      localStorage.setItem('theme', newTheme); // Salva a nova escolha no localStorage.
    } catch {
      // localStorage indisponível (ex.: navegação privada); o tema vale só para esta visita.
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
