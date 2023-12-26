const express = require('express')
const path = require('path')
const {open} = require('sqlite')
const sqlite3 = require('sqlite3')
const app = express()
const dbPath=path.join(__dirname,'./routes/goodreads.db')
console.log(dbPath)

const createLogin = require('./routes/Login')
const createHome=require('./routes/Home')

app.use(express.json())



    app.listen(4000)





app.use('/login',createLogin)
app.use('/',createHome)





