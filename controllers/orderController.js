const Order = require('../models/Order');
const Service = require('../models/Service');
const File = require('../models/File');

exports.createPage = async (req, res) => {
  const service = await Service.findById(req.params.serviceId);
  res.render('orders/create', { title: 'Захиалга үүсгэх', service });
};

exports.create = async (req, res) => {
  await Order.create({ ...req.body, customer_id: req.user.id, service_id: req.params.serviceId });
  res.redirect('/orders/history');
};

exports.history = async (req, res) => {
  const orders = req.user.role === 'customer' ? await Order.byCustomer(req.user.id) : await Order.byOperator(req.user.id);
  res.render('orders/history', { title: 'Захиалгын түүх', orders });
};

exports.updateStatus = async (req, res) => {
  await Order.updateStatus(req.params.id, req.body.status);
  res.redirect('/orders/history');
};

exports.uploadPage = async (req, res) => {
  const order = await Order.byId(req.params.orderId);
  const files = await File.byOrder(req.params.orderId);
  res.render('orders/upload', { title: 'Файл оруулах', order, files });
};

exports.upload = async (req, res) => {
  await File.create({
    order_id: req.params.orderId,
    file_name: req.file.originalname,
    file_path: `/public/uploads/${req.file.filename}`,
    file_type: req.file.mimetype
  });
  res.redirect(`/orders/${req.params.orderId}/upload`);
};
