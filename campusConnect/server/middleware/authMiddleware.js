const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;

  // 🔐 Check if token is present
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

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