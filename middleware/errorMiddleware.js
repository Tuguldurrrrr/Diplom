const notFoundHandler = (req, res) => res.status(404).render('errors/404');

const errorHandler = (err, req, res, next) => {
  console.error(err);
  res.status(500).render('errors/500', { message: err.message });
};

module.exports = { notFoundHandler, errorHandler };
