import React, {useEffect} from 'react'
import './styles.css'
import { BiArrowBack } from "react-icons/bi";
import { useUserList } from '../../UserListContext';
import { useAuth } from '../../AuthContext';
import io from '../../Socket';
import IndividualChat from '../individual-chat';


function ListContacts({users}) {


  const { listar,individual, setIndividual, setListar, setNameindividual, setIdindividual, messages, setMessages } = useUserList();
  const { name, id } = useAuth();
  console.log(users)

  const handleIndividual = (user) => {
    if(individual){
        io.emit("leave_individual_chat");
        setMessages([])
        io.emit("start_individual_chat", user.id);
        setListar(!listar)
        setNameindividual(user.name)
        setIdindividual(user.id)
    }
    else{
        io.emit("start_individual_chat", user.id);
        setListar(!listar)
        setNameindividual(user.name)
        setIdindividual(user.id)
        setIndividual(!individual)
    }
  }
  
  return (
    <div className='list-container'>
        <div className='list-title'>
            <div>
                <BiArrowBack onClick={() => setListar(!listar)} size={35} style={{ color: 'white', cursor: 'pointer' }} />
                <span>Nova Conversa</span>
            </div>
        </div>
        <div>
            {
                users.map((user,index) => (
                    user.id === id ? (
                    <span> </span>
                    ) : (
                    
                    <div onClick={() => handleIndividual(user)} className='list-contact-container'>
                        <div className='list-contact-perfil'>{user.name.charAt(0)}</div>
                        <span className='list-contact-name'>{user.name}</span>
                    </div>
                    
                )
             ))
            }
        </div>
    </div>
  )
}

export default ListContacts