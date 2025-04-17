import express from 'express';
const router = express.Router();

router.get("/", function(req, res){
    res.render("login");
});

router.get("/logout",(req, res) => {
    req.session.destroy();
    res.redirect("/");
});

export default router;