//Imports
import express from 'express'


//Express Definition
const app = express();

app.use(express.json()) //Transforma el request body a json

const PORT = 3000

app.get('/ping',(_,res) =>{
    console.log("Someone pinged here!!!")
    res.send('pong')
})


app.listen(PORT,()=>{
    console.log(`Server runing on port ${PORT}`)
})