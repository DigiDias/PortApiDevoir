const express = require('express');
const router = express.Router();    

const service = require('../services/catways');
const private = require('../middlewares/privates');  // Middleware pour sécuriser certaines routes



// Affiche tous les catways
router.get('/', service.getAllCatways);

// Formulaire d'ajout d'un nouveau catway
router.get('/addCatways', service.showAddForm); 

// Ajout via formulaire
router.post('/addCatways', service.add);

// Formulaire de modification
router.get('/editCatways/:id', service.showEditForm);

// Mise à jour via formulaire
router.post('/editCatways/:id', service.update); 

// Suppression via bouton HTML
router.post('/delete/:id', service.delete);



// Mise à jour par API (JSON + JWT)
router.patch('/:id', private.checkJWT, service.update);

// Suppression par API (JSON + JWT)
router.delete('/:id', private.checkJWT, service.delete);



// Récupération d'un catway par ID
router.get('/:id', service.getCatwayById);

module.exports = router;
