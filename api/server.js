const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const jwt = require('jsonwebtoken');


const authRouter = require('../auth/auth-router.js');
const usersRouter = require('../users/users-router.js');
const secrets = require('../config/secrets.js');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/api/auth', authRouter);
server.use('/api/users', usersRouter);

server.get('/', (req, res) => {
  res.send("It's alive!");
});

server.get('/token', (req, res) => {
   // use jsonwebtoken library to produce a token
  // add your name to the token's payload
  // const payload = {
  //   // subject is normally the user's id (who/what the token describes)
  //   subject: 'me', // translates unto the "sub" property on the token
  //   role: 'admin',
  // };
  // const secret = 'is it secret, is it safe?';
  // const options = {
  //   expiresIn: '8h',
  // };
  // const token = jwt.sign(payload, secret, options);
  // // return the token to the client

  const token = generateToken(user);

  res.status(200).json(token);
});


function generateToken(user) {
  const payload = {
    subject: user.id,
    name: user.username,
    gamertag: 'popelincoln87',
  };


  const options = {
    expiresIn: '1h',
  }


  return jwt.sign(payload, secrets.jwtSecret, options )
}


module.exports = server;
