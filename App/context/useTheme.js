import { useState, useEffect } from 'react';

export function useTheme() {
  // 1. Inicia o estado com 'light' para garantir que servidor e cliente renderizem a mesma coisa inicialmente.
  const [theme, setTheme] = useState('light');

  // 2. Efeito que roda APENAS no navegador, após a primeira renderização.
  useEffect(() => {
    // Lê o tema salvo no localStorage.
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme); // Atualiza o estado do React com o tema salvo.
  }, []); // O array vazio [] garante que este efeito rode apenas uma vez.

  // 3. Efeito que aplica a classe 'dark' no HTML sempre que o tema muda.
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]); // Roda sempre que o estado 'theme' é alterado.

  // 4. Função para alternar o tema.
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme); // Salva a nova escolha no localStorage
  };

  return [theme, toggleTheme];
}
