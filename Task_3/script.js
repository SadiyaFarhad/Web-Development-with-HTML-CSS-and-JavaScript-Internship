const quizData = [
  {
    question: "What does HTML stand for?",
    answers: ["HyperText Markup Language", "HighText Machine Language", "HyperTransfer Markup Language", "HyperText Markdown Language"],
    correct: 0
  },
  {
    question: "Which CSS property controls text color?",
    answers: ["text-style", "color", "font-color", "text-color"],
    correct: 1
  },
  {
    question: "Which symbol is used for comments in JavaScript?",
    answers: ["//", "#", "/* */", "--"],
    correct: 0
  },
  {
    question: "Which method is used to write to the console?",
    answers: ["print()", "console.log()", "echo()", "log()"],
    correct: 1
  }
];

let currentQuestion = 0;
let score = 0;
const quizContainer = document.getElementById("quiz");
const scoreText = document.getElementById("scoreText");
const restartBtn = document.getElementById("restartBtn");

function loadQuestion() {
  const q = quizData[currentQuestion];
  quizContainer.innerHTML = `<h3>${q.question}</h3>` +
    q.answers.map((ans, index) => `<div class='answer' onclick='checkAnswer(${index})'>${ans}</div>`).join("");
}

function checkAnswer(selectedIndex) {
  const correctAnswer = quizData[currentQuestion].correct;
  if (selectedIndex === correctAnswer) score++;
  currentQuestion++;
  if (currentQuestion < quizData.length) loadQuestion();
  else showResult();
}

function showResult() {
  quizContainer.innerHTML = "";
  scoreText.textContent = `🎉 You scored ${score} out of ${quizData.length}!`;
  restartBtn.classList.remove("hidden");
}

restartBtn.addEventListener("click", () => {
  score = 0;
  currentQuestion = 0;
  restartBtn.classList.add("hidden");
  scoreText.textContent = "";
  loadQuestion();
});

loadQuestion();

// Fetch Joke API
const jokeBtn = document.getElementById("jokeBtn");
const jokeText = document.getElementById("jokeText");

jokeBtn.addEventListener("click", async () => {
  jokeText.textContent = "Loading joke...";
  try {
    const response = await fetch("https://v2.jokeapi.dev/joke/Any?type=single");
    const data = await response.json();
    jokeText.textContent = data.joke || "No joke found!";
  } catch (error) {
    jokeText.textContent = "⚠️ Failed to load joke!";
  }
});
