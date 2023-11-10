import React, { createContext, useContext, useState } from 'react';

const UserListContext = createContext();

export const UserListProvider = ({ children }) => {
  const [listar, setListar] = useState(false);
  const [individual, setIndividual] = useState(false);
  const [nameindividual, setNameindividual] = useState('');
  const [idindividual, setIdindividual] = useState('');
  const [messages, setMessages] = useState([]);

  return (
    <UserListContext.Provider value={{ listar, individual, setIndividual, setListar, nameindividual, setNameindividual, idindividual, setIdindividual, messages, setMessages }}>
      {children}
    </UserListContext.Provider>
  );
};

export const useUserList = () => {
  return useContext(UserListContext);
};