// index.js


var express = require("express");
const app = express();
methodOverride = require("method-override");
app.use(methodOverride("_method"));

var bodyparser = require("body-parser");
const port = process.env.PORT || "3000";

app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended:true}));
app.set("view engine","ejs");

/**
 * Routes Definitions
 */

 app.get('/', function (req, res){
    res.render('indexPage.ejs');
 });

 app.get('/otherPage', function(req,res){
    res.render('otherPage.ejs');
 });

/**
 * Server Activation
 */

 app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
 });

 //to execute app
 //npm run dev