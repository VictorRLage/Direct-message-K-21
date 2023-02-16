import '../App.css';
import Axios from 'axios';
import React, { useState } from "react";
import Modal from '../Components/Modal';
import { useNavigate } from 'react-router-dom';



function Home() {

    const navigate = useNavigate();

    const [nomeReg, setNomeReg] = useState("")
    const [usuarioReg, setUsuarioReg] = useState("")
    const [emailReg, setEmailReg] = useState("")
    const [senhaReg, setSenhaReg] = useState("")

    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")

    const [openModal, setOpenModal] = useState(false)
    let [mensagem, setMensagem] = useState("")

    const registrar = () => {

        if (nomeReg !== '' && usuarioReg !== '' && emailReg !== '' && senhaReg !== '' && emailReg.indexOf("@") !== -1) {
            Axios.post('http://localhost:3001/registrar', {
                nome: nomeReg,
                usuario: usuarioReg,
                email: emailReg,
                senha: senhaReg
            }).then((response) => {
                console.log(response.data)
                if (response.data.erro == null) {
                    setOpenModal(true)
                    setMensagem(response.data.mensagem)
                } else {
                    setOpenModal(true)
                    setMensagem(response.data.mensagem)
                }
            })
        } else {
            setOpenModal(true)
            setMensagem('Erro ao realizar cadastro, verifique os campos e tente novamente!')
        }
    }

    const login = () => {

        if (email !== '' && senha !== '' && email.indexOf("@") !== -1) {
            Axios.post('http://localhost:3001/login', {
                email: email,
                senha: senha
            }).then((response) => {
                console.log(response.data)
                if (response.data.erro == null) {
                    setOpenModal(true)
                    setMensagem(response.data.mensagem)
                    sessionStorage.setItem("nomeStorage", response.data.nome);
                    sessionStorage.setItem("usuarioStorage", response.data.usuario);
                    sessionStorage.setItem("emailStorage", email);
                    setTimeout(() => {
                        navigate('/login', { replace: true });
                    }, 3000);
                } else {
                    setOpenModal(true)
                    setMensagem(response.data.mensagem)
                }
            })
        } else {
            setOpenModal(true)
            setMensagem('Erro ao realizar login, verifique os campos e tente novamente!')
        }
    }

    return (
        <div className="Home">
            {openModal && (<Modal closeModal={setOpenModal} mensagem={mensagem} />)}
            <div className="registration">
                <h1>Cadastro</h1>
                <label>Nome completo</label>
                <input type="text" onChange={(event) => { setNomeReg(event.target.value) }} />
                <label>Nome de exibição</label>
                <input type="text" onChange={(event) => { setUsuarioReg(event.target.value) }} />
                <label>Email</label>
                <input type="text" onChange={(event) => { setEmailReg(event.target.value) }} />
                <label>Senha</label>
                <input type="text" onChange={(event) => { setSenhaReg(event.target.value) }} />
                <button onClick={registrar}>Cadastrar</button>
            </div>
            <div className="login">
                <h1>Login</h1>
                <input type="text" placeholder="Email" onChange={(event) => { setEmail(event.target.value) }} />
                <input type="text" placeholder="Senha" onChange={(event) => { setSenha(event.target.value) }} />
                <button onClick={login}>Login</button>
            </div>
        </div>

    )
}

export default Home;
