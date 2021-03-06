const
    express = require('express'),
    apiRoutes = new express.Router(),
    apiController = require('../controllers/apis'),
    verifyToken = require('../serverAuth').verifyToken; // USE THIS TO PROTECT THE ROUTES LATER!!!!


apiRoutes.use(verifyToken);

// index
apiRoutes.get('/allnews', apiController.index);
// get all symbols
apiRoutes.get('/companies', apiController.companies);
// get most active companies
apiRoutes.get('/mostactive', apiController.mostactive);
// get logo
apiRoutes.get('/getlogo/:symbol', apiController.logo);
// get one company
apiRoutes.get('/company/:symbol', apiController.company);
// get one company's charts
apiRoutes.get('/company/:symbol/chart', apiController.chart);
// related news
apiRoutes.get('/relatednews/:symbol', apiController.relatednews);

module.exports = apiRoutes;