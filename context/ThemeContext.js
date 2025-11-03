import { createContext, useState, useContext, useEffect } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(null); // Estado para armazenar o tema atual

  // Efeito para carregar o tema salvo no localStorage e aplicar a classe no HTML
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const root = document.documentElement;
      const initialTheme = root.classList.contains('dark') ? 'dark' : 'light';
      setTheme(initialTheme);
    }
  }, []);

  // Função para alternar o tema
  const toggleTheme = () => {
      setTheme(prevTheme => {
        const newTheme = prevTheme === 'light' ? 'dark' : 'light';

        // 1. Faça a mudança visual (A parte principal do INP)
        document.documentElement.classList.remove('light', 'dark');
        document.documentElement.classList.add(newTheme); 

        // 2. ADIE a escrita em disco para o próximo "tick" do navegador.
        setTimeout(() => {
          localStorage.setItem('theme', newTheme);
        }, 0);

        return newTheme;
      });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);