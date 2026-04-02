const serviceModel = require('../models/serviceModel');

async function getServices(req, res) {
  try {
    const services = await serviceModel.listServices();
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function reviewService(req, res) {
  try {
    const { id } = req.params;
    const { status } = req.body;
    await serviceModel.updateServiceStatus(id, status);
    res.json({ message: 'Service status updated' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = { getServices, reviewService };
