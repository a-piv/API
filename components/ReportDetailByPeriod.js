class ReportDetailByPeriod {
  constructor(APIReportDetailByPeriod) {
    console.log("ds");
    this.realizationreport_id = APIReportDetailByPeriod.realizationreport_id;
    this.suppliercontract_code = APIReportDetailByPeriod.suppliercontract_code;
    this.rid = APIReportDetailByPeriod.rid;
    this.rr_dt = APIReportDetailByPeriod.rr_dt;
    this.rrd_id = APIReportDetailByPeriod.rrd_id;
    this.gi_id = APIReportDetailByPeriod.gi_id;
    this.subject_name = APIReportDetailByPeriod.subject_name;
    this.nm_id = APIReportDetailByPeriod.nm_id;
    this.brand_name = APIReportDetailByPeriod.brand_name;
    this.sa_name = APIReportDetailByPeriod.sa_name;
    this.ts_name = APIReportDetailByPeriod.ts_name;
    this.barcode = APIReportDetailByPeriod.barcode;
    this.doc_type_name = APIReportDetailByPeriod.doc_type_name;
    this.quantity = APIReportDetailByPeriod.quantity;
    this.retail_price = APIReportDetailByPeriod.retail_price;
    this.retail_amount = APIReportDetailByPeriod.retail_amount;
    this.sale_percent = APIReportDetailByPeriod.sale_percent;
    this.commission_percent = APIReportDetailByPeriod.commission_percent;
    this.office_name = APIReportDetailByPeriod.office_name;
    this.supplier_oper_name = APIReportDetailByPeriod.supplier_oper_name;
    this.order_dt = APIReportDetailByPeriod.order_dt;
    this.sale_dt = APIReportDetailByPeriod.sale_dt;
    this.shk_id = APIReportDetailByPeriod.shk_id;
    this.retail_price_withdisc_rub =
      APIReportDetailByPeriod.retail_price_withdisc_rub;
    this.delivery_amount = APIReportDetailByPeriod.delivery_amount;
    this.return_amount = APIReportDetailByPeriod.return_amount;
    this.delivery_rub = APIReportDetailByPeriod.delivery_rub;
    this.gi_box_type_name = APIReportDetailByPeriod.gi_box_type_name;
    this.product_discount_for_report =
      APIReportDetailByPeriod.product_discount_for_report;
    this.supplier_promo = APIReportDetailByPeriod.supplier_promo;
    this.ppvz_spp_prc = APIReportDetailByPeriod.ppvz_spp_prc;
    this.ppvz_kvw_prc_base = APIReportDetailByPeriod.ppvz_kvw_prc_base;
    this.ppvz_kvw_prc = APIReportDetailByPeriod.ppvz_kvw_prc;
    this.ppvz_sales_commission = APIReportDetailByPeriod.ppvz_sales_commission;
    this.ppvz_for_pay = APIReportDetailByPeriod.ppvz_for_pay;
    this.ppvz_reward = APIReportDetailByPeriod.ppvz_reward;
    this.ppvz_vw = APIReportDetailByPeriod.ppvz_vw;
    this.ppvz_vw_nds = APIReportDetailByPeriod.ppvz_vw_nds;
    this.ppvz_office_id = APIReportDetailByPeriod.ppvz_office_id;
    this.ppvz_office_name = APIReportDetailByPeriod.ppvz_office_name;
    this.ppvz_supplier_id = APIReportDetailByPeriod.ppvz_supplier_id;
    this.ppvz_supplier_name = APIReportDetailByPeriod.ppvz_supplier_name;
    this.ppvz_inn = APIReportDetailByPeriod.ppvz_inn;
    this.declaration_number = APIReportDetailByPeriod.declaration_number;
    this.sticker_id = APIReportDetailByPeriod.sticker_id;
    this.site_country = APIReportDetailByPeriod.site_country;
    this.penalty = APIReportDetailByPeriod.penalty;
    this.additional_payment = APIReportDetailByPeriod.additional_payment;
    this.bonus_type_name = APIReportDetailByPeriod.bonus_type_name;
  }

  _getReportDetailByPeriod() {
    let templateReportDetailByPeriod = document
      .querySelector(".templateCard-reportDetailByPeriod")
      .content.querySelector(".card_stock")
      .cloneNode(true);
    return templateReportDetailByPeriod;
  }

  _createCardReportDetailByPeriod() {
    this.cardReport = this._getReportDetailByPeriod();
    this.cardReport.querySelector(".number-card").textContent = this.i;
    this.cardReport
      .querySelector(".photo-card-href")
      .setAttribute(
        "href",
        `https://www.wildberries.ru/catalog/${this.nm_id}/detail.aspx`
      );

    this.cardReport.querySelector(".photo-card_small").src = `${imageCrеate(
      this.nm_id
    )}`;
    console.log(this.realizationreport_id);
    console.log(this.nm_id);
    console.log(this.cardReport);

    this.cardReport.querySelector(".realizationreport_idApi").textContent =
      this.realizationreport_id;
    this.cardReport.querySelector(".suppliercontract_codeApi").textContent =
      this.suppliercontract_code;
    this.cardReport.querySelector(".ridApi").textContent = this.rid;
    this.cardReport.querySelector(".rr_dtApi").textContent = this.rr_dt;
    this.cardReport.querySelector(".rrd_idApi").textContent = this.rrd_id;
    this.cardReport.querySelector(".gi_idApi").textContent = this.gi_id;
    this.cardReport.querySelector(".subject_nameApi").textContent =
      this.subject_name;
    this.cardReport.querySelector(".nm_idApi").textContent = this.nm_id;
    this.cardReport.querySelector(".brand_nameApi").textContent =
      this.brand_name;
    this.cardReport.querySelector(".sa_nameApi").textContent = this.sa_name;
    this.cardReport.querySelector(".ts_nameApi").textContent = this.ts_name;
    this.cardReport.querySelector(".barcodeApi").textContent = this.barcode;
    this.cardReport.querySelector(".doc_type_nameApi").textContent =
      this.doc_type_name;
    this.cardReport.querySelector(".quantityApi").textContent = this.quantity;
    this.cardReport.querySelector(".retail_priceApi").textContent =
      this.retail_price;
    this.cardReport.querySelector(".retail_amountApi").textContent =
      this.retail_amount;
    this.cardReport.querySelector(".sale_percentApi").textContent =
      this.sale_percent;
    this.cardReport.querySelector(".commission_percentApi").textContent =
      this.commission_percent;
    this.cardReport.querySelector(".office_nameApi").textContent =
      this.office_name;
    this.cardReport.querySelector(".supplier_oper_nameApi").textContent =
      this.supplier_oper_name;
    this.cardReport.querySelector(".order_dtApi").textContent = this.order_dt;
    this.cardReport.querySelector(".sale_dtApi").textContent = this.sale_dt;
    this.cardReport.querySelector(".shk_idApi").textContent = this.shk_id;
    this.cardReport.querySelector(".retail_price_withdisc_rubApi").textContent =
      this.retail_price_withdisc_rub;
    this.cardReport.querySelector(".delivery_amountApi").textContent =
      this.delivery_amount;
    this.cardReport.querySelector(".return_amountApi").textContent =
      this.return_amount;
    this.cardReport.querySelector(".delivery_rubApi").textContent =
      this.delivery_rub;
    this.cardReport.querySelector(".gi_box_type_nameApi").textContent =
      this.gi_box_type_name;
    this.cardReport.querySelector(
      ".product_discount_for_reportApi"
    ).textContent = this.product_discount_for_report;
    this.cardReport.querySelector(".supplier_promoApi").textContent =
      this.supplier_promo;
    this.cardReport.querySelector(".ppvz_spp_prcApi").textContent =
      this.ppvz_spp_prc;
    this.cardReport.querySelector(".ppvz_kvw_prc_baseApi").textContent =
      this.ppvz_kvw_prc_base;
    this.cardReport.querySelector(".ppvz_kvw_prcApi").textContent =
      this.ppvz_kvw_prc;
    this.cardReport.querySelector(".ppvz_sales_commissionApi").textContent =
      this.ppvz_sales_commission;
    this.cardReport.querySelector(".ppvz_for_payApi").textContent =
      this.ppvz_for_pay;
    this.cardReport.querySelector(".ppvz_rewardApi").textContent =
      this.ppvz_reward;
    this.cardReport.querySelector(".ppvz_vwApi").textContent = this.ppvz_vw;
    this.cardReport.querySelector(".ppvz_vw_ndsApi").textContent =
      this.ppvz_vw_nds;
    this.cardReport.querySelector(".ppvz_office_idApi").textContent =
      this.ppvz_office_id;
    this.cardReport.querySelector(".ppvz_office_nameApi").textContent =
      this.ppvz_office_name;
    this.cardReport.querySelector(".ppvz_supplier_idApi").textContent =
      this.ppvz_supplier_id;
    this.cardReport.querySelector(".ppvz_supplier_nameApi").textContent =
      this.ppvz_supplier_name;
    this.cardReport.querySelector(".ppvz_innApi").textContent = this.ppvz_inn;
    this.cardReport.querySelector(".declaration_numberApi").textContent =
      this.declaration_number;
    this.cardReport.querySelector(".sticker_idApi").textContent =
      this.sticker_id;
    this.cardReport.querySelector(".site_countryApi").textContent =
      this.site_country;
    this.cardReport.querySelector(".penaltyApi").textContent = this.penalty;
    this.cardReport.querySelector(".additional_paymentApi").textContent =
      this.additional_payment;
    this.cardReport.querySelector(".bonus_type_nameApi").textContent =
      this.bonus_type_name;

    return this.cardReport;
  }

  _cardBackgroundReport() {
    this.CardReportLi = this._createCardReportDetailByPeriod();
    let li = document.createElement("li");
    li.classList.add("card_li");
    li.classList.add("stocks_color");
    li.append(this.CardReportLi);
    document.querySelector(".card_list").append(li);
  }
}
