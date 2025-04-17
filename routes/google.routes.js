import express from 'express';
import passport from 'passport';
import { UserModel } from '../models/user.model.js';
const router = express.Router();


router.get("/auth/callback", passport.authenticate("google",{failureRedirect:"/"}),(req, res) => {
    res.redirect("/profile/google");
})

router.get("/auth/google", passport.authenticate("google",{scope:['profile','email']}));


router.get("/profile/google",async (req, res) => {
    let user = UserModel.findById(req.user.id).then(function (user) {
        res.render("profile-google",{
            displayName: user.google.displayName,
            email: user.google.email,
        })
    })
    .catch(function (err) {console.error(err)});
});


export default router;