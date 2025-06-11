const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  console.log("Authenticating User");
  const authHeader = req.get('Authorization');
  console.log(authHeader);

  // 🔐 Check if token is present
  if (!authHeader) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const token = authHeader;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(decoded);
    req.user = decoded; // Stores userId for later use
    console.log("Middleware done");
    next(); // Pass control to route handler
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

module.exports = verifyToken;