class Incomes {
  constructor(APIincomes) {
    (this.incomeId = APIincomes.incomeId),
      (this.number = APIincomes.number),
      (this.date = APIincomes.date),
      (this.lastChangeDate = APIincomes.astChangeDate),
      (this.supplierArticle = APIincomes.supplierArticle),
      (this.techSize = APIincomes.techSize),
      (this.barcode = APIincomes.barcode),
      (this.quantity = APIincomes.quantity),
      (this.totalPrice = APIincomes.totalPrice),
      (this.dateClose = APIincomes.dateClose),
      (this.warehouseName = APIincomes.warehouseName),
      (this.nmId = APIincomes.nmId),
      (this.status = APIincomes.status);
  }

  // Возвращает карточку поставки
  _getTemplateIncomes() {
    const templateIncomes = document
      .querySelector(".templateCard-incomes")
      .content.querySelector(".fieldsetCard")
      .cloneNode(true);
    return templateIncomes;
  }

  // Создаём карточку с fieldset
  _generateCardIncomes() {
    this._element = this._getTemplateIncomes();
    this._element.querySelector(".numberIncomes").textContent = this.incomeId;
    this._element.querySelector(".dataIncomes").textContent = this.date;
    this._element.querySelector(".photo-card_small").src = imageCrеate(
      this.nmId
    );
    this._element.querySelector(".nmidApi").textContent = this.nmId;
    this._element.querySelector(".quantityApi").textContent = this.quantity;
    this._element.querySelector(".supplierArticleApi").textContent =
      this.supplierArticle;
    this._element.querySelector(".techSize").textContent = this.techSize;
    this._element.querySelector(".barcodeApi").textContent = this.barcode;
    this._element.querySelector(".warehouseNameApi").textContent =
      this.warehouseName;
    this._element.querySelector(".statusApi").textContent = this.status;
    this._element.querySelector(".numberApi").textContent = this.number;
    this._element.querySelector(".lastChangeDateApi").textContent =
      this.lastChangeDate;
    this._element.querySelector(".totalPriceApi").textContent = this.totalPrice;
    this._element.querySelector(".dateCloseApi").textContent = this.dateClose;

    return this._element;
  }
}

// ZGQ0YzNjZjItYTVmNC00YWFlLWJhNGYtOGU2OTU3YWFmOTQ5

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
