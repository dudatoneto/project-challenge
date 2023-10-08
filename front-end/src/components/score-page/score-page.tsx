import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./score-page.css";

function ScoreComponent() {
  const navigate = useNavigate();
  const [score, setScore] = useState(0);

  useEffect(() => {
    const fetchScore = async () => {
      try {
        const response = await axios.get("http://localhost:3000/score");

        if (response.status == 200) setScore(response.data.score);
        else
          console.error(
            "Error in response of the API request: status ",
            response.status
          );
      } catch (error) {
        console.error("Error making the API request: ", error);
      }
    };

    fetchScore();
  }, []);

  const playAgain = () => {
    // start the questions from the beginning
    localStorage.removeItem("currentQuestionIndex");
    // navigates to the questions page
    navigate("/questionario");
  };

  const exit = () => {
    // start the questions from the beginning
    localStorage.removeItem("currentQuestionIndex");
    // navigates to the initial page
    navigate("/");
  };

  return (
    <div className="score-page">
      <h1>Pontuação: {score}</h1>
      <button type="button" onClick={playAgain}>
        reiniciar
      </button>
      <button type="button" onClick={exit}>
        sair
      </button>
    </div>
  );
}

export default ScoreComponent;
