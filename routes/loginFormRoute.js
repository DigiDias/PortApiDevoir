const express = require('express');
const router = express.Router();
const userService = require('../services/loginFromForm');

// Route pour l'authentification via formulaire
router.post('/dashboard', userService.loginFromForm);

module.exports = router;
