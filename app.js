var express     =require("express"),
    app         =express(),
    bodyParser  =require('body-parser'),
    mongoose    =require('mongoose'),
    methodOverride=require("method-override"),
    passport    =require("passport"),
    LocalStrategy=require("passport-local"),
    User        =require("./models/user"),
    flash       =require("connect-flash"),
    Campground  =require("./models/campground");
    Comment     =require("./models/comment"),
    seedDB      =require("./seeds");

    var commentRoutes       = require("./routes/comments"),
        campgroundRoutes    = require("./routes/campgrounds"),
        indexRoutes          = require("./routes/index")



mongoose.connect("mongodb://localhost/my_collegebuzz",{useNewUrlParser: true})
// console.log(process.env.DATABASEURL)
// mongoose.connect(process.env.DATABASEURL,{useNewUrlParser: true})

app.use(bodyParser.urlencoded({extended:true}))
app.set("view-engine","ejs");
app.use(express.static(__dirname+"/public"));
app.use(methodOverride("_method"));
app.use(flash());
//seedDB();


//PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Welcome To my campus",
    resave:false,
    saveUninitialized: false
}));



app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
    res.locals.currentUser  = req.user;
    res.locals.error        =req.flash("error")
    res.locals.success      =req.flash("success")
    next();
});

app.use(indexRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);

var bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));

app.set("view engine","ejs")
//connecting the root page
app.get("/",function(req,res){
    res.render("landing");
})

app.listen(process.env.PORT,process.env.IP,function(){
    console.log("Ready");
});


PORT=1234;
app.listen(PORT,function(){
    console.log("Ready");
})
