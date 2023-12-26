const express = require('express')
const path = require('path')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {open} = require('sqlite')
const sqlite3 = require('sqlite3')
const dbPath=path.join(__dirname,'goodreads.db')
const app = express()
const router=express.Router()


router.use(express.json())
let db=null

const initializeDb= async()=>{
    db=await open({
        filename:dbPath,
        driver:sqlite3.Database
    })
    
}



router.post('/',async(request,response)=>{
    const {name,password} = request.body
    const getUsernameQuery = `
    SELECT * FROM user where name='${name}'
    `
    const userFound = await db.get(getUsernameQuery)
    console.log(userFound)

    const hashedPassword = await bcrypt.hash(userFound.password,10)
    if(userFound===undefined){
        response.status(404);
        response.send("Not Found Username")
    }else{
        const passwordStatus=await bcrypt.compare(password,hashedPassword)
        if(passwordStatus===true){
            const token=jwt.sign({name},'vamsi')
            response.send(token)
        }else{
            response.send("Incorrect Password")
        }
    }
    
})

initializeDb()


module.exports=router
