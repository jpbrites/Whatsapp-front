import React from 'react'
import { useAuth } from '../../AuthContext';
import './styles.css'
import LogoWhats from '../../assets/whatsapp.png'

function Login() {
  const { name, setName, handleJoin } = useAuth();
  return (
   <div className='container-login'>
        <div className='background-login'>
            <img src={LogoWhats}></img>
            <span>WHATSAPP WEB</span>
        </div>
        <div className='area-login'>
            <span>Digite seu nome</span>
            <input placeholder='Nome' value={name} onChange={(e) => setName(e.target.value)}/>
            <button onClick={() => handleJoin()}>Entrar</button>
        </div>
  </div>
  )
}

export default Login