const jwt = require('jsonwebtoken');

const secrets = require('../config/secrets.js');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  //checking to validate token
  if(token) {
    jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
      if(err) {
        //token sucks
        res.status(401).json({ message: 'that tolkien sucks. YOU SHALL NOT PASS.'})
      } else {
        //token doesn't suck
        req.user = { username: decodedToken.username };
        next();
      }
    })
  } else{
    res.status(400).json({ message: 'I need a sweet, sweet tolkien'})
  }
};
