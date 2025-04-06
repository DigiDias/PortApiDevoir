const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

/**
 * Schéma de l'utilisateur pour la base de données MongoDB.
 * Ce schéma définit les champs requis pour un utilisateur, y compris le nom d'utilisateur, le mot de passe et l'email.
 * 
 * @typedef {Object} User
 * @property {string} username - Le nom d'utilisateur de l'utilisateur (doit être unique).
 * @property {string} password - Le mot de passe de l'utilisateur (doit avoir au moins 6 caractères).
 * @property {string} email - L'email de l'utilisateur (doit être unique).
 */
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { 
        type: String, 
        required: true, 
        minlength: 6, // Mot de passe minimum de 6 caractères 
    },
    email: { type: String, required: true, unique: true },
});

/**
 * Middleware qui hache le mot de passe de l'utilisateur avant de sauvegarder dans la base de données.
 * Si le mot de passe est modifié, il est haché avec bcrypt avant d'être stocké.
 * 
 * @function
 * @async
 * @param {Function} next - La fonction callback qui permet de passer à l'étape suivante du processus de sauvegarde.
 * @throws {Error} Si le hachage du mot de passe échoue, une erreur est levée.
 */
userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10); // 10 c'est le nombre de tours de hachage (saltround : plus le nombre est élevé, plus le hachage est sécurisé mais plus il est lent)
    }
    next();
});

/**
 * Modèle Mongoose représentant un utilisateur.
 * Ce modèle permet de créer, lire, mettre à jour et supprimer des utilisateurs dans la base de données MongoDB.
 * 
 * @typedef {Object} UserModel
 * @see {@link https://mongoosejs.com/docs/models.html} Pour plus d'informations sur les modèles Mongoose.
 */
module.exports = mongoose.model('User', userSchema);
