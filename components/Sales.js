// Переменные для счётчка продаж
let counterSalesAll = 0;
let counterSales = 0;
let counterRefund = 0;
let counterDoplata = 0;
let counterB_stornoVozvrat = 0;
let counterA_stornoSale = 0;
let summSales = 0;
let summRefund = 0;
let summDoplata = 0;
let summForpay = 0;
let countNullDoplata = 0;
let countNull = 0;
let saleNull = 0;
let saleNullDade = 0;
let stornoSale = 0;
let stornoRefund = 0;

function counterSalesNull() {
  counterSalesAll = 0;
  counterSales = 0;
  counterRefund = 0;
  counterDoplata = 0;
  summForpay = 0;
  counterB_stornoVozvrat = 0;
  counterA_stornoSale = 0;
  summSales = 0;
  summRefund = 0;
  summDoplata = 0;
  countNullDoplata = 0;
  countNull = 0;
  saleNull = 0;
  saleNullDade = 0;
  stornoSale = 0;
  stornoRefund = 0;
}

class Sales {
  constructor(APISales, i) {
    (this.i = i + 1),
      (this.barcode = APISales.barcode),
      (this.brand = APISales.brand),
      (this.category = APISales.category),
      (this.lastChangeDate = APISales.lastChangeDate),
      (this.nmId = APISales.nmId),
      (this.quantity = APISales.quantity),
      (this.subject = APISales.subject),
      (this.supplierArticle = APISales.supplierArticle),
      (this.techSize = APISales.techSize),
      (this.warehouseName = APISales.warehouseName),
      (this.countryName = APISales.countryName),
      (this.date = APISales.date),
      (this.discountPercent = APISales.discountPercent),
      (this.finishedPrice = APISales.finishedPrice),
      (this.forPay = APISales.forPay),
      (this.gNumber = APISales.gNumber),
      (this.incomeID = APISales.incomeID),
      (this.isRealization = APISales.isRealization),
      (this.IsStorno = APISales.IsStorno),
      (this.isSupply = APISales.isSupply),
      (this.oblastOkrugName = APISales.oblastOkrugName),
      (this.odid = APISales.odid),
      (this.orderId = APISales.orderId),
      (this.priceWithDisc = APISales.priceWithDisc),
      (this.promoCodeDiscount = APISales.promoCodeDiscount),
      (this.regionName = APISales.regionName),
      (this.saleID = APISales.saleID),
      (this.spp = APISales.spp),
      (this.totalPrice = APISales.totalPrice),
      (this.number = APISales.number);
  }

  _getTemplateSales() {
    let templateSales = document
      .querySelector(".templateCard-sales")
      .content.querySelector(".card_stock")
      .cloneNode(true);
    return templateSales;
  }

  _generateCardSales() {
    this._element = this._getTemplateSales();
    this._element.querySelector(".number-card").textContent = this.i;
    this._element
      .querySelector(".photo-card-href")
      .setAttribute(
        "href",
        `https://www.wildberries.ru/catalog/${this.nmId}/detail.aspx`
      );

    this._element.querySelector(".photo-card_small").src = `${imageCrеate(
      this.nmId
    )}`;

    this._element.querySelector(".barcodeApi").textContent = this.barcode;
    this._element.querySelector(".brandApi").textContent = this.brand;
    this._element.querySelector(".categoryApi").textContent = this.category;
    this._element.querySelector(".countryNameApi").textContent =
      this.countryName;
    this._element.querySelector(".dateApi").textContent = this.date;
    this._element.querySelector(".discountPercentApi").textContent =
      this.discountPercent;
    this._element.querySelector(".finishedPriceApi").textContent =
      this.finishedPrice;
    this._element.querySelector(".forPayApi").textContent = this.forPay;
    this._element.querySelector(".gNumberApi").textContent = this.gNumber;
    this._element.querySelector(".incomeIDApi").textContent = this.incomeID;
    this._element.querySelector(".isRealizationApi").textContent =
      this.isRealization;

    this._element.querySelector(".IsStornoApi").textContent = this.IsStorno;
    if (this.IsStorno == 0) {
      this._element.querySelector(".IsStorno").remove();
    }

    this._element.querySelector(".isSupplyApi").textContent = this.isSupply;
    this._element.querySelector(".lastChangeDateApi").textContent =
      this.lastChangeDate;
    this._element.querySelector(".nmIdApi").textContent = this.nmId;
    this._element.querySelector(".oblastOkrugNameApi").textContent =
      this.oblastOkrugName;
    this._element.querySelector(".odidApi").textContent = this.odid;
    this._element.querySelector(".orderIdApi").textContent = this.orderId;
    this._element.querySelector(".priceWithDiscApi").textContent =
      this.priceWithDisc;
    this._element.querySelector(".promoCodeDiscountApi").textContent =
      this.promoCodeDiscount;
    this._element.querySelector(".quantityApi").textContent = this.quantity;
    this._element.querySelector(".regionNameApi").textContent = this.regionName;
    this._element.querySelector(".saleIDApi").textContent = this.saleID;
    this._element.querySelector(".sppApi").textContent = this.spp;
    this._element.querySelector(".subjectApi").textContent = this.subject;
    this._element.querySelector(".supplierArticleApi").textContent =
      this.supplierArticle;
    this._element.querySelector(".techSizeApi").textContent = this.techSize;
    this._element.querySelector(".totalPriceApi").textContent = this.totalPrice;
    this._element.querySelector(".warehouseNameApi").textContent =
      this.warehouseName;
    this._element.querySelector(".numberApi").textContent = this.number;

    // Не задействованы параметры из апи:
    // SCCode: "";
    // isRealization: false;
    // isSupply: true;

    return this._element;
  }

  // Выделаем фоном продажи, возвраты и счётчик ситает кол-во продаж и возвратов
  _cardBackgroundSales() {
    this._cardSalesLi = this._generateCardSales();

    let li = document.createElement("li");
    let saleSymbol = this.saleID.substring(0, 1);
    li.classList.add("card_li");
    document.querySelector(".card_list").append(li);
    li.append(this._cardSalesLi);
    counterSalesAll++;
    if (saleSymbol == "S" && this.forPay != 0) {
      li.classList.add("sales_color");
      counterSales = counterSales + this.quantity;
      summSales = summSales + this.finishedPrice;
      summForpay = summForpay + this.forPay;

      // Добавляем рассчёт коммиссии WB в рублях и процентах
      let comissionWB = this._cardSalesLi.querySelector(".price-card");
      let crateP = document.createElement("p");
      // crateP.classList.add("afterRub");
      crateP.classList.add("formula");
      crateP.textContent = `Комиссия WB: ${(
        this.finishedPrice - this.forPay
      ).toFixed(2)} руб. (${Math.round(
        100 - this.forPay / (this.finishedPrice / 100)
      )}%)`;
      comissionWB.append(crateP);
    } else if (saleSymbol == "R") {
      li.classList.add("refund_color");
      counterRefund = counterRefund - this.quantity;
      summRefund = summRefund - this.finishedPrice;
      // summRefund = 0;
      // Надпись "Возврат" под фото
      let returnText = document.createElement("div");
      returnText.textContent = "Возврат";
      this._cardSalesLi.querySelector(".photo-card").append(returnText);
    } else if (saleSymbol == "D") {
      li.classList.add("oplata_color");
      counterDoplata++;
      summDoplata = summDoplata + this.finishedPrice;
    } else if (saleSymbol == "B") {
      li.classList.add("stornoRefund_color");
      counterB_stornoVozvrat++;
      stornoRefund = stornoRefund + this.finishedPrice;
    } else if (saleSymbol == "A") {
      li.classList.add("stornoSales_color");
      counterA_stornoSale++;
      stornoSale = stornoSale + this.finishedPrice;

      // let stornoRefund = 0;
      let buttonHref = document.createElement("a");
      // buttonHref.href = `#${countNull}`;
      let buttonNext = document.createElement("Button");
      buttonNext.classList.add("buttonForPay_next");
      buttonNext.textContent = "Сторно продаж";
      buttonHref.append(buttonNext);
      let buttonSelector = this._element.querySelector(".photo-card");
      buttonSelector.append(buttonHref);
    }

    if (this.techSize == 0) {
      this._element.querySelector(".techSize").remove();
    }

    if (this.forPay == 0 && saleSymbol == "S") {
      li.classList.add("forPay_null");
      li.setAttribute("id", countNull);
      countNull++;
      saleNull = this.saleID;
      saleNullDade = this.date;

      let buttonHref = document.createElement("a");
      buttonHref.href = `#${countNull}`;
      let buttonNext = document.createElement("Button");
      buttonNext.classList.add("buttonForPay_next");
      buttonNext.textContent = "Следующий где 0руб.";

      buttonHref.append(buttonNext);

      let buttonSelector = this._element.querySelector(".photo-card");
      buttonSelector.append(buttonHref);
      console.log(`Договор реализации: ${this.isRealization}`);
    } else if (this.isRealization === "true" && saleSymbol == "S") {
      console.log(`Продажа по договору поставки, сумма ${this.forPay}`);
    }

    // Кол-во доплат, где сумму равна нулю
    if (this.forPay == 0 && saleSymbol == "D") {
      li.classList.add("forPay_null");
      countNullDoplata++;
    }
  }
}
// Счетчик
function counterAllSales() {
  let ul = document.createElement("ul");
  ul.classList.add("apiInfo_all");
  let listGeneral = document.createElement("li");
  listGeneral.classList.add("generalInfo");

  if (flag) {
    listGeneral.textContent = `Всего продаж и возвратов за дату ${
      document.querySelector("#dateApi").value
    }: ${counterSalesAll} шт.`;
  } else {
    listGeneral.textContent = `Всего продаж и возвратов с ${
      document.querySelector("#dateApi").value
    } по настоящее время: ${counterSalesAll} шт.`;
  }
  ul.append(listGeneral);

  let listSales = document.createElement("li");
  if (counterSales > 0) {
    listSales.classList.add("secondaryInfo");
    listSales.classList.add("sales_textColor");
    listSales.textContent = `Всего продаж: ${counterSales} шт. на сумму ${summSales.toFixed(
      2
    )} руб. Общая сумма к перечислению ${summForpay.toFixed(2)}`;
    ul.append(listSales);
  }

  let listRefund = document.createElement("li");
  if (counterRefund > 0) {
    listRefund.classList.add("secondaryInfo");
    listRefund.classList.add("refund_textColor");
    listRefund.textContent = `Всего возвратов: ${counterRefund} шт. на сумму ${summRefund.toFixed(
      2
    )} руб.`;
    ul.append(listRefund);
  }

  if (counterDoplata > 0) {
    let listDoplata = document.createElement("li");
    listDoplata.classList.add("secondaryInfo");
    listDoplata.textContent = `Всего доплат: ${counterDoplata}шт. на сумму: ${summDoplata.toFixed(
      2
    )}руб.`;
    ul.append(listDoplata);

    // let listSummDoplata = document.createElement("li");
    // listSummDoplata.classList.add("secondaryInfo");
    // listSummDoplata.textContent = `Доплат на сумму: ${summDoplata.toFixed(
    //   2
    // )}руб.`;
    // ul.append(listSummDoplata);
  }

  if (counterB_stornoVozvrat > 0) {
    let listStornoVozvrat = document.createElement("li");
    listStornoVozvrat.classList.add("secondaryInfo");
    listStornoVozvrat.textContent = `Всего стороно возвратов: ${counterB_stornoVozvrat}шт. на сумму ${stornoRefund} руб.`;
    ul.append(listStornoVozvrat);
  }

  if (countNullDoplata > 0) {
    let listStornoVozvrat = document.createElement("li");
    listStornoVozvrat.classList.add("secondaryInfo");
    listStornoVozvrat.textContent = `Всего доплат с нулевой стоимостью: ${countNullDoplata}шт. (Это баг, но пользователям не пишем)`;
    ul.append(listStornoVozvrat);
  }

  if (counterA_stornoSale > 0) {
    let listStornoSale = document.createElement("li");
    listStornoSale.classList.add("secondaryInfo");
    listStornoSale.textContent = `Всего стороно продаж: ${counterA_stornoSale}шт. На сумму ${stornoSale} руб.`;
    ul.append(listStornoSale);

    // counterA_stornoSale++;
    // stornoSale = stornoSale + this.finishedPrice;
  }

  //Продажи без суммы forPay =0

  if (countNull > 0) {
    // Кнопка под фото
    let forPayHref = document.createElement("a");
    forPayHref.href = "#0";
    let forPayNullButton = document.createElement("button");
    forPayNullButton.classList.add("forPay_null_text");
    forPayNullButton.classList.add("secondaryInfo");
    forPayNullButton.textContent = `БАГ: Продаж с нулевой стоимостью: ${countNull}шт`;
    forPayHref.append(forPayNullButton);
    ul.append(forPayHref);

    // forPayNullButton.addEventListener("click", (event) => {
    //   event.preventDefault();
    //   // forPayHref.href = "#0";
    //   // document.location.hash = "#" + 0;
    // });

    // Создаём кнопку для отправки письма
    let ticketButton = document.createElement("button");
    ticketButton.classList.add("forPay_null_text");
    ticketButton.classList.add("secondaryInfo");
    ticketButton.textContent = `Письмо в поддеркжу WB`;
    ticketButton.addEventListener("click", ticketForWbText);
    document.querySelector(".apiInfo").append(ticketButton);
    ul.append(ticketButton);
  }

  document.querySelector(".apiInfo").append(ul);

  // counterSalesNull();
}

// Текст письма
function ticketForWbText(event) {
  event.preventDefault();
  prompt(
    "Текст ответа пользователю:",
    `Здравствуйте.
Проверили данные вашего магазина. В API-ключе у некоторых продаж нет данных о сумме, которую оплатил клиент и нет суммы, которую переведет вам WB за данную продажу.
На этой деле мы изменим алгоритмы работы инструментов, после чего будут отражены корректные суммы продаж.

Для решения проблем с API рекомендуем <a href="https://seller.wildberries.ru/service-desk-v2/requests/history">обратиться в поддержку wildberries</a>  (тему выберите: <b>"Ошибки в получаемой информации по API"</b>) и попросить их скорректировать данные в API-ключе вашего магазина.
В обращении укажите строку вызова, это позволит быстрее получить от них ответ.
Текст для обращения в поддержку wildberries предлагаю такой:
    
Здравствуйте
В API-ключе передается не корректная информация о продажах.
Например у продажи ${saleNull} (поле: saleID) от ${saleNullDade} не указана сумма, которую оплатил клиент, а также не указана сумма перевода от WB (поле: forPay).
${itogInfoApi()} продаж с подобной проблемой ${countNull}шт. 
Просьба скорректировать данные и добавить информацию в API-ключ.
Ответ о том, что данные в аналитических отчетах (в том числе и API) носят промежуточный характер и могут содержать неточную информацию, т.к. являются оперативными и динамически изменяются прошу не писать, поскольку в данных, которые передаются имеется ошибки, в частности не у всех товаров в API-ключе указана сумма покупки и сумма к переводу от WB.
  
Строка вызова: ${getAPI("sales")}`
  );
}

function itogInfoApi(params) {
  let date = document.querySelector("#dateApi").value;
  let outDaye = "";
  if (flag) {
    outDaye = `За ${date} число `;
  } else {
    outDaye = `С ${date} число по настоящее время `;
  }
  return outDaye;
}
// getCardForNull();

// function getCardForNull(selector) {
//   let allButtonNext = document.querySelectorAll(".forPay_null");
//   console.log(allButtonNext);

//   for (let button of allButtonNext) {
//     console.log(button.querySelector(".buttonForPay_next"));
//     button.addEventListener("click", (event) => {
//       event.preventDefault();

//       const goto = allButtonNext.hasAttribute("5")
//         ? anchor.getAttribute("5")
//         : "body";
//       // Плавная прокрутка до элемента с id = href у ссылки
//       document.querySelector(goto).scrollIntoView({
//         behavior: "smooth",
//         block: "start",
//       });
//     });
//   }
// }
// setTimeout(getCardForNull, 5000);
