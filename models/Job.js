const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    customerName: { type: String, required: true },
    siteLocation: { type: String, required: true },
    productType: { type: String, required: true },
    jobType: { type: String, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Job', jobSchema);