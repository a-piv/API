let counterOrdersAll = 0;
let counterOrdersOk = 0;
let counterOrdersCansel = 0;
let summOrders = 0;
let summOrdersCansel = 0;
let counterNmIdNull = 0;

class Orders {
  constructor(param, i) {
    this.i = i + 1;
    this.number = param.number;
    this.date = param.date;
    this.lastChangeDate = param.lastChangeDate;
    this.supplierArticle = param.supplierArticle;
    this.techSize = param.techSize;
    this.barcode = param.barcode;
    this.quantity = param.quantity;
    this.totalPrice = param.totalPrice;
    this.discountPercent = param.discountPercent;
    this.warehouseName = param.warehouseName;
    this.oblast = param.oblast;
    this.incomeID = param.incomeID;
    this.odid = param.odid;
    this.nmId = param.nmId;
    this.subject = param.subject;
    this.category = param.category;
    this.brand = param.brand;
    this.isCancel = param.isCancel;
    this.cancel_dt = param.cancel_dt;
    this.gNumber = param.gNumber;
  }

  _getTemplateOrders() {
    let templateOrders = document
      .querySelector(".templateCard-orders")
      .content.querySelector(".card_stock")
      .cloneNode(true);
    return templateOrders;
  }

  _generateCardOrders() {
    this._cardOrders = this._getTemplateOrders();
    this._cardOrders.querySelector(".number-card").textContent = this.i;

    this._cardOrders
      .querySelector(".photo-card-href")
      .setAttribute(
        "href",
        `https://www.wildberries.ru/catalog/${this.nmId}/detail.aspx`
      );

    this._cardOrders.querySelector(".photo-card_small").src = `${imageCrеate(
      this.nmId
    )}`;

    this._cardOrders.querySelector(".numberApi").textContent = this.number;
    this._cardOrders.querySelector(".dateApi").textContent = this.date;
    this._cardOrders.querySelector(".lastChangeDateApi").textContent =
      this.lastChangeDate;
    this._cardOrders.querySelector(".supplierArticleApi").textContent =
      this.supplierArticle;
    this._cardOrders.querySelector(".techSizeApi").textContent = this.techSize;
    this._cardOrders.querySelector(".barcodeApi").textContent = this.barcode;
    this._cardOrders.querySelector(".quantityApi").textContent = this.quantity;
    this._cardOrders.querySelector(".totalPriceApi").textContent =
      this.totalPrice;
    this._cardOrders.querySelector(".discountPercentApi").textContent =
      this.discountPercent;

    // Рассчитываем суму заказа согластно стоимости товара и скидке
    this.ordersSkidkaVRub = (this.totalPrice / 100) * this.discountPercent;

    this.ordersSumm = Math.floor(this.totalPrice - this.ordersSkidkaVRub);
    this._cardOrders.querySelector(
      ".totalPriceNotApi"
    ).textContent = `${this.ordersSumm} руб.`;

    this._cardOrders.querySelector(".warehouseNameApi").textContent =
      this.warehouseName;
    this._cardOrders.querySelector(".oblastApi").textContent = this.oblast;
    this._cardOrders.querySelector(".incomeIDApi").textContent = this.incomeID;
    this._cardOrders.querySelector(".odidApi").textContent = this.odid;
    this._cardOrders.querySelector(".nmIdApi").textContent = this.nmId;
    this._cardOrders.querySelector(".subjectApi").textContent = this.subject;
    this._cardOrders.querySelector(".categoryApi").textContent = this.category;
    this._cardOrders.querySelector(".brandApi").textContent = this.brand;
    this._cardOrders.querySelector(".isCancelApi").textContent = this.isCancel;
    this._cardOrders.querySelector(".cancel_dtApi").textContent =
      this.cancel_dt;
    this._cardOrders.querySelector(".gNumberApi").textContent = this.gNumber;
    return this._cardOrders;
  }

  _cardBackgroundOrders() {
    let cardOrdersLi = this._generateCardOrders();
    let li = document.createElement("li");
    li.classList.add("card_li");
    counterOrdersAll++;
    //summOrders++;

    if (this.nmId == 0) {
      li.classList.add("orders_notNmiD");
      counterNmIdNull++;
      console.log(counterNmIdNull);
      let bottonNext = document.createElement("button");
      bottonNext.textContent = "Следующий";
      bottonNext.addEventListener("click", getNextSelector("orders_notNmiD"));
      this._cardOrders.querySelector(".warehouseNameApi").append(bottonNext);
      // let a = document.createElement("a");
      // a.appendChild(bottonNext);
      // let linkText = document.createTextNode("Следующий пустой");

      // let b = document.querySelector(".orders_notNmiD");
      // a.href = b;
      // console.log(a);
      //
      // апи с пустыми от 22 MWIxN2ZiYTItMDcwNC00NWZjLTllNzAtMTZiM2ZkYjhhNzhm
      // this.nmId.appendChild(a);
    }

    if (this.isCancel) {
      li.classList.add("refund_color");
      counterOrdersCansel++;
      summOrdersCansel = summOrdersCansel + this.ordersSumm;
    } else {
      li.classList.add("orders_color");
      this._cardOrders.querySelector(".isCancel").remove();
      this._cardOrders.querySelector(".cancel_dt").remove();

      counterOrdersOk++;
      summOrders = summOrders + this.ordersSumm;
    }
    // Если размер равен нулю, удаляем поле
    if (this.techSize == 0) {
      this._cardOrders.querySelector(".techSize").remove();
    }

    li.append(cardOrdersLi);
    document.querySelector(".card_list").append(li);
  }
}

function counterAllOrders() {
  let ul = document.createElement("ul");
  ul.classList.add("apiInfo_all");
  let listGeneral = document.createElement("li");
  listGeneral.classList.add("generalInfo");
  if (flag) {
    listGeneral.textContent = `Всего заказов за дату ${
      document.querySelector("#dateApi").value
    }: ${counterOrdersAll} шт.`;
  } else {
    listGeneral.textContent = `Всего заказво с ${
      document.querySelector("#dateApi").value
    } по настоящее время: ${counterOrdersAll} шт.`;
  }
  ul.append(listGeneral);

  let listOrdersOk = document.createElement("li");
  if (counterOrdersOk > 0) {
    listOrdersOk.classList.add("secondaryInfo");

    listOrdersOk.textContent = `Успешных заказов ${counterOrdersOk} шт. на сумму ${summOrders} руб. `;
    ul.append(listOrdersOk);
  }
  let listOrdersCansel = document.createElement("li");
  if (counterOrdersCansel > 0) {
    listOrdersCansel.classList.add("secondaryInfo");
    listOrdersCansel.classList.add("refund_textColor");
    listOrdersCansel.textContent = `Отмененных заказов ${counterOrdersCansel} шт. на сумму ${summOrdersCansel} руб.`;
    ul.append(listOrdersCansel);
  }

  // Заказы без артикула
  let listOrdersNotNmId = document.createElement("li");
  if (counterNmIdNull > 0) {
    listOrdersNotNmId.classList.add("secondaryInfo");
    listOrdersNotNmId.classList.add("refund_textColor");
    listOrdersNotNmId.textContent = `Заказов без номера ${counterNmIdNull} шт.`;
    ul.append(listOrdersNotNmId);
  }

  document.querySelector(".apiInfo").append(ul);
}
