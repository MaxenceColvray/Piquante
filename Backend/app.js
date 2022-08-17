const express = require('express');
const app = express();
app.use(express.json());
const mongoose = require('mongoose');
const Thing = require('./models/thing');

mongoose.connect('mongodb+srv://maxence:Azerty444@cluster0.nmhpjpe.mongodb.net/?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.post('/api/auth/signup', (req, res, next) => {
    //delete req.body._id;
    console.log(req.body)
    const thing = new Thing({
        ...req.body
    });
    thing.save()
        .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
        .catch(error => res.status(400).json({ error }));
});

/*app.post('/api/auth/signup', (req, res, next) => {
    console.log(req.body);
    res.status(201).json({
      message: 'Objet créé !'
    });
  });*/

module.exports = app;
