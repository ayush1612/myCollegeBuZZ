var Campground =require("../models/campground")
var Comment=require("../models/comment")
// all the middleware goes here
var middlewareObj = {}

middlewareObj.checkCampgroundOwnership=function(req,res,next){
    if(req.isAuthenticated())
    {
        Campground.findById(req.params.id,function(err,foundCampground){
            if(err)
            {
                req.flash("error","Campground not found")
                res.redirect("campgrounds")
            }
            else
            {
                if(foundCampground.author.id.equals(req.user._id)|| req.user.isAdmin){
                    next();
                }
                else{
                    req.flash("error","You need to be logged in to do that!")
                    res.redirect("back");
                }
            }
        })
    }else {
        res.redirect("back")
    }
}

middlewareObj.checkCommentOwnership=function(req,res,next){
    if(req.isAuthenticated())
    {
        Comment.findById(req.params.comment_id,function(err,foundComment){
            if(err)
            {
                req.flash("error","You don't have permission to do that!")
                res.redirect("campgrounds")
            }
            else
            {
                if(foundComment.author.id.equals(req.user._id)|| req.user.isAdmin){
                    next();
                }
                else{
                    req.flash("error","You don't have permission to do that");
                    res.redirect("back");
                }
            }
        })
    }else {
        req.flash("error","You need to be logged in to do that!")
        res.redirect("back")
    }
}

middlewareObj.isLoggedIn=function(req,res,next)
{
    if(req.isAuthenticated())
    {
        return next();
    }
    req.flash("error","You need to be logged in to do that!");
    res.redirect("/login");
}


module.exports=middlewareObj