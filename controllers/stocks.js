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
        Stock.find({ symbol: req.params.sym }, (err, stock) => {
            if (err) res.json({ success: false, err });
            res.json({ success: true, stock });
        })
    },
    // stock will be created when a user decides to like a stock, and it does NOT exist in DB
    create: (req, res) => {
        Stock.create(req.body, (err, newStock) => {
            if (err) res.json({ success: false, err });
            res.json({ success: true, newStock });
            // add user ID into the new Stock's array of users
            newStock.watchingUsers.push(req.user.id);
            // save the newStock with user's id entered into it's array of watchers
            newStock.save(err => {
                // before saving, we will push the newStock's symbol into the user's array of watchedStocks
                // find the current user in DB
                User.findById(req.user.id, (err, user) => {
                    if (err) res.json({ success: false, err });
                    user.watchedStocks.push(newStock.symbol);
                    user.save(err => {
                        if (err) res.json({ success: false, message: "User could not update in Create" });
                        res.json({ success: true, message: "User added stock to his watched list" });
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