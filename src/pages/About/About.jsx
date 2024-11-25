import fellipeCastro from "../../assets/fellipe-castro.png";
import antonyHaro from "../../assets/antony-haro.png";
import about from "../../assets/about-illustration.svg";

import styles from "./About.module.css";

function About() {
    return (
        <div className={styles.aboutContainer}>
            <section id={styles.aboutUs}>
                <div className={styles.textContainer}>
                    <h2>Sobre nós</h2>
                    <p>
                        Bem-vindo ao SolarMates, o simulador que conecta você ao
                        futuro da energia sustentável! Nosso objetivo é claro:
                        facilitar a compreensão, o acesso e a adesão à energia
                        solar, mostrando como essa tecnologia pode beneficiar
                        não apenas o meio ambiente, mas também o seu bolso.
                    </p>
                    <p>
                        Em um mundo onde sustentabilidade é cada vez mais
                        urgente, acreditamos que todos merecem acesso a
                        ferramentas simples e poderosas que desmistifiquem as
                        escolhas sobre fontes de energia. É por isso que criamos
                        o SolarMates, um simulador desenvolvido para ser
                        intuitivo, eficiente e acessível a todos,
                        independentemente de conhecimento técnico.
                    </p>
                    <p>
                        No SolarMates, nossa missão é democratizar o acesso à
                        tecnologia e colocar o poder da decisão nas suas mãos.
                        Sabemos que a transição para a energia solar pode
                        parecer complicada, cheia de cálculos e incertezas, mas
                        estamos aqui para mudar isso. Nosso simulador permite
                        que você compare facilmente os benefícios da energia
                        solar com outras fontes, como a hidrelétrica, analisando
                        fatores como custo inicial, economia ao longo do tempo,
                        manutenção e retorno sobre o investimento (ROI).
                    </p>
                    <p>
                        Com uma interface amigável e baseada em dados
                        confiáveis, o SolarMates ajuda você a visualizar o
                        impacto financeiro e ambiental de suas escolhas. Quer
                        saber quanto você economizaria com energia solar? Em
                        quanto tempo seu investimento se pagaria? Ou qual é a
                        melhor alternativa para o seu consumo? Nós respondemos a
                        essas perguntas com clareza e transparência.
                    </p>
                </div>

                <img src={about} alt="Ilustração sobre nós" />
            </section>

            <section>
                <h2>Nossa Visão</h2>
                <p>
                    Acreditamos em um mundo onde a tecnologia não é um
                    obstáculo, mas um facilitador. Onde cada pessoa tem a
                    oportunidade de fazer escolhas informadas e conscientes. Por
                    isso, o SolarMates foi criado com um propósito maior:
                    empoderar pessoas a tomarem decisões que gerem impacto
                    positivo para si mesmas e para o planeta.
                </p>
            </section>

            <section>
                <h2>Por Que Escolher o SolarMates?</h2>
                <ul>
                    <li>
                        <h3>Facilidade de Uso:</h3>{" "}
                        <p>
                            Desenvolvemos uma plataforma intuitiva que qualquer
                            pessoa pode usar. Sem complicações, sem barreiras
                            técnicas.
                        </p>
                    </li>
                    <li>
                        <h3>Transparência:</h3>{" "}
                        <p>
                            Nossos cálculos são baseados em dados reais e
                            atualizados, para que você tenha confiança nas
                            informações apresentadas.
                        </p>
                    </li>
                    <li>
                        <h3>Democratização da Tecnologia:</h3>
                        <p>
                            Tornamos acessível o que antes era restrito a
                            especialistas, ajudando você a explorar os
                            benefícios da energia solar de forma simples e
                            prática.
                        </p>
                    </li>
                    <li>
                        <h3>Sustentabilidade:</h3>{" "}
                        <p>
                            Ao incentivar a adoção de fontes renováveis,
                            contribuímos para um futuro mais verde e sustentável
                            para todos. Faça Parte da Revolução Solar
                        </p>
                    </li>
                </ul>
                <p>
                    No SolarMates, acreditamos que cada pequena escolha faz uma
                    grande diferença. Escolher energia solar é mais do que
                    economia: é investir no futuro, cuidar do meio ambiente e
                    fazer parte de uma revolução energética que beneficia
                    gerações.
                </p>
                <p>
                    Deixe o SolarMates simplificar sua jornada rumo à energia
                    limpa. Teste nosso simulador e descubra como você pode
                    transformar sua relação com a energia de maneira inteligente
                    e sustentável. Juntos, podemos construir um mundo melhor,
                    com mais economia, inovação e respeito ao planeta. 🌱☀️
                </p>
            </section>

            <section>
                <h2>Conheça nossa Equipe</h2>
                <div className={styles.collaboratorsContainer}>
                    <div className={styles.collaborator}>
                        <img src={antonyHaro} alt="Antony Haro" />
                        <div className={styles.textContainer}>
                            <h3>Antony Haro</h3>
                            <p>
                                Olá! Me chamo Antony Haro, sou um profissional
                                de tecnologia com ampla experiência na entrega
                                de soluções personalizadas e escaláveis,
                                utilizando tecnologias de ponta para impulsionar
                                o sucesso de negócios. Com expertise em
                                plataformas empresariais como Odoo, CRM e
                                ferramentas de gestão, sou altamente capacitado
                                em integração de sistemas e no desenvolvimento
                                de aplicações com diversas tecnologias. Minha
                                atuação inclui o gerenciamento e otimização de
                                fluxos de trabalho, com uma abordagem orientada
                                para resultados e melhoria contínua. Atualmente,
                                estou direcionado ao desenvolvimento de
                                plataformas com foco na criação de valor
                                sustentável por meio da inovação tecnológica.
                                Meu compromisso com a excelência técnica e a
                                transformação digital guia cada projeto em que
                                me envolvo.
                            </p>
                        </div>
                    </div>
                    <hr />
                    <div className={styles.collaborator}>
                        <div className={styles.textContainer}>
                            <h3>Fellipe Castro</h3>
                            <p>
                                Me chamo Fellipe da Silva Castro, tenho 16 anos
                                e estou cursando o curso técnico em informática
                                para internet na ETEC. Há um ano, entrei no
                                mundo da programação e, atualmente, atuo como
                                desenvolvedor full stack, com foco no front-end
                                usando React.js e no back-end com Node.js e
                                MySQL. Além dos estudos técnicos, estou
                                aprimorando meu inglês no CNA, alcançando um
                                nível intermediário. Sou apaixonado pela
                                resolução de problemas e pela colaboração com
                                outros entusiastas de tecnologia. Acredito que a
                                inovação surge da troca de ideias e da busca
                                constante por novos conhecimentos. Estou
                                entusiasmado em continuar explorando o mundo da
                                programação e contribuir com soluções criativas
                                e impactantes.
                            </p>
                        </div>
                        <img src={fellipeCastro} alt="Fellipe Castro" />
                    </div>
                </div>
            </section>
        </div>
    );
}

export default About;
