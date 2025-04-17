import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { rateLimit } from "express-rate-limit";
import MongoRateStore from "rate-limit-mongo";
import passportSetup from "./config/passport.config.js";
import sessionSetup from "./config/session.config.js";
import { default as googleRouter } from "./routes/google.routes.js";
import { default as mainRouter } from "./routes/main.routes.js";
import { default as twitterRouter } from "./routes/twitter.routes.js";
import databaseSetup from "./config/database.config.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

databaseSetup();
sessionSetup(app);
passportSetup(app);

app.set("view engine", "ejs");

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 50,
    message: "rate limit reached, try again in 15 minutes",
    store: new MongoRateStore(
        {
            uri: process.env.MONGO_URI,
            collectionName: "rateRecords",
            expireTimeMs: 15 * 60 * 1000,
        }
    ),
})

app.use(limiter);
app.use(mainRouter);
app.use(googleRouter);
app.use(twitterRouter);

app.listen(process.env.PORT, function(){
    console.log(`App started http://localhost:${process.env.PORT}`);
});