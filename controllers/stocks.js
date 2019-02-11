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
        // console.log(req.params.id);
        let id = req.params.id.toUpperCase();
        Stock.find({ symbol: id }, (err, stock) => {
            if (err) res.json({ success: false, err });
            res.json({ success: true, stock });
        })
    },
    // stock will be created when a user decides to like a stock, and it does NOT exist in DB
    create: (req, res) => {
        // console.log(req.body)
        // req.body.symbol and req.body.user._id
        Stock.create(req.body, (err, newStock) => {
            if (err) res.json({ success: false, err });
            res.json({ success: true, newStock });
            // add user ID into the new Stock's array of users
            newStock.watchingUsers.push(req.body.user._id);
            // save the newStock with user's id entered into it's array of watchers
            newStock.save(err => {
                // find the current user in DB
                User.findById(req.body.user._id, (err, foundUser) => {
                    if (err) res.json({ success: false, err });
                    // push the newStock's symbol into the user's array of watchedStocks
                    foundUser.watchedStocks.push(newStock.symbol);
                    foundUser.save(err => {
                        console.log(err || "successfully swapped references")
                    });
                });
            });
        });
    },
    update: (req, res) => {
        // find current user
        User.findById(req.body.user._id, (err, foundUser) => {
            if (err) res.json({ success: false, err })
            // check if the symbol is in the currentUser's watched list
            console.log("LINE 48 " + foundUser.watchedStocks)
            if (foundUser.watchedStocks.includes(req.body.symbol)) {
                // if it is, remove symbol from users stocks and 
                let stockIndex = foundUser.watchedStocks.indexOf(req.body.symbol)
                foundUser.watchedStocks.splice(stockIndex, 1);
                foundUser.save(err => {
                    if (err) res.json({ success: false, err })
                    console.log('removed symbol from users stock array')
                })
                // remove user from stocks users
                let symbol = req.body.symbol.toUpperCase()
                Stock.find({ symbol: symbol }, (err, foundStock) => {
                    if (err) res.json({ success: false, err })
                    console.log("LINE 61 " + foundStock)
                    console.log("LINE 62 " + foundStock.watchingUsers)
                    console.log("LINE 63 " + req.body.user._id)
                    if (foundStock.watchingUsers.includes(req.body.user._id)) {
                        let userIndex = foundStock.watchingUsers.indexOf(req.body.user._id)
                        foundStock.watchingUsers.splice(userIndex, 1);
                        foundStock.save(err => {
                            if (err) res.json({ success: false, err })
                            console.log('removed userID from stocks array of users')
                        })
                    }
                })
                // else add symbol to users tocks and add user to stocks users
            } else {
                // push symbol into users watched stocks
                
                foundUser.watchedStocks.push(req.body.symbol)
                foundUser.save(err => {
                    if (err) res.json({ success: false, err })
                    console.log('pushed stock symbol into users watched stocks')
                    Stock.find({ symbol: req.body.symbol }, (err, foundStock) => {
                        if (err) res.json({ success: false, err })
                        console.log("LINE 80 " + foundStock.watchingUsers)
                        foundStock.watchingUsers.push(req.body.user._id)
                        foundStock.save(err => {
                            if (err) res.json({ success: false, err })
                            console.log('added userId to stocks array of users')
                        })
                    })
                })
            }
        })

    },
    destroy: (req, res) => {
        Stock.findByIdAndRemove(req.params.id, (err, deletedStock) => {
            if (err) res.json({ success: false, err });
            res.json({ success: true, payload: deletedStock });
        });
    }
}