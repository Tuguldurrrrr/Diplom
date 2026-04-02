const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

async function register(req, res) {
  try {
    const { full_name, email, password, role } = req.body;
    const existing = await userModel.findByEmail(email);
    if (existing) return res.status(400).json({ message: 'Email already exists' });

    const password_hash = await bcrypt.hash(password, 10);
    const userId = await userModel.createUser({ full_name, email, password_hash, role });
    res.status(201).json({ message: 'Registered', userId });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await userModel.findByEmail(email);
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, role: user.role, name: user.full_name }, process.env.JWT_SECRET || 'dronehub-secret', { expiresIn: '8h' });
    res.json({ token, user: { id: user.id, name: user.full_name, role: user.role } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = { register, login };
