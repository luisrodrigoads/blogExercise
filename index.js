// index.js


var express = require("express");
const app = express();
methodOverride = require("method-override");
app.use(methodOverride("_method"));

var bodyparser = require("body-parser");
const port = process.env.PORT || "3000";

var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blogDB",{useNewUrlParser:true,useUnifiedTopology: true});

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

 app.get('/article/:id',function(req,res){
   Article.findById(req.params.id, function(err, article){
      if(err){
         console.log(err);
      }else{
         res.redirect('/');
      }
   });
 });

 app.get('/article/:id/edit',function(req,res){
   Article.findById(req.params.id,function(err, article){
      if(err){
         console.log(err);
      }else{
         res.render('editArticle.ejs',{article});
      }
   })
 });

 app.put('/article/:id',function(req,res){
   var title = req.body.title;
   var description = req.body.description;
   Article.findByIdAndUpdate(req.params.id, {title: title,description: description}, function(err,article){
      if(err){
         console.log(err);
      }else{
         res.redirect('/article/'+req.params.id);
      }
   });
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

 app.delete('/article/:id',function(req,res){
   Article.findByIdAndRemove(req.params.id, function(err){
      if(err){
         console.log(err);
      }else{
         res.redirect('/');
      }
   });
 });

/**
 * Server Activation
 */

 app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
 });

 //to execute app
 //npm run dev