// Controle do botão de tema dark e light mode
import { createContext, useState, useContext, useEffect } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(null); // Estado para armazenar o tema atual

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
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(newTheme);
      localStorage.setItem('theme', newTheme); // Armazena a preferência do usuário para o próximo acesso
      return newTheme;
    });
  };

  if (theme === null) {
    return null;
  }
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext); // Hook personalizado para usar o contexto de tema