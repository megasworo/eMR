const express = require('express');
const app = express();
const db = require("./models");
const nocache = require('nocache');
const cors = require('cors');
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(nocache());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hi there, my name is Yusham Developer')
})

// define error
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
})

app.use((error, req, res) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})

db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`listening on http://localhost:${PORT}`)
    })
})