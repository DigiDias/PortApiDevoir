const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

exports.checkJWT = async (req, res, next) => {
  let token = req.cookies.auth_token;  // Récupérer le token depuis le cookie

  if (!token) {
    return res.status(401).json({ message: "token_required" }); // Si aucun token n'est trouvé
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.decoded = decoded;  // Ajouter les informations décodées dans req
    next(); // Passer au middleware suivant
  } catch (error) {
    return res.status(401).json({ message: "token_not_valid" });
  }
};

