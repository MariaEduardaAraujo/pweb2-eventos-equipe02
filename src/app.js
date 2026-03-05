import express from "express"
import { EventosDatabase } from './database/EventosDatabase.js';

const db = new EventosDatabase()
const app = express()
app.use(express.json())

app.get("/eventos", (req, res) => {
    const evento = db.listarTodos()
    res.status(200).json(evento)
})

app.get("/eventos/:id", (req, res) => {
    const { id } = req.params
    const evento = db.buscarPorId(Number(id))

    if(!evento){
        res.status(404).json({mensagem: "Evento não encontrado"})
        return
    }
    res.status(200).json({evento})
})

app.post("/eventos", (req, res) => {
    const { titulo, descricao, vagas, vagasDisponiveis,
        modalidade, cargaHoraria, ativo, dataCriacao } = req.body
    
    if(!titulo || !descricao || !vagas || !vagasDisponiveis
        || !modalidade || !cargaHoraria || !ativo || !dataCriacao){
        res.status(422).json({mensagem: "Campos obrigatórios ausentes"})
    }
    const novoEvento = db.inserir(req.body)
    res.status(201).json(novoEvento)
})

export default app