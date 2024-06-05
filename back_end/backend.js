const express = require('express')
const cors = require('cors')
const path = require('path')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const cookieParser = require('cookie-parser')
const { v4: uuidv4 } = require('uuid');
require('dotenv').config()

//Haven't initialzed a set db just yet we will get to that later..

const app = express()
app.use(express.static(path.join(__dirname, "public")))
app.use(cors({
    origin:'http://localhost:3000',
    credentials: true, //This will allow our server to accept cookies from the front end
}))
app.use(express.json())
app.use(cookieParser());

//the port hosting the website
const port = 3001


//place holder for the users db collection: 
const users = [
    {
        userId: 1,
        email: 'yisakor.melke@gmail.com',
        username: 'yisakor.melke@gmail.com',
        password: 'password1'
    },
    {
        userId: 2,
        email: 'morgan.stanley@gmail.com',
        username: 'morgan.stanley@gmail.com',
        password: 'password2'
    }
]


app.post('/login', (req, res) => {
    console.log("backend /login endpoint reached")
    const { username, password } = req.body
    console.log('Username: ' + username)
    console.log('Password: ' + password)
    //Find the user in the users database
    const user = users.find((u) => u.username === username && u.password === password)

    if(!user){
        return res.status(401).json({ message: 'Invalid Username or Password'})
    }

    //For the roles we will go back and add more detail to the request
    const payload = {
        userid: user.userId,
        email: user.email,
        username: username,
        roles: 'user'
    }

    /*
    I made a secret key and stored it inside of an environment variable.
    Should be inside of the .env file

    basically this key allows our backend to make sure that the token being sent over 
    from the front end hasn't been messed or tampred with by attackers

    This is how I made it:
    -- Configure the sercret key using a random byte array of 32 bytes and then converts it to a hex string
    const secretKey = crypto.randomBytes(32).toString('hex')
    */

    //Making the json web token for the user (just using 1 for the uid for now)
    const token = jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: '1h'})

    //This will store the cookie as an http only cookie in client browser
    res.cookie(
        'token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
            maxAge: 3600000,
        }
    )

    //returns a json of the token
    res.json({ message: 'Login successful' })
});

app.post('signup', (req, res) => {
    const {email, username, passwrod} = req.body
    let uuid, notAvailable; 

    //Extremely low prob of a collision so wont hurt to just use a while
    do{
        uuid = uuidv4()
        notAvailable = users.find((u) => u.userId === uuid)
    } while(notAvailable)

    //ideally we should add a new user here with their unique id

    
    const payload = {
        userid: uuid,
        username: username,
        roles: 'user'
    }

    const token = jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: '1h'})

    //This will store the cookie as an http only cookie in client browser
    res.cookie(
        'token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
            maxAge: 3600000,
        }
    )

    //returns a json of the token
    res.json({ message: 'Signup successful' })

})

//initializes the server to begin listening to http requests from the front end
app.listen(port)

