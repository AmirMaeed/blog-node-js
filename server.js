require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const postRoutes = require("./routes/postRoutes");
const userRoutes = require("./routes/userRoutes");

const postModel = require("./models/postModel");
const userModel = require("./models/userModel");

const app = express();
const db =require("./config/db");
db();
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public"))); // Serve static files

// Set EJS as view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Routes
app.use("/", postRoutes);
app.use("/", userRoutes);


// Home Page: Fetch All Posts
const Post = require("./models/postModel");
const User = require("./models/userModel");

const connectDB = require("./config/db");
const { title } = require("process");

//   // Route to render the Add Post page
// app.get("/addpost", (req, res) => {
//     res.render("addpost",{"title":"home"}); // Render the addpost.ejs file
// });

app.get("/", async (req, res) => {
  
    res.render("index");
});




app.get('/about',(req,res)=>{
  res.render('about')
})



app.get('/contact',(req,res)=>{
  const posts = Post.fin
  res.render('contact')
})
app.get('/team',(req,res)=>{
  res.render('team')
})


app.get('/register',(req,res)=>{
  res.render('register')
})



app.get('/register',(req,res)=>{
  res.render('register')
})

app.get('/login',(req,res)=>{
  res.render('login')
})


  
// Start servers
const PORT = process.env.PORT||3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
