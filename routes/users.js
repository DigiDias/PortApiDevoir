const express = require('express');
const router = express.Router();

const service = require('../services/users');
const private = require('../middlewares/privates');

// Route pour récupérer un utilisateur par son ID
router.get('/:id', private.checkJWT, service.getUserById);  

// Route pour ajouter un utilisateur (POST au lieu de PUT)
router.post('/', service.add);  // Utiliser POST pour la création

// Route pour modifier un utilisateur
router.patch('/:id', private.checkJWT, service.update);  

// Route pour supprimer un utilisateur
router.delete('/:id', private.checkJWT, service.delete);  

// Route pour l'authentification (login)
router.post('/authenticate', service.authenticate); 

// Route pour récupérer tous les utilisateurs
router.get('/', service.getAllUsers);  

module.exports = router;
