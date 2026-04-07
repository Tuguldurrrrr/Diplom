const bcrypt = require('bcrypt');
const { body } = require('express-validator');
const User = require('../models/User');

exports.registerValidation = [
  body('full_name').notEmpty(),
  body('email').isEmail(),
  body('password').isLength({ min: 6 })
];

exports.showRegister = (req, res) => res.render('auth/register', { title: 'Бүртгэл' });
exports.showLogin = (req, res) => res.render('auth/login', { title: 'Нэвтрэх' });

exports.register = async (req, res) => {
  const { full_name, email, password, phone, role } = req.body;
  const existing = await User.findByEmail(email);
  if (existing) return res.status(400).send('Email бүртгэлтэй байна');
  const hashed = await bcrypt.hash(password, 10);
  await User.create({ full_name, email, password: hashed, phone, role: role || 'customer' });
  res.redirect('/auth/login');
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findByEmail(email);
  if (!user) return res.status(401).send('Нэвтрэх мэдээлэл буруу');
  const matched = await bcrypt.compare(password, user.password);
  if (!matched) return res.status(401).send('Нууц үг буруу');
  req.session.userId = user.id;
  res.redirect('/dashboard');
};

exports.logout = (req, res) => req.session.destroy(() => res.redirect('/'));
