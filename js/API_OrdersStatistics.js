// ------------------- Информация о кол-ве закзов и прочее ------------------- 


let summOrdes = 0;
let quantityTrueOrdes = 0;
let summOrdesFalse = 0;
let quantityFalseOrdes = 0;
let notGNumber = 0;
let notGNumberSumm = 0;
let notNm = 0;
let notSumm = 0;
let notOdId = 0;
let notOdIdSumm = 0;
let notWarehouseName = 0;
let notWarehouseNameSumm = 0;


function resetConstants(){
  summOrdes = 0;
  quantityTrueOrdes = 0;
  summOrdesFalse = 0;
  quantityFalseOrdes = 0;
  notGNumber = 0;
  notGNumberSumm = 0;
  notNm = 0;
  notSumm = 0;
  notOdId = 0;
  notOdIdSumm = 0;
  notWarehouseName = 0;
  notWarehouseNameSumm = 0;
}

const buttonGetOrders_new = document.querySelector(".buttonGetOrders");
// let massivOrders='';
// Определяем стоит галочка или нет у даты    
function validate() {
  if (document.querySelector('.flagApiClass').checked) {
      return 1;
  } else {
      return 0;
  }
}

// Обработик при клике на кнопку Получить "Заказы"
// buttonGetOrders_new.addEventListener("click", () => {
//     getAPIOrders(response =>{
//         response.forEach( function(params,i) {
//             const orders = new Orders(params, i);
//             const cardOrdersssss = orders._cardBackgroundOrders();
//             }
//         )
//     })
//   });


buttonGetOrders_new.addEventListener("click", getAPIOrdersPromise);

  function getAPIOrdersPromise() {
    const dateApi = document.querySelector("#dateApi").value;
    const apiClient = document.querySelector(".inputApi").value;
    let apiResponse = `https://statistics-api.wildberries.ru/api/v1/supplier/orders?dateFrom=${dateApi}&flag=${validate()}`
    let parammm = {
      method: "GET",
      headers: {
        'Authorization': apiClient,
      }
    };

    fetch (apiResponse,parammm)
    .then((response)=>{
      let loader = document.querySelector('.loader')
        // Информационные ответы 100 - 199
      if (response.status >= 100 && response.status <= 199){alert (response.status)}
        // Успешные ответы 200 - 299
      if (response.status >= 200 && response.status <= 299){
        loader.classList.add('background_color_green')
        loader.textContent = (`"Ключ верный данные подгружаются": ${response.status}`);
      }
        // Перенаправления 300 - 399
      if (response.status >= 300 && response.status <= 399){
        loader.classList.add('background_color_red')
        loader.textContent = (`"Какая-то херня, почему-то переадресация". В ответе код: ${response.status}`);
      }
      // Клиентские ошибки 400 - 499
      if (response.status == 429){
        loader.classList.add('background_color_green')
        loader.textContent = (`"API номрмальный. Сличком частые запросы, подожди 1 минуту и повтори".В ответе код: ${response.status}`);
      }
      if (response.status >= 400 && response.status != 429 && response.status <= 499){
        loader.classList.add('background_color_red')
        loader.textContent = (`"Пустой или кривой (не действующий) API-ключ". В ответе ошибка: ${response.status}`);
      }
      // Серверные ошибки 500 - 599
       if (response.status >= 500 && response.status <= 599){
        loader.classList.add('background_color_red')
        loader.textContent = (`"API номрмальный. Сличком частые запросы, подожди 1 минуту и повтори".В ответе код: ${response.status}`);
      }
      function delTextLoader(){
        setTimeout(() => {
          loader.textContent = '';
          loader.classList.remove('background_color_green') 
          loader.classList.remove('background_color_red') 
        }, 3000);
      }
      delTextLoader()
      let json = response.json();
      console.log(json)
      return json
    })
    .then((ress) => {
      ress.forEach((element, i) => {
        const orders = new Orders(element, i);
        const cardOrdersssss = orders._cardBackgroundOrders();
        // const oneAction = new Promotions(element);
        // oneAction._generateCardPromotions()

      
        
          // ------------------- Подсчёт успешных заказов -------------------   
          if( element.isCancel == false)
          {
          summOrdes = summOrdes + Math.round(element.totalPrice - (element.totalPrice/100*element.discountPercent))
          quantityTrueOrdes++;
          }
                 // ------------------- Подсчёт отменённых заказов -------------------   
                  if( element.isCancel == true)
                  {
                  summOrdesFalse = summOrdesFalse + Math.round(element.totalPrice - (element.totalPrice/100*element.discountPercent))
                  // console.log(summOrdesFalse)
                  quantityFalseOrdes++;
                  // console.log(quantityFalseOrdes)
                  }
                  
                  // ------------------- где отсутствует параметп gNumber у заказов -------------------   
                  if( element.gNumber == '')
                  {
                  notGNumber++;
                  notGNumberSumm = notGNumberSumm + Math.round(element.totalPrice - (element.totalPrice/100*element.discountPercent))
                  }
                  // ------------------- где отсутствует параметр nm у заказов -------------------   
                  if( element.nmId == 0)
                  {
                    notNm++;
                    notSumm = notSumm + Math.round(element.totalPrice - (element.totalPrice/100*element.discountPercent))
                  }
                  
                  // ------------------- где отсутствует параметр OdId у заказов -------------------   
                  if( element.odid == 0)
                  {
                    notOdId++;
                    notOdIdSumm = notOdIdSumm + Math.round(element.totalPrice - (element.totalPrice/100*element.discountPercent))
                  }

                  // ------------------- где отсутствует параметр warehouseName у заказов -------------------   
                  if( element.warehouseName == '')
                  {
                    notWarehouseName++;
                    notWarehouseNameSumm = notWarehouseNameSumm + Math.round(element.totalPrice - (element.totalPrice/100*element.discountPercent))
                  }




      });


      // Выводим общую информацию под АПИ
      createLiTwoPapam(`Всего записей:`, ress.length)
        
      createLiFreePapam(`Кол-во успешнных заказов:`,quantityTrueOrdes, summOrdes )

      // console.log(`Кол-во успешнных заказов: ${quantityTrueOrdes}шт. на сумму ${summOrdes}руб.`)
      if(quantityFalseOrdes > 0){
        createLiFreePapam(`Кол-во отменённых заказов`,quantityFalseOrdes, summOrdesFalse )
      // console.log(`Кол-во отменённых заказов: ${quantityFalseOrdes}шт. на сумму ${summOrdesFalse}руб.`)        
    }
    if(notGNumber > 0){
      createLiFreePapamRED(`Ошибка в API. Кол-во заказов без номера заказа (параметр в API: gNumber)`,notGNumber, notGNumberSumm)
    }
    if(notNm > 0){
      createLiFreePapamRED(`Ошибка в API. Кол-во заказов без артикула товара (параметр в API: nmId)`,notNm, notSumm)
    }
    if(notOdId > 0){
      createLiFreePapamRED(`Ошибка в API. Кол-во заказов без позиции заказа (параметр в API: odid)`,notOdId, notOdIdSumm)
    }
    if(notWarehouseName > 0){
      createLiFreePapamRED(`Ошибка в API. Кол-во заказов без названия склада (параметр в API: WarehouseName)`,notWarehouseName, notWarehouseNameSumm)
    }
    razdelitel()
    resetConstants()

    })
    // .catch(
    //           console.log("Ошибка HTTP: " + promises.status)
      
    // )

  }

  

function getAPIOrders(callbackd) {
    const dateApi = document.querySelector("#dateApi").value;
    const apiClient = document.querySelector(".inputApi").value;


    const xhr= new XMLHttpRequest();
    let params = `?dateFrom=${dateApi}&flag=${validate()}`
    xhr.open("GET", `https://statistics-api.wildberries.ru/api/v1/supplier/orders`+params);
    xhr.setRequestHeader('Authorization', apiClient);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.addEventListener("load", ()=>{
    response = JSON.parse(xhr.responseText)
        console.log(`Кол-во записей: ${response.length}`)
        // massivOrders = response;
        
        





      


        
        response.forEach(function(i){

        
          
        });


        // Выводим общую информацию под АПИ
        createLiTwoPapam(`Всего заказов`, response.length)
        
        createLiFreePapam(`Кол-во успешнных заказов`,quantityTrueOrdes, summOrdes )





        // console.log(`Кол-во успешнных заказов: ${quantityTrueOrdes}шт. на сумму ${summOrdes}руб.`)
        if(quantityFalseOrdes > 0){
          createLiFreePapam(`Кол-во отменённых заказов`,quantityFalseOrdes, summOrdesFalse )
        // console.log(`Кол-во отменённых заказов: ${quantityFalseOrdes}шт. на сумму ${summOrdesFalse}руб.`)        
      }
      if(notGNumber > 0){
        createLiFreePapamRED(`Ошибка в API. Кол-во заказов без номера заказа (параметр в API: gNumber)`,notGNumber, notGNumberSumm)
      }
      if(notNm > 0){
        createLiFreePapamRED(`Ошибка в API. Кол-во заказов без артикула товара (параметр в API: nmId)`,notNm, notSumm)
      }
      if(notOdId > 0){
        createLiFreePapamRED(`Ошибка в API. Кол-во заказов без позиции заказа (параметр в API: odid)`,notOdId, notOdIdSumm)
      }
      if(notWarehouseName > 0){
        createLiFreePapamRED(`Ошибка в API. Кол-во заказов без названия склада (параметр в API: WarehouseName)`,notWarehouseName, notWarehouseNameSumm)
      }
      razdelitel()
      // ------------------- Строим все заказы ------------------- 
                callbackd(response)
    })
  xhr.send()

  if (orderTypeVozvratProdavca > 0 ) {
    console.log(`Привет ${this.orderType} ${orderTypeVozvratProdavca}`)}

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

