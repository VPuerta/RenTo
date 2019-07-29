const express = require("express");
const passport = require('passport');
const router = express.Router();
const User = require("../models/User");

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

// Chat
const stream = require('getstream');
const client = stream.connect('mdq88ggqqy4c', '2vv7xbbp7vm3fkn92jjgxdmaxnyp6ymfyupfnsqevmctwe2vrm2hyq3mrbdykuh7', '56301');

router.get("/userData", (req,res)=>{
  let user = req.user;
  res.json(user)
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

router.post("/signup", (req, res, next) => {
  console.log("Signing up!");

  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  const city = req.body.city;

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
    const chatToken = client.createUserToken(username);

    const newUser = new User({
      username,
      password: hashPass,
      email,
      city,
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