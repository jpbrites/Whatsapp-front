import React from "react";
import Home from "./pages/home";
import { AuthProvider } from "./AuthContext";
import { UserListProvider } from "./UserListContext";

function App() {
  return (
  <div>
    <AuthProvider>
      <UserListProvider>
        <Home/>
      </UserListProvider>
    </AuthProvider>
  </div>
  );
}

export default App;

/*
DESAFIOS OBRIGATÓRIOS

- Estudar a documentação do socket.io (criação de rooms) para fazer chats individuais
- Fazer os chats individuais

DESAFIOS OPCIONAIS

- Implementação de criação de conta e login
- Mostrar quantidade de msg não lidas
- Ser possível transitar em diferentes conversas
- Ser possível fixar uma conversa ao topo

*/