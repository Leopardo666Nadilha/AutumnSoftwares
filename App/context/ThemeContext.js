import { createContext, useState, useContext, useEffect } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  // Efeito para carregar o tema salvo no localStorage e aplicar a classe no HTML
  // Este efeito roda APENAS no navegador, após a primeira renderização.
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme); // Atualiza o estado do React com o tema correto.
  }, []); // O array vazio [] garante que este efeito rode apenas uma vez.

  // Efeito que aplica a classe '.dark' no HTML sempre que o tema muda.
  useEffect(() => {
  const root = document.documentElement;
  root.classList.remove('light', 'dark'); // Limpa classes antigas
  root.classList.add(theme); // Adiciona a classe do tema atual
  }, [theme]);

  // Função para alternar o tema, chamada pelo botão no Header.
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme); // Salva a nova escolha no localStorage.
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);