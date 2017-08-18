var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var crypto = require('crypto');


var config = {
    user: 'ericabrahamea',
    database: 'ericabrahamea',
    host: 'db.imad.hasura-app.io',
    port: '51335',
    password: 'nopassword'
};


var app = express();
app.use(morgan('combined'));


var article = {
    'art1':{
    title: 'Article 1',
    date: '3-August-2017',
    header: 'This is my Javascript Article',
    paragraph:`<p>This is a paragraph which will be generated my the javascript code.</p>
    <br>
    <p>
    This paga is served by the help of the javscript template.
    </p>`
    },
    'art2':{
    title: 'Article 2',
    date: '3-August-2017',
    header: 'This is my Javascript Article',
    paragraph:`<p>This is a paragraph which will be generated my the javascript code.</p>`
    },
    'art3':{
    title: 'Article 3',
    date: '3-August-2017',
    header: 'This is my Javascript Article',
    paragraph:'<p>This is a paragraph which will be generated my the javascript code.</p>'
    }
};



function createTemplate (data){
    var title = data.title;
    var header = data.header;
    var date = data.date;
    var paragraph = data.paragraph;
    
var htmlTemplate=`<!doctype html>
        <html>
            <head>
        <title>${title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
         <link href="/ui/style.css" rel="stylesheet" />
            </head>
            <body>
                <div class="container">
                <div>
        <a href="/">Home</a>
                </div>
                <br>
                <div>
        ${header}
                </div>
        <br>
        <div>${date}</div>
        <p align=center>${paragraph}</p>
        </div>
                <script type="text/javascript" src="/ui/main.js">
                </script>
            </body>
        </html>
        `;
        return htmlTemplate;
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

//counter code
var counter = 0;
app.get('/counter',function(req,res){
    counter+=1;
    res.send(counter.toString());
});

var pool = new Pool(config);
app.get('/test-db',function(req,res){
// lets make a select request
//to test the database
pool.query('SELECT * FROM USER', function(err,result){
    if (err){
        res.status(500).send(err.toString());
    }else {
        res.send(JSON.stringfy(result));
    }
});
});

function hash(input){
    // function to create a hash
var  hashed = crypto.pbkdf2Sync('secret', 'salt', 10000, 512, 'sha512');
return hashed.toString('hex');
}


app.get('/hash/:input', function (req, res) {
    var hashedString = hash(req.params.input, 'this-is-my-rarndom-string');
    res.send(hashedString);
});

app.get('/a1', function (req, res) {
res.sendFile(path.join(__dirname, 'ui', 'a1.html'));
});

app.get('/a2', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'a2.html'));
});

app.get('/a3', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'a3.html'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});


var names = [];
app.get('/submit-name', function (req, res) { //will be listning to submit-name?name=XXXX
  //get the name from the request
  var name = req.query.name;
  names.push(name);
  //JSON: javascript obkect notation
  res.send(JSON.stringify(names));
});

app.get('/:artName', function (req, res) {
    var artName = req.params.artName;
  res.send(createTemplate(article[artName]));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
