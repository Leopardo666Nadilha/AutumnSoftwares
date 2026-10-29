import { useEffect } from 'react';

// Anima as seções com a classe global "fade-in-section": adiciona "is-visible"
// quando 10% da seção entra na tela (estilos em styles/globals.css).
export default function useFadeIn() {
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target); // A animação acontece apenas uma vez
                }
            });
        }, {
            threshold: 0.1 // A animação começa quando 10% do elemento está visível
        });

        const fadeSections = document.querySelectorAll('.fade-in-section');
        fadeSections.forEach(section => observer.observe(section));

        // Limpeza ao desmontar o componente
        return () => observer.disconnect();
    }, []);
}
