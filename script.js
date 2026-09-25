// Elementos da Interface
const telaInicial = document.getElementById('tela-inicial');
const telaJogo = document.getElementById('tela-jogo');
const telaResultado = document.getElementById('tela-resultado');
const btnIniciar = document.getElementById('btn-iniciar');
const btnReiniciar = document.getElementById('btn-reiniciar');
const caixaPerguntas = document.querySelector('.caixa-perguntas');
const caixaAlternativas = document.querySelector('.caixa-alternativas');
const textoResultado = document.querySelector('.texto-resultado');

// Dados do Jogo
const nomes = ["Gabriel", "Ana", "Lucas", "Beatriz", "Mateus", "Marina"];

const perguntas = [
    {
        enunciado: "Em 2049, você descobriu uma inteligência artificial antiga que controla a energia da cidade. O que você faz?",
        alternativas: [
            { texto: "Você decide desligar a IA para poupar recursos.", afirmacao: "preferiu seguir pelo caminho da cautela tecnológica." },
            { texto: "Você decide atualizar o sistema da IA para cooperar com ela.", afirmacao: "escolheu abraçar a evolução e a simbiose com as máquinas." }
        ]
    },
    {
        enunciado: "Após a sua decisão sobre a IA, os cidadãos questionam suas intenções. Como você responde?",
        alternativas: [
            { texto: "Você faz um pronunciamento público explicando seus motivos.", afirmacao: "Mostrou transparência em suas ações liderando as pessoas." },
            { texto: "Você foca em trabalhar nos bastidores e provar com resultados.", afirmacao: "Decidiu agir em silêncio focando puramente na eficiência prática." }
        ]
    }
];

let posicaoAtual = 0;
let nomePersonagem = "";
let historiaFinal = "";

// Função para gerar o nome aleatório
function geraNomeAleatorio() {
    const indiceAleatorio = Math.floor(Math.random() * nomes.length);
    return nomes[indiceAleatorio];
}

// Iniciar o Jogo
btnIniciar.addEventListener('click', () => {
    nomePersonagem = geraNomeAleatorio();
    telaInicial.classList.add('esconder');
    telaJogo.classList.remove('esconder');
    posicaoAtual = 0;
    historiaFinal = `Em 2049, ${nomePersonagem} `;
    mostraPergunta();
});

// Mostrar a pergunta atual ajustando o texto com replace
function mostraPergunta() {
    if (posicaoAtual >= perguntas.length) {
        mostraResultado();
        return;
    }
    
    caixaAlternativas.innerHTML = "";
    
    // Substitui o "você" ou "Você" pelo nome do personagem aleatório
    let enunciadoFormatado = perguntas[posicaoAtual].enunciado.replace(/você/g, nomePersonagem).replace(/Você/g, nomePersonagem);
    caixaPerguntas.textContent = enunciadoFormatado;

    perguntas[posicaoAtual].alternativas.forEach(alternativa => {
        const botao = document.createElement("button");
        botao.classList.add("btn");
        // Também formata as alternativas se contiverem a palavra "você"
        botao.textContent = alternativa.texto.replace(/você/g, nomePersonagem).replace(/Você/g, nomePersonagem);
        
        botao.addEventListener("click", () => {
            historiaFinal += alternativa.afirmacao + " ";
            posicaoAtual++;
            mostraPergunta();
        });
        
        caixaAlternativas.appendChild(botao);
    });
}

// Mostrar Tela Final
function mostraResultado() {
    telaJogo.classList.add('esconder');
    telaResultado.classList.remove('esconder');
    textoResultado.textContent = historiaFinal;
}

// Reiniciar o Jogo
btnReiniciar.addEventListener('click', () => {
    telaResultado.classList.add('esconder');
    telaInicial.classList.remove('esconder');
});
