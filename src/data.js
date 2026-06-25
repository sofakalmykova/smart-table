import { makeIndex } from "./lib/utils.js";
const BASE_URL = "https://webinars.webdev.education-services.ru/sp7-api";
export function initData(sourceData) {
  let sellers;
  let customers;
  let lastResult;
  let lastQuery;

  const mapRecords = (data) =>
    data.map((item) => ({
      id: item.receipt_id,
      date: item.date,
      seller: sellers[item.seller_id],
      customer: customers[item.customer_id],
      total: item.total_amount,
    }));
  const getIndexes = async () => {
    if (!sellers || !customers) {
      // если индексы ещё не установлены, то делаем запросы
      [sellers, customers] = await Promise.all([
        // запрашиваем и деструктурируем в уже объявленные ранее переменные
        fetch(`${BASE_URL}/sellers`).then((res) => res.json()), // запрашиваем продавцов
        fetch(`${BASE_URL}/customers`).then((res) => res.json()), // запрашиваем покупателей
      ]);
    }
    return { sellers, customers };
  };
  const getRecords = async (query, isUpdated = false) => {
    const qs = new URLSearchParams(query);
    const nextQuery = qs.toString();
    if (lastQuery === nextQuery && !isUpdated) {
    }
    const response = await fetch(`${BASE_URL}/records?${nextQuery}`);
    const records = await response.json();
    lastQuery = nextQuery;
    lastResult = {
      total: records.total,
      items: mapRecords(records.items),
    };
    return lastResult;
  };
  return {
    getIndexes,
    getRecords,
  };
}
