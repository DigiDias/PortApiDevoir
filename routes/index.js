var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('acceuil'); // Affiche la vue 'acceuil.ejs' (formulaire de connexion)
});

/* Route pour le tableau de bord */
router.get('/dashboard', function(req, res, next) {
  if (!req.session.userId) {
    // Si l'utilisateur n'est pas connecté, rediriger vers la page d'accueil
    return res.redirect('/');
  }
  
  // Si l'utilisateur est connecté, afficher la page du tableau de bord
  res.render('dashboard');
});

module.exports = router;
