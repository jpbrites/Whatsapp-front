import React, {useState, useEffect} from 'react'
import SendMessageIcon from '../../assets/send.png'
import { BsThreeDotsVertical, BsCameraVideoFill } from "react-icons/bs";
import { BiSearch } from "react-icons/bi";
import './styles.css'
import { useUserList } from '../../UserListContext';
import io from '../../Socket';
import { useAuth } from '../../AuthContext';

function IndividualChat({name_rec, id_rec}) {
  const [message, setMessage] = useState("");
  const { name,id } = useAuth();
  const { individual, setIndividual } = useUserList();
  //const roomName = `${id}_${id_rec}`;
  const { messages, setMessages } = useUserList();
  console.log(messages)
  //console.log('Numero da sala: '+roomName)

  const sendMessage = () => { // Enviar a mensagem privada para a sala individual
    if (message) {
      io.emit('private_message', {message,name,id});
      setMessage('');
    }
  };

  useEffect(() => {
    io.on('private_message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });
  }, []);
 
  return (
    <div className='chat-messages'>
            <div className='chat-options'>
              
              <div className='chat-item'>
                <div className='image-profile-individual'>{name_rec.charAt(0)}</div>
                <div className='title-chat-container'>
                  <span className='title-message'>{name_rec}</span>
                  <span className='last-message'>
                    {/*users.map((user, index) => (
                      <span>{user.name }{index + 1 < users.length ? ', ' : ''}</span>
                    ))*/}
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
              <img src={SendMessageIcon} alt='' className='send-message-icon' onClick={() => sendMessage(id_rec, message)}/>
            </div>
          </div>
  )
}

export default IndividualChat