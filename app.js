const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const app = express();


console.log(process.env.dbURL);

mongoose.Promise = global.Promise;


// tell express to use ip of request
app.set('trust proxy', true);

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false,
}));

app.use(express.static(path.join(__dirname,'../public')));

app.get((_r, res) => {
	res.status(200).send('Hello world');
});

app.use('/files', express.static(path.join(__dirname,'public/files')));

require('./startUp/db');
require('./routes')(app);

//defualt route
app.get('/ping', (req, res) => {
	res.status(200).end('Application Started Pong!');
});
const port = process.env.PORT || 80;
app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = app;
