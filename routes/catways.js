const express = require('express');
const router = express.Router();    

const service = require('../services/catways');
const private = require('../middlewares/privates');  // Importer le middleware checkJWT

// Route pour récupérer un catway par ID (publique, sans JWT)
router.get('/:id', service.getCatwayById); // Récupérer un catway par ID

// Route pour créer un nouveau catway (publique, sans JWT)
router.post('/', service.add); // Créer un nouveau catway       

// Route protégée par JWT pour mettre à jour un catway par ID
router.patch('/:id', private.checkJWT, service.update); // Mettre à jour un catway par ID

// Route protégée par JWT pour supprimer un catway par ID
router.delete('/:id', private.checkJWT, service.delete); // Supprimer un catway par ID

// Route pour récupérer tous les catways
router.get('/', service.getAllCatways); // Récupérer tous les catways

module.exports = router;
