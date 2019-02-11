const
    express = require('express'),
    stocksRoutes = new express.Router(),
    stocksController = require('../controllers/stocks.js'),
    verifyToken = require('../serverAuth').verifyToken; // USE THIS TO PROTECT THE ROUTES LATER!!!!


stocksRoutes.use(verifyToken);


// index
stocksRoutes.get('/', stocksController.index);
// create
stocksRoutes.post('/', stocksController.create);
// find by symbol
stocksRoutes.get('/symbol/:symbol', stocksController.findSymbol);
// show
stocksRoutes.get('/:id', stocksController.show);
// update
// stocksRoutes.patch('/:id', stocksController.update);
// delete
stocksRoutes.delete('/:id', stocksController.destroy);

// remove references
stocksRoutes.patch('/:id/remove', stocksController.removeReference);
// add references
stocksRoutes.patch('/:id/add', stocksController.addReference);


module.exports = stocksRoutes;