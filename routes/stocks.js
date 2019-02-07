const
    express = require('express'),
    stocksRoutes = new express.Router(),
    stocksController = require('../controllers/stocks.js'),
    verifyToken = require('../serverAuth').verifyToken; // USE THIS TO PROTECT THE ROUTES LATER!!!!


// stocksRouter.use(verifyToken);


// index
stocksRoutes.get('/', stocksController.index);
// create
stocksRoutes.post('/', stocksController.create);
// show
stocksRoutes.get('/:id', stocksController.show);
// update
stocksRoutes.patch('/:id', stocksController.update);
// delete
stocksRoutes.delete('/:id', stocksController.destroy);

module.exports = stocksRoutes;