const { validationResult } = require("express-validator");

// middleware for formatting errors from express-validator middleware
// (to customize, see express-validator's documentation)
const handleValidationErrors = (req, _res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errors = validationErrors.array().map((error) => `${error.msg}`);

    const err = Error("Bad request.");
    err.errors = errors;
    err.status = 400;
    err.title = "Bad request.";
    next(err);
  }
  next();
};

const handleInsertSpots = (req, _res, next) => {
  // this is a middleware for handling errors that have happened in an insert of spots
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errorObj= {};

    const errors = validationErrors.array().forEach((error) => {
      let key = error.param;
      errorObj[key] = error.msg;
    });

    const err = Error("Validation Error");
    err.message = "Validation Error"
    err.statusCode = 400;
    err.errors = errorObj;
    _res.status(400)
    return _res.json({message:err.message, ...err});
    // next({ message: err.message, ...err });
  }
  next();
};

module.exports = {
  handleValidationErrors, handleInsertSpots
};
