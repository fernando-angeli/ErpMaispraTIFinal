import { useState } from 'react';
import './Reset.css'
import ErpLogo from '../../assets/icons/artboard.svg'
import { AiOutlineUser } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import { BsArrowReturnRight } from "react-icons/bs";

import axios from 'axios';

const Reset = () => {
  const [ResetEmail, setResetEmail] = useState("");
  const [Error, setError] = useState();
  const [Error2, setError2] = useState();
  const navigate = useNavigate();

  const isInvalid = (e) => {
    e.target.className = 'isInvalid inputText';
  };

  const isValid = (e) => {
    if (e.target.value && e.target.className !== 'inputText') {
      e.target.className = 'inputText';
    }

    
  };

  const handleCheckEmail = (email) => {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (emailRegex.test(email)) {
      setError(null);
    } else {
      setError('Formato de Email Inválido!');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('', {
        email: ResetEmail,
      });      
      setError(null)
      setError2('Instruções enviadas por email!')
    } catch (err) {
      setError(err.response.data.message+".")
    }
  };

  return (
    <div className='contentReset'>
      <div className='ErPlogo'>
        <img src={ErpLogo} alt='LogoErp'></img>
      </div>

      <div className='ResetBox'>
        <h4>Recuperar Senha</h4>
        <p>Informe o e-mail em que deseja recuperar a senha</p>
        <form className='formReset' onSubmit={handleSubmit} >
          <label htmlFor='ResetEmail' className='inputLabel' id='labelNewResetEmail'>
            <span className='inputDescription'>E-mail:</span> 
            <div className='inputTextEmail'>
              <AiOutlineUser className="icon" />
           <input type='email' placeholder='Digite o seu Email' className='inputText'  name='email' value={ResetEmail}
              required
              onInvalid={(e) => isInvalid(e)}
              onChange={(e) => {
                setResetEmail(e.target.value)
                isValid(e);
                handleCheckEmail(e.target.value)
              }}
            /></div>
          </label>

          <div className='divButtons'>
            <button type='submit' className='primaryNormal loginButton' onClick={handleSubmit}>
             Continuar
            </button>
          </div>
        </form>
        <p className='error'>{Error && Error}</p>
        <p className='sucess'>{Error2 && Error2}</p>
        <p className='pForgotPass'><a href='/login' className='forgotPass'>Login <BsArrowReturnRight size={22} style={{margin:"3px"}}/></a></p>
      </div>
    </div>
  );
};

export default Reset;
