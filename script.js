const startButton = document.getElementById('start-button');
const questionContainer = document.getElementById('question-container');
const questionText = document.getElementById('question-text');
const answerButtons = document.getElementById('answer-buttons');
const resultContainer = document.getElementById('result-container');
const resultText = document.getElementById('result-text');
const ThanksText = document.getElementById('thanks-text');
const alunos = document.getElementById('alunos');
const nome = document.getElementById('nome');
const turma = document.getElementById('turma');


let currentQuestionIndex = 0;
let score = 0;

const allQuestions = [

        {
            question: "Qual é o objetivo principal da produção de vacinas por engenharia genética ou biotecnologia?",
            answers: [
                { text: "Aumentar a produção de alimentos", correct: false },
                { text: "Criar organismos geneticamente modificados", correct: false },
                { text: "Desenvolver medicamentos para tratamento de doenças", correct: true },
                { text: "Melhorar a eficiência energética", correct: false }
            ]
        },
        {
            question: "Qual é a principal vantagem da produção de vacinas por engenharia genética?",
            answers: [
                { text: "Maior resistência a doenças", correct: false },
                { text: "Redução do custo de produção", correct: true },
                { text: "Menor impacto ambiental", correct: false },
                { text: "Aumento da expectativa de vida", correct: false }
            ]
        },
        {
            question: "Em que consiste o processo de engenharia genética na produção de vacinas?",
            answers: [
                { text: "Modificação do clima para aumentar a eficácia da vacina", correct: false },
                { text: "Alteração do material genético de um organismo para produzir a vacina desejada", correct: true },
                { text: "Uso de métodos tradicionais de cultivo de microorganismos", correct: false },
                { text: "Extração direta da vacina de animais infectados", correct: false }
            ]
        },
        {
            question: "Qual é um exemplo de vacina produzida por engenharia genética?",
            answers: [
                { text: "Vacina contra a gripe sazonal", correct: true },
                { text: "Vacina contra a poliomielite", correct: false },
                { text: "Vacina contra a febre amarela", correct: false },
                { text: "Vacina contra a varíola", correct: false }
            ]
        },
        {
            question: "Qual é o papel da tecnologia de DNA recombinante na produção de vacinas por engenharia genética?",
            answers: [
                { text: "Isolar vacinas diretamente de pacientes infectados", correct: false },
                { text: "Utilizar enzimas para aumentar a eficácia das vacinas", correct: false },
                { text: "Manipular o DNA de organismos para produzir componentes específicos da vacina", correct: true },
                { text: "Aumentar a resistência natural do organismo à doença", correct: false }
            ]
        },
        {
            question: "Como a produção de vacinas por engenharia genética pode contribuir para a rápida resposta a surtos de doenças?",
            answers: [
                { text: "Acelerando o processo de aprovação regulatória", correct: false },
                { text: "Reduzindo a eficácia das vacinas produzidas", correct: false },
                { text: "Aumentando a burocracia nos processos de fabricação", correct: false },
                { text: "Facilitando a produção em larga escala", correct: true }
            ]
        },
        {
            question: "Quais são os principais desafios éticos associados à engenharia genética na produção de vacinas?",
            answers: [
                { text: "Riscos ambientais", correct: false },
                { text: "Manipulação genética não autorizada", correct: true },
                { text: "Dificuldades no transporte das vacinas", correct: false },
                { text: "Falta de eficácia das vacinas", correct: false }
            ]
        },
        {
            question: "Além das vacinas tradicionais, como as vacinas de RNA mensageiro (mRNA) se enquadram na categoria de produção por engenharia genética?",
            answers: [
                { text: "Utilizam organismos vivos para produzir antígenos virais", correct: false },
                { text: "Modificam diretamente o DNA do paciente", correct: false },
                { text: "Introduzem material genético sintético para instruir as células a produzirem proteínas virais", correct: true },
                { text: "Baseiam-se apenas em métodos químicos de produção", correct: false }
            ]
        }
        
    ];

const questions = shuffle(allQuestions).slice(0, 8);

startButton.addEventListener('click', startQuiz);


function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    startButton.classList.add('hide');
    questionContainer.classList.remove('hide');
    nome.classList.add('hide');
    alunos.classList.add('hide');
    turma.classList.add('hide');
    showQuestion();
}


function showQuestion() {
    const question = questions[currentQuestionIndex];
    questionText.innerText = question.question;

    // Atualize a barra de progresso e o texto
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    
    progressBar.style.width = `${progress}%`;
    progressText.innerText = `Questão ${currentQuestionIndex + 1} de ${questions.length}`;

    clearAnswerButtons();
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('answer-btn');
        button.addEventListener('click', () => selectAnswer(answer.correct, button));
        answerButtons.appendChild(button);
    });
}


function clearAnswerButtons() {
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(correct, button) {
    if (correct) {
        score++;
        button.classList.add('correct-answer');
    } else {
        button.classList.add('wrong-answer');
    }

    const correctButton = Array.from(answerButtons.children).find(btn => btn.innerText === questions[currentQuestionIndex].answers.find(answer => answer.correct).text);
        if (correctButton) {
            correctButton.classList.add('correct-answer');
        }
    

    // Desabilita todos os botões após uma escolha
    Array.from(answerButtons.children).forEach(btn => {
        btn.disabled = true;
    });

    // Espera um pouco antes de ir para a próxima pergunta
    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion();

            // Atualize a barra de progresso
            const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
            document.getElementById('progress').style.width = `${progress}%`;
            document.getElementById('progress-text').innerText = `Questão ${currentQuestionIndex + 1} de ${questions.length}`;
        } else {
            showResult();
        }
        // Limpa as classes para a próxima pergunta
        Array.from(answerButtons.children).forEach(btn => {
            btn.classList.remove('correct-answer', 'wrong-answer');
            btn.disabled = false;
        });
    }, 1000); // Ajuste este tempo conforme necessário
}



function showResult() {
    questionContainer.classList.add('hide');
    resultContainer.classList.remove('hide');
    resultText.innerText = `Você acertou ${score} de ${questions.length} perguntas.`;
    ThanksText.classList.add('hide');
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

document.addEventListener("visibilitychange", function() {
    if (document.hidden) {
      document.title = "😭VOLTA AQUIII"; // Altere para o título desejado
    } else {
      document.title = "PRODUÇÃO DE VACINAS POR ENGENHARIA GENÉTICA ou BIOTECNOLOGIA"; // Altere para o seu título original
    }
  });