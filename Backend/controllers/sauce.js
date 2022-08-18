//const Sauce = require('../models/sauce')

exports.sauceAdd = (req, res, next) => {
    console.log(req.body)
    console.log(req.auth)
    //res.json(decodedToken.userId)
    /*bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash
            });
            user.save()
                .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));*/
};