const express = require("express");
const app = express();

const { fork } = require('child_process');
const path = require('path');



const bodyParser = require("body-parser");
const cors = require("cors");
const { connectDB } = require('./db');

const {fetchNotification , fetchWatchlist , searchCrypto , createWatchlist} = require("./controllers")



app.use(bodyParser.json())
app.use(cors());

connectDB();





app.listen(3000, () => {
    console.log("App is running on port " + 3000)
});

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/index.html'));
  });

app.use( express.static(__dirname + '/client'))



function CreateChildProcess(){
    const childProcess = fork('server/scrape.js')

    childProcess.on('message', (message) => {
        console.log('Message from child:', message);
      });

    childProcess.on('exit', (code) => {
        console.log(`Child process exited with code ${code}`);
    });
}

CreateChildProcess();
setInterval(CreateChildProcess,5 * 60 * 1000)


app.get("/search",searchCrypto)

app.get("/getwatchlist" , fetchWatchlist)

app.get("/notification" , fetchNotification)

app.post("/watchlist",createWatchlist);