const fs = require("fs")
const express = require("express")

const app = express()

const PORT = 8080

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en servidor: ${error}`))

app.get('/', (req, res) =>{
    res.send({ mensaje: 'Que onda pa'})
})

app.get('/productos', (req, res) => {
    nuevo.getAll().then(function(result){
        res.send({array: JSON.parse(result)})
    })
})

app.get('/productoRandom', (req, res) => {
    //hardcodie el max
    let num = Math.floor(Math.random() * 3) + 1
    nuevo.getById(num).then(function(result){
        res.send({producto: result})
    })
})

class Contenedor{
    constructor (file){
        this.file = file
    }
    
    save(obj){
        let content = this.getAll()
        const path = this.file

        if(obj.title != null && obj.price != null && obj.thumbnail != null){
            console.log("Objeto real")
        }
        else{
            console.error("Objeto invalido")
        }

        async function addToFile(object){
            try{
                let arr = await content
                arr = JSON.parse(arr)
                console.log(arr)
                console.log(arr.length)
                if(arr.length == 0){
                    arr = []
                    object.id = 1
                }
                else{
                    const highIdArr = arr.map(x => x.id)
                    const max = Math.max.apply(null, highIdArr)
                    object.id = max + 1
                    
                }
                arr.push(object)
                const objJson = JSON.stringify(arr)
                await fs.promises.writeFile(path, objJson)
                console.log("Object added")
            }
            catch(err){
                console.log(err)
            }
        }

        addToFile(obj)
    }

    getById(number){
        let arr = this.getAll()
        async function wait(){
            try{
                arr = await arr
                arr = JSON.parse(arr)
                return arr.find(x => x.id == number)
            }
            catch(err){
                console.error(err)
            }
        }
        return wait()
    }

    getAll() {
        const path = this.file
        return read(path)
    }

    deleteById(number){
        let arr = this.getAll()
        const path = this.file
        async function del(){
            try{
                arr = await arr
                arr = JSON.parse(arr)
                arr = arr.filter(x => x.id != number)
                arr = JSON.stringify(arr)
                await fs.promises.writeFile(path, arr)
                console.log("Object deleted")
            }
            catch(err){
                console.error(err)
            }
        }
        del()
    }

    deleteAll(){
        const path = this.file
        async function del(){
            try{
                let arr = JSON.stringify([])
                await fs.promises.writeFile(path, arr)
            }
            catch(err){
                console.error(err)
            }
        }
        del()
    }
}

async function read(file){
    try{
        let content = await fs.promises.readFile(file, 'utf-8')
        const arr = content.split(/\r?\n/)
        return arr[0]
    }
    catch(err){
        console.log(err)
    }
}

const nuevo = new Contenedor("./productos.txt")
const guardar = {title: 'Fortaleza', price: '150', thumbnail: 'http'}
//nuevo.save(guardar)
//nuevo.getAll().then(value => console.log(value))
//const primero = nuevo.getById(1)
//nuevo.deleteById(2)
//nuevo.deleteAll()
//primero.then(value => console.log(value))