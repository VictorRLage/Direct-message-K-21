import '../App.css';
import React, { useEffect } from "react";
import { useState } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';

function Chat({socket, usuario, sala}) {
    const [msgAtual, setMsgAtual] = useState("") 
    const [listaMsg, setListaMsg] = useState([]) 

    const enviarMsg = async () =>{
        if (msgAtual !== ""){
            const msgData = {
                sala: sala,
                autor: usuario,
                mensagem: msgAtual,
                hora: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
            }

            await socket.emit("enviar_msg", msgData);
            setListaMsg((lista) => [...lista, msgData])
            setMsgAtual("")
        }
    }

    useEffect(() =>{
        socket.on("receber_msg", (data) =>{
            console.log(data);
            setListaMsg((lista) => [...lista, data])
        })
    }, [socket]);

    return (
        <div className="chat-window">
            <div className="chat-header">
                <p>Zap Zap</p>
            </div>
            <div className="chat-body">
                <ScrollToBottom className="message-container">
                {listaMsg.map((conteudoMsg) =>{
                    return <div className="message" id={usuario === conteudoMsg.autor ? "other" : "you"}>
                        <div>
                            <div className="message-content">
                                <p>{conteudoMsg.mensagem}</p>
                            </div>
                            <div className="message-meta">
                                <p id="time" >{conteudoMsg.hora}</p>
                                <p id="author" >{conteudoMsg.autor}</p>
                            </div>
                        </div>
                        </div>
                })}
                </ScrollToBottom>
            </div>
            <div className="chat-footer">
                <input type="text" value={msgAtual} placeholder="Digite sua mensagem" onChange={(event)=> {setMsgAtual(event.target.value)}}onKeyPress={(event) => {event.key === "Enter" && enviarMsg()}}/>
                <button onClick={enviarMsg}>&#9658;</button>
            </div>
        </div>
    )
}

export default Chat