require('dotenv').config();

const
    express = require('express'),
    app = express(),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    MONGODB_URI = process.env.MONGODB_URI,
    PORT = process.env.PORT || 3001,
    path = require('path'),
    usersRoutes = require('./routes/users.js'),
    stocksRoutes = require('./routes/stocks.js');

// DB
mongoose.connect(MONGODB_URI, {useNewUrlParser: true}, (err) => {
    console.log(err || `Connected to mLab`)
})

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "client", "build")))
app.get('/api', (req,res) => {
    res.json({ message: "API ROOT" })
});

// ROUTES
app.use('/api/users', usersRoutes);
app.use('/api/stocks', stocksRoutes);

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
})

app.listen(PORT, (err) => {
    console.log(err || `Server running on port ${PORT}`)
})