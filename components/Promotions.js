class Promotions {
  constructor(param) {
    this.UID = param.UID;
    this.CategoryUID = param.CategoryUID;
    this.ApplicationType = param.ApplicationType;
    this.URLType = param.URLType;
    this.LocationType = param.LocationType;
    this.MenuIds = param.MenuIds;
    this.BrandIds = param.BrandIds;
    this.ClusterIds = param.ClusterIds;
    this.Sle = param.Sle;
    this.PlacementOptions = param.PlacementOptions;
    this.DisplayType = param.DisplayType;
    this.ZoneIds = param.ZoneIds;
    this.StartDate = param.StartDate;
    this.EndDate = param.EndDate;
    this.Href = param.Href;
    this.HrefGlobal = param.HrefGlobal;
    this.Src = param.Src;
    this.Alt = param.Alt;
    this.NoFollow = param.NoFollow;
    this.NoIndex = param.NoIndex;
    this.Target = param.Target;
    this.AdditionalSections = param.AdditionalSections;
    this.Rv = param.Rv;
    this.IsDeleted = param.IsDeleted;
    this.IsHTML5 = param.IsHTML5;
    this.HTML5Src = param.HTML5Src;
    this.PromoText = param.PromoText;
    this.PromoTextLines = param.PromoTextLines;
    this.Provider = param.Provider;
    this.CountryBitmask = param.CountryBitmask;
    this.Culture = param.Culture;
    this.GroupUID = param.GroupUID;
    this.IsPay = param.IsPay;
    this.IsPublic = param.IsPublic;
  }
  _getTemplatePromotions() {
    // console.log(this.Alt)
    let templatePromotions = document
      .querySelector(".templateAction")
      .content.querySelector(".oneAction")
      .cloneNode(true);
    console.log(templatePromotions);
    return templatePromotions;
  }
  _generateCardPromotions() {
    this._cardPromotions = this._getTemplatePromotions();

    this._cardPromotions.querySelector(".imageActionLink").href = `https://www.wildberries.ru${this.Href}`;
    this._cardPromotions.querySelector(".imageActionPromo").src = `https://static-basket-01.wb.ru/vol1/crm-bnrs${this.Src}`;
    this._cardPromotions.querySelector(".imageActionPromo").alt = this.Alt;
    this._cardPromotions.querySelector(".promoTextActionAPI").textContent = this.PromoText;
    this._cardPromotions.querySelector(".altActionAPI").textContent = this.Alt;
    this._cardPromotions.querySelector(".startDateActionAPI").textContent = this.StartDate;
    this._cardPromotions.querySelector(".endDateActionAPI").textContent = this.EndDate;
    this._cardPromotions.querySelector(".isPayActionAPI").textContent = this.IsPay;
    // Выделяем фон зелёнмы и красным
    if (this.IsPay) {
      this._cardPromotions.classList.add("actionPayTrue");
    } else {
      this._cardPromotions.classList.add("actionPayFalse");
    }
    this._cardPromotions.querySelector(".countryBitmaskActionAPI").textContent =
      this.CountryBitmask;

    this._cardPromotions.querySelector(".hrefActionAPI").textContent = this.Href;
    let hrefBrand = this.Href.split('/')
    if (hrefBrand[1]=='brands'){
        
        let vodniyBrend = document.createElement("div");
            vodniyBrend.innerHTML = "Brend";
            vodniyBrend.classList.add("actionPayBrands");
        this._cardPromotions.appendChild(vodniyBrend);
        

    }
    console.log(hrefBrand[1])

      console.log(this._cardPromotions);

    // Убрать кпопку "Получить все "Акции""
    // document.querySelector('.buttonGetAction').remove();

    document.querySelector(".allActions").append(this._cardPromotions);
  }
}
