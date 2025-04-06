/**
 * Module de connexion à MongoDB.
 * 
 * Ce module initialise la connexion à la base de données MongoDB en utilisant Mongoose.
 * Il utilise l'URL de la base de données définie dans les variables d'environnement.
 * 
 * @module mongo
 */

const mongoose = require('mongoose');

// Options pour la connexion à la base de données MongoDB
/**
 * @typedef {Object} ClientOptions
 * @property {string} dbName - Le nom de la base de données à utiliser (ici 'PortApiDevoir').
 */
const clientOptions = {
  dbName: 'PortApiDevoir',
};

/**
 * Initialise la connexion à MongoDB en utilisant Mongoose.
 * 
 * Cette fonction établit une connexion à la base de données MongoDB spécifiée par l'URL de connexion
 * dans les variables d'environnement, et configure les options de connexion.
 * 
 * @async
 * @function
 * @throws {Error} Si la connexion échoue, une erreur sera lancée.
 * 
 * @example
 * // Exemple d'appel de la fonction pour initier la connexion
 * initClientDbConnection().then(() => {
 *   console.log('Base de données MongoDB connectée');
 * }).catch((error) => {
 *   console.error('Échec de la connexion à MongoDB', error);
 * });
 */
module.exports.initClientDbConnection = async () => {  
    try {
        await mongoose.connect(process.env.URL_MONGO, clientOptions);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB', error);
        throw error;
    }
};
