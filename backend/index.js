const express = require('express')
const app = express()


const createLogin = require('./routes/Login')
const createHome=require('./routes/Home')

app.use(express.json())

app.listen(4000)





app.use('/login',createLogin)
app.use('/',createHome)





