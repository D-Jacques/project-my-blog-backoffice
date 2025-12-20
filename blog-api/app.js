// Initialisation, we use express so we're initializating express app by using express()
const express = require('express');
const homeRoutes = require('./routes/home');
const articleRoutes = require('./routes/article');
const mongoose = require('mongoose');
const app = express();

mongoose.connect("mongodb://localhost:27017/my-blog-db")
    .then(() => console.log("Connexion à mongoDB : réussie !"))
    .catch((err) => console.log("Connextion à mongoDB : échec !", err));

// It's very important to set the header configuration, without it, you can't get any data from your database !!!
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
})

// Allows express app to send back JSON responses to client.
app.use(express.json());

// Test route to check if our app is running correctly.
app.get('/', (req, res) => {
    res.send("Hello world !");
})

// We 'import' our route files here !
app.use('/home', homeRoutes);
app.use('/article', articleRoutes);

// VERY IMPORTANT : if we want to use our app in server.js, we HAVE to export it !!!!!!
module.exports = app;