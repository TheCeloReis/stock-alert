import "dotenv/config";

import { getStock } from "./api/polygon";
import { stringify } from "csv-stringify";
import fs from "fs";

const stocks = ["AAPL"];

const main = async () => {
  const rows: {
    date: string;
    shareName: string;
    value: number;
  }[] = [];

  for (const stock of stocks) {
    const stockData = await getStock(stock);

    rows.push({
      date: stockData.from,
      shareName: stockData.symbol,
      value: stockData.close,
    });
  }

  const writer = stringify(
    rows,
    {
      header: true,
      columns: {
        date: "date",
        shareName: "share name",
        value: "value",
      },
    },
    (err, output) => {
      if (err) {
        console.error(err);
        return;
      }

      fs.writeFileSync("/output/stocks.csv", output);
    }
  );
};

main();
