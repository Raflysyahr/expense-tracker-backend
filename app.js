const express = require('express')
const cors = require('cors');
const { db } = require('./db/db');
const {readdirSync} = require('fs')
const app = express()
const helmet = require('helmet')
require('dotenv').config()

const PORT = process.env.PORT

//middlewares
app.use(express.json())
app.use(cors())
app.use(helmet());

//routes
readdirSync('./routes').map((route) => app.use('/api/v1', require('./routes/' + route)))

app.get('/',(req,res)=>{
    res.send(`<h1>Reached home!</h1>
            <br>
            <a href='/books'>Books</a>`);
})

const server = () => {
    db()
    app.listen(PORT, () => {
        console.log('listening to port:', PORT)
    })
}

server()
