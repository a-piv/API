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
        
        
        // Функция для генерации списка под апи
        function createLiTwoPapam(quantity, summ){
          let liCreate = document.createElement('li');
          liCreate.textContent=`${quantity}: ${summ}шт.`;
          document.querySelector('.apiInfo_all').append(liCreate)
        }
        
        function createLiFreePapam(deckr,quantity, summ){
          let liCreate = document.createElement('li');
          liCreate.textContent=`${deckr}: ${quantity}шт. на общую сумму: ${summ}руб.`;
          // liCreate.textContent=`Всего заказов: ${response.length}шт.`;
          document.querySelector('.apiInfo_all').append(liCreate)
        }


      
                // ------------------- Информация о кол-ве закзов и прочее ------------------- 
        
        console.log(response)
        let summOrdes = 0;
        let quantityTrueOrdes = 0;
        let summOrdesFalse = 0;
        let quantityFalseOrdes = 0;
        let notGNumber = 0;
        let notGNumberSumm = 0;
        
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
        createLiFreePapam(`Кол-во заказов без номера`,notGNumber, notGNumberSumm)
        console.log(`Кол-во заказов без номера: ${notGNumber}шт. (такие заказы не отражены в S4M, это ошибка в API)`)        
      }

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

