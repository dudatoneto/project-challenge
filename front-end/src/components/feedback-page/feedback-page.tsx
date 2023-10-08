import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./feedback-page.css";

function FeedbackComponent() {
  const location = useLocation();
  const navigate = useNavigate();

  // accesses the responseAnswer from location.state (from previous question)
  const responseAnswer = location.state.responseAnswer;

  const handleClick = () => {
    // navigates to the questions page
    navigate("/questionario"); 
  };

  return (
    <div className="feedback-page">
      <h1>Sua resposta está...</h1>
      {responseAnswer.correct ? <p>Correta!</p> : <p>Errada<br/><span>Resposta correta: {responseAnswer.answer}</span></p>}
      <button type="button" onClick={handleClick}>
        próximo
      </button>
    </div>
  );
}

export default FeedbackComponent;
