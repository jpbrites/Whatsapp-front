import React from 'react';
import { useEffect, useState } from 'react';
import Image from '../../assets/profissao_programador.jpg';
import SendMessageIcon from '../../assets/send.png'
import './styles.css'
import io from '../../Socket';
import { useAuth } from '../../AuthContext';
import Login from '../login';
import moment from 'moment';
import { MdGroups } from "react-icons/md";
import { TbHistoryToggle } from "react-icons/tb";
import { SiSignal } from "react-icons/si";
import { RiChatNewFill } from "react-icons/ri";
import { BsThreeDotsVertical, BsCameraVideoFill } from "react-icons/bs";
import { BiSearch } from "react-icons/bi";
import ListContacts from '../../components/list-contacts';
import { useUserList } from '../../UserListContext';
import IndividualChat from '../../components/individual-chat';




//Só que temos o problema do CORS nos navegadores, então temos que utilizar um sem CORS
//Isso é para o Chrome, para outro deve pesquisar qual comando será
//Para isso, crie um atalho, o caminho do atalho será: "C:\Program Files\Google\Chrome\Application\chrome.exe" --disable-web-security --disable-gpu --user-data-dir=%LOCALAPPDATA%\Google\chromeTemp
//Nomeie o atalho como 'chrome no cors' e rode o front nele


function Home() {
    const { name,id, setName, joined, handleJoin } = useAuth();
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const { listar, setListar, individual, setIndividual, nameindividual, setNameindividual, idindividual, setIdindividual } = useUserList();
   
    console.log(users)
    

  
    useEffect(() => {
      io.on("users", (users) => setUsers(users))
      io.on("message", (message) => setMessages((messages) => [...messages, message]))
    }, [])
  

    const handleMessage = () => {
      if (message){
        const currentTime = moment().format('HH:mm');
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
          {listar ? (
            // Conteúdo da lista de usuários
            <ListContacts users={users}/>
          ) : (
            // Conteúdo da seção de conversas
            <div className='chat-contacts'>
              <div className='chat-options'>
                <div className='area-options'>
                  <div className='foto-user'>{name.charAt(0)}</div>
                  <div className='buttons-area'>
                    <MdGroups size={30}/>
                    <TbHistoryToggle size={30}/>
                    <SiSignal size={27}/>
                    <RiChatNewFill onClick={() =>  setListar(!listar)} size={30}/>
                    <BsThreeDotsVertical size={28}/>
                  </div>
                </div>

              </div>
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
          )}
  
          {
            individual ? (
              <IndividualChat name_rec={nameindividual} id_rec={idindividual}/>
            ) : (
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
                  <div className='area-options-rigth'>
                    <BsCameraVideoFill size={26}/>
                    <BiSearch size={26}/>
                    <BsThreeDotsVertical size={22}/>
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
            )
          }
       
        </div>
      </div>
    );
}

export default Home