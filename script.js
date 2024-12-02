//Tableau contenant les questions sous forme d'objets
const questions = [
    { 
        question: "Wich is the largest animal in the world?",
        answers: [
            { text: "shark", correct: false},
            { text: "Blue whale", correct: true},
            { text: "Elephant", correct: false},
            { text: "Giraffe", correct: false},

        ]
     },

     { 
        question: "Wich is the smallest country in the world?",
        answers: [
            { text: "Vatican City", correct: true},
            { text: "Bhutan", correct: false},
            { text: "Nepal", correct: false},
            { text: "Shri Lanka", correct: false},

        ]
     },

     { 
        question: "Wich is the largest desert in the world?",
        answers: [
            { text: "Kalahari", correct: false},
            { text: "Gobi", correct: false},
            { text: "Sahara", correct: false},
            { text: "Antarctica", correct: true},

        ]
     },

     { 
        question: "Wich is the smallest continent in the world?",
        answers: [
            { text: "Asia", correct: false},
            { text: "Austarlia", correct: true},
            { text: "Arctic", correct: false},
            { text: "Africa", correct: false},

        ]
     }
];

//variables
//La constante questionElement contient une référence à cet élément HTML.
//vous  pouvez utiliser cette constante pour manipuler l'élément, comme changer son texte, ses styles..
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answers");
const nextButton = document.getElementById("next-btn");

//indice de la question actuelle
let currentQuestionIndex = 0;
let score = 0;

//to display the question
function showQuestion(){ 
    //réinitialise l'état de l'interface (réinitialiser les boutons et masquer le bouton "Next").
    resetState();
    //objet qui stocke la question avec ses reponses
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + "." + currentQuestion.question;

    //to display the answers:iterer sur ttes les reponses qu'on a
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct)
            //on crée un attribut personnalisé appelé data-correct sur le bouton, et on lui donne comme valeur la valeur de answer.correct
            button.dataset.correct = answer.correct;
        //lorsque le boutton est cliqué la fct selectAnswer est appellée
        button.addEventListener("click", selectAnswer);
    });
 }


function startQuiz(){ 
    currentQuestionIndex = 0;
    score = 0;
    //modifie le contenu HTML à l'intérieur du boutton.
    nextButton.innerHTML = "Next";
    showQuestion();
 }

 function resetState(){ 
    nextButton.style.display = "none";
    while(answerButtons.firstChild){ 
        answerButtons.removeChild(answerButtons.firstChild);
     }
 }
 function selectAnswer(e){ 
    //on recupere le bouton selectionné dans selectedBtn
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){ 
        selectedBtn.classList.add("correct");
        score++;
     }
    else{ 
        selectedBtn.classList.add("incorrect");
     }
     //gestion du cas ou l'utilisateur ne choisit pas la bonne reponse
     Array.from(answerButtons.children).forEach(button => { 
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        } 
        //desactiver les boutons après le choix
        button.disabled = true;
    });
    nextButton.style.display = "block"; 
 }

 function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

 function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
       showQuestion();
    }
    else{
        showScore();
    }

}

 nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }

});

startQuiz();

 




