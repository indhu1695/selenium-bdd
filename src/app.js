let express = require('express');
let path = require('path');
let _ = require('lodash');
let app = express();
let bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
    let filePath = path.resolve('src/index.html');
    res.sendFile(filePath);
});

app.post('/submit-form-data', function (req, res) {
    let filePath = path.resolve('src/formSubmitted.ejs');
    res.render(filePath, {name: _.startCase(req.body.name.toString())})
});

let server = app.listen(5000, function () {
    console.log('Node server is running..');
});