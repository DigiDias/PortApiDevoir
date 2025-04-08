const express = require('express');
const router = express.Router();

const service = require('../services/reservations');    
const private = require('../middlewares/privates');  // Importer le middleware checkJWT

// Route pour récupérer une réservation par ID (publique, sans JWT)
router.get('/:id', service.getReservationById); // Récupérer une réservation par ID 

router.post('/', service.add); // Créer une nouvelle réservation

router.patch('/:id', private.checkJWT, service.update); // Mettre à jour une réservation par ID

router.delete('/:id', private.checkJWT, service.delete); // Supprimer une réservation par ID

router.get('/', service.getAllReservations); // Récupérer toutes les réservations

module.exports = router;