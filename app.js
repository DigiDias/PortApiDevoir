require('dotenv').config({ path: './env/.env' }); // Charger les variables d'environnement

const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session); // Utiliser MongoDB comme store de session
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const methodOverride = require('method-override');

// Importation des routers
const indexRouter = require('./routes/index'); // Route d'accueil et tableau de bord
const usersRouter = require('./routes/users');  // Route pour les utilisateurs
const catwaysRouter = require('./routes/catways');  // Route pour les catways
const reservationsRouter = require('./routes/reservations');  // Route pour les réservations
const loginFormRouter = require('./routes/loginFormRoute');  // Route pour la connexion par formulaire

const mongodb = require('./db/mongo');

// Initialisation de la connexion à MongoDB
mongodb.initClientDbConnection();

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

// Configuration du moteur de template EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Configuration du store MongoDB pour les sessions
const store = new MongoDBStore({
    uri: process.env.URL_MONGO, // URL de connexion à MongoDB
    collection: 'sessions' // Collection pour stocker les sessions
});

store.on('error', function(error) {
    console.error("Erreur avec MongoDBStore :", error);
});


// Utilise method-override pour remplacer la méthode POST par DELETE ou PUT
app.use(methodOverride('_method')); // '_method' correspond au nom du champ caché dans le formulaire

// Middleware pour gérer la session
app.use(session({
    secret: process.env.SECRET_KEY || 'clé_secrète', // Clé secrète pour sécuriser les sessions
    resave: false,  // Ne pas resauvegarder la session si elle n'a pas été modifiée
    saveUninitialized: false,  // Ne pas créer une session pour les visiteurs non authentifiés
    store: store, // Utiliser MongoDBStore
    cookie: {
        httpOnly: true,  // Sécuriser le cookie pour qu'il ne soit pas accessible via JavaScript
        secure: process.env.NODE_ENV === 'production', // Utiliser un cookie sécurisé en production
        maxAge: 60 * 60 * 1000  // Durée de vie du cookie (1 heure ici)
    }
}));

// Middleware
app.use(cors({
    exposedHeaders: ['Authorization'],
    origin: '*'
}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Routes
app.use('/', indexRouter); // Routes d'accueil et tableau de bord
app.use('/users', usersRouter);  // Route pour les utilisateurs
app.use('/catways', catwaysRouter);  // Route pour les catways
app.use('/reservations', reservationsRouter);  // Route pour les réservations
app.use('/login', loginFormRouter);  // Route pour la connexion par formulaire

// Middleware de gestion des erreurs 404
app.use(function(req, res, next) {
    res.status(404).json({name: 'API', version: "1.0", status: 404, message: 'Not Found'});
});

module.exports = app; // Exporter l'application Express pour l'utiliser dans d'autres fichiers
