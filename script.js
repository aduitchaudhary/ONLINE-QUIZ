const questions = [
    {
        question: "In which year was the Indian Constituent Assembly formed?",
        options: ["1946", "1947", "1948", "1949"],
        correct: 0,
        image: "1.jpg"
    },
    {
        question: "What is black soil known as in India?",
        options: ["Alluvial Soil", "Regur Soil", "Red Soil", "Laterite Soil"],
        correct: 1,
        image: "2.webp"
    },
    {
        question: "Who is the constitutional head of India?",
        options: ["President", "Prime Minister", "Chief Justice", "Parliament"],
        correct: 0,
        image: "3.jpg"
    },
    {
        question: "Which part of the Constitution deals with Fundamental Rights?",
        options: ["Part II", "Part III", "Part IV", "Part V"],
        correct: 1,
        image: "4.jpg"
    },
    {
        question: "By whom was the Planning Commission of India replaced?",
        options: ["NITI Aayog", "Ministry of Finance", "Central Planning Bureau", "Department of Economic Affairs"],
        correct: 0,
        image: "5.webp"
    }
];

let currentIndex = 0;
let score = 0;
let selectedIndex = null;

const container = document.getElementById('main-bg-container');
const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const optionsContainer = document.getElementById('options-container');

startBtn.addEventListener('click', () => {
    startScreen.classList.add('hidden');
    quizScreen.classList.remove('hidden');
    loadQuestion();
});

function updateBackground(imgUrl) {
    container.style.backgroundImage = `url('${imgUrl}')`;
}

function loadQuestion() {
    const q = questions[currentIndex];
    updateBackground(q.image);
    
    document.getElementById('question-text').textContent = q.question;
    document.getElementById('progress').textContent = `Question ${currentIndex + 1}/${questions.length}`;
    
    optionsContainer.innerHTML = '';
    selectedIndex = null;
    nextBtn.disabled = true;

    q.options.forEach((option, index) => {
        const btn = document.createElement('button');
        btn.textContent = option;
        btn.classList.add('option-btn');
        btn.onclick = () => selectOption(index, btn);
        optionsContainer.appendChild(btn);
    });
}

function selectOption(index, btn) {
    selectedIndex = index;
    const allButtons = document.querySelectorAll('.option-btn');
    allButtons.forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    nextBtn.disabled = false;
}

nextBtn.addEventListener('click', () => {
    if (selectedIndex === questions[currentIndex].correct) {
        score++;
    }
    currentIndex++;
    if (currentIndex < questions.length) {
        loadQuestion();
    } else {
        showResults();
    }
});

function showResults() {
    quizScreen.classList.add('hidden');
    resultScreen.classList.remove('hidden');
    container.className = "quiz-container result-bg"; // Change to final result photo
    document.getElementById('final-score').textContent = score;
    document.getElementById('total-questions').textContent = questions.length;
}