const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image:  [{ type: String }],
    price: { type: String, required: true },
    qty: { type: String, required: true },
});

module.exports = mongoose.model('Product', productSchema);
