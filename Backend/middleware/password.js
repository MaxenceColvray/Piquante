const { Model } = require('mongoose');
var passwordValidator = require('password-validator');

// Create a schema
var passwordSchema = new passwordValidator();

// Add properties to it
passwordSchema
.is().min(6)                                    // Minimum length 8
.is().max(100)                                  // Maximum length 100
.has().lowercase()                              // Must have lowercase letters
.has().digits()                                // Must have at least digits
.has().not().spaces()                           // Should not have spaces*/


module.exports = (req,res,next) => {
    if (passwordSchema.validate(req.body.password)){
        next()

    } else {
        return res
        .status(401)
        .json({error : "Le mot de passe n'est pas assez fort"})
    }
}