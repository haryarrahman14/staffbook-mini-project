const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const axios = require("axios");
const cors = require("cors");

const ssePort = process.env.SSE_PORT || 3001;

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

const clients = [];
let tradingData = [];
app.get("/sse", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  const client = res;
  clients.push(client);
  client.on("close", () => {
    clients.splice(clients.indexOf(client), 1);
  });
  client.write(`data: ${JSON.stringify(tradingData)}\n\n`);
});

const fetchTradingData = async () => {
  try {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets",
      {
        params: {
          vs_currency: "usd",
          order: "market_cap_desc",
          per_page: 250,
          page: 1,
          sparkline: false,
        },
      }
    );
    tradingData = response.data;
    sendTradingDataToClients();
  } catch (error) {
    console.error("Error fetching trading data:", error);
  }
};

const sendTradingDataToClients = () => {
  clients.forEach((client) => {
    client.write(`data: ${JSON.stringify(tradingData)}\n\n`);
  });
};

const perMinuteRateLimit = 0.8;
const pollingInterval = (60 * 1000) / perMinuteRateLimit;

fetchTradingData();

setInterval(fetchTradingData, pollingInterval);

server.listen(ssePort, () => {
  console.log("Server SSE berjalan");
});

module.exports = { path: "/api", handler: app };
