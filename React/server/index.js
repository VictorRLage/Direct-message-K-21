const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io")
const mysql = require("mysql")
app.use(cors());
app.use(express.json())

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "#Gf15533155708",
    database: "k21"
})

app.post('/registrar', (req, res) => {

    const nome = req.body.nome
    const usuario = req.body.usuario
    const email = req.body.email
    const senha = req.body.senha

    db.query("INSERT INTO usuario (nome, usuario, email, senha) VALUES (?,?,?,?)", [nome, usuario, email, senha], (err, result) => {

        if (err) {
            console.log(err);
            console.log('Erro ao realizar cadastro!');
            res.send({ mensagem: 'Erro ao realizar cadastro!', erro: err.sqlMessage })
        } else {
            console.log(result);
            console.log('Cadastro realizado com sucesso!');
            res.send({ mensagem: 'Cadastro realizado com sucesso!', erro: null })
        }
    })
})

app.post('/login', (req, res) => {

    const email = req.body.email
    const senha = req.body.senha

    db.query("SELECT * FROM usuario WHERE email = ? AND senha = ? ", [email, senha], (err, result) => {
        if (err) {
            res.send({ mensagem: 'Erro ao realizar login!', erro: err.sqlMessage })
            console.log(err);
        }

        if (result.length == 1) {
            res.send({nome: result[0].nome, usuario: result[0].usuario, mensagem: 'Login realizado com sucesso!', erro: null })
            console.log(result);
        } else if (result.length == 0) {
            res.send({ mensagem: "Email e ou senha incorretos!", status: 'Usuario não encontrado no sistema' })
            console.log("Email e ou senha incorretos!");
        } else {
            res.send({ mensagem: "Email e ou senha incorretos!", status: 'Mais de um usuario com esse login' })
            console.log("Email e ou senha incorretos!");
        }
    })
})

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) => {
    console.log("Usuario conectou:", socket.id);

    socket.on("entrar_sala", (data) => {
        socket.join(data)
        console.log(`Usuario ${socket.id} entrou na sala ${data}`)
    })

    socket.on("enviar_msg", (data) => {
        socket.to(data.sala).emit("receber_msg", data)
    })
    socket.on("disconnect", () => {
        console.log("Usuario desconectou:", socket.id)
    })
})


server.listen(3001, () => {
    console.log('||||||||||||||||||||||||||||||||||||||||||||||||||||||\n\t\tSERVIDOR LIGADO\n\t     http://localhost:3001\n||||||||||||||||||||||||||||||||||||||||||||||||||||||')
})

