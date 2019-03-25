var express =require("express");
var router  =express.Router({mergeParams:true});

var Campground = require("../models/campground");
var Comment    = require("../models/comment")
var middleware = require("../middleware")

//=================================
//COMMENT ROUTES
//=================================
router.get("/new",middleware.isLoggedIn,function(req,res){
    Campground.findById(req.params.id,function(err,campground){
        if(err)
        {
            console.log(err);
        }
        else
        {
            res.render("comments/new",{campground:campground});
        }
    
})
});

//POST route to submit the form
router.post("/",function(req,res){
    //lookup the campground using ID
    Campground.findById(req.params.id,function(err,campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds")
        }
        else{
            Comment.create(req.body.comment,function(err,comment){
                if(err)
                {
                    req.flash("error","Something went wrong.");
                    console.log(err);
                }else{
                    //add username and id to the comment
                    comment.author.id=req.user._id;
                    comment.author.username=req.user.username;
                    comment.save();

                    campground.comments.push(comment);
                    campground.save();
                    req.flash("success","Successfully added comment!")
                    res.redirect("/campgrounds/"+campground._id);
                    console.log(comment)
                    
                }
            })
        }
    })
    //create new comment
    //connect new comment to the campgroound
    //redirect campground show page

})

//Edit comment route
router.get("/:comment_id/edit",middleware.checkCommentOwnership, function(req,res){
    Comment.findById(req.params.comment_id,function(err,foundComment){
        if(err){
            res.redirect("back");
        }
        else
        {
            res.render("comments/edit",{campground_id:req.params.id,comment: foundComment})
        }
    })
})

//UPDATE comment route
router.put("/:comment_id",middleware.checkCommentOwnership,function(req,res){
    Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,updatedComment){
        if(err){
            res.redirect("back");
        } else {
            res.redirect("/campgrounds/"+req.params.id);
        }
    })
})

router.delete("/:comment_id",middleware.checkCommentOwnership,function(req,res){
    //findByIdAndRemove
    Comment.findByIdAndRemove(req.params.comment_id,function(err){
        if(err){
            console.log(err);
            res.redirect("/back");
        }else{
            req.flash("success","Successfully deleted the comment!!")
            console.log("Successfully deleted the comment");
            res.redirect("/campgrounds/"+req.params.id);
        }
    })
    
})

module.exports=router