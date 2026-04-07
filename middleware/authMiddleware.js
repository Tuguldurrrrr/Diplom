const User = require('../models/User');

const attachUser = async (req, res, next) => {
  if (req.session.userId) {
    const user = await User.findById(req.session.userId);
    req.user = user;
    res.locals.currentUser = user;
  } else {
    res.locals.currentUser = null;
  }
  next();
};

const isAuthenticated = (req, res, next) => {
  if (!req.session.userId) return res.redirect('/auth/login');
  next();
};

const authorizeRoles = (...roles) => (req, res, next) => {
  if (!req.user || !roles.includes(req.user.role)) return res.status(403).render('errors/403');
  next();
};

module.exports = { attachUser, isAuthenticated, authorizeRoles };
