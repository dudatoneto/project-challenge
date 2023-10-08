import React from 'react';
import { useNavigate } from 'react-router-dom';
import './initial-page.css';

function InitialPageComponent() {
  const navigate = useNavigate();
  const handleClick = () => {
    // navigates to the questions page
    navigate('/questionario');    
  };

  return (
    <div className="initial-page">
      <h1>Bem-vindo!</h1>
      <h2>Clique em "Iniciar" para começar</h2>
      <button type="button" onClick={handleClick}>Iniciar</button>
    </div>
  );
}

export default InitialPageComponent;
