

const {Crypto ,Watchlist,Log} = require("../db")


const searchCrypto = async (req,res) => {
  try {
      const val = req.query.crypto;
      const crypto = val.trim().charAt(0).toUpperCase() + val.slice(1).replace(/\s+/g, '');
      console.log(crypto)
      const data = await Crypto.findOne({ name: { $regex: new RegExp('^' + crypto + '$', 'i') } });
      console.log(data)
      if (data){
          res.status(200).json({data});
      } else {
          res.status(404).send({error: "No cryptocurrency found"})
      }
  }
  catch(error){
      console.log(error)
      res.status(500).json({error : 'Internal Server Error'})
  }
}


const createWatchlist = async (req,res) => {
  try {
  const {code} = req.body;
  const {min_price} = req.body;
  const {max_price} = req.body;
  Watchlist.findOneAndUpdate({code},
      {$set : {
          code,
          min_price,
          max_price
      }},{upsert: true}
  )
  .then(() => {
      console.log("Watchlist created");
      res.json({data :"Successful"})
    })
    .catch((err) => {
      console.error(err);
    })
  }
  catch(error){
      res.send({error})
  }
}


const fetchWatchlist = async (req , res) => {
  try{
      const watchlistdata = await Watchlist.find({})
      console.log(watchlistdata);
      res.json(watchlistdata);
  }
  catch(error){
      console.log(error)
  }
}


const fetchNotification = async (req , res) => {
  try{
      const notification = await Log.find({})
      console.log(notification);
      res.json(notification);
  }
  catch(error){
      console.log(error)
  }
}


module.exports = {
  searchCrypto, createWatchlist , fetchWatchlist , fetchNotification
}