const jwt = require('jsonwebtoken');
const UserModel = require('../../model/login/user');

exports.login = async (req, res) => {
  const { userid, password } = req.body;

  try {
    const user = await User.findOne({ userid, password }); // Validate credentials
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Send token in an HTTP-only cookie
    res.cookie('authToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      maxAge: 3600000, // 1 hour
    });

    res.json({ success: true, data: { role: user.role } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
