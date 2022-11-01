const knex = require("knex")

const configmaria = {
    development: {
        client: 'mysql',
        connection : {
            host: 'localhost',
            port: 3306,
            user: 'root',
            database: 'main'
        }
    }
    
}

const configlite = {
    development: {
        client: 'sqlite3',
        connection : { 
            filename: './data/db/mydb.sqlite'
        },
    useNullAsDefault: true
    }
}

const dbmaria = knex(configmaria.development)
const dblite = knex(configlite.development)

module.exports = { 
    maria: dbmaria, sqlite: dblite }