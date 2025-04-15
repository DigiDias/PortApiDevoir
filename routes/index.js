var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/users'); // Assurez-vous que ce chemin est correct

// Page d'accueil (acceuil.ejs)
router.get('/', function(req, res, next) {
  res.render('acceuil'); // Affiche la vue 'acceuil.ejs'
});

// Route GET pour afficher le tableau de bord
router.get('/dashboard', async function(req, res, next) {
  if (!req.session.userId) {
    // Si l'utilisateur n'est pas connecté, rediriger vers la page d'accueil
    return res.redirect('/');
  }

  try {
    const user = await User.findById(req.session.userId).lean(); 
    if (!user) {
      return res.redirect('/');
    }

    // Afficher le tableau de bord avec les données de l'utilisateur
    res.render('dashboard', { user });
  } catch (error) {
    console.error("Erreur lors de la récupération de l'utilisateur :", error);
    res.status(500).send("Erreur serveur");
  }
});

// Route POST pour gérer la soumission du formulaire de connexion
router.post('/dashboard', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Recherche de l'utilisateur par email
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.render('acceuil', { error: 'Utilisateur non trouvé' });
    }

    // Vérification du mot de passe
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.render('acceuil', { error: 'Mot de passe incorrect' });
    }

    // Stocker l'ID de l'utilisateur dans la session
    req.session.userId = user._id;

    // Rediriger vers le tableau de bord après la connexion
    res.redirect('/dashboard');
  } catch (error) {
    console.error("Erreur lors de l'authentification :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

module.exports = router;
``
