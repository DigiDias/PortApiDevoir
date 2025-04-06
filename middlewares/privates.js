const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

/**
 * Middleware pour vérifier la validité du token JWT.
 * 
 * Ce middleware vérifie si un token JWT est présent dans les en-têtes de la requête.
 * Si un token est trouvé, il est vérifié à l'aide de la clé secrète définie dans les variables d'environnement.
 * Si le token est valide, la requête continue avec les informations décodées attachées à `req.decoded`,
 * et un nouveau token est généré avec une nouvelle durée d'expiration.
 * 
 * Si le token est invalide ou manquant, une réponse d'erreur est renvoyée avec le statut approprié.
 * 
 * @async
 * @function
 * @param {Object} req - L'objet de la requête contenant les en-têtes de la requête HTTP.
 * @param {Object} res - L'objet de la réponse HTTP permettant d'envoyer la réponse.
 * @param {Function} next - La fonction de rappel pour passer au middleware suivant.
 * @returns {void} - La fonction ne renvoie rien, mais elle affecte l'objet `req` ou renvoie une réponse.
 */
exports.checkJWT = async (req, res, next) => {
  // Récupérer le token à partir des en-têtes de la requête
  let token = req.headers["x-access-token"] || req.headers["authorization"];
  
  // Si le token commence par "Bearer ", l'extraire de l'en-tête
  if (!!token && token.startsWith("Bearer ")) {
    token = token.slice(7, token.length); // Enlever le préfixe "Bearer "
  }
  
  if (token) {
    // Vérifier le token avec la clé secrète
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) {
        // Si le token n'est pas valide, renvoyer une erreur 401
        return res.status(401).json({ message: "token_not_valid" });
      } else {
        // Si le token est valide, ajouter les informations décodées dans req
        req.decoded = decoded;

        // Définir la durée d'expiration du token à 24 heures
        const expiresIn = 24 * 60 * 60; // 24 heures

        // Générer un nouveau token avec une nouvelle expiration
        const newToken = jwt.sign({ 
            user: decoded.user 
        }, 
        SECRET_KEY, 
        {
          expiresIn: expiresIn
        });
        
        // Ajouter le nouveau token dans l'en-tête de la réponse
        res.header("Authorization", "Bearer " + newToken);

        // Passer au middleware suivant
        next();
      }
    });
  } else {
    // Si aucun token n'est trouvé, renvoyer une erreur 401 avec un message "token_required"
    return res.status(401).json("token_required");
  }
};
