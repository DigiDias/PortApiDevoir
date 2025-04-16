const express = require('express');
const router = express.Router();

const service = require('../services/users');
const private = require('../middlewares/privates');
const userService = require('../services/loginFromForm');

//Routes GET/POST pour le formulaire de connexion
router.get('/addUsers', (req, res) => {
    res.render('users/addUsers'); // Rendre la vue addUsers.ejs

});     

// Route GET /dashboard
router.get('/dashboard', (req, res) => {
    res.render('dashboard'); // 
});


/**
 * @swagger
 * tags:
 *   name: Utilisateurs
 *   description: Gestion des utilisateurs
 */

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Récupérer un utilisateur par ID
 *     tags: [Utilisateurs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'utilisateur
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Utilisateur trouvé
 *       404:
 *         description: Utilisateur non trouvé
 */
router.get('/:id', private.checkJWT, service.getUserById);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Créer un nouvel utilisateur
 *     tags: [Utilisateurs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example:
 *               name: Jean Dupont
 *               email: jean@example.com
 *               password: secret
 *     responses:
 *       201:
 *         description: Utilisateur créé
 *       400:
 *         description: Requête invalide
 */
router.post('/', service.add);

/**
 * @swagger
 * /users/{id}:
 *   patch:
 *     summary: Modifier un utilisateur
 *     tags: [Utilisateurs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'utilisateur
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example:
 *               name: Nouveau Nom
 *               email: nouveau@email.com
 *     responses:
 *       200:
 *         description: Utilisateur modifié
 *       404:
 *         description: Utilisateur non trouvé
 */
router.patch('/:id', private.checkJWT, service.update);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Supprimer un utilisateur
 *     tags: [Utilisateurs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'utilisateur
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Utilisateur supprimé
 *       404:
 *         description: Utilisateur non trouvé
 */
router.delete('/:id', service.delete);

/**
 * @swagger
 * /users/authenticate:
 *   post:
 *     summary: Authentifier un utilisateur (login)
 *     tags: [Utilisateurs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example:
 *               email: jean@example.com
 *               password: secret
 *     responses:
 *       200:
 *         description: Authentification réussie
 *       401:
 *         description: Identifiants invalides
 */
router.post('/authenticate', service.authenticate);

// Route pour formulaire HTML
router.post('/login-form', userService.loginFromForm);


/**
 * @swagger
 * /users:
 *   get:
 *     summary: Récupérer tous les utilisateurs
 *     tags: [Utilisateurs]
 *     responses:
 *       200:
 *         description: Liste des utilisateurs
 */
router.get('/', service.getAllUsers);



module.exports = router;



