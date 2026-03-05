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

app.get("/eventos?ativo=true", (req, res) => {
    const eventosAtivos = db.listarAtivos()
    res.status(200).json(eventosAtivos)
})

app.get("/eventos?modalidade=presencial", (req, res) => {
    const eventosPresenciais = db.listarPorModalidade("presencial")
    res.status(200).json(eventosPresenciais)
})

export default app