import mongoose from "mongoose";

const uri = process.env.MONGODB_URL;
const dbInit = () =>
  mongoose.connect(uri, { dbName: "uploads" }, (err) => {
    if (err) console.log(err.message);
    console.log("MongoDB conectado com sucesso ");
  });
export default dbInit;
