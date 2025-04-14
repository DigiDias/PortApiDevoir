// services/loginFromForm.js

const User = require('../models/users');
const bcrypt = require('bcrypt');

exports.loginFromForm = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.render('acceuil', { error: 'Utilisateur non trouvé' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.render('acceuil', { error: 'Mot de passe incorrect' });
        }

        // Stocker l'ID utilisateur en session
        req.session.userId = user._id;

        // Rediriger vers le dashboard
        res.redirect('/dashboard');
    } catch (error) {
        console.error("Erreur d'authentification via formulaire :", error);
        res.status(500).send("Erreur serveur");
    }
};
