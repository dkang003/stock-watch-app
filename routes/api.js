const
    express = require('express'),
    apiRoutes = new express.Router(),
    apiController = require('../controllers/apis');

// index
apiRoutes.get('/allnews', apiController.index);

module.exports = apiRoutes;