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
    }
}

