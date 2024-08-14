import "dotenv/config";

import { getStock } from "./api/polygon";

const stocks = ["AAPL"];

const main = async () => {
  for (const stock of stocks) {
    const stockData = await getStock(stock);
    console.log(stockData);
  }
};

main();
