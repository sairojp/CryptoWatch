const axios = require("axios");
const cheerio = require("cheerio");

const { Crypto, Watchlist, Log } = require("./db");
const { connectDB } = require("./db");

connectDB();

// Function to scrape data
async function scrapeData(i) {
  try {
    // Fetch HTML content of the website
    const url = `https://coinranking.com/?page=${i}`;
    const response = await axios.get(url);
    const html = response.data;

    // Load HTML content into Cheerio
    const $ = cheerio.load(html);
    // Scrap the values and update to DB
    $(".table__row").each(async (i, elem) => {
      const name = $(elem)
        .find(".profile__link")
        .text()
        .replace(/[\n\s]+/g, "");
      const code = $(elem)
        .find(".profile__subtitle-name")
        .text()
        .replace(/[\n\s]+/g, "");
      const img = $(elem).find("img").attr("src");
      const price = $(elem)
        .find(".table__cell--responsive")
        .find(".valuta")
        .text()
        .replace(/[\n\s]+/g, "");
      const market = $(elem)
        .find(".table__cell--s-hide")
        .find(".valuta")
        .text()
        .replace(/[\n\s]+/g, "");
      const change24h = $(elem)
        .find(".change")
        .text()
        .replace(/[\n\s]+/g, "");
      Crypto.findOneAndUpdate(
        { code },
        {
          $set: {
            name,
            code,
            img,
            price,
            market,
            change24h,
          },
        },
        { upsert: true }
      ).catch((err) => {
        console.error(err);
      });
    });
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

// Function to Checkwatchlist every time new scraped data available
async function checkWatchlist() {
  try {
    const watchlistdata = await Watchlist.find({});
    await Promise.all(
      watchlistdata.map(async (val) => {
        const presentdata = await Crypto.findOne({ code: val.code });
        const presentprice = presentdata.price.replace(/[\$,]/g, "");
        const priceFloat = parseFloat(presentprice);

        if (priceFloat < val.min_price || priceFloat > val.max_price) {
          const data =
            presentdata.code +
            " is on the move , The Price is down " +
            presentdata.change24h +
            " in 24 hrs to " +
            presentdata.price;
          Log.findOneAndUpdate({
            code: presentdata.code
          },{
            $set: {
              data:data
            },
          },
          { upsert: true })
          .catch((err) => {
            console.error(err);
          });
          process.send(
            presentdata.code +
              " is on the move , The Price is down " +
              presentdata.change24h +
              " in 24 hrs to " +
              presentdata.price
          );
        }
      })
    );
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

// 34 pages of crypto to scrape
for (let i = 0; i < 35; i++) {
  scrapeData(i);
}

process.send("Data Scraped and Updated Successfully");

checkWatchlist();
