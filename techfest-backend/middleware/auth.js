const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  let token = req.cookies?.token;

  if (!token && req.headers.authorization) {
    const parts = req.headers.authorization.split(" ");
    if (parts.length === 2 && parts[0] === "Bearer") {
      token = parts[1];
    }
  }

  if (!token) {
    return res.status(401).json({
      message: "No token provided"
    });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.user = decoded;

    next();

  } catch (err) {
    return res.status(401).json({
      message: "Invalid or expired token"
    });
  }
}

module.exports = auth;
