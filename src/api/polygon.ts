import { Axios } from "axios";

const axios = new Axios({
  baseURL: "https://api.polygon.io/",
  headers: {
    "Content-Type": "application/json",
  },
});

axios.interceptors.request.use((config) => {
  config.url += `&apiKey=${process.env.POLYGON_API_KEY}`;
  return config;
});

type StockResponse = {
  status: "OK";
  from: string;
  symbol: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  afterHours: number;
  preMarket: number;
};

export async function getStock(stockSymbol: string, date: string) {
  const { data } = await axios.get<string>(
    `/v1/open-close/${stockSymbol}/${date}/?adjusted=true`
  );

  return JSON.parse(data) as StockResponse;
}
