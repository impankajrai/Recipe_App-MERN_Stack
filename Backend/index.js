require('dotenv').config();
const express=require('express');
const cookieParser=require('cookie-parser');
const app=express();
const cors=require('cors')
const { connectDatabase } = require('./src/Config')

//import all the routes here
const authantication = require('./src/routes/authantication')
const recipes = require('./src/routes/recipes')
//connect with database
connectDatabase()

//regular middleware
app.use(cors({origin:'http://localhost:3000', credentials:true,optionSuccessStatus:200}))

app.use(express.json())
app.use(express.urlencoded({extended:true}))


//cookies and file middleware
app.use(cookieParser())


//use router middlewares here
app.use('/api/auth',authantication)
app.use('/api/recipes',recipes)


app.listen(process.env.PORT,()=>{
    console.log(`server is running on port ${process.env.PORT}`)
})