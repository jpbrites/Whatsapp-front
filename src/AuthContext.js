import { createContext, useContext, useState } from 'react';
import io from './Socket';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [joined, setJoined] = useState(false);

  const handleJoin = () => {
    if (name) {
        setId(io.id)
        io.emit("Join", name);
        setJoined(true)
    }
  }

  return (
    <AuthContext.Provider value={{ name, id, setName, joined, handleJoin }}>
      {children}
    </AuthContext.Provider>
  );
}
