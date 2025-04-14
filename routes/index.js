var express = require('express');
var router = express.Router();
const User = require('../models/users'); 

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('acceuil'); // Affiche la vue 'acceuil.ejs'
});

/* Route pour le tableau de bord */
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

    res.render('dashboard', { user }); //  Passe l'utilisateur à la vue
  } catch (error) {
    console.error("Erreur lors de la récupération de l'utilisateur :", error);
    res.status(500).send("Erreur serveur");
  }
});

module.exports = router;
