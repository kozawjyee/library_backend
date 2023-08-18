exports.badRequrest = (res, message) => {
  return res.status(400).json({
    error: true,
    message: message,
  });
};

exports.internalServerError = (res) => {
  return res.status(500).json({
    error: true,
    message: "Internal Server Error",
  });
};

exports.created = (res, data, message) => {
  return res.status(201).json({
    error: false,
    message: message,
    data: data,
  });
};

exports.unauthorized = (res, message) => {
  return res.status(401).json({
    error: true,
    message: message,
  });
};

exports.permissiondenied = (res, message) => {
  return res.status(403).json({
    error: true,
    message: message,
  });
};

exports.successful = (res, data, message) => {
  return res.status(200).json({
    error: false,
    message: message,
    data: data,
  });
};
