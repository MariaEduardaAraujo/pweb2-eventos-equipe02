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

app.put("/eventos/:id", (req, res) => {
    const { id } = req.params
    const eventoAtual = req.body

    if (!id){
        res.status(422).json({mensagem: "Evento não encontrado"})
        return
    }
    
    db.atualizar(Number(id), eventoAtual)
    res.json({mensagem: "Evento atualizado"})
})

app.delete("/eventos/:id", (req, res) => {
    const { id } = req.params
    const evento = db.buscarPorId(Number(id))
    
    if(!evento){
        res.status(404).json({mensagem: "Evento não encontrado"})
        return
    }
    
    db.remover(Number(id))
    res.status(204).send()
})

app.get("/eventos", (req, res) => {
    const { ativo } = req.query
    if(ativo === "true"){
        const eventosAtivos = db.listarAtivos()
        res.status(200).json(eventosAtivos)
    }
})

app.get("/eventos", (req, res) => {
    const { modalidade } = req.query
    
    if(modalidade === "presencial"){
        const eventosPresenciais = db.listarPorModalidade("presencial")
        res.status(200).json(eventosPresenciais)
    }
})


export default app