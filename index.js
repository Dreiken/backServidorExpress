const fs = require("fs")
const express = require("express")
const productosRouter = require("./apiproductos")
const handlebars = require("express-handlebars")
var path = require('path')

const PORT = 8080

const app = express()




app.engine(
    "hbs",
    handlebars.engine({
        extname: "hbs",
        defaultLayout: 'index',
        layoutsDir: __dirname + "/views/layouts",
        partialsDir: __dirname + '/views/partials'
    })
)

app.set("views", path.join(__dirname,"views"))
app.set("view engine", 'hbs')
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static("public"))

app.use("/api", productosRouter)

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en servidor: ${error}`))

app.get('/', (req, res) =>{
    res.render("postproductos", {})
})