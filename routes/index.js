var express = require('express');
var router = express.Router();
const User = require('../models/users');
const private = require('../middlewares/privates');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); 

// Page d'accueil (acceuil.ejs)
router.get('/', function(req, res) {
  res.render('acceuil'); // Affiche la vue 'acceuil.ejs'
});

// Route sécurisée du tableau de bord
router.get('/dashboard', private.checkJWT, async function(req, res) {
  try {
    const user = req.decoded.user; // Informations utilisateur extraites du token JWT
    if (!user) {
      return res.redirect('/');
    }

    // Affiche le tableau de bord avec les informations utilisateur
    res.render('dashboard', { user });
  } catch (error) {
    console.error("Erreur lors de l'accès au tableau de bord :", error);
    res.status(500).send("Erreur serveur");
  }
});

// Route POST pour la soumission du formulaire de connexion
router.post('/dashboard', async (req, res) => {
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

    // Générer un token JWT
    const token = jwt.sign({ user: { id: user._id, email: user.email, username: user.username } }, process.env.SECRET_KEY, { expiresIn: '1h' });

    // Stocker le token dans un cookie
    res.cookie('auth_token', token, {
      httpOnly: true,  // Sécuriser le cookie pour qu'il ne soit pas accessible via JavaScript
      secure: process.env.NODE_ENV === 'production', // Si en mode production, le cookie sera sécurisé
      maxAge: 60 * 60 * 1000  // Durée du cookie (1 heure)
    });

    // Rediriger vers le tableau de bord après la connexion
    res.redirect('/dashboard');
  } catch (error) {
    console.error("Erreur lors de l'authentification :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

module.exports = router;

