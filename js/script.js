const barcode = document.querySelector(".barcode");
const brand = document.querySelector(".brand");
const cancel_dt = document.querySelector(".cancel_dt");
const category = document.querySelector(".category");
const date = document.querySelector(".date");
const discountPercent = document.querySelector(".discountPercent");
const gNumber = document.querySelector(".gNumber");
const incomeID = document.querySelector(".incomeID");
const isCancel = document.querySelector(".isCancel");
const lastChangeDate = document.querySelector(".lastChangeDate");
const nmId = document.querySelector(".nmId");
const number = document.querySelector(".number");
const oblast = document.querySelector(".oblast");
const odid = document.querySelector(".odid");
const quantity = document.querySelector(".quantity");
const subject = document.querySelector(".subject");
const supplierArticle = document.querySelector(".supplierArticle");
const techSize = document.querySelector(".techSize");
const totalPrice = document.querySelector(".totalPrice");
const warehouseName = document.querySelector(".warehouseName");
const countryName = document.querySelector(".countryName");
const finishedPrice = document.querySelector(".finishedPrice");
const forPay = document.querySelector(".forPay");
const isRealization = document.querySelector(".isRealization");
const IsStorno = document.querySelector(".IsStorno");
const isSupply = document.querySelector(".isSupply");
const oblastOkrugName = document.querySelector(".oblastOkrugName");
const orderId = document.querySelector(".orderId");
const priceWithDisc = document.querySelector(".priceWithDisc");
const promoCodeDiscount = document.querySelector(".promoCodeDiscount");
const regionName = document.querySelector(".regionName");
const saleID = document.querySelector(".saleID");
const spp = document.querySelector(".spp");
const daysOnSite = document.querySelector(".daysOnSite");
const Discount = document.querySelector(".Discount");
const inWayFromClient = document.querySelector(".inWayFromClient");
const inWayToClient = document.querySelector(".inWayToClient");
const Price = document.querySelector(".Price");
const quantityFull = document.querySelector(".quantityFull");
const quantityNotInOrders = document.querySelector(".quantityNotInOrders");
const SCCode = document.querySelector(".SCCode");

const timeApi = document.querySelector("#timeApi");

const apiInfo_all = document.querySelector(".apiInfo_all");
//  const inputApi = document.querySelector(".inputApi").value;

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

let inWayToClientCounter = 0;
let inWayFromClientCounter = 0;

let salesOkCounter = 0;
let salesRefundCounter = 0;

let salesStornoRefundCounter = 0;
let salesStornoalesCounter = 0;

let orderOkCounter = 0;
let orderCancelCounter = 0;
let salesDoplataCounter = 0;

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
const imageArt = "https://img1.wbstatic.net/tm/new/";

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
      itogInfoApi(apiInfo_all, api, dateApi, flag, "Всего товаров");
      // console.log(inWayToClientCounter, inWayFromClientCounter);
      generalInfoList("К клиенту", inWayToClientCounter, apiInfo_all);
      generalInfoList("От клиента", inWayFromClientCounter, apiInfo_all);
    } else if (method == "orders") {
      console.log("Метод заказы");
      createCardOrders(api);
      // itogInfoApi(apiInfo_all, api, dateApi, flag, "Всего заказов");
      // generalInfoList("Успешных заказов", orderOkCounter, apiInfo_all);
      if (orderCancelCounter > 0) {
        generalInfoList("Отменёных заказов", orderCancelCounter, apiInfo_all);
      }
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

class CardStock {
  constructor(param, cardSelector) {
    (this.barcode = param.barcode),
      (this.brand = param.brand),
      (this.category = param.category),
      (this.lastChangeDate = param.lastChangeDate),
      (this.nmId = param.nmId),
      (this.quantity = param.quantity),
      (this.subject = param.subject),
      (this.supplierArticle = param.supplierArticle),
      (this.techSize = param.techSize),
      (this.warehouseName = param.warehouseName),
      (this.barcode = param.barcode),
      (this.brand = param.brand),
      (this.category = param.category),
      (this.lastChangeDate = param.lastChangeDate),
      (this.nmId = param.nmId),
      (this.quantity = param.quantity),
      (this.subject = param.subject),
      (this.supplierArticle = param.supplierArticle),
      (this.techSize = param.techSize),
      (this.warehouseName = param.warehouseName),
      (this.barcode = param.barcode),
      (this.brand = param.brand),
      (this.category = param.category),
      (this.lastChangeDate = param.lastChangeDate),
      (this.nmId = param.nmId),
      (this.quantity = param.quantity),
      (this.subject = param.subject),
      (this.supplierArticle = param.supplierArticle),
      (this.techSize = param.techSize),
      (this.warehouseName = param.warehouseName),
      (this.daysOnSite = param.daysOnSite),
      (this.Discount = param.Discount),
      (this.inWayFromClient = param.inWayFromClient),
      (this.inWayToClient = param.inWayToClient),
      (this.isRealization = param.isRealization),
      (this.isSupply = param.isSupply),
      (this.Price = param.Price),
      (this.quantityFull = param.quantityFull),
      (this.quantityNotInOrders = param.quantityNotInOrders),
      (this.SCCode = param.SCCode);
  }
}

// const cardTemplate = document.querySelector(".templateCard").content;
const cardList = document.querySelector(".card_list");

function createCardStock(api) {
  //  console.log(li);

  console.log(api);
  api.forEach(function (params, i) {
    let nmid = params.nmId + "";

    const cardTemplate = document.querySelector(".templateCard-stocks").content;

    cardTemplate
      .querySelector(".photo-card-href")
      .setAttribute(
        "href",
        `https://www.wildberries.ru/catalog/${params.nmId}/detail.aspx`
      );

    cardTemplate.querySelector(".number-card").textContent = `${i + 1}.`;
    let image = `${imageArt}${nmid.substring(0, 4)}0000/${params.nmId}-1.jpg`;

    cardTemplate.querySelector(".photo-card_small").src = `${image}`;
    cardTemplate.querySelector(".name").textContent = params.name;
    cardTemplate.querySelector(".barcodeApi").textContent = params.barcode;
    cardTemplate.querySelector(".discountApi").textContent =
      params.discountPercent;
    cardTemplate.querySelector(".price-productApi").textContent = params.Price;
    cardTemplate.querySelector(".final-price").textContent = `${
      params.Price - (params.Price / 100) * params.Discount
    }`;
    cardTemplate.querySelector(".brandApi").textContent = params.brand;
    cardTemplate.querySelector(".categoryApi").textContent = params.category;
    cardTemplate.querySelector(".daysOnSiteApi").textContent =
      params.daysOnSite;
    cardTemplate.querySelector(".inWayFromClientApi").textContent =
      params.inWayFromClient;
    inWayFromClientCounter = inWayFromClientCounter + params.inWayFromClient;

    cardTemplate.querySelector(".inWayToClientApi").textContent =
      params.inWayToClient;
    inWayToClientCounter = inWayToClientCounter + params.inWayToClient;

    cardTemplate.querySelector(".lastChangeDateApi").textContent =
      params.lastChangeDate;

    cardTemplate.querySelector(".nmidAPI").textContent = params.nmId;

    cardTemplate.querySelector(".quantityAPI").textContent = params.quantity;

    if (params.quantity == 0) {
      console.log(params.quantity, typeof params.quantity);
      cardTemplate.querySelector(
        ".card-comment"
      ).textContent = `${params.quantity}`;
    } else {
      console.log("Кол-во не нулевое");
    }

    // }
    // console.log(params.quantity);
    cardTemplate.querySelector(".quantityFullApi").textContent =
      params.quantityFull;
    cardTemplate.querySelector(".quantityNotInOrdersApi").textContent =
      params.quantityNotInOrders;
    cardTemplate.querySelector(".subjectApi").textContent = params.subject;
    cardTemplate.querySelector(".supplierArticleAPI").textContent =
      params.supplierArticle;
    cardTemplate.querySelector(".techSizeApi").textContent = params.techSize;
    cardTemplate.querySelector(".warehouseNameApi").textContent =
      params.warehouseName;

    // Не задействованы параметры из апи:
    // SCCode: "";
    // isRealization: false;
    // isSupply: true;
    const li = document.createElement("li");
    li.classList.add("card_stocks");
    li.append(cardTemplate.cloneNode(true));
    cardList.append(li);
  });
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

// Создаем ссылка на картинку в sales и orders
function imageCrеate(nmId) {
  // Примет ссылки на картинку https://img1.wbstatic.net/tm/new/25210000/25217028-1.jpg
  const imageURL = "https://img1.wbstatic.net/tm/new/";
  // https:images.wbstatic.net/c246x328/new/19190000/19195616-1.jpg
  // const imageURL = "https://images.wbstatic.net/c246x328/new/";
  const imagSub = String(nmId).substring(0, 4);
  const image = `${imageURL}${imagSub}0000/${nmId}-1.jpg`;
  return image;
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
