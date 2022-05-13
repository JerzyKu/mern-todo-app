require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')

const app = express()

mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error', (error) => {console.log(error)})
db.once('open', () => console.log('Connectet to DB'))

app.use(express.json())


app.use('/tasks', require('./routes/task'))

app.listen(3001, () => {
    console.log('App listnen at port 3001');
})

