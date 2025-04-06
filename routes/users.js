
const express = require('express');
const router = express.Router();

const service = require('../services/users');
const private = require('../middlewares/private');

router.get('/:id', private.checkJWT, service.getUserById);  // Lire un utilisateur
router.put('/add', service.add);  //  Ajouter un utilisateur
router.patch('/:id', private.checkJWT, service.update);  //  Modifier un utilisateur
router.delete('/:id', private.checkJWT, service.delete);  //  Supprimer un utilisateur
router.post('/authenticate', service.authenticate);//Ajout de la route Authenticate

router.get('/', service.getAllUsers);  // Récupérer tous les utilisateurs


module.exports = router;
