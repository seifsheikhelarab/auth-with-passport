import express from 'express';
import passport from 'passport';
import { UserModel } from '../models/user.model.js';
const router = express.Router();


router.get("/auth/twitter", passport.authenticate("twitter"));

router.get("/auth/callbacktwt", passport.authenticate("twitter",{failureRedirect:"/"}),(req, res) => {
    res.redirect("/profile/twitter");
})

router.get("/profile/twitter", async (req, res) => {
    let user = UserModel.findById(req.user.id)
    .then(user => {
        res.render("profile-twitter",{
            displayName: user.twitter.displayName,
            id: user.twitter.id,
            username: user.twitter.username,
        })
    })
    .catch(err => {console.error(err);});
    
});


export default router;