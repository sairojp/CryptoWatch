const mongoose = require("mongoose");

const cryptoSchema = new mongoose.Schema({
  name: String,
  code:String,
  img:String,
  price:String,
  market:String,
  change24h:String,
});

const watchlistSchema = new mongoose.Schema({
  code: String,
  min_price: Number,
  max_price: Number
});

const logSchema = new mongoose.Schema({
  code: String,
  data: String
})

module.exports = {
  cryptoSchema,
  watchlistSchema,
  logSchema
};