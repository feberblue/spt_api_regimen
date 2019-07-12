const config = require('../config');

const headcors = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', config.headers.origin_client);
    res.header('Access-Control-Allow-Methods', config.headers.allow_method);
    res.header('Access-Control-Allow-Headers', config.headers.allow_headers);
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Allow', config.headers.allow_method);
    next();
};

module.exports = headcors;