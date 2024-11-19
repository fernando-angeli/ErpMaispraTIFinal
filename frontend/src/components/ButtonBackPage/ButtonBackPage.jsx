import React from 'react'
import { AiOutlineRollback } from "react-icons/ai";
import './ButtonBackPage.css'
import { useNavigate } from 'react-router-dom';
const ButtonBackPage = () => {

  const navigate = useNavigate();

    const handleBackClick = () => {
        navigate(-1);
      };
    
  return (
    <div className="right" onClick={handleBackClick}>
    <span>Voltar</span>
    <AiOutlineRollback className="icon-back" />
  </div>
)}

export default ButtonBackPage
