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
    let cardSalesLi = this._generateCardSales();

    let li = document.createElement("li");
    let saleSymbol = this.saleID.substring(0, 1);
    li.classList.add("card_li");
    document.querySelector(".card_list").append(li);
    li.append(cardSalesLi);
    counterSalesAll++;
    if (saleSymbol == "S") {
      li.classList.add("sales_color");
      counterSales = counterSales + this.quantity;
      summSales = summSales + this.finishedPrice;
    } else if (saleSymbol == "R") {
      li.classList.add("refund_color");
      counterRefund = counterRefund - this.quantity;
      summRefund = summRefund - this.finishedPrice;
      // summRefund = 0;
    } else if (saleSymbol == "D") {
      li.classList.add("oplata_color");
      counterDoplata++;
      summDoplata = summDoplata + this.finishedPrice;
    } else if (saleSymbol == "B") {
      li.classList.add("stornoRefund_color");
      counterB_stornoVozvrat++;
    } else if (saleSymbol == "A") {
      li.classList.add("stornoSales_color");
      counterA_stornoSale++;
    }

    if (this.techSize == 0) {
      this._element.querySelector(".techSize").remove();
    }
    console.log(`Всего записей в API: ${counterSalesAll}`);
    console.log(`Кол-во продаж (шт): ${counterSales}`);
    console.log(`Сумма продаж: ${summSales}`);
    console.log(`Кол-во возвартов: ${counterRefund}`);
    console.log(`Сумма возвартов: ${summRefund}`);
    console.log(`Кол-во доплат: ${counterDoplata}`);
    console.log(`Кол-во Сторно возвратов: ${counterB_stornoVozvrat}`);
    console.log(`Кол-во Сторно продаж: ${counterA_stornoSale}`);
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
    )} руб.`;
    ul.append(listSales);

    // let listSummSales = document.createElement("li");
    // listSummSales.classList.add("secondaryInfo");
    // listSummSales.classList.add("sales_textColor");
    // listSummSales.textContent = `Продаж на сумму: ${summSales.toFixed(2)} руб.`;
    // ul.append(listSummSales);
  }

  let listRefund = document.createElement("li");
  if (counterRefund > 0) {
    listRefund.classList.add("secondaryInfo");
    listRefund.classList.add("refund_textColor");
    listRefund.textContent = `Всего возвратов: ${counterRefund} шт. на сумму ${summRefund.toFixed(
      2
    )} руб.`;
    ul.append(listRefund);

    // let listSummRefund = document.createElement("li");
    // listSummRefund.classList.add("secondaryInfo");
    // listSummRefund.classList.add("refund_textColor");
    // listSummRefund.textContent = `Возвратов на сумму: ${summRefund.toFixed(2)}`;
    // ul.append(listSummRefund);
  }

  let listDoplata = document.createElement("li");
  if (counterDoplata > 0) {
    listDoplata.classList.add("secondaryInfo");
    listDoplata.textContent = `Всего доплат: ${counterDoplata}`;
    ul.append(listDoplata);

    let listSummDoplata = document.createElement("li");
    listSummDoplata.classList.add("secondaryInfo");
    listSummDoplata.textContent = `Доплат на сумму: ${summDoplata.toFixed(2)}`;
    ul.append(listSummDoplata);
  }

  let listStornoVozvrat = document.createElement("li");
  if (counterB_stornoVozvrat > 0) {
    listStornoVozvrat.classList.add("secondaryInfo");
    listStornoVozvrat.textContent = `Всего стороно возвратов: ${counterB_stornoVozvrat}`;
    ul.append(listStornoVozvrat);
  }

  let listStornoSale = document.createElement("li");
  if (counterA_stornoSale > 0) {
    listStornoSale.classList.add("secondaryInfo");
    listStornoSale.textContent = `Всего стороно продаж: ${counterB_stornoVozvrat}`;
    ul.append(listStornoSale);
  }

  document.querySelector(".apiInfo").append(ul);

  console.log(ul);
}
