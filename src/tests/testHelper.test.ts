import mongoose from "mongoose";
mongoose.Promise = global.Promise;

const uri = process.env.MONGODB_URL;
