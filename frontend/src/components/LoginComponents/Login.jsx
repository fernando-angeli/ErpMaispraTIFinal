import React, { useState } from 'react';
import './Login.css'
import ErpLogo from '../../assets/icons/artboard.png'

import { useAuth } from '../AuthContext.jsx';
import  { useNavigate }  from 'react-router-dom'
import axios from 'axios';

const Login = () => {
  const [LoginEmail, setLoginEmail] = useState('fernando@hotmail.com');
  const [LoginPassword, setLoginPassword] = useState('12345');
  const { login } = useAuth();
  const navigate = useNavigate();

  const isInvalid = (e) => {
    e.target.className = 'isInvalid inputText';
  };

  const isValid = (e) => {
    if (e.target.value && e.target.className !== 'inputText') {
      e.target.className = 'inputText';
    }
  };

  const handleReset = () => {
    let form = document.getElementById('formNewClient');
    let elements = form.getElementsByClassName('isInvalid');

    while (elements.length > 0) {
      elements[0].classList.remove('isInvalid');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/auth', {
        email: LoginEmail,
        password: LoginPassword,
      });
      login(response.data.token); 
      navigate('/home')
    } catch (err) {
      alert('Erro ao fazer login:', err.response?.data || err.message);
    }
  };

  return (
    <div className='contentLogin'>
      <div className='ErPlogo'>
        <img src={ErpLogo} alt='LogoErp'></img>
      </div>

      <div className='LoginBox'>
      <h4>Faça seu Login</h4>
        <form className='formLogin' onSubmit={handleSubmit} onReset={handleReset}>
          <label htmlFor='LoginEmail' className='inputLabel' id='labelNewLoginEmail'>
            <span className='inputDescription'>Email</span>
            <input type='email' placeholder='Digite seu Email' className='inputText'  name='email' value={LoginEmail}
              required
              onInvalid={(e) => isInvalid(e)}
              onChange={(e) => {
                setLoginEmail(e.target.value);
                isValid(e);
              }}
            />
          </label>

          <label htmlFor='LoginPassword' className='inputLabel' id='labelLoginPassword'>
            <span className='inputDescription'>Senha</span>
            <input
              type='password' placeholder='Digite sua senha'  className='inputText'  name='password' value={LoginPassword}
              required
              onInvalid={(e) => isInvalid(e)}
              onChange={(e) => {
                setLoginPassword(e.target.value);
                isValid(e);
              }}
            />
          </label>

          <div className='divButtons'>
            <button type='submit' className='primaryNormal' onClick={handleSubmit}>
              Login
            </button>
          </div>
        </form>
        <p><a href=''>Esqueceu sua senha?</a></p>
      </div>
    </div>
  );
};

export default Login;
