const mongoose = require('mongoose');

const connect = async () => {
    await mongoose.connect('mongodb://localhost/ecommerce_Api');
}

module.exports = connect;