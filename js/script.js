const buttonGetStocks = document.querySelector(".buttonGetStocks");
const buttonGetOrders = document.querySelector(".buttonGetOrders");
const buttonGetSales = document.querySelector(".buttonGetSales");

const buttonGetIncomes = document.querySelector(".buttonGetIncomes");
const buttonGetreportDetailByPeriod = document.querySelector(
  ".buttonGetreportDetailByPeriod"
);

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
    } else if (method == "orders") {
      console.log("Метод заказы");
      createCardOrders(api);
    } else if (method == "sales") {
      console.log("Метод продажи");
      createCardSales(api);
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
  countNull = 0;
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
