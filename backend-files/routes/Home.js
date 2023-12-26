const express = require('express')
const path = require('path')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {open} = require('sqlite')
const sqlite3 = require('sqlite3')
const middleWare = require('./MiddleWare')
const router=express.Router()
const app = express()

app.use(express.json())

const dbPath = path.join(__dirname,'goodreads.db')

let db=null 

const initializeDb=async()=>{
    db=await open({
        filename:dbPath,
        driver:sqlite3.Database
    })
}


router.get('/',middleWare,async(request,response)=>{
    const getBooksQuery=`
        SELECT * FROM book
    `
    const details =await db.get(getBooksQuery)
    response.send(details)
})


initializeDb()

module.exports = router