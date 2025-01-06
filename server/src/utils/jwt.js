const jwt = require("jsonwebtoken");

const generateToken = (userid,role) => {
    return jwt.sign({ userid, role }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

module.exports = { generateToken };
