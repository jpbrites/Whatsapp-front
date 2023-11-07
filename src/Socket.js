import socket from 'socket.io-client'; //Tem que instalar o socket.io-client

const io = socket('http://localhost:4000'); // Faz a conexão com o back através do websocket

export default io;