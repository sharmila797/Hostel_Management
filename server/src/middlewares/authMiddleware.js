

const jwt = require("jsonwebtoken"); // Ensure jwt is imported
const cookieParser = require("cookie-parser"); // Ensure cookie-parser is installed and used in your server.js

// Helper function to verify JWT
const verifyToken = (token, secret) => {
  try {
    return jwt.verify(token, secret);
  } catch (err) {
    console.error("Token verification error:", err.message);
    return null;
  }
};

// Authentication Middleware
const authMiddleware = (req, res, next) => {
  const token = req.cookies.token; // Corrected to use `req.cookies`

  if (!token) {
    console.warn("No token found in cookies");
    return res.redirect("/"); // Redirect to login or homepage
  }

  const verified = verifyToken(token, process.env.JWT_SECRET); // Verify token
  if (verified) {
    req.user = verified; // Attach decoded user information to `req.user`
    return next(); // Proceed to the next middleware/route handler
  }

  console.warn("Token verification failed");
  return res.redirect("/"); // Redirect on failed verification
};



exports.protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Extract token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach student ID to request
      req.studentId = decoded.id;

      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = authMiddleware;




// const verifyToken = (token, secret) => {
//   try {
//       return jwt.verify(token, secret);
//   } catch (err) {
//       console.log(err);
//       return null;
//   }
// };

// const authMiddleware = (req, res, next) => {
//   const token = req.cookie.token;

//   if (!token) return res.redirect('/');

//   const verified = verifyToken(token, process.env.JWT_SECRET);
//   if (verified) {
//       req.user = verified;
//       return next();
//   }
//   res.redirect('/');
// };

// module.exports = authMiddleware










// const jwt = require('jsonwebtoken');

// exports.verifyToken = (req, res, next) => {
//   const token = req.cookies.authToken;

//   if (!token) {
//     return res.status(401).json({ success: false, message: 'Unauthorized' });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch (err) {
//     return res.status(403).json({ success: false, message: 'Invalid or expired token' });
//   }
// };























