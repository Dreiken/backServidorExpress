const fs = require("fs")
const express = require("express")
const productosRouter = require("./apiproductos")

const PORT = 8080

const app = express()

app.use(express.json())

app.use("/api", productosRouter)

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en servidor: ${error}`))

app.get('/', (req, res) =>{
    res.send({ mensaje: 'Que onda pa'})
})