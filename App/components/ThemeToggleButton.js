import { useTheme } from '../context/ThemeContext';
import { BsSun, BsMoon } from 'react-icons/bs';

const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useTheme(); // Usando o hook personalizado para obter o tema e a função de alternância

  return (
    <button onClick={toggleTheme} className="theme-toggle-button" aria-label="Alternar tema">
      {theme === 'light' ? <BsMoon /> : <BsSun />}
    </button>
  );
};

export default ThemeToggleButton;