const buttonGetStocks = document.querySelector(".buttonGetStocks");
const buttonGetOrders = document.querySelector(".buttonGetOrders");
const buttonGetSales = document.querySelector(".buttonGetSales");
let flag = 1;
const buttonGetIncomes = document.querySelector(".buttonGetIncomes");
const buttonGetreportDetailByPeriod = document.querySelector(
  ".buttonGetreportDetailByPeriod"
);

buttonGetOrders.addEventListener("click", () => {
  getApiJson("orders", createOrdersCard);
});

buttonGetStocks.addEventListener("click", () => {
  getApiJson("stocks", createStocksCard);
  // getJson("stocks");
});

buttonGetSales.addEventListener("click", () => {
  getApiJson("sales", createSalesCard);
  // getJson("sales");
});

buttonGetIncomes.addEventListener("click", () => {
  getApiJson("incomes", createIncomesCard);
  // getJson("incomes");
});

//Проверяем флаг
let flagApi = document.getElementById("flagApi");
flagApi.addEventListener("click", function (event) {
  if (event.target.checked) {
    return (flag = 1);
  } else {
    return (flag = 0);
  }
});

// Получаем строку вызова. Также используется для текста в обращении для поддержки
function getAPI(method) {
  const dateApi = document.querySelector("#dateApi").value;
  const apiClient = document.querySelector(".inputApi").value;
  api = apiClient.trim();
  const stockURL = `https://suppliers-stats.wildberries.ru/api/v1/supplier/${method}?dateFrom=${dateApi}T00:00:00.000Z&flag=${flag}&key=${api}`;
  console.log(stockURL);
  return stockURL;
}

// Промис. Функция, которая возвращает ПРОМИМ (не JSON) для карточек
function createOrdersCard(data) {
  console.log(data);
  if (data.length > 1000) {
    let ll = document.createElement("li");
    ll.textContent = "Товаро больше 1000, придётся подождать";
    console.log(ll);
    document.querySelector(".apiInfo_all").append(ll);
  }
  // Очищаем счётчик
  counterOrdersNull();
  data.forEach((params, i) => {
    const orders = new Orders(params, i);
    const cardOrdersssss = orders._cardBackgroundOrders();
  });
  counterAllOrders();
}

function createSalesCard(data) {
  console.log(data);
  // Очищаем счётчик
  counterSalesNull();
  data.forEach((params, i) => {
    const sales = new Sales(params, i);
    const cardSales = sales._cardBackgroundSales();
  });
  counterAllSales();
}

function createStocksCard(data) {
  console.log(data);
  data.forEach((params, i) => {
    const stocks = new Stock(params, i);
    const cardStocks = stocks._cardBackgroundStock();
  });
  counterFromClient();
}

function createIncomesCard(data) {
  console.log(data);
  data.forEach((params, i) => {
    const incomes = new Incomes(params, i);
    if (incomes.incomeId == counterincomeId) {
      const cardIncomes = incomes._generateCardIncomes("Noframe");
      document.querySelector(".card_li").after(cardIncomes);
      incomes._getTemplateIncomesNotframe();
      console.log("без рамки");
    } else {
      const cardIncomes = incomes._generateCardIncomes("frame");
      document.querySelector(".card_list").append(cardIncomes);
      incomes._getTemplateIncomesNotframe();
      console.log("с рамкой");
    }
  });
}

//  Функция для пострения заказов
function getApiJson(method, functionCreate) {
  // Получаем Строку вызова
  let api = getAPI(method);
  fetch(api)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      if (response.status == 401) {
        alert("API-ключ не действительный");
        console.log(response);
      }
      if (response.status == 400) {
        alert("Не верно указан API");
        console.log(response);
      }
      if (response.status == 429) {
        console.log(response);
        alert("Повторите запрос через 1мин.");
      } else console.log(response.status);
    })
    .then((data) => {
      functionCreate(data);
    });
}
