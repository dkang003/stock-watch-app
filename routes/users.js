const
    express = require('express'),
    usersRouter = new express.Router(),
    usersController = require('../controllers/users.js'),
    verifyToken = require('../serverAuth').verifyToken;

// index
usersRouter.get('/', usersController.index);
// create new user
usersRouter.post('/', usersController.create);

// user login route
usersRouter.post('/', usersController.authenticate);

// protect the following routes by verifying token
usersRouter.use(verifyToken);
// protected routes
usersRouter.get('/:id', usersController.show);
usersRouter.patch('/:id', usersController.update);
usersRouter.delete('/:id', usersController.destroy);


module.exports = usersRouter;