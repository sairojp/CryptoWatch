# CryptoWatch 
It is a simple node app which can be used to scrape bitcoin data from the coinranking website and store them in the database every 5 minutes. This can be used to create a watchlist of various coins with their prices and notifies when it exceeds the value.The frontend is very basic and only for representation of data. It requires a lot of work. 

The scraping is done by child process in node environment every 5 minutes and updates the database with the data.
Checks the watchlist with the changed prices.
Notifies if it is out of bounds from the threshold value in watchlist.


## How to run the projects?
1. Clone or Download zip and extract the project.
2. Host a mongodb server (either in cloud or in local machine)
3. Add database "cryptocurrency" in your mongodb server
4. run `node server.js` command from commant prompt (You should have already   installed NodeJS in your machine)
5. run `npm start` command in another instance of command prompt"
6. install all required modules as suggested in the log of `npm start` command or you can mannually install required libraries and dev dependencies from package.json file untill the App runs in your browser


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.