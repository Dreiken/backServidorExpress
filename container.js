const fs = require("fs")
const { inherits } = require("util")
const knex = require("./knexfile")
const dbmaria = knex.maria
const dblite = knex.sqlite

class Container{
    constructor (table){
        this.table = table
    }

    save(data){
        dbmaria("productos")
        .insert(data)
        .then(console.log("Producto AñadidoPP"))
        .catch((e) => {console.log("error:", e)})
        .finally("Save terminadoPP")
    }
}

class ContainerMessages extends Container{
    save(data){
        dblite("mensajes")
        .insert(data)
        .then(console.log("Producto AñadidoMM"))
        .catch((e) => {console.log("error:", e)})
        .finally("Save terminadoMM")
    }
}


/*
class Container{
    constructor (file){
        this.file = file
    }
    
    
    save(obj){
        let content = this.getAll()
        const path = this.file

        verifyAndAdd()

        function verifyAndAdd(){
            if(obj.title != null && obj.price != null && obj.thumbnail != null){
                addToFile(obj)
                console.log("Objeto real")
            }
            else{
                console.error("Objeto invalido")
            }
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

    modifyById(object, number){
        let arr = this.getAll()
        const path = this.file
        async function mod(){
            try{
                arr = await arr
                arr = JSON.parse(arr)
                arr = arr.filter(x => x.id != number)
                arr.push({object, "id": number})
                arr = JSON.stringify(arr)
                await fs.promises.writeFile(path, arr)
                console.log("Object deleted")
            }
            catch(err){
                console.error(err)
            }
        }
        mod()
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



class ContainerMessages extends Container{
        //copypaste porque no sabia como solo modificar la verifyAndAdd(), creo que directamente no se puede, pero no sé como sacar addToFile sin romper todo ahora
        save(obj){
            let content = this.getAll()
            const path = this.file
    
            verifyAndAdd()
    
            function verifyAndAdd(){
                if(obj.message != null && obj.email != null && obj.time != null){
                    addToFile(obj)
                    console.log("Objeto real")
                }
                else{
                    console.error("Objeto invalido")
                }
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
        }     
}

*/

module.exports = {productos: Container , mensajes : ContainerMessages}