// Успешные
let SalesSummPriceWithDisc = 0;
let SalesQuantityPriceWithDisc = 0;
let SalesSummForPay = 0;
let SalesQuantitySales = 0;
let SalesFinishedPrice = 0;
let SalesQuantityfinishedPrice = 0;

// Возвраты
let SalesSummReturn = 0;
let SalesQuantityReturn = 0;

// Доплаты
let SalesSummDoplata = 0;
let SalesQuantityDoplata = 0;

const buttonGetSales_new = document.querySelector(".buttonGetSales");
// let massivOrders='';

// Обработик при клике на кнопку Получить "Заказы"
buttonGetSales_new.addEventListener("click", () => {
  getAPISales((response) => {
    response.forEach(function (params, i) {
      const sales = new Sales(params, i);
      const cardOrdersssss = sales._cardBackgroundSales();
    });
  });
});

function getAPISales(callbackd) {
  const dateApi = document.querySelector("#dateApi").value;
  const apiClient = document.querySelector(".inputApi").value;
  // Определяем стоит галочка или нет у даты
  function validate() {
    if (document.querySelector(".flagApiClass").checked) {
      return 1;
    } else {
      return 0;
    }
  }

  const xhr = new XMLHttpRequest();
  let params = `?dateFrom=${dateApi}&flag=${validate()}`;
  xhr.open(
    "GET",
    `https://statistics-api.wildberries.ru/api/v1/supplier/sales` + params
  );
  xhr.setRequestHeader("Authorization", apiClient);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.addEventListener("load", () => {
    response = JSON.parse(xhr.responseText);
    console.log(`Кол-во записей: ${response.length}`);
    // massivOrders = response;

    // Функция для генерации списка под апи
    function createLiTwoPapam(quantity, summ) {
      let liCreate = document.createElement("li");
      liCreate.textContent = `${quantity}: ${summ}шт.`;
      document.querySelector(".apiInfo_all").append(liCreate);
    }

    function createLiFreePapam(deckr, quantity, summ) {
      let liCreate = document.createElement("li");
      liCreate.textContent = `${deckr}: ${quantity}шт. на общую сумму: ${summ}руб.`;
      // liCreate.textContent=`Всего заказов: ${response.length}шт.`;
      document.querySelector(".apiInfo_all").append(liCreate);
    }

    // ------------------- Информация о кол-ве закзов и прочее -------------------

    console.log(response);

    response.forEach(function (massivAPI) {
      // ------------------- Подсчёт успешных заказов -------------------

      // Получаем первую букву продажи
      let saleID = massivAPI.saleID;
      let saleLetter = saleID[0];
      console.log(saleLetter);
      if (saleLetter == "S") {
        // "priceWithDisc"
        SalesSummPriceWithDisc = SalesSummPriceWithDisc + massivAPI.priceWithDisc;
        SalesQuantityPriceWithDisc++;
        // "forPay"
        SalesSummForPay = SalesSummForPay + massivAPI.forPay;
        SalesQuantitySales++;
        // "finishedPrice"
        SalesFinishedPrice = SalesFinishedPrice + massivAPI.finishedPrice;
        SalesQuantityfinishedPrice++;
      }
      if (saleLetter == "R") {
        SalesSummReturn = SalesSummReturn + massivAPI.priceWithDisc;
        SalesQuantityReturn++;
      }

      if (saleLetter == "D") {
        SalesSummDoplata = summDoplata + massivAPI.priceWithDisc;
        SalesQuantityDoplata++;
      }
    });

    // Выводим общую информацию под АПИ
    createLiTwoPapam(
      `Всего записей (продажи, возвраты, доплаты)`,
      response.length
    );
    createLiFreePapam(
      `Кол-во успешнных продаж (Цена, от которой считается вознаграждение поставщика "priceWithDisc")`,
      SalesQuantityPriceWithDisc,
      SalesSummPriceWithDisc
    );
    createLiFreePapam(
      `Кол-во успешнных продаж (К переводу "forPay")`,
      SalesQuantitySales,
      SalesSummForPay
    );
    createLiFreePapam(
      `Кол-во успешнных продаж (Фактическая цена заказа с учетом всех скидок "finishedPrice")`,
      SalesQuantitySales,
      SalesFinishedPrice
    );

    console.log(SalesSummReturn)
    if (SalesSummReturn !== 0) {
      createLiFreePapam(
        `Кол-во возвратов`,SalesQuantityReturn, SalesSummReturn      
      );
    }

    if (SalesSummDoplata !== 0) {
      createLiFreePapam(
        `Кол-во доплат`,
        SalesQuantityDoplata,
        SalesSummDoplata
      );
    }

    // console.log(`Кол-во успешнных заказов: ${quantityTrueSales}шт. на сумму ${summSales}руб.`)
    //   if(quantityFalseSales > 0){
    //     createLiFreePapam(`Кол-во возвратов`,quantitySales, quantitySales )
    //   // console.log(`Кол-во отменённых заказов: ${quantityFalseSales}шт. на сумму ${summSalesFalse}руб.`)
    // }
    // if(notGNumber > 0){
    //   createLiFreePapam(`Кол-во продаж без номера`,notGNumber, notGNumberSumm)
    //   console.log(`Кол-во продаж без номера: ${notGNumber}шт. (такие заказы не отражены в S4M, это ошибка в API)`)
    // }

    // ------------------- Строим все заказы -------------------
    callbackd(response);
  });
  xhr.send();
}

//   // Промис. Функция, которая возвращает ПРОМИС (не JSON) для карточек
// function createOrdersCard(data) {
//     console.log(data);
//     data.forEach((params, i) => {
//       const orders = new Orders(params, i);
//       // const cardOrdersssss = orders._cardBackgroundOrders();
//     });
//   }
//   createOrdersCard

// ------------------- Лоадер НЕ РАБОТАЕТ -------------------

// Лоадер создаём
// let divLoader = document.createElement('div');
// divLoader.className = "alert";
// divLoader.innerHTML = "<strong>Всем привет!</strong> Вы прочитали важное сообщение.";
// let loader = document.querySelector(".loader");
// loader.append(divLoader)
// console.log (divLoader)

// console.log("Загрузка лоадера")

//                   divLoader.addEventListener('DOMContentLoaded',()=>{
//                     console.log("Загрузка.....")
//                     let laaddd= document.querySelector('.loader')
//                     laaddd.classList.add('loaderUP')
//                     // laaddd.remove()
//                     console.log("Страница загружена!!!")
//                   })
