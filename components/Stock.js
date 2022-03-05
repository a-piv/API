let inWayToClientCounter = 0;
let inWayFromClientCounter = 0;

// Всего товаров для продиж:
let counterAllQuantityProduct = 0;
// На общую сумму:
let counterAllQuantitySumm = 0;

function counterStockNull() {
  inWayToClientCounter = 0;
  inWayFromClientCounter = 0;
  counterAllQuantityProduct = 0;
  counterAllQuantitySumm = 0;
}

class Stock {
  constructor(apiStocks, i) {
    this.i = i + 1;
    this.lastChangeDate = apiStocks.lastChangeDate;
    this.supplierArticle = apiStocks.supplierArticle;
    this.techSize = apiStocks.techSize;
    this.barcode = apiStocks.barcode;
    this.quantity = apiStocks.quantity;
    this.isSupply = apiStocks.isSupply;
    this.isRealization = apiStocks.isRealization;
    this.quantityFull = apiStocks.quantityFull;
    this.quantityNotInOrders = apiStocks.quantityNotInOrders;
    this.warehouseName = apiStocks.warehouseName;
    this.inWayToClient = apiStocks.inWayToClient;
    this.inWayFromClient = apiStocks.inWayFromClient;
    this.nmId = apiStocks.nmId;
    this.subject = apiStocks.subject;
    this.category = apiStocks.category;
    this.daysOnSite = apiStocks.daysOnSite;
    this.brand = apiStocks.brand;
    this.SCCode = apiStocks.SCCode;
    this.Price = apiStocks.Price;
    this.Discount = apiStocks.Discount;
  }

  _getTemplateStock() {
    let templateStock = document
      .querySelector(".templateCard-stocks")
      .content.querySelector(".card_stock")
      .cloneNode(true);
    return templateStock;
  }

  _createCard() {
    this.cardStocks = this._getTemplateStock();
    this.cardStocks.querySelector(".number-card").textContent = this.i;
    //Рассчитывем сумму со скидкой
    this.cardStocks.querySelector(".final-price").textContent = getDiscount(
      this.Price,
      this.Discount
    );

    this.cardStocks
      .querySelector(".photo-card-href")
      .setAttribute(
        "href",
        `https://www.wildberries.ru/catalog/${this.nmId}/detail.aspx`
      );

    this.cardStocks.querySelector(".photo-card_small").src = `${imageCrеate(
      this.nmId
    )}`;

    this.cardStocks.querySelector(".lastChangeDateApi").textContent =
      this.lastChangeDate;
    this.cardStocks.querySelector(".supplierArticleApi").textContent =
      this.supplierArticle;
    this.cardStocks.querySelector(".techSizeApi").textContent = this.techSize;
    this.cardStocks.querySelector(".barcodeApi").textContent = this.barcode;
    this.cardStocks.querySelector(".quantityApi").textContent = this.quantity;

    this.cardStocks.querySelector(".isSupplyApi").textContent = this.isSupply;
    this.cardStocks.querySelector(".isRealizationApi").textContent =
      this.isRealization;
    this.cardStocks.querySelector(".quantityFullApi").textContent =
      this.quantityFull;
    this.cardStocks.querySelector(".quantityNotInOrdersApi").textContent =
      this.quantityNotInOrders;
    this.cardStocks.querySelector(".warehouseNameApi").textContent =
      this.warehouseName;

    this.cardStocks.querySelector(".inWayToClientApi").textContent =
      this.inWayToClient;
    inWayToClientCounter = inWayToClientCounter + this.inWayToClient;

    this.cardStocks.querySelector(".inWayFromClientApi").textContent =
      this.inWayFromClient;
    inWayFromClientCounter = inWayFromClientCounter + this.inWayFromClient;

    this.cardStocks.querySelector(".nmIdApi").textContent = this.nmId;
    this.cardStocks.querySelector(".subjectApi").textContent = this.subject;
    this.cardStocks.querySelector(".categoryApi").textContent = this.category;
    this.cardStocks.querySelector(".daysOnSiteApi").textContent =
      this.daysOnSite;
    this.cardStocks.querySelector(".brandApi").textContent = this.brand;
    this.cardStocks.querySelector(".SCCodeApi").textContent = this.SCCode;
    this.cardStocks.querySelector(".priceApi").textContent = this.Price;
    this.cardStocks.querySelector(".discountApi").textContent = this.Discount;
    return this.cardStocks;
  }
  _cardBackgroundStock() {
    this.CardStocksLi = this._createCard();
    let li = document.createElement("li");
    li.classList.add("card_li");
    li.classList.add("stocks_color");
    li.append(this.CardStocksLi);
    document.querySelector(".card_list").append(li);
    //Считаем общее кол-во товара для продажи
    counterAllQuantityProduct = counterAllQuantityProduct + this.quantity;
    // console.log(counterAllQuantityProduct);
    //Считаем общую сумму товаров для продажи
    if (this.quantity != 0) {
      let summ = this.quantity * getDiscount(this.Price, this.Discount);
      counterAllQuantitySumm = counterAllQuantitySumm + summ;
      // console.log(summ);
      // console.log(counterAllQuantitySumm);
    }
    if (this.techSize == 0) {
      this.cardStocks.querySelector(".techSize").remove();
    }
  }
}
function counterFromClient() {
  let ul = document.createElement("ul");
  ul.classList.add("apiInfo_all");

  //   let counterAllQuantityProduct = 0;
  // // На общую сумму:
  // let counterAllQuantitySumm = 0;

  let allQuantitySale = document.createElement("li");
  allQuantitySale.classList.add("generalInfo");
  allQuantitySale.textContent = `За  ${
    document.querySelector("#dateApi").value
  } кол-во товаров (доступных для продажи)  ${counterAllQuantityProduct}шт. На общую сумму ${counterAllQuantitySumm} руб. (без учёта СПП)`;
  ul.append(allQuantitySale);

  let listToClient = document.createElement("li");
  listToClient.classList.add("secondaryInfo");
  listToClient.textContent = `Едет к клиенту: ${inWayToClientCounter}шт.`;
  ul.append(listToClient);

  let listFromClient = document.createElement("li");
  listFromClient.classList.add("secondaryInfo");
  listFromClient.textContent = `Едет от клиента: ${inWayFromClientCounter}шт.`;
  ul.append(listFromClient);

  document.querySelector(".apiInfo").append(ul);

  counterStockNull();
}
