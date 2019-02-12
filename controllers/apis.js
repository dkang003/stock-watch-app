const axios = require('axios');



module.exports = {
    // get all news
    index: (req, res) => {
        axios.get('https://api.iextrading.com/1.0/stock/market/news/last/10')
        .then(response => {
            res.json(response.data)
        }).catch(err => {
            console.log("apiController LINE 12")
        })
    },
    // returns all of the company objects
    companies: (req, res) => {
        axios.get('https://api.iextrading.com/1.0/ref-data/symbols')
        .then(response => {
            res.json(response.data)
        }).catch(err => {
            console.log("apiController LINE 21")
        })
    },
    // return one company
    company: (req, res) => {
        axios.get(`https://api.iextrading.com/1.0/stock/${req.params.id}/company`)
        .then(response => {
            res.json(response.data)
        }).catch(err => {
            console.log("apiController LINE 30")
        })
    },
    chart: (req, res) => {
        // console.log(req.params.symbol)
        axios.get(`https://api.iextrading.com/1.0/stock/${req.params.symbol}/chart/`)
        .then(response => {
            res.json(response.data)
        }).catch(err => {
            console.log("apiController LINE 39")
        })
    }
}

