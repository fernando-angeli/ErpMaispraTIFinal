import { useState } from 'react';
import './Login.css'
import ErpLogo from '../../assets/icons/artboard.png'

import { useAuth } from '../AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [LoginEmail, setLoginEmail] = useState();
  const [LoginPassword, setLoginPassword] = useState();
  const [Error, setError] = useState();
  const [Error2, setError2] = useState();
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

const handleCheckEmail = (email) =>{
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  if (emailRegex.test(email)) {
    setError(null)
    setLoginEmail(email);
} else {
    setError('Formato de Email Invalido!')
}

}

const handleCheckPass = (pass) =>{
  const PassRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
  if (!PassRegex.test(pass)) { // como a senha de teste é 12345, esta desativado
    setError(null)
    setLoginPassword(pass);
} else {
    setError('A senha deve ter 1 Letra maiscula, 1 maiscula e 8 caracteres!')
}

}

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/auth', {
        email: LoginEmail,
        password: LoginPassword,
      });      
      setError(null)
      setError2('Login Efetuado!')
      console.log(response.data)
      login(response.data);
      navigate('/home')
    } catch (err) {
      setError(err.response.data.message+".")
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
                isValid(e);
                handleCheckEmail(e.target.value)
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
                isValid(e);
                handleCheckPass(e.target.value)
              }}
            />
          </label>

          <div className='divButtons'>
            <button type='submit' className='primaryNormal' onClick={handleSubmit}>
              Login
            </button>
          </div>
        </form>
        <p class='error'>{Error && Error}</p>
        <p class='sucess'>{Error2 && Error2}</p>
        <p><a href=''>Esqueceu sua senha?</a></p>
      </div>
    </div>
  );
};

export default Login;
