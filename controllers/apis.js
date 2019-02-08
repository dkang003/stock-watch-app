const axios = require('axios');



module.exports = {
    // get all news
    index: (req, res) => {
        axios.get('https://api.iextrading.com/1.0/stock/market/news/last/10')
        .then(response => {
            res.json(response.data)
        }).catch(err => {
            debugger
        })
    },
    // returns all of the company objects
    companies: (req, res) => {
        axios.get('https://api.iextrading.com/1.0/ref-data/symbols')
        .then(response => {
            res.json(response.data)
        }).catch(err => {
            debugger
        })
    },
    // return one company
    company: (req, res) => {
        console.log('hit')
        axios.get(`https://api.iextrading.com/1.0/stock/${req.params.id}/company`)
        .then(response => {
            res.json(response.data)
        }).catch(err => {
            debugger
        })
    }
}

