import dotenv from "dotenv";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as TwitterStrategy } from "passport-twitter";
import { UserModel } from "../models/user.model.js";
import mongoose from "mongoose";

dotenv.config();

export default function passportSetup(app){
    app.use(passport.initialize());
    app.use(passport.session());

    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
      }, async (accessToken, refreshToken, profile, done) => {
        try {
          const existingUser = await UserModel.findOne({ "google.email": profile.emails[0].value });
      
          if (existingUser) {
            return done(null, existingUser);
          }
      
          const newUser = new UserModel({
            google: {
              displayName: profile.displayName,
              email: profile.emails[0].value,
            }
          });
      
          await newUser.save();
          return done(null, newUser);
      
        } catch (err) {
          console.error(err);
          return done(err, null);
        }
}));

    passport.use(new TwitterStrategy({
        consumerKey: process.env.TWITTER_API_KEY,
        consumerSecret: process.env.TWITTER_API_SECRET,
        callbackURL: process.env.TWITTER_CALLBACK_URL
    },async (accessToken, refreshToken,profile,done)=>{
        try{
            const existingUser = await UserModel.findOne({"twitter.id": profile.id});
            if (existingUser) {
                return done(null, existingUser);
            }
            const newUser = new UserModel({
                twitter:{
                    id: profile.id,
                    username: profile.username,
                    displayName: profile.displayName,
                }
            });

            await newUser.save();
            return done(null, newUser);
        }catch(err){
            console.error(err);
            return(err,null);
        }
    }))


    passport.serializeUser((user, done) => done(null, {
        id: user.id,
    }));

    passport.deserializeUser((user,done)=>done(null,user));
}
