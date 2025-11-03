import { Link } from 'react-scroll';
import AnimatedMouseIcon from './AnimatedMouseIcon';

const ScrollDownIndicator = () => {
  return (
    <Link
      to="next-section" // ID da seção para a qual vamos rolar
      smooth={true}
      duration={500}
      className="scroll-down-indicator"
      aria-label="Rolar para baixo"
    >
      <AnimatedMouseIcon />
    </Link>
  );
};

export default ScrollDownIndicator;