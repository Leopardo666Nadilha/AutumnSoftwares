import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './PortfolioHighlights.module.css';
import sections from '../styles/shared/sections.module.css';
import typography from '../styles/shared/typography.module.css';

function PortfolioCard({ project, index }) {
    const cardRef = useRef(null);
    const tiltRef = useRef(null);

    // Reveal de entrada (stagger): observa só o card, não interfere no tilt.
    useEffect(() => {
        const node = cardRef.current;
        if (!node) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    node.classList.add(styles.isVisible);
                    observer.unobserve(node);
                }
            },
            { threshold: 0.15 }
        );

        observer.observe(node);
        return () => observer.unobserve(node);
    }, []);

    // Tilt do mouse: roda numa camada própria (tiltRef), com sua própria
    // transição rápida e sem delay — por isso não pode viver no mesmo nó
    // nem na mesma propriedade CSS que a animação de entrada (stagger).
    const handleMouseMove = (event) => {
        const tilt = tiltRef.current;
        if (!tilt) return;

        const rect = tilt.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const rotateX = ((y - rect.height / 2) / rect.height) * -6;
        const rotateY = ((x - rect.width / 2) / rect.width) * 6;

        tilt.style.setProperty('--rotate-x', `${rotateX}deg`);
        tilt.style.setProperty('--rotate-y', `${rotateY}deg`);
    };

    const handleMouseLeave = () => {
        const tilt = tiltRef.current;
        if (!tilt) return;

        tilt.style.setProperty('--rotate-x', '0deg');
        tilt.style.setProperty('--rotate-y', '0deg');
    };

    return (
        <div
            ref={cardRef}
            className={styles.card}
            style={{ '--delay': `${index * 120}ms` }}
        >
            <div
                ref={tiltRef}
                className={styles.tilt}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
            >
                <div className={styles.imageWrapper}>
                    <Image
                        src={project.image}
                        alt={project.title}
                        className={styles.image}
                        placeholder="blur"
                        fill
                        sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
                    />
                    <span className={styles.shine} />
                </div>
                <div className={styles.content}>
                    <h3 className={styles.title}>{project.title}</h3>
                    <p className={styles.description}>{project.description}</p>
                    <Link href={`/portfolio#${project.id}`} className={styles.button}>
                        Ver detalhes <span className={styles.arrow}>→</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default function PortfolioHighlights({ projects }) {
    return (
        <section className={`${sections.nextSection} fade-in-section`}>
            <div>
                <h2 className={typography.titleSectionAbout}>
                    Projetos de <strong className={typography.titleHeader}>Destaque</strong>
                </h2>
                <p className={typography.subtitleSectionAbout}>
                    Estes são alguns dos projetos que cultivamos com dedicação e excelência.
                </p>
            </div>
            <div className={styles.grid}>
                {projects.map((project, index) => (
                    <PortfolioCard key={project.id} project={project} index={index} />
                ))}
            </div>
            <Link href="/portfolio" className={styles.portfolioCta}>Ver portfólio completo</Link>
        </section>
    );
}
