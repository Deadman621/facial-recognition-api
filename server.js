const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex');
require('dotenv').config();

const register = require('./controllers/register');
const profile = require('./controllers/profile');
const signin = require('./controllers/signin');
const image = require('./controllers/image');

const app = express();

const HOST = process.env.HOST;
const SVPORT = process.env.SVPORT;
const USER = process.env.USER;
const DBPORT = process.env.DBPORT;
const DBPASS = process.env.DBPASS;

const db = knex({
    client: 'pg',
    connection: {
      host : HOST,
      port : DBPORT,
      user : USER,
      password : DBPASS,
      database : 'facial-recognition'    
    } 
});

app.use(express.json());
app.use(cors());

app.get('/', (_req, res) => res.send('Welcome'));
app.get('/profile/:id', (req, res) => profile.handleProfile(req, res, db));
app.put('/image', (req, res) => image.handleImage(req, res, db));
app.post('/signin', (req, res) => signin.handleSignIn(req, res, db, bcrypt));
app.post('/register', (req, res) => register.handleRegister(req, res, db, bcrypt));
app.post('/imageurl', (req, res) => image.handleApiCall(req, res));

app.listen(SVPORT, () => console.log(`Server running on port ${SVPORT}`));