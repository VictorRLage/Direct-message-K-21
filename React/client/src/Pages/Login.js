import '../App.css';
import io from 'socket.io-client';
import { useState } from 'react';
import Chat from '../Components/Chat';

const socket = io.connect("http://localhost:3001");

function Login() {
  var usuario = sessionStorage.getItem("usuarioStorage");
  const [sala, setSala] = useState("");
  const [mostrarChat, setMostrarChat] = useState(false);

  
  const entrarSala = () => {
    if (sala !== ""){
      socket.emit("entrar_sala", sala)
      setMostrarChat(true)
    }
  }

  return (
    <div className="App">
      {!mostrarChat ? (
      <div className='joinChatContainer'>
      <h3>Entre no Zap</h3>
      <input type="text" placeholder='ID sa sala' onChange={(event)=> {setSala(event.target.value)}}></input>
      <button onClick={entrarSala}>Entrar na sala</button>
      </div>
      )
      :(
      <Chat socket={socket} usuario={usuario} sala={sala}/>
      )}
    </div>
  );
}

export default Login;
