import AnimatedMouseIcon from './AnimatedMouseIcon';
import styles from './ScrollDownIndicator.module.css';

// Âncora nativa em vez de react-scroll: o scroll suave já vem do
// "scroll-behavior: smooth" global (styles/globals.css), então a lib
// só adicionava peso ao bundle sem oferecer nada a mais aqui.
const ScrollDownIndicator = () => {
  return (
    <a
      href="#next-section"
      className={styles.scrollDownIndicator}
      aria-label="Rolar para baixo"
    >
      <AnimatedMouseIcon />
    </a>
  );
};

export default ScrollDownIndicator;