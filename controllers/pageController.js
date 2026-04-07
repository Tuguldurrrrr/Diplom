const Service = require('../models/Service');
const Order = require('../models/Order');
const User = require('../models/User');
const Report = require('../models/Report');
const db = require('../config/db');

exports.home = async (req, res) => {
  const services = await Service.approvedList();
  res.render('home/index', { title: 'Нүүр', services: services.slice(0, 6) });
};

exports.about = (req, res) => {
  res.render('home/about', { title: 'Бидний тухай' });
};

exports.dashboardMain = (req, res) => {
  if (req.user.role === 'admin') return res.redirect('/dashboard/admin');
  if (req.user.role === 'content_manager') return res.redirect('/dashboard/content-manager');
  if (req.user.role === 'operator') return res.redirect('/dashboard/operator');
  return res.redirect('/dashboard/customer');
};

exports.customerDashboard = async (req, res) => {
  const orders = await Order.byCustomer(req.user.id);
  res.render('dashboards/customer', { title: 'Хэрэглэгчийн самбар', orders });
};

exports.operatorDashboard = async (req, res) => {
  const services = await Service.byOperator(req.user.id);
  const orders = await Order.byOperator(req.user.id);
  res.render('dashboards/operator', { title: 'Операторын самбар', services, orders });
};

exports.adminDashboard = async (req, res) => {
  const users = await User.all();
  const summary = await Report.summary();
  res.render('dashboards/admin', { title: 'Админ самбар', users, summary });
};

exports.reportPage = async (req, res) => {
  const [orderStats] = await db.execute('SELECT status, COUNT(*) AS total FROM orders GROUP BY status');
  const [serviceStats] = await db.execute('SELECT status, COUNT(*) AS total FROM services GROUP BY status');
  res.render('reports/index', { title: 'Тайлан', orderStats, serviceStats });
};
