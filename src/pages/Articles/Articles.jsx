import styles from "./Articles.module.css";

function Articles() {
    return (
        <div className={styles.articlesContainer}>
            <section>
                <h2>Energia Solar: Como Funciona e Por Que é o Futuro</h2>
                <p>
                    A energia solar está deixando de ser apenas uma tendência para se tornar uma solução prática e acessível para o mundo. Mas você sabe como, de fato, ela funciona? No SolarMates, acreditamos que entender o funcionamento dessa tecnologia incrível é o primeiro passo para adotar um estilo de vida mais sustentável e inteligente. Vamos explorar juntos?
                </p>
            </section>

            <section>
                <h2>Do Sol à Energia: O Ciclo Solar em Ação</h2>
                <p>
                    O funcionamento da energia solar começa com o que temos de mais abundante: o Sol. A luz solar é capturada por painéis fotovoltaicos, que convertem a radiação em energia elétrica utilizável. Este processo, que parece mágica, é na verdade pura ciência:
                </p>
                <ul>
                    <li>
                        <h3>Captação de Luz Solar</h3>
                        <p>
                            As células solares dentro dos painéis fotovoltaicos captam os fótons (partículas de luz) emitidos pelo Sol. Esses fótons “despertam” os elétrons presentes nos materiais semicondutores, como o silício, gerando um fluxo de eletricidade.
                        </p>
                    </li>
                    <li>
                        <h3>Conversão em Energia Elétrica</h3>
                        <p>
                            A eletricidade gerada é chamada de corrente contínua (CC). Para que seja utilizada em aparelhos elétricos, ela passa por um inversor, que transforma a corrente contínua em corrente alternada (CA) — a mesma que chega pela rede elétrica convencional.
                        </p>
                    </li>
                    <li>
                        <h3>Distribuição e Uso</h3>
                        <p>
                            A energia gerada pode ser usada imediatamente em sua residência, armazenada em baterias ou até mesmo injetada na rede elétrica local, gerando créditos para o consumidor.
                        </p>
                    </li>
                </ul>
            </section>

            <section>
                <h2>Por Que Escolher Energia Solar?</h2>
                <p>
                    Se o funcionamento da energia solar é simples, os benefícios são ainda mais claros:
                </p>
                <ul>
                    <li>
                        <h3>Economia a Longo Prazo</h3>
                        <p>
                            Após o investimento inicial, a energia gerada pelos painéis é praticamente gratuita, reduzindo sua conta de luz drasticamente.
                        </p>
                    </li>
                    <li>
                        <h3>Sustentabilidade</h3>
                        <p>
                            A energia solar é limpa, renovável e não emite gases poluentes durante sua produção, ajudando a combater as mudanças climáticas.
                        </p>
                    </li>
                    <li>
                        <h3>Autonomia Energética</h3>
                        <p>
                            Com baterias solares, você pode armazenar energia para usar quando precisar, mesmo em casos de falta de energia da rede.
                        </p>
                    </li>
                    <li>
                        <h3>Valorização do Imóvel</h3>
                        <p>
                            Casas equipadas com sistemas solares ganham maior valor de mercado e se tornam mais atrativas para potenciais compradores.
                        </p>
                    </li>
                </ul>
            </section>

            <section>
                <h2>Os Componentes do Sistema Solar Residencial</h2>
                <p>
                    Para funcionar de forma eficiente, o sistema de energia solar é composto por diferentes componentes que trabalham juntos. Aqui estão os principais:
                </p>
                <ul>
                    <li>
                        <h3>Painéis Fotovoltaicos</h3>
                        <p>Capturam a energia do Sol e a convertem em eletricidade. Sua eficiência depende de fatores como qualidade, localização e inclinação.</p>
                    </li>
                    <li>
                        <h3>Inversores</h3>
                        <p>Transformam a energia gerada em corrente contínua (CC) em corrente alternada (CA), tornando-a utilizável.</p>
                    </li>
                    <li>
                        <h3>Estruturas de Suporte</h3>
                        <p>Fixam os painéis em telhados ou no solo, garantindo estabilidade e máxima exposição solar.</p>
                    </li>
                    <li>
                        <h3>Baterias (Opcional)</h3>
                        <p>Armazenam a energia excedente para uso posterior, especialmente útil em sistemas off-grid (sem conexão à rede).</p>
                    </li>
                    <li>
                        <h3>Medidor Bidirecional</h3>
                        <p>Monitora a energia consumida e a injetada na rede elétrica, permitindo o sistema de créditos energéticos.</p>
                    </li>
                </ul>
            </section>

            <section>
                <h2>SolarMates: Descomplicando Energia Solar</h2>
                <p>
                    No SolarMates, acreditamos que a energia solar não é só para grandes empresas ou especialistas em tecnologia. Ela é para você, para sua casa, para o seu futuro.
                </p>
                <p>
                    Nosso simulador permite que você entenda exatamente como a energia solar pode transformar sua realidade, apresentando o retorno sobre o investimento, a economia a longo prazo e comparações com outras fontes de energia. É simples, rápido e descomplicado — como deve ser.
                </p>
                <p>
                    A energia solar é muito mais do que uma tendência; é um movimento que combina tecnologia, sustentabilidade e economia. Se você quer fazer parte dessa revolução energética, conte com o SolarMates para te guiar. Afinal, acreditamos que um mundo melhor começa com pequenas decisões — e essa pode ser a mais importante delas.
                </p>
                <p>🌱 Energia solar: simples, sustentável e sua. Vamos nessa? ☀️</p>
            </section>
        </div>
    );
}

export default Articles;
