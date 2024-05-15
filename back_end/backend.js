const express = require('express')
const cors = require('cors')
const path = require('path')

//Haven't initialzed a set db just yet we will get to that later...

const app = express()
app.use(express.static(path.join(__dirname, "public")))
app.use(cors())
app.use(express.json())

//the port hosting the website
const port = 3000

//initializes the server to begin listening to http requests from the front end
app.listen(port, ()=>{
    console.log("listening")
})
