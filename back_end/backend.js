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
    const refToken = jwt.sign(payload, process.env.REFRESH_SECRET_KEY, {expiresIn: '7d'})

    //This will store the cookie as an http only cookie in client browser
    res.cookie(
        'token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 3600000,
        }
    )
    res.cookie(
        'refToken', refToken, {
            httpOnly: true, 
            secure: process.env.NODE_ENV === 'production', 
            sameSite: 'lax',
            maxAge: 86400000 * 7
        }
    )

    //returns a json of the token
    res.json({ message: 'Login successful' })
});

app.post('/signup', (req, res) => {
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
    const refToken = jwt.sign(payload, process.env.REFRESH_SECRET_KEY, {expiresIn: '7d'})

    //This will store the cookie as an http only cookie in client browser
    res.cookie(
        'token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 3600000,
        }
    )
    res.cookie(
        'refToken', refToken, {
            httpOnly: true, 
            secure: process.env.NODE_ENV === 'production', 
            sameSite: 'lax',
            maxAge: 86400000 * 7
        }
    )

    //returns a json of the token
    res.json({ message: 'Signup successful' })
})

//This will allow for the user session to refresh whenever they use a feature requiring authorization
app.post('/refresh-token', (req, res) => {
    const refToken = req.cookies.refToken

    if(!refToken){
        return res.status(401).json({message: 'No Refresh Token Found'})
    }

    try{
        const decoded = jwt.verify(refToken, process.env.REFRESH_SECRET_KEY)
        const payload = {
            userid: decoded.userid,
            username: decoded.username,
            roles: decoded.roles,
        }

        console.log(payload)
    
        const newToken = jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: '1h'})
    
        res.cookie(
            'token', newToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 3600000,
            }
        )
        
        return res.json({message: 'Successfully refreshed the token'})
    }catch(error){
        return res.status(403).json({message: 'Invalid Ref token'})
    }

})

app.get('/authorized', (req, res) => {
    const token = req.cookies.token;
    console.log(token)

    if(!token){
        console.log('/authorized: session expired')
        return res.status(401).json({message: 'Unauthorized User'})
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if(err){
            console.log('/authorized: token not valid')
            return res.status(401).json({message: 'Unauthorized User'})
        }
        const { userid, username, email } =  decoded;
        return res.json({message: 'Authorized', user: {userid, username, email}})
    })
})

//This will set the user session named token to expire immediately meaning the user is now logged out
app.post('/logout', (req, res) => {
    res.cookie('token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        expires: new Date(0) // Set the cookie to expire immediately
    });
    res.cookie('refToken', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        expires: new Date(0) // Set the cookie to expire immediately
    });
    res.json({ message: 'Logout successful' });
})

//initializes the server to begin listening to http requests from the front end
app.listen(port)

