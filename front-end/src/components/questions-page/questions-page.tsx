import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./questions-page.css";

interface QuestionData {
  questionId: number;
  question: string;
  answers: string[];
}

function QuestionsComponent() {
  const navigate = useNavigate();
  const [questions, setData] = useState<{ QUESTIONS_ARRAY: QuestionData[] }>({
    QUESTIONS_ARRAY: [],
  });

  // retrieves currentQuestionIndex from local storage or use 0 as the default
  const storedIndex = localStorage.getItem("currentQuestionIndex");
  const initialIndex = storedIndex ? parseInt(storedIndex) : 0;
  const [currentQuestionIndex, setCurrentQuestionIndex] =
    useState<number>(initialIndex);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get("http://localhost:3000/questions");

        if (response.status == 200) setData(response.data);
        else
          console.error(
            "Error in response of the API request: status ",
            response.status
          );
      } catch (error) {
        console.error("Error making the API request: ", error);
      }
    };

    fetchQuestions();
  }, []);

  // when an answer button is pressed, gets the correct answer and goes to feedback page
  const handleAnswerClick = (questionId: number, answer: string) => {
    const submitAnswer = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3000/submit-answer",
          { questionId: questionId, answer: answer }
        );

        if (response.status == 200) {
          // navigates to feedback page
          navigate("/feedback", {
            state: { responseAnswer: response.data },
          });

          // increments the question index
          const nextQuestionIndex = currentQuestionIndex + 1;
          setCurrentQuestionIndex(currentQuestionIndex + 1);

          // stores the updated index in local storage
          localStorage.setItem(
            "currentQuestionIndex",
            nextQuestionIndex.toString()
          );
        } else
          console.error(
            "Error in response of the API request: status ",
            response.status
          );
        setData(response.data);
      } catch (error) {
        console.error("Error making the API request: ", error);
      }
    };

    submitAnswer();
  };

  return (
    <div className="questions-page">
      {/* if there are still questions to be displayed */}
      {questions.QUESTIONS_ARRAY.length > 0 &&
      currentQuestionIndex < questions.QUESTIONS_ARRAY.length ? (
        <div>
          {/* displays the question */}
          <h1>{questions.QUESTIONS_ARRAY[currentQuestionIndex].question}</h1>
          {/* for every possible answer, displays a button */}
          {questions.QUESTIONS_ARRAY[currentQuestionIndex].answers.map(
            (answer, answerIndex) => (
              <button
                key={answerIndex}
                type="button"
                onClick={handleAnswerClick.bind(
                  null,
                  questions.QUESTIONS_ARRAY[currentQuestionIndex].questionId,
                  answer
                )}
              >
                {answer}
              </button>
            )
          )}
        </div>
      ) : questions.QUESTIONS_ARRAY.length === currentQuestionIndex ? (
        // navigates to score page when there are no more questions
        <>{navigate("/score")}</>
      ) : (
        // displays a loading message while data is being fetched
        <p>Carregando...</p>
      )}
    </div>
  );
}

export default QuestionsComponent;
