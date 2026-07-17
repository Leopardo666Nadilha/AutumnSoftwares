import styles from './AnimatedMouseIcon.module.css';

const AnimatedMouseIcon = () => {
  return (
    <div className={styles.mouseIcon}>
      <div className={styles.mouseScrollWheel}></div>
    </div>
  );
};

export default AnimatedMouseIcon;