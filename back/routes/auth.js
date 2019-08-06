const express = require("express");
const passport = require('passport');
const router = express.Router();
const User = require("../models/User");
const uploadCloud = require('../cloudinary');


// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

// Chat
// stream clase para conectarnos a la plataforma de GetStream
const stream = require('getstream');
//client: para poder hacer peticiones a la plataforma nos identificamos con nuesta clave api key, api Secret,appID. lo necesitamos para poder obtenerel token de usuario
const client = stream.connect('476rbkbracqc', 'c5samscsckehakrs9syzhfjf86h2yywjv8vft78g5gam568pqajtk3jcatwkf3wp', '56355');

router.get("/userData", (req,res)=>{
  if(req.user){
    res.status(200).json(req.user)
  }
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, theUser, failureDetails) => {
    if (err) { res.status(500).json({ message: 'Something went wrong authenticating user' }); return; }
    // "failureDetails" contains the error messages from our logic in "LocalStrategy" { message: '...' }.

    if (!theUser) { res.status(500).json({ message: 'The user does not exists' }); return; }
    // save user in session

    req.login(theUser, (err) => {
      if (err) { res.status(500).json({ message: 'Session save went bad.' }); return; }
      // We are now logged in (that's why we can also send req.user)
      res.status(200).json(theUser);
    });
  })(req, res, next);
});

//actual write to cloudinary via the middleware specified in ../config/cloudinary.js
router.post('/signup/upload', uploadCloud.single("photo"), (req, res, next) => {
  console.log('photo: ', req.file);
  if (!req.file) {
    next(new Error('No file uploaded!'));
    return;
  }
  // get secure_url from the file object and save it in the 
  // variable 'secure_url', but this can be any name, just make sure you remember to use the same in frontend
  res.json({ photo: req.file.secure_url });
})


router.post("/signup", (req, res, next) => {
  console.log("Signing up!");

  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  const city = req.body.city;
  const photo= req.body.photo;
  const raiting = [];

  if (username === "" || password === "") {
    res.status(500).json({ message: 'Invalid username or password.' });
    return;
  }

  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      console.log("User already exists!");
      res.status(500).json({ message: 'User already exists' });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);
    //construimos el token, a partir del client creamos el token. le pasamos el username del usuario logado.
    const chatToken = client.createUserToken(username);
    
    const newUser = new User({
      username,
      password: hashPass,
      email,
      city,
      photo,
      raiting,
      chatToken
    });

    newUser
        .save()
        .then(() => {
          console.log("User saved!");
          res.status(200).json(newUser);
        })
        .catch(err => {
          console.log("Error saving the user:" + err);
          res.status(500).json({ message: 'Could not save user' });
        });
  });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.json({loggedOut: true, timestamp: new Date()})
});

module.exports = router;