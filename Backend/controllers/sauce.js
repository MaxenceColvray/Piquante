const Sauce = require('../models/sauce')
const fs = require('fs');

exports.sauceAdd = (req, res, next) => {
    console.log(req.body.sauce)
    const sauceObject = JSON.parse(req.body.sauce);
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: []

    });
    console.log(sauce)
    sauce.save()
        .then(() => { res.status(201).json({ message: 'Objet enregistré !' }) })
        .catch(error => { res.status(400).json({ error }) })
};

exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
    Sauce.findOne({ _id: req.params.id })
        .then((sauce) => {
            if (sauce.userId != req.auth.userId) {
                res.status(401).json({ message: 'Not authorized' });
            } else {
                const filename = sauce.imageUrl.split('/images/')[1]
                fs.unlink(`images/${filename}`, () => {
                    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
                        .then(() => res.status(200).json({ message: 'Objet modifié!' }))
                        .catch(error => res.status(401).json({ error }));
                })
            }
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
};


exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            if (sauce.userId != req.auth.userId) {
                res.status(401).json({ message: 'Not authorized' });
            } else {
                const filename = sauce.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    Sauce.deleteOne({ _id: req.params.id })
                        .then(() => { res.status(200).json({ message: 'Objet supprimé !' }) })
                        .catch(error => res.status(401).json({ error }));
                });
            }
        })
        .catch(error => {
            res.status(500).json({ error });
        });
};


exports.saucesDisplay = (req, res, next) => {
    Sauce.find()
        .then(things => res.status(200).json(things))
        .catch(error => res.status(400).json({ error }));
};
exports.sauceDisplay = (req, res, next) => {
    console.log(req.params.id)
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({ error }));
};

exports.Liked = (req, res, next) => {
    console.log(req.body)
    switch (req.body.like) {
        case 1:
            Sauce.updateOne({ _id: req.params.id }, {
                $push: { usersLiked: req.body.userId },
                $inc: { likes: 1 }
            })
                .then(() => res.status(200).json({ message: 'Objet modifié !' }))
                .catch(error => res.status(400).json({ error }))
            break
        case -1:
            Sauce.updateOne({ _id: req.params.id }, {
                $push: { usersDisliked: req.body.userId },
                $inc: { dislikes: 1 }
            })
                .then(() => res.status(200).json({ message: 'Objet modifié !' }))
                .catch(error => res.status(400).json({ error }))
            break
        case 0:
            Sauce.findOne({ _id: req.params.id })
                .then((sauce) => {
                    if (sauce.usersLiked.includes(req.body.userId)) {
                        Sauce.updateOne({ _id: req.params.id }, {
                            $pull: { usersLiked: req.body.userId },
                            $inc: { likes: -1 }
                        })
                            .then(() => res.status(200).json({ message: 'Objet modifié !' }))
                            .catch(error => res.status(400).json({ error }))
                    } else if (sauce.usersDisliked.includes(req.body.userId)) {
                        Sauce.updateOne({ _id: req.params.id }, {
                            $pull: { usersDisliked: req.body.userId },
                            $inc: { dislikes: -1 }
                        })
                            .then(() => res.status(200).json({ message: 'Objet modifié !' }))
                            .catch(error => res.status(400).json({ error }))
                    } else {
                        console.log('erreur')
                        res.status(400).json({ message: 'erreur' })
                    }
                })
            break
        default:
            res.status(400).json({ message: 'erreur !' })
    }
};