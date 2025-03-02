const express = require('express')
const mongoose = require ('mongoose')
require ('dotenv').config()
const User= require('./models/User')
const Recipe = require('./models/Recipe');
const bcrypt=require('bcryptjs')


const app =  express()
const PORT = 3000
app.use(express.json());

//Home page api
app.get('/',(req,res)=>{
    res.send("<h1 align=centre>Welcome to the MERN stack week2 session</h1>")
})

//Registration page api
app.post('/register',async(req,res)=>{
    const {username,email,password}=req.body
    try{
        const hashedPassword = await bcrypt.hash(password,10)
        const user = new User({username,email,password:hashedPassword})
        await user.save()
        res.json({message: "User Registered.."})
        console.log("User Registration Completed..")
    }
    catch(err){
        console.log(err)
    }
})


//Login page api
app.post('/login',async(req,res)=>{
    const {email,password}=req.body
    try{
        const user = await User.findOne({email});
        if(!user || !(await bcrypt.compare(password,user.password))){
            return res.status(400).json({message: "Invalid Credentials"});
        }
        res.json({message: "Login Successful", username: user.username});
    }
    catch(err){
        console.log(err)
    }    
})

// Add Recipe API
app.post('/recipes', async (req, res) => {
    const { title, ingredients, instructions, image } = req.body;
    try {
      const recipe = new Recipe({ title, ingredients, instructions, image });
      await recipe.save();
      res.json({ message: "Recipe added successfully", recipe });
      console.log("Recipe added:", recipe);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Server error while adding recipe" });
    }
  });

mongoose.connect(process.env.MONGO_URL).then(
    () => console.log('Connected to MongoDB')
).catch(
    (err) => console.log(err)
)

app.listen(PORT, (err)=>{
    if (err)
    {
        console.log(err)
    }
    console.log("Server is running on port :"+PORT)
})
