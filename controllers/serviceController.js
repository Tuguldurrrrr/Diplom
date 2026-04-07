const Service = require('../models/Service');
const ServiceCategory = require('../models/ServiceCategory');

exports.list = async (req, res) => {
  const services = await Service.approvedList(req.query.search || '');
  res.render('services/list', { title: 'Үйлчилгээ', services, search: req.query.search || '' });
};

exports.detail = async (req, res) => {
  const service = await Service.findById(req.params.id);
  res.render('services/detail', { title: service.title, service });
};

exports.operatorProfile = async (req, res) => {
  const services = await Service.byOperator(req.params.id);
  res.render('services/operator-profile', { title: 'Оператор профайл', services });
};

exports.createPage = async (req, res) => {
  const categories = await ServiceCategory.all();
  res.render('operator/create-service', { title: 'Зар үүсгэх', categories });
};

exports.create = async (req, res) => {
  await Service.create({ ...req.body, operator_id: req.user.id });
  res.redirect('/dashboard/operator');
};

exports.editPage = async (req, res) => {
  const service = await Service.findById(req.params.id);
  const categories = await ServiceCategory.all();
  res.render('operator/edit-service', { title: 'Зар засах', service, categories });
};

exports.edit = async (req, res) => {
  await Service.update(req.params.id, req.body);
  res.redirect('/dashboard/operator');
};

exports.remove = async (req, res) => {
  await Service.remove(req.params.id);
  res.redirect('/dashboard/operator');
};

exports.pendingList = async (req, res) => {
  const services = await Service.allPending();
  res.render('content-manager/dashboard', { title: 'Контент шалгалт', services });
};

exports.approve = async (req, res) => {
  await Service.updateStatus(req.params.id, 'approved');
  res.redirect('/dashboard/content-manager');
};

exports.reject = async (req, res) => {
  await Service.updateStatus(req.params.id, 'rejected');
  res.redirect('/dashboard/content-manager');
};
