import { getStock } from "./api/polygon";
import { stringify } from "csv-stringify";
import { sendMail } from "./mail/mailer";
import fs from "fs";
import path from "path";

const STOCKS = ["AAPL", "GOOGL", "MSFT", "AMZN", "TSLA"];

const YESTERDAY = new Date(Date.now() - 1000 * 60 * 60 * 24);

type RowType = {
  date: string;
  shareName: string;
  value: number;
};

export const routine = async () => {
  const [rows, errors] = await getAllStocks();
  if (errors.length) {
    console.error(errors);
  }

  const rawCsv = await generateCSV(rows);
  fs.writeFileSync(path.join("/tmp", "stocks.csv"), rawCsv);

  sendMail({
    subject: "Stocks",
    text: "Here are the stocks",
    attachments: [
      {
        filename: "stocks.csv",
        path: path.join("/tmp", "stocks.csv"),
      },
    ],
  });
};

async function getAllStocks(): Promise<[RowType[], Error[]]> {
  const rows: RowType[] = [];

  const errors: Error[] = [];

  const promises = STOCKS.map(async (stock) => {
    try {
      const stockData = await getStock(
        stock,
        YESTERDAY.toISOString().split("T")[0]
      );

      rows.push({
        date: stockData.from,
        shareName: stockData.symbol,
        value: stockData.close,
      });
    } catch (error: any) {
      errors.push(error);
    }
  });

  try {
    await Promise.all(promises);
  } finally {
    return [rows, errors];
  }
}

async function generateCSV(rows: RowType[]): Promise<string> {
  return new Promise((resolve, reject) => {
    stringify(
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
          return reject(err);
        } else {
          return resolve(output);
        }
      }
    );
  });
}
