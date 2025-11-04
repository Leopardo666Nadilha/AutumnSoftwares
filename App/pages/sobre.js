import Image from 'next/image';
import aboutBg from '../public/about-bg.jpg';
import { PiHandshake, PiChatCircleDots, PiCrosshair } from 'react-icons/pi';
import { useEffect } from 'react';

export default function AboutPage() {
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });

        const sections = document.querySelectorAll('.fade-in-section');
        sections.forEach(section => observer.observe(section));

        return () => sections.forEach(section => observer.unobserve(section));
    }, []);
    return (
        <div className="about-page-content">
            <section className="about-intro-section fade-in-section">
                <div className="about-text-block">
                    <h2 className='title-section-about'>Amadurecendo ideias desde <strong className='title-header'>2025</strong></h2>
                    <p className='subtitle-section-about'>Nossa filosofia não é apenas entregar código, mas cultivar uma parceria estratégica para entender o problema a fundo.</p>
                </div>
                <div className="about-image-container">
                    <Image
                        src={aboutBg}
                        alt="Colegas de trabalho discutindo um projeto em um ambiente casual"
                        placeholder="blur"
                        className="about-image"
                    />
                    <div className="about-image-overlay"></div>
                </div>
            </section>

            {/* Seção de benefícios/valores reutilizada da página inicial */}
            <section className="benefits-container about-benefits fade-in-section">
                <div className="benefit-item">
                    <PiHandshake className="benefit-icon" />
                    <h3 className="title-benefits">Parceria Real</h3>
                    <p className="text-benefits">Não somos apenas fornecedores; somos uma extensão da sua equipe. Trabalhamos lado a lado para garantir que a solução reflita sua visão e cultura.</p>
                </div>
                <div className="benefit-item">
                    <PiChatCircleDots className="benefit-icon" />
                    <h3 className="title-benefits">Transparência Contínua</h3>
                    <p className="text-benefits">Comunicação clara e ciclos de feedback abertos. Você sempre sabe o que está acontecendo e tem visibilidade total do progresso, sem surpresas.</p>
                </div>
                <div className="benefit-item">
                    <PiCrosshair className="benefit-icon" />
                    <h3 className="title-benefits">Foco no Valor</h3>
                    <p className="text-benefits">Mais do que código, entregamos o resultado que seu negócio precisa. Nosso sucesso é medido pelo impacto real e positivo que o software traz para sua operação.</p>
                </div>
            </section>
            <section className='history-section fade-in-section'>
                <h2 className='title-section-about'>Nossa <strong className='title-header'>Jornada</strong></h2>
                <div className='history-text-container'>
                    <p className='subtitle-section-about history-paragraph' style={{ textAlign: 'left' }}>Mais do que uma empresa, a Autumn Softwares é a materialização de uma paixão.</p>
                    <p className='subtitle-section-about history-paragraph'>Nossa história não começa oficialmente em 2025, mas sim no entusiasmo do primeiro contato com um computador, no fascínio de ver linhas de código se transformarem em ferramentas funcionais e na busca incessante por entender como a tecnologia poderia resolver problemas reais.</p>
                    <p className='subtitle-section-about history-paragraph'>Essa fascinação evoluiu. Percebemos que, no mercado atual, muitas empresas enfrentam desafios complexos que soluções prontas simplesmente não conseguem resolver. Elas não precisam apenas de código; elas precisam de parceiros estratégicos.</p>
                    <p className='subtitle-section-about history-paragraph' style={{ textAlign: 'left' }}>A Autumn Softwares nasceu em 2025 exatamente para preencher essa lacuna.</p>
                    <p className='subtitle-section-about history-paragraph'>Fundamos esta empresa para unir esse entusiasmo pela inovação tecnológica com a disciplina de um processo focado em resultados. Vemos o fato de sermos novos como nossa maior força: não estamos presos a métodos antigos. Nascemos ágeis, modernos e com um foco absoluto em ouvir, entender e arquitetar a solução exata que o seu negócio precisa para amadurecer e prosperar.</p>
                </div>
            </section>
        </div>
    );
}