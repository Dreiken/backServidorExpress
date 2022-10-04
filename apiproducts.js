const container = require('./container')
const express = require("express")

const {Router} = express
const router = Router()

router.get('/productos', (req, res) => {
    nuevo.getAll().then(function(result){
        try{
            const list = JSON.parse(result)
            res.render("getproducts", { productsList : list, listExists: true})
        }
        catch{
            res.render("getproducts", { listExists: false})
        }
        
    })
})

router.get('/productos/:id', (req , res) => {
    const {id} = req.params
    nuevo.getById(id).then(function(result){
        // comparar con undefined me parece bastante feo, deberia buscar una mejor forma de handlear el error
        if (result == undefined){
            res.send({error: "producto no encontrado"})
        }
        else{
            res.send({producto: result})
        }
    })
})

router.post('/productos', (req, res) => {
    const {title, price, thumbnail} = req.body
    //otra vez comparo con undefined
    if (title != undefined && price != undefined && thumbnail != undefined){
        var len
        nuevo.getAll().then(function(result){
            len = JSON.parse(result).length + 1
            res.send({producto: {title: title, price: price, thumbnail: thumbnail, "id": len}})
        })
        nuevo.save({title, price, thumbnail})
    }
    else{
        res.send({error : "datos incorrectos"})
    }
    
})

router.put('/productos/:id', (req, res) => {
    const {id} = req.params
    nuevo.modifyById(id)
    res.send({respuesta: "archivo modificado"})
})

router.delete('/productos/:id', (req, res) => {
    const {id} = req.params
    nuevo.deleteById(id)
    res.send({respuesta: "producto borrado"})
})

module.exports = router;

const nuevo = new container("./products.txt")
const guardar = {title: 'Fortaleza', price: '150', thumbnail: 'http'}
//nuevo.save(guardar)
//nuevo.getAll().then(value => console.log(value))
//const primero = nuevo.getById(1)
//nuevo.deleteById(2)
//nuevo.deleteAll()
//primero.then(value => console.log(value))