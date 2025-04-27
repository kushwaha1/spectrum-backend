const { check } = require('express-validator');

exports.jobValidation = [
  check('customerName', 'Customer name is required').notEmpty(),
  check('siteLocation', 'Site location is required').notEmpty(),
  check('productType', 'Product type is required').notEmpty(),
  check('jobType', 'Job type is required').notEmpty(),
];

exports.authValidation = [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password must be 6 or more characters').isLength({ min: 6 }),
];