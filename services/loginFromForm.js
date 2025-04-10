// services/loginFromForm.js

const User = require('../models/users');
const bcrypt = require('bcrypt');   
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;

exports.loginFromForm = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.render('acceuil', { error: 'Utilisateur non trouvé' }); // ou redirige avec un message
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.render('acceuil', { error: 'Mot de passe incorrect' });
        }

        // Stocker l'utilisateur en session
        req.session.userId = user._id; // Stocker l'ID de l'utilisateur dans la session

        // Si tout est OK, rediriger vers le tableau de bord
        res.redirect('/dashboard');
    } catch (error) {
        console.error("Erreur d'authentification via formulaire :", error);
        res.status(500).send("Erreur serveur");
    }
};
