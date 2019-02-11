const
    Stock = require('../models/Stock.js'),
    User = require('../models/User.js');

module.exports = {
    index: (req, res) => {
        Stock.find({}, (err, stocks) => {
            if (err) res.json({ success: false, err });
            res.json({ success: true, stocks });
        })
    },
    show: (req, res) => {
        Stock.findById(req.params.id, (err, stock) => {
            if (err) res.json({ success: false, err });
            res.json({ success: true, stock })
        })
    },
    // stock will be created when a user decides to like a stock, and it does NOT exist in DB
    create: (req, res) => {
        Stock.create(req.body, (err, newStock) => {
            if (err) res.json({ success: false, err });
            res.json({ success: true, newStock });
            // add user ID into the new Stock's array of users
            newStock.watchingUsers.push(req.user._id);
            // save the newStock with user's id entered into it's array of watchers
            newStock.save(err => {
                // find the current user in DB
                User.findById(req.user._id, (err, foundUser) => {
                    if (err) res.json({ success: false, err });
                    // push the newStock's symbol into the user's array of watchedStocks
                    foundUser.watchedStocks.push(newStock._id);
                    console.log("newStock ID " + newStock._id)
                    foundUser.save(err => {
                        console.log(err || "successfully swapped references")
                    });
                });
            });
        });
    },
    removeReference: (req, res) => {
        User.findById(req.user._id, (err, user) => {
            if (err) res.json({ success: false, err })
            let index = user.watchedStocks.indexOf(req.params.id)
            user.watchedStocks.splice(index, 1);
            console.log("YAY removed stock from the users watched stocks array")
            user.save(err => {
                if (err) res.json({ success: false, err })
                Stock.findById(req.params.id, (err, stock) => {
                    if (err) res.json({ success: false, err })
                    // TypeError: Cannot read property 'watchingUsers' of undefined
                    let index = stock.watchingUsers.indexOf(req.user._id)
                    stock.watchingUsers.splice(index, 1);
                    stock.save(err => {
                        console.log("Removed user's ID from the stock's array of watching users")
                    })
                })
            })
        })

    },
    addReference: (req, res) => {
        User.findById(req.user._id, (err, user) => {
            if (err) res.json({ success: false, err })
            user.watchedStocks.push(req.params.id)
            console.log("YAY added stock ID to users array of stocks")
            user.save(err => {
                if (err) res.json({ success: false, err })
                Stock.findById(req.params.id, (err, stock) => {
                    if (err) res.json({ success: false, err })
                    stock.watchingUsers.push(req.user._id)
                    stock.save(err => {
                        if (err) res.json({ success: false, err })
                        console.log("Added user ID to stocks array of users!")
                    })
                })
            })
        })
    },
    destroy: (req, res) => {
        Stock.findByIdAndRemove(req.params.id, (err, deletedStock) => {
            if (err) res.json({ success: false, err });
            res.json({ success: true, payload: deletedStock });
        });
    },
    findSymbol: (req, res) => {
        Stock.find({ symbol: req.params.symbol.toUpperCase() }, (err, foundStock) => {
            if (err) res.json({ success: false, err });
            res.json({ success: true, payload: foundStock })
        })
    }
}