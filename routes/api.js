const
    express = require('express'),
    apiRoutes = new express.Router(),
    apiController = require('../controllers/apis');

// index
apiRoutes.get('/allnews', apiController.index);
// get all symbols
apiRoutes.get('/companies', apiController.companies);
// get one company
apiRoutes.get('/company/:symbol', apiController.company);

module.exports = apiRoutes;