const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middlewares/auth');
const jobController = require('../controllers/jobController');

router.get('/', auth, jobController.getJobs);

router.post(
  '/',
  [
    auth,
    check('customerName', 'Customer name is required').notEmpty(),
    check('siteLocation', 'Site location is required').notEmpty(),
    check('productType', 'Product type is required').notEmpty(),
    check('jobType', 'Job type is required').notEmpty(),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    jobController.createJob(req, res, next);
  }
);

router.delete('/:id', auth, jobController.deleteJob);

router.put(
    '/update/:id',
    [
        auth,
        check('customerName', 'Customer name is required').optional().notEmpty(),
        check('siteLocation', 'Site location is required').optional().notEmpty(),
        check('productType', 'Product type is required').optional().notEmpty(),
        check('jobType', 'Job type is required').optional().notEmpty(),
    ],
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        jobController.updateJob(req, res, next);
    }
);

module.exports = router;