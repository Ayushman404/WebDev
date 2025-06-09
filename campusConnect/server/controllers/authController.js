const User = require('../models/user.models.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // ✅ Check if all fields are given
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // ✅ Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: 'User created successfully' });

  } catch (err) {
    console.error('Signup Error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // 🔍 Check if user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    // 🔐 Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    // ✅ Generate token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // ✅ Send token to client
    res.status(200).json({
      message: "Login successful",
      token, // ← frontend needs to store this
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.userInfo = async (req, res)=>{
  try {
    // console.log(User.findOne({_id:req.user.userId}));
    if(!req.user){
      return res.json({msg: "User is not sent by auth"});
    }else{
      res.json({user: await User.findOne({_id:req.user.userId})})
    }
    
  } catch (error) {
    res.json({msg: "Error in providing userInfo"});
  }
}
