const verifyToken = (token, secret) => {
  try {
      return jwt.verify(token, secret);
  } catch (err) {
      console.log(err);
      return null;
  }
};

const authMiddleware = (req, res, next) => {
  const token = req.cookie.token;

  if (!token) return res.redirect('/');

  const verified = verifyToken(token, process.env.JWT_SECRET);
  if (verified) {
      req.user = verified;
      return next();
  }
  res.redirect('/');
};

module.exports = authMiddleware










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























