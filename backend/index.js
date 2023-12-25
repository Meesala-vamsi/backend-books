const express = require('express')
const path = require('path')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {open} = require('sqlite')
const sqlite3 = require('sqlite3')
const app = express()
const dbPath=path.join(__dirname,'goodreads.db')

const createLogin = require('./routes/Login')
const createHome=require('./routes/Home')

app.use(express.json())
let db=null

const initializeDb= async()=>{
    db=await open({
        filename:dbPath,
        driver:sqlite3.Database
    })
    app.listen(4000)
}




app.use('/login',createLogin)
app.use('/',createHome)





initializeDb();