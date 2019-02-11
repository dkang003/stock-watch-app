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
                // before saving, we will push the newStock's symbol into the user's array of watchedStocks
                // find the current user in DB
                User.findById(req.body.user._id, (err, foundUser) => {
                    if (err) res.json({ success: false, err });
                    console.log("LINE 33 " + foundUser)
                    console.log("LINE 34 " + newStock)
                    console.log("Line 35 " + newStock._id)
                    foundUser.watchedStocks.push(newStock._id);
                    foundUser.save(err => {
                        console.log(err || "successfully swapped references")
                    });
                });
            });
        });
    },
    update: (req, res) => {
        Stock.find({ symbol: req.params.sym }, (err, updatedStock) => {
            if (err) res.json({ success: false, updatedStock });
            res.json({ success: true, updatedStock, message: "Update Stock Endpoint" });
        });
    },
    destroy: (req, res) => {
        Stock.findByIdAndRemove(req.params.id, (err, deletedStock) => {
            if (err) res.json({ success: false, err });
            res.json({ success: true, payload: deletedStock });
        });
    }
}