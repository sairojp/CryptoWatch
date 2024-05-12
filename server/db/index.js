const mongoose = require("mongoose");
const {cryptoSchema,
  watchlistSchema,logSchema} = require("./schema")

const mongoDbURI = "mongodb://localhost:27017/cryptocurrency"

const connectDB = async() => {
  try {
  await mongoose.connect(mongoDbURI);
}
  catch (error) {
    console.log(error)
  }
}

const Crypto = mongoose.model("crypto" ,cryptoSchema);
const Watchlist = mongoose.model("watchlist" ,watchlistSchema);
const Log = mongoose.model("log",logSchema);

module.exports = {
  connectDB , 
  Crypto,
  Watchlist,
  Log
}