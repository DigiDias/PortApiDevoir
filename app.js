require('dotenv').config({ path: './env/.env' }); // Charger les variables d'environnement

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

// Importation des routers
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');  //  route pour les utilisateurs
const catwaysRouter = require('./routes/catways');  //  route pour les catways
const reservationsRouter = require('./routes/reservations');  //  route pour les réservations

const mongodb = require('./db/mongo');

// Initialisation de la connexion à MongoDB
mongodb.initClientDbConnection();

const app = express();

// Configuration du moteur de template EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));  // Assurez-vous que les vues sont dans le dossier 'views'

// Middleware
app.use(cors({
    exposedHeaders: ['Authorization'],
    origin: '*'
}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Route pour la page d'accueil
app.get('/', (req, res) => {
    res.render('acceuil');  // Rendre le fichier acceuil.ejs (le formulaire de connexion)
});

// Définition des routes
app.use('/users', usersRouter);  // Route pour les utilisateurs
app.use('/catways', catwaysRouter);  // Route pour les catways
app.use('/reservations', reservationsRouter);  // Route pour les réservations

// Middleware de gestion des erreurs 404
app.use(function(req, res, next) { 
    res.status(404).json({name: 'API', version: "1.0", status: 404, message: 'Not Found'});
});

module.exports = app;
