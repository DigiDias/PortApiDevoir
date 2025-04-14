const express = require('express');
const router = express.Router();

const service = require('../services/reservations');
const private = require('../middlewares/privates');

// Récupérer toutes les réservations (liste)
router.get('/', service.getAllReservations);

// Créer une nouvelle réservation
router.post('/', service.add);

// Récupérer une réservation par ID
router.get('/:id', service.getReservationById);

// Afficher le formulaire de modification
router.get('/edit/:id', service.showUpdateReservationForm);

// Mettre à jour une réservation (nécessite un token JWT)
router.patch('/:id', private.checkJWT, service.update);

// Route pour supprimer une réservation, en utilisant la méthode DELETE
router.delete('/delete/:id', service.delete); 

// Cette ligne est ESSENTIELLE
module.exports = router;
