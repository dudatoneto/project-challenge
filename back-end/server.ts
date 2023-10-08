import express from "express";
import cors from "cors";
import { Request, Response } from "express";

interface QuestionData {
  questionId: number;
  question: string;
  answers: string[];
}

interface CorrectAnswers {
  questionId: number;
  answer: string;
}

const QUESTIONS_ARRAY: QuestionData[] = [
  {
    questionId: 1,
    question:
      "Os planetas giram permanentemente ao redor do Sol. Cada planeta segue um caminho, chamado:",
    answers: ["órbita", "espaço", "satélite"],
  },
  {
    questionId: 2,
    question:
      "Qual das espécies citadas abaixo sofre ameaça de extinção e é oficialmente símbolo da campanha de preservação da biodiversidade brasileira?",
    answers: ["arara-azul", "tatu-peba", "onça-pintada"],
  },
  {
    questionId: 3,
    question:
      "Que nome recebe o conjunto de todas as regiões do planeta em que é possível a existência da vida?",
    answers: ["biosfera", "atmosfera", "hidrosfera"],
  },
];

const CORRECT_ANSWERS: CorrectAnswers[] = [
  {
    questionId: 1,
    answer: "órbita",
  },
  {
    questionId: 2,
    answer: "onça-pintada",
  },
  {
    questionId: 3,
    answer: "biosfera",
  },
];

const PORT: number = 3000;
let score: number = 0;


const app = express();      // creates an Express application
app.use(cors());            // allows cross-origin requests
app.use(express.json());    // parse JSON in request body

// returns the array of questions
app.get("/questions", (req: Request, res: Response) => {
  res.status(200).json({ QUESTIONS_ARRAY });
});

// checks if the answer submitted is correct, if not returns the correct answer
app.post("/submit-answer", (req: Request, res: Response) => {
  const { questionId, answer } = req.body;

  if (!questionId || !answer) {
    return res
      .status(400)
      .json({ error: "Parameter questionId or answer is missing" });
  }

  // gets the correct answer
  const correctAnswer = CORRECT_ANSWERS.find(
    (element) => element.questionId === questionId
  );

  if (!correctAnswer)
    res.status(400).json({ error: "Question ID not found in CORRECT_ANSWERS" });
  else if (answer === correctAnswer.answer) {
    score++;
    res.status(200).json({ correct: true });
  } else res.status(200).json({ correct: false, answer: correctAnswer.answer });
});

// returns the score of the game
app.get("/score", (req: Request, res: Response) => {
  res.status(200).json({ score: score });
  score = 0;
});

app.listen(PORT, () => {
  console.log("Server is running on port 3000.");
});
