module.exports = (req, res, next) => {
    const authHeader = req.headers.autorization;
    const jwt = require("jsonwebtoken");
    const authConfig = require("../config/auth");
  
    if (!authHeader) res.status(401).send({ error: "No token provided" });
    
    const parts = authHeader.split(" ");
   
    if (!parts.length === 2) res.status(401).send({ error: "Token error" });
  
    const [scheme, token] = parts;
  
    if (!/^Bearer$/i.test(scheme))
      res.status(401).send({ error: "Token malformatted" });
  
    jwt.verify(token, authConfig.secret, (err, decoded) => {
      if (err) return res.status(401).send({ error: "Token invalid" });
      req.user_id = decoded.id;
      return next();
    });
  };