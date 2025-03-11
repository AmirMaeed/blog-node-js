// const express = require("express");
// const router = express.Router();
// const User = require("../models/userModel");



// router.get("/register", (req, res) => {
//     res.render("register");
// });


// router.post("/register", async (req, res) => {
//     try{
//         const data = req.body;
//         const newUser = new User(data);
//          const response = await newUser.save();
//          res.render("login");

//     }catch(error){
//         console.error("Error adding post:", error);
//         res.status(500).send("Internal Server Error");
//     }
// });


// module.exports = router;



const express = require("express");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

const router = express.Router();

// Show Register Page
router.get("/register", (req, res) => {
  res.render("register");
});

// Register User
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ username, email, password: hashedPassword });
    res.redirect("/login");
  } catch (error) {
    res.send("Error creating user");
  }
});

// Show Login Page
router.get("/login", (req, res) => {
  res.render("login");
});

// Login User with Passport.js
router.post("/login", passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login",
}));

// Logout
router.get("/logout", (req, res) => {
  req.logout(() => {
    res.redirect("/");
  });
});

module.exports = router;
