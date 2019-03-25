var mongoose=require("mongoose");

var campgroundSchema=new mongoose.Schema({
    collegename:String,
    date:String,
    eventname:String,
    name:String,
    scale:String,
    image:String,
    description:String,
    author:{
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        username: String
    },
    comments:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Comment"
        }
    ]
});

module.exports=mongoose.model("Campground",campgroundSchema);
