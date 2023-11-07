import React from 'react';
import { useEffect, useState } from 'react';
import Image from '../../assets/profissao_programador.jpg';
import SendMessageIcon from '../../assets/send.png'
import './styles.css'
import io from '../../Socket';
import { useAuth } from '../../AuthContext';
import Login from '../login';
import moment from 'moment';

//Só que temos o problema do CORS nos navegadores, então temos que utilizar um sem CORS
//Isso é para o Chrome, para outro deve pesquisar qual comando será
//Para isso, crie um atalho, o caminho do atalho será: "C:\Program Files\Google\Chrome\Application\chrome.exe" --disable-web-security --disable-gpu --user-data-dir=%LOCALAPPDATA%\Google\chromeTemp
//Nomeie o atalho como 'chrome no cors' e rode o front nele


function Home() {
    const { name,id, setName, joined, handleJoin } = useAuth();
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
   
    console.log('Meu id é: '+id)
    

  
    useEffect(() => {
      io.on("users", (users) => setUsers(users))
      io.on("message", (message) => setMessages((messages) => [...messages, message]))
    }, [])
  

    const handleMessage = () => {
      if (message){
        const currentTime = moment().format('HH:mm');
        console.log(messages)
        io.emit("message", {message,name,id,currentTime});
        setMessage("");
      }
    }
  
    if (!joined){ //Se o usuário nao 'logou', ele deve colocar o nome dele e entrar
      return (
        <Login/>
      )
    }
    
    return (
    
      <div className='container'>
        <div className='back-ground'></div>
        <div className='chat-container'>
  
          <div className='chat-contacts'>
            <div className='chat-options'></div>
            <div className='chat-item'>
              <img src = {Image} className='image-profile' alt=''/>
              <div className='title-chat-container'>
                <span className='title-message'>Networking Profissão Programador</span>
                <span className='last-message'>
                  {messages.length ? `${messages[messages.length - 1].name}: ${messages[messages.length - 1].message}` : ''}
                </span>
              </div>
            </div>
          </div>
  
          <div className='chat-messages'>
            <div className='chat-options'>
              <div className='chat-item'>
                <img src = {Image} className='image-profile' alt=''/>
                <div className='title-chat-container'>
                  <span className='title-message'>Networking Profissão Programador</span>
                  <span className='last-message'>
                    {users.map((user, index) => (
                      <span>{user.name }{index + 1 < users.length ? ', ' : ''}</span>
                    ))}
                  </span>
                </div>
              </div>
            </div>
  
            <div className='chat-messages-area'>
              {messages.map((message, index) => ( //Se dois usuários tiverem o mesmo nome, essa verificação deve ser feita pelo socket da conexão
                //Verifica se a mensagem enviada é minha ou da outra pessoa
                <div className={message.id === id ? 'user-container-message right' : 'user-container-message left'}> 
                  
                  <span 
                  key={index}
                  className={message.id === id ? 'user-my-message' : 'user-other-message'}
                  >
                  <span className={message.id === id ? 'my-message' : 'user-message-name'}>{message.name ? `${message.name} ` : ''}</span>
                  <span className='user-message-message'>{message.message} </span>
                  <span className='message-hour'>{message.currentTime}</span>
                  </span>
                </div>
                
              ))}
            </div>
  
            <div className='chat-input-area'>
              <input
               className='chat-input' 
               placeholder='Mensagem'
               value={message}
               onChange={(e) => setMessage(e.target.value)}
               /*onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleMessage();
                }
              }}  */
              />
              <img src={SendMessageIcon} alt='' className='send-message-icon' onClick={() => handleMessage()}/>
            </div>
          </div>
       
        </div>
      </div>
    );
}

export default Home