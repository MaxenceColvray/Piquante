const express = require('express'); //On importe le package express
const app = express();
const helmet = require("helmet");
require('dotenv').config()


const rateLimit = require("express-rate-limit")

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 300, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

// Apply the rate limiting middleware to all requests
app.use(limiter)

/*Ici on importe nos routeurs*/
const userRoutes = require('./routes/user');
const sauceRoutes = require('./routes/sauce');

const path = require('path');

/*Connection à notre BDD mongoDB */
const mongoose = require('mongoose');
mongoose.connect(`mongodb+srv://${process.env.DB_MONGODB}?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

    
/*Gère les erreurs de CORS*/
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(express.json()); //Convertit les requètes Post en objet utilisable
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use(helmet());

app.use('/api/auth/', userRoutes);
app.use('/api/sauces', sauceRoutes);



module.exports = app;
