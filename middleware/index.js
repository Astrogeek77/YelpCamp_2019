var Campground = require("../models/campground"),
    Comment = require("../models/comment"),
	middlewareObj = {};


// Middleware to check user authorization..
middlewareObj.checkCampgroundOwnership = function(req, res, next){
	if(req.isAuthenticated()){
		Campground.findById(req.params.id, function(err, Foundcampground){
			if(err){
				req.flash("error", err.message);
				res.redirect("/campgrounds");
			} 
			else if(!Foundcampground){
				req.flash("error", "Campground not found");
				res.back();
			}
			else {
				if(Foundcampground.author.id.equals(req.user._id) || req.user.isAdmin){
						next();
				} else {
					req.flash("error", "un-authorized user.")
					res.back();
					}
			}
		});
	} else {
		req.flash("error", "Please Login First");
		res.back();
	}
};


// Middleware to check comment ownership..
middlewareObj.checkCommentOwnership = function(req, res, next){
	if(req.isAuthenticated()){
		Comment.findById(req.params.comment_id, function(err, FoundComment){
			if(err){
				res.back();
			}
			else if(!FoundComment){
				req.flash("error", "Comment not found");
				res.back();
			} 
			else {
				if(FoundComment.author.id.equals(req.user._id) || req.user.isAdmin){
						next();
				} else {
					req.flash("error", "Not Authorized")
					res.back();
					}
			}
		});
	} else {
		req.flash("error", "Please Login First");
		res.redirect("/login");
	}
};

middlewareObj.isLoggedIn = function(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	req.flash("error", "Please Login First");
	res.redirect("/login");
};


module.exports = middlewareObj;