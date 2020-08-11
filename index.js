// index.js


var express = require("express");
const app = express();
methodOverride = require("method-override");
app.use(methodOverride("_method"));

var bodyparser = require("body-parser");
const port = process.env.PORT || "3000";

var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blogDB",{useNewUrlParser:true});

app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended:true}));
app.set("view engine","ejs");

var articleSchema = new mongoose.Schema({
   title: String,
   description: String
});

var Article = mongoose.model("Article",articleSchema);

/**
 * Routes Definitions
 */

 app.get('/', function (req, res){
    Article.find({},function(err, articles){
       if(err){
         console.log("Deu erro ao buscar os artigos");
         console.log(err);
       }else{
         res.render('indexPage.ejs',{articles});
       }
    })
 });

 app.get('/loginPage', function(req,res){
    res.render('LoginPage.ejs');
 });

 app.get('/addArticlePage',function(req,res){
    res.render('AddArticlePage.ejs');
 });

 app.post('/createArticle',function(req,res){
   var title = req.body.title;
   var description = req.body.description;
   if(title != "" && description != ""){
      Article.create({
         title: title,
         description: description
      }, function(err, article){
         if(err){
            console.log("Deu erro no cadastro do artigo!");
            console.log(err);
         }else{
            console.log("Artigo cadastrado com sucesso!");
            console.log(article);
         }
         res.redirect('/');
      });
   }
 });

/**
 * Server Activation
 */

 app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
 });

 //to execute app
 //npm run dev