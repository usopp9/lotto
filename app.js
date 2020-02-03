const express = require('express');

const index = require('./routes/index');
const bodyParser = require('body-parser'); //ajax data summit

const app = express();
const port = 3000;


app.use(bodyParser.json({limit: '50mb'})); //body 의 크기 설정
app.use(bodyParser.urlencoded({limit: '50mb', extended: true})); //url의 크기 설정


app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use('/', index);
 
app.listen( port, function(){
    console.log('Express listening on port', port);
});


