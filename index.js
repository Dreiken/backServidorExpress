const fs = require("fs")
const express = require("express")
const productsRouter = require("./apiproducts")
const handlebars = require("express-handlebars")
var path = require('path')
const { Server: HttpServer } = require('http')
const { Server: SocketServer } = require('socket.io')
const container = require('./container')
const ContainerMessages = require("./container")


const PORT = 8080

const app = express()
const httpServer = new HttpServer(app)
const io = new SocketServer(httpServer)

app.engine(
    "hbs",
    handlebars.engine({
        extname: "hbs",
        defaultLayout: 'index',
        layoutsDir: __dirname + "/public/views/layouts",
        partialsDir: __dirname + '/public/views/partials'
    })
)

app.set("views", path.join(__dirname,"/public/views"))
app.set("view engine", 'hbs')
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static("public"))

app.use("/api", productsRouter)

const server = httpServer.listen(PORT, () => {
    console.log(`Servidor http escuchando en puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en servidor: ${error}`))

app.get('/', (req, res) =>{
    res.render("postproducts", {})
})

io.on('connection', (socket) => {
    console.log(`Conectado: ${socket.id}`)
    socket.emit("table", products)
    socket.emit("messages", messages)

    socket.on('mensaje', (data) => {
        console.log(data)
    })

    socket.on("postingProduct", (data) => {
        productsFile.save(data)
        products.push(data)
        console.log("Producto guardado")
        io.sockets.emit("table", products)
      })
    
    socket.on("postingMessage", (data) =>{

        if(verifyMessage(data)){
            data.time = new Date(data.time).toUTCString()
            messagesFile.save(data)
            messages.push(data)
            console.log("Mensaje guardado")
            io.sockets.emit("messages", messages)
        }

        function verifyMessage(data){
            if(data.email.length > 5){
                return true
            }
            else {
                console.log("Mensaje incorrecto")
                return false
            } 
        }
    })
})

let productsFile = new container("./data/products.txt")
let messagesFile = new ContainerMessages("./data/messages.txt")
let products
let messages

productsFile.getAll().then(function(result){
    try{
        products = JSON.parse(result)
    }
    catch{
    }
    
})

messagesFile.getAll().then(function(result){
    try{
        messages = JSON.parse(result)
    }
    catch{
    }
    
})