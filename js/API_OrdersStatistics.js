const buttonGetOrders_new = document.querySelector(".buttonGetOrders");
// let massivOrders='';

// Обработик при клике на кнопку Получить "Заказы"
buttonGetOrders_new.addEventListener("click", () => {
    getAPIOrders(response =>{
        response.forEach( function(params,i) {
            const orders = new Orders(params, i);
            const cardOrdersssss = orders._cardBackgroundOrders();
            }
        )
    })
  });

function getAPIOrders(callbackd) {
    const dateApi = document.querySelector("#dateApi").value;
    const apiClient = document.querySelector(".inputApi").value;
// Определяем стоит галочка или нет у даты    
    function validate() {
        if (document.querySelector('.flagApiClass').checked) {
            return 1;
        } else {
            return 0;
        }
    }

    const xhr= new XMLHttpRequest();
    let params = `?dateFrom=${dateApi}&flag=${validate()}`
    xhr.open("GET", `https://statistics-api.wildberries.ru/api/v1/supplier/orders`+params);
    xhr.setRequestHeader('Authorization', apiClient);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.addEventListener("load", ()=>{
    response = JSON.parse(xhr.responseText)
        console.log(`Кол-во записей: ${response.length}`)
        // massivOrders = response;
        
        





      
                // ------------------- Информация о кол-ве закзов и прочее ------------------- 
        
        console.log(response)
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

        
        response.forEach(function(i){

        // ------------------- Подсчёт успешных заказов -------------------   
          if( i.isCancel == false)
          {
          summOrdes = summOrdes + Math.round(i.totalPrice - (i.totalPrice/100*i.discountPercent))
          quantityTrueOrdes++;
          }
                 // ------------------- Подсчёт отменённых заказов -------------------   
                  if( i.isCancel == true)
                  {
                  summOrdesFalse = summOrdesFalse + Math.round(i.totalPrice - (i.totalPrice/100*i.discountPercent))
                  // console.log(summOrdesFalse)
                  quantityFalseOrdes++;
                  // console.log(quantityFalseOrdes)
                  }
                  
                  // ------------------- где отсутствует параметп gNumber у заказов -------------------   
                  if( i.gNumber == '')
                  {
                  notGNumber++;
                  notGNumberSumm = notGNumberSumm + Math.round(i.totalPrice - (i.totalPrice/100*i.discountPercent))
                  }
                  // ------------------- где отсутствует параметр nm у заказов -------------------   
                  if( i.nmId == 0)
                  {
                    notNm++;
                    notSumm = notSumm + Math.round(i.totalPrice - (i.totalPrice/100*i.discountPercent))
                  }
                  
                  // ------------------- где отсутствует параметр OdId у заказов -------------------   
                  if( i.odid == 0)
                  {
                    notOdId++;
                    notOdIdSumm = notOdIdSumm + Math.round(i.totalPrice - (i.totalPrice/100*i.discountPercent))
                  }

                  // ------------------- где отсутствует параметр warehouseName у заказов -------------------   
                  if( i.warehouseName == '')
                  {
                    notWarehouseName++;
                    notWarehouseNameSumm = notWarehouseNameSumm + Math.round(i.totalPrice - (i.totalPrice/100*i.discountPercent))
                  }
          
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

