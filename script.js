const perguntas = [
    {
        pergunta: "1. O que são animais sinantrópicos?",
        alternativas: [
            "a) Animais que vivem apenas em florestas",
            "b) Animais que vivem próximos aos seres humanos",
            "c) Animais domésticos",
            "d) Animais marinhos"
        ],
        correta: 1,
        explicacao: "Eles se adaptam aos ambientes urbanos e convivem perto das pessoas."
    },
    {
        pergunta: "2. Qual dos animais abaixo é considerado sinantrópico?",
        alternativas: [
            "a) Leão",
            "b) Baleia",
            "c) Rato",
            "d) Golfinho"
        ],
        correta: 2, // Corrigido para 2 (Rato)
        explicacao: "Os ratos vivem em cidades, onde encontram alimento e abrigo."
    },
    {
        pergunta: "3. Qual doença pode ser transmitida por ratos?",
        alternativas: [
            "a) Catapora",
            "b) Leptospirose",
            "c) Sarampo",
            "d) Caxumba"
        ],
        correta: 1,
        explicacao: "A doença pode ser transmitida pela urina de ratos contaminados."
    },
    {
        pergunta: "4. O mosquito Aedes aegypti pode transmitir:",
        alternativas: [
            "a) Dengue",
            "b) Gripe",
            "c) Resfriado",
            "d) Rubéola"
        ],
        correta: 0,
        explicacao: "Esse mosquito é o principal transmissor da dengue."
    },
    {
        pergunta: "5. O que favorece a proliferação de mosquitos?",
        alternativas: [
            "a) Água parada",
            "b) Vento forte",
            "c) Solo seco",
            "d) Frio intenso"
        ],
        correta: 0,
        explicacao: "Os mosquitos depositam seus ovos em locais com água parada."
    },
    {
        pergunta: "6. As baratas podem ser encontradas principalmente em locais:",
        alternativas: [
            "a) Limpos e organizados",
            "b) Escuros e com restos de alimentos",
            "c) Muito ventilados",
            "d) Sem umidade"
        ],
        correta: 1,
        explicacao: "Elas procuram locais que ofereçam alimento, abrigo e umidade."
    },
    {
        pergunta: "7. Qual ação ajuda a evitar a presença de ratos?",
        alternativas: [
            "a) Deixar lixo exposto",
            "b) Acumular entulhos",
            "c) Armazenar o lixo corretamente",
            "d) Deixar alimentos descobertos"
        ],
        correta: 2, // Corrigido para 2 (Armazenar corretamente)
        explicacao: "Sem acesso ao lixo, os ratos têm menos fontes de alimento."
    },
    {
        pergunta: "8. Os pombos podem transmitir doenças por meio de:",
        alternativas: [
            "a) Fezes",
            "b) Penas apenas",
            "c) Bico apenas",
            "d) Asas apenas"
        ],
        correta: 0,
        explicacao: "As fezes podem conter microrganismos que causam doenças."
    },
    {
        pergunta: "9. Qual destes NÃO é um animal sinantrópico?",
        alternativas: [
            "a) Mosca",
            "b) Barata",
            "c) Rato",
            "d) Tigre"
        ],
        correta: 3,
        explicacao: "O tigre vive em seu habitat natural e não convive normalmente com seres humanos em áreas urbanas."
    },
    {
        pergunta: "10. A melhor forma de controlar animais sinantrópicos é:",
        alternativas: [
            "a) Manter o ambiente limpo",
            "b) Acumular lixo",
            "c) Deixar água parada",
            "d) Guardar restos de comida em locais abertos"
        ],
        correta: 0, // Corrigido para 0 (Manter o ambiente limpo)
        explicacao: "A limpeza reduz alimento, água e abrigo para esses animais."
    }
];

let perguntaAtual = 0;
let pontos = 0;
let tempo = 0;
let intervalo;
let erros = [];

const telaInicial = document.getElementById("telainicial");
const telaQuiz = document.getElementById("telaQiz");
const telaFinal = document.getElementById("telafinal");

const perguntaElemento = document.getElementById("pergunta");
const alternativasElemento = document.getElementById("alternativas");

const contadorPergunta = document.getElementById("contadorPergunta");
const barraProgresso = document.getElementById("barraProgresso");

const resultadoElemento = document.getElementById("resultado");
const cronometro = document.getElementById("cronometro");
const relatorioErros = document.getElementById("relatorioErros");

function iniciarQuiz() {
    perguntaAtual = 0;
    pontos = 0;
    tempo = 0;
    erros = [];

    barraProgresso.style.width = "0%";
    relatorioErros.innerHTML = "";
    cronometro.textContent = "Tempo: 0s";

    telaInicial.style.display = "none";
    telaFinal.style.display = "none";
    telaQuiz.style.display = "block";

    intervalo = setInterval(() => {
        tempo++;
        cronometro.textContent = `Tempo: ${tempo}s`;
    }, 1000);

    mostrarPergunta();
}

function mostrarPergunta() {
    alternativasElemento.innerHTML = "";

    contadorPergunta.textContent = `Pergunta ${perguntaAtual + 1} de ${perguntas.length}`;

    let progresso = (perguntaAtual / perguntas.length) * 100;
    barraProgresso.style.width = progresso + "%";

    perguntaElemento.textContent = perguntas[perguntaAtual].pergunta;

    perguntas[perguntaAtual].alternativas.forEach((alternativa, indice) => {
        const botao = document.createElement("button");
        botao.textContent = alternativa;
        botao.onclick = () => verificarResposta(indice);
        alternativasElemento.appendChild(botao);
    });
}

function verificarResposta(respostaSelecionada) {
    const perguntaAtualObj = perguntas[perguntaAtual];

    if (respostaSelecionada === perguntaAtualObj.correta) {
        pontos++;
    } else {
        erros.push({
            pergunta: perguntaAtualObj.pergunta,
            respostaCorreta: perguntaAtualObj.alternativas[perguntaAtualObj.correta],
            explicacao: perguntaAtualObj.explicacao
        });
    }

    perguntaAtual++;

    if (perguntaAtual < perguntas.length) {
        mostrarPergunta();
    } else {
        finalizarQuiz();
    }
}

function finalizarQuiz() {
    clearInterval(intervalo);

    barraProgresso.style.width = "100%";
    telaQuiz.style.display = "none";
    telaFinal.style.display = "block";

    resultadoElemento.innerHTML = `
        <strong>Pontuação:</strong> ${pontos}/${perguntas.length}
        <br><br>
        <strong>Tempo:</strong> ${tempo} segundos
    `;

    relatorioErros.innerHTML = "";

    if (erros.length > 0) {
        relatorioErros.innerHTML += "<h2>Questões que você errou:</h2>";

        erros.forEach(erro => {
            relatorioErros.innerHTML += `
            <div class="erro">
                <h3>${erro.pergunta}</h3>
                <p><strong>Resposta correta:</strong> ${erro.respostaCorreta}</p>
                <p><strong>Explicação:</strong> ${erro.explicacao}</p>
            </div>
            `;
        });
    } else {
        relatorioErros.innerHTML = `
            <h2>🎉 Parabéns! Você acertou todas as questões!</h2>
        `;
    }
}

function reiniciarQuiz() {
    clearInterval(intervalo);

    perguntaAtual = 0;
    pontos = 0;
    tempo = 0;
    erros = [];

    barraProgresso.style.width = "0%";

    telaFinal.style.display = "none";
    telaQuiz.style.display = "none";
    telaInicial.style.display = "block";
}

const conteudos = [

{
titulo: "O que são animais sinantrópicos?",	
texto: `
Animais sinantrópicos são espécies silvestres que se adaptaram a viver em ambientes criados pelo homem. Diferente dos animais domésticos (como cães e gatos), eles não foram domesticados, mas aproveitam as cidades para encontrar abrigo e recursos.

`
},

{
titulo: "Exemplos de animais sinantrópicos",
texto: `
Os ratos são um dos maiores exemplos dessa categoria. Enquanto animais grandes e selvagens (como leões e baleias) fogem do contato humano ou vivem isolados em seus biomas, espécies como roedores, pombos e insetos urbanos prosperam nas cidades.

`
},

{
titulo: "Riscos à saúde: Doenças transmitidas por ratos",
texto: `
A convivência com roedores urbanos gera graves riscos à saúde pública. A principal ameaça é a leptospirose, uma doença bacteriana transmitida pelo contato com a água ou lama contaminadas pela urina de ratos infectados.
`
},

{
titulo: "O perigo do mosquito Aedes aegypti",
texto: `
O Aedes aegypti é um inseto sinantrópico perfeitamente adaptado ao ambiente domiciliar. Ele se destaca por ser o principal vetor de arboviroses graves que afetam a população urbana, sendo a mais conhecida a dengue.

`
},

{
titulo: "Fatores que favorecem a proliferação de mosquitos",
texto: `
O ciclo de vida dos mosquitos depende diretamente da água. O acúmulo de água parada, limpa ou pouco poluída, cria o ambiente ideal para que as fêmeas depositem seus ovos e as larvas se desenvolvam rapidamente.

`
},

{
titulo: "Habitat e comportamento das baratas",
texto: `
As baratas urbanas procuram locais específicos para sobreviver e se reproduzir: ambientes escuros, úmidos e com fartura de restos orgânicos. Por isso, frestas, redes de esgoto e cozinhas com pouca higiene são seus alvos favoritos.

`
},

{
titulo: "Prevenção e controle de roedores",
texto: `
Para evitar o surgimento de ratos, o segredo é cortar o acesso aos recursos deles. A medida mais eficaz é o armazenamento correto do lixo em tambores fechados, além do descarte adequado, impedindo que encontrem fontes de alimento fáceis.

`
},

{
titulo: "Riscos à saúde: Transmissão de doenças por pombos",
texto: `
Embora pareçam inofensivos, os pombos transmitem fungos e bactérias nocivos aos humanos. O contágio ocorre principalmente por meio de suas fezes secas, que se transformam em poeira e podem ser inaladas, causando doenças respiratórias e alergias.

`
},

{
titulo: "Diferença entre animais sinantrópicos e animais selvagens isolated",
texto: `
Nem todo animal que oferece perigo ou vive solto é sinantrópico. Grandes predadores, como os tigres, pertencem estritamente à fauna selvagem; eles necessitam de habitats florestais intactos e não conseguem coexistir ou se adaptar ao cotidiano das cidades.

`
},

{
titulo: "A Regra de Ouro do controle de pragas urbanas",
texto: `
A melhor estratégia contra animais sinantrópicos não é o uso de venenos, mas sim a prevenção baseada nos "4 As": evitar dar Acesso, Abrigo, Alimento e Água. Manter o ambiente sempre limpo e organizado quebra esse ciclo de sobrevivência das pragas.

`
},
];


function mostrarConteudo(indice){

    const conteudo =
        document.getElementById("conteudoExtra");

    conteudo.innerHTML = `

        <h3>${conteudos[indice].titulo}</h3>

        <p>
            ${conteudos[indice].texto.replace(/\n/g,"<br>")}
        </p>

    `;
}
