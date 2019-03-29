var express= require("express");
var router=express.Router(); 
var passport=require("passport")
var User =require("../models/user")

//===============
//AUTH ROUTES
//===============

// show register form
router.get("/register",function(req,res){
    res.render("register",{page: 'register'});
});

router.post("/register",function(req,res){
    
    var newUser = new User({username:req.body.username,email:req.body.email ,college:req.body.college});

    if(req.body.admincode==='secret1234')
        newUser.isAdmin=true;

    User.register(newUser,req.body.password,function(err,user){
        if(err){
            console.log(err);
            return res.render("register", {error: err.message});
        }
        passport.authenticate("local")(req,res,function(){
            req.flash("success","Welcome to YelpCamps, "+user.username)
            res.redirect("/campgrounds");
        })
    })
})

//show login form 
router.get("/login",function(req,res){
    res.render("login",{page: 'login'});
})

//handling login logic
router.post("/login",passport.authenticate("local",
    {
        successRedirect:"/campgrounds",
        failureRedirect:"/login"
    }),function(req,res){  
});

//logout route
router.get("/logout",function(req,res){
    req.logout();
    req.flash("success","Logged you out!")   //this automatically logs the user out of the session
    res.redirect("/campgrounds");
});

module.exports= router;