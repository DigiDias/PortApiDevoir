var express = require('express');
var router = express.Router();
const User = require('../models/users');
const private = require('../middlewares/privates');

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

    // Stocker l'ID utilisateur dans la session
    req.session.userId = user._id;

    // Rediriger vers le tableau de bord après la connexion
    res.redirect('/dashboard');
  } catch (error) {
    console.error("Erreur lors de l'authentification :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

module.exports = router;
