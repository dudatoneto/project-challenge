import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

import InitialPageComponent from "./components/initial-page/initial-page";
import QuestionsComponent from "./components/questions-page/questions-page";
import FeedbackComponent from "./components/feedback-page/feedback-page";
import ScoreComponent from "./components/score-page/score-page";

function App() {
  // start the questions from the beginning
  localStorage.removeItem("currentQuestionIndex");

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<InitialPageComponent />} />
          <Route path="/questionario" element={<QuestionsComponent />} />
          <Route path="/feedback" element={<FeedbackComponent />} />
          <Route path="/score" element={<ScoreComponent />} />
        </Routes>
      </Router>
      <footer>
        <p>made by Maria Eduarda Toneto</p>
      </footer>
    </div>
  );
}

export default App;
