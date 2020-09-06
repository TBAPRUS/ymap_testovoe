exports.frontend = (req, res, next) => {
  res.status(200).sendFile('C:/testovoe/public/dist/index.html');
};
