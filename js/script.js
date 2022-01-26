const buttonGetStocks = document.querySelector(".buttonGetStocks");
const buttonGetOrders = document.querySelector(".buttonGetOrders");
const buttonGetSales = document.querySelector(".buttonGetSales");

const buttonGetIncomes = document.querySelector(".buttonGetIncomes");
const buttonGetreportDetailByPeriod = document.querySelector(
  ".buttonGetreportDetailByPeriod"
);

// import {
//   buttonGetStocks,
//   buttonGetOrders,
//   buttonGetSales,
//   buttonGetIncomes,
// } from "../utils/constants.js";

// const stockURL =
// "https://suppliers-stats.wildberries.ru/api/v1/supplier/stocks?dateFrom=2021-10-13T00:00:00.000Z&key=OGRlMzFjMTQtYThiNy00ZTc0LWI4N2ItOTdlYTg5NmU0OTdh";

// let inWayToClientCounter = 0;
// let inWayFromClientCounter = 0;

// document.querySelector(".buttonGetTest").addEventListener("click", () => {
//   console.log("чик");
// });

buttonGetStocks.addEventListener("click", () => {
  getJson("stocks");
});
buttonGetOrders.addEventListener("click", () => {
  getJson("orders");
});
buttonGetSales.addEventListener("click", () => {
  getJson("sales");
});

buttonGetIncomes.addEventListener("click", () => {
  getJson("incomes");
});
// buttonGetreportDetailByPeriod.addEventListener("click", () => {
//   getJson("buttonGetreportDetailByPeriod");
// });

//const imageArt-big = "https://images.wbstatic.net/c516x688/new/";
//const imageArt = "https://img1.wbstatic.net/tm/new/";

// function apiKey() {
//   fetch(stockURL).then((response) => console.log(response.json()));
//   // .catch((result) => console.log("Ошибка HTTP: " + response.status));
// }

//Проверяем флаг
let flagApi = document.getElementById("flagApi");
let flag = "1";
flagApi.addEventListener("click", function (event) {
  if (event.target.checked) {
    return (flag = 1);
  } else {
    return (flag = 0);
  }
});
// flagApi.value == "checked" ? (flagApi = 1) : (flagApi = 0);

// let response = fetch(stockURL);
// console.log(response);

// Проверка выбора чекбокса

// Рабочая функция которая достаёт API
function getJson(method) {
  const dateApi = document.querySelector("#dateApi").value;
  const api = document.querySelector(".inputApi").value;
  const stockURL = `https://suppliers-stats.wildberries.ru/api/v1/supplier/${method}?dateFrom=${dateApi}T00:00:00.000Z&flag=${flag}&key=${api}`;
  console.log(stockURL);

  const xhr = new XMLHttpRequest();
  xhr.open("GET", stockURL);
  xhr.responseType = "json";
  xhr.onload = () => {
    let api = "[]";
    xhr.status >= 400
      ? alert("Ошибка! Попробуйте позже")
      : (api = xhr.response);
    console.log(api.length);

    if (method == "stocks") {
      console.log("Метод склад");
      createCardStock(api);

      // itogInfoApi(apiInfo_all, api, dateApi, flag, "Всего товаров");
      // console.log(inWayToClientCounter, inWayFromClientCounter);
      // generalInfoList("К клиенту", inWayToClientCounter, apiInfo_all);
      // generalInfoList("От клиента", inWayFromClientCounter, apiInfo_all);
    } else if (method == "orders") {
      console.log("Метод заказы");
      createCardOrders(api);
      // itogInfoApi(apiInfo_all, api, dateApi, flag, "Всего заказов");
      // generalInfoList("Успешных заказов", orderOkCounter, apiInfo_all);
    } else if (method == "sales") {
      console.log("Метод продажи");
      createCardSales(api);
      // itogInfoApi(apiInfo_all, api, dateApi, flag, "Всего продаж и возвратов");
      // generalInfoList("Продаж", salesOkCounter, apiInfo_all);
      // generalInfoList("Возвратов", salesRefundCounter, apiInfo_all);
      // generalInfoList("Доплат", salesDoplataCounter, apiInfo_all);
      // generalInfoList(
      //   "Сторно-возвратов",
      //   salesStornoRefundCounter,
      //   apiInfo_all
      // );
      // generalInfoList("Сторно-Доплат", salesStornoalesCounter, apiInfo_all);

      // generalInfoList("Доплат", salesDoplataCounter, apiInfo_all);

      // if (salesDoplataCounter > 0) {
      //   generalInfoList("Доплат", salesRefundCounter, apiInfo_all);
      // }
    } else if (method == "incomes") {
      createCardIncomes(api);
    } else if (method == "buttonGetreportDetailByPeriod") {
      console.log("Клик buttonGetreportDetailByPeriod");
    } else {
      console.log("Не понятный метод");
    }
  };
  xhr.onerror = () => {
    console.log(xhr.response);
  };

  xhr.send();
}
// .then((array) =>
//   array.forEach((element) => {
//     console.log(element);
//   })
// );

// let apiKey = fatch(
//   "https://suppliers-stats.wildberries.ru/api/v1/supplier/stocks?dateFrom=2021-10-13T00:00:00.000Z&key=OGRlMzFjMTQtYThiNy00ZTc0LWI4N2ItOTdlYTg5NmU0OTdh"
// );

// let promise = fetch(url, [options])
// let response = await fetch(url);

// if (response.ok) { // если HTTP-статус в диапазоне 200-299
//   // получаем тело ответа (см. про этот метод ниже)
//   let json = await response.json();
// } else {
//   alert("Ошибка HTTP: " + response.status);
// }

// console.log(buttonGetApi);

// Указать вчерашнюю дату
function dateTime() {
  let date = document.getElementById("dateTime");
  //  console.log(new Date());
  console.log(date.value);
  date.value = new Date();
  console.log(date);
  // date.set;

  // document.getElementById(
  //   "dateTime"
  // ).value = `${today.getFullYear()}-${today.getMonth()}-${0}${today.getDate()}`;
}
// dateTime();
// console.log(new Date());
// console.log(new Date("2020-09-20"));

class CardOld {
  constructor(cardSelector) {
    this._cardSelector = cardSelector;
    console.log("Карточка создана");
  }

  generateCard() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card_stock")
      .cloneNode(true);
    console.log(cardElement);
    this._element.querySelector(
      ".card__image"
    ).style.backgroundImage = `url(${imagetest})`;
    this._element.querySelector(".card__title").textContent = this._title;
    this._element.querySelector(".card__info").textContent = this._description;
    this._element.querySelector(".card__price-property").textContent =
      this._price;

    return this._element;
  }
}
// new Card(){
//   const
// }

// const newacardcraeate = document.querySelector(".createCard");
// newacardcraeate.addEventListener("click", new Card());

class Section {
  constructor({ api }, containerSelector) {
    this._initialArray = api;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    // Переберем массив _initialArray с начальными сообщениями
    this._initialArray.forEach((item) => {
      // Исходя из поля isOwner создадим экземпляры классов
      const card = this._initialArray.isOwner
        ? new UserCard(item, ".card-template_type_user")
        : new DefaultCard(item, ".card-template_type_default");

      const cardElement = card.generateCard();

      // Вставим разметку на страницу,
      // используя метод setItem класса Section
      this.setItem(cardElement);
    });
  }

  setItem(element) {
    this._container.append(element);
  }
}

// const cardTemplate = document.querySelector(".templateCard").content;
const cardList = document.querySelector(".card_list");

function createCardStock(api) {
  inWayToClientCounter = 0;
  inWayFromClientCounter = 0;

  api.forEach(function (params, i) {
    let stockk = new Stock(params, i);
    stockk._cardBackgroundStock();
  });
  counterFromClient();
}

function itogInfoApi(selector, api, date, flag, text) {
  let list = document.createElement("li");
  list.classList.add("generalInfo");

  if (flag) {
    list.textContent = `${text} за ${date}: ${api.length} шт.`;
  } else {
    list.textContent = `${text} c ${date} по настоящее время: ${api.length} шт.`;
  }
  selector.append(list);
}

// Счетчик
function generalInfoList(name, inWayTo, selector) {
  // select = document.querySelector(selector);
  let list = document.createElement("li");
  list.classList.add("secondaryInfo");
  list.textContent = `${name}: ${inWayTo}`;
  selector.append(list);
  console.log(list);
  // console.log(list);
}

// const createCardButton = document.querySelector(".createCardButton");
// createCardButton.addEventListener("click", createCard);

// --------------------------
// Переводим в классы

//Допустим, в проекте есть класс Card, который возвращает разметку карточки товара.
// И класс Section, который вставляет разметку в DOM. Card и Section связаны друг с другом. Section отрисовывает разметку, которую возвращает Card.
// class Card {
//   constructor() {}
// }

function createCardIncomes(api) {
  console.log(api);
  api.forEach((params, i) => {
    // console.log(params);
    const card = new Incomes(params, i);
    const cardIncomes = card._generateCardIncomes();
    console.log(cardIncomes);
    document.querySelector(".card_list").append(cardIncomes);
  });
}

function createCardSales(api) {
  console.log(api);
  counterSalesAll = 0;
  counterSales = 0;
  counterRefund = 0;
  counterDoplata = 0;
  counterB_stornoVozvrat = 0;
  counterA_stornoSale = 0;
  summSales = 0;
  summRefund = 0;
  summDoplata = 0;
  api.forEach((params, i) => {
    //   let li = document.createElement("li");
    //   li.classList.add("card_li");
    //   document.querySelector(".card_list").append(li);
    const card = new Sales(params, i);
    const cardIncomes = card._cardBackgroundSales();

    // const d = card._cardBl();
    // console.log(`Всего записей: ${params.length}`);
    // console.log(`Сумма продаж: ${params.priceWithDisc}`);
    // li.append(cardIncomes);
  });

  counterAllSales();
}

function createCardOrders(api) {
  counterOrdersOk = 0;
  counterOrdersCansel = 0;
  summOrders = 0;
  summOrdersCansel = 0;
  counterNmIdNull = 0;

  api.forEach((params, i) => {
    const orders = new Orders(params, i);
    const cardOrdersssss = orders._cardBackgroundOrders();
  });
  counterAllOrders();
}
