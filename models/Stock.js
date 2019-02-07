const
    mongoose = require('mongoose'),
    stockSchema = new mongoose.Schema({
        symbol: { type: String, required: true },
        watchingUsers: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }]
        // BONUS
        // snapshots: [{
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: 'Snapshot'
        // }]
    },{ timestamps: true });


const Stock = mongoose.model('Stock', stockSchema);
module.exports = Stock;