if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');

const api = require('./routes/api');
const config = require('./config')
const headcors = require('./routes/headcors');

const PORT = process.env.PORT || config.port_api;
const NAME_APP = config.name_app;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Add headers
app.use(headcors);
app.use(express.static(__dirname + '/public'));

//
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/uploads'),
    filename: (req, file, cb) => {
        cb(null, new Date().getTime().toString() + path.extname(file.originalname))
    }
});
app.use(multer({ storage }).single('imagen'));

app.use('/api', api);

/**
 * Error en la api
 */
app.use(function (err, req, res, next) {
    if (res.headersSent) {
        return next(err);
    }
    res.status(500);
    res.render('error.pug', { error: err });
});

/**
 * Usado para redireccionamiento a una pagina por defecto
 */
app.get('/', function (req, res) {
    res.sendFile('index.html');
});

app.use(function (req, res) {
    res.status(400);
    let url = req.originalUrl
    res.render('404.pug', { errorUrl: url });
});

app.listen(PORT, function () {
    console.log("App Name " + NAME_APP + ", Port:" + PORT);
});