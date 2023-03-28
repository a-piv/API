const buttonGetOrders_new = document.querySelector(".buttonGetOrders");


// Обработик при клике на кнопку Получить "Заказы"
buttonGetOrders_new.addEventListener("click", () => {
    // getApiJson("orders", createOrdersCard);
    console.log('Клик');
    getAPI(response =>{
        response.forEach( function(params,i) {

            const orders = new Orders(params, i);
            const cardOrdersssss = orders._cardBackgroundOrders();
            }
        )
    })
        
  });

function getAPI(callbackd) {
    const dateApi = document.querySelector("#dateApi").value;
    const apiClient = document.querySelector(".inputApi").value;
    // const dateToApi = document.querySelector("#dateToApi").value;
// Определяем стоит галочка или нет у даты    
    function validate() {
        if (document.querySelector('.flagApiClass').checked) {
            console.log("checked");
            return 1;
        } else {
            console.log("Нихера не выбрана!");
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
        console.log(response)
        callbackd(response)
    })
  xhr.send()
}

//   Была Функция для пострения заказов
function getApiJson(functionCreate) {
    // Получаем Строку вызова
    let api = getAPI();
    fetch(api)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        if (response.status == 401) {
          alert("API-ключ не действительный");
          console.log(response);
        }
        if (response.status == 400) {
          alert("Не верно указан API");
          console.log(response);
        }
        if (response.status == 429) {
          console.log(response);
          alert("Повторите запрос через 1мин.");
        } else console.log(response.status);
      })
      .then((data) => {
        functionCreate(data);
      });
  }
  
  


//   // Промис. Функция, которая возвращает ПРОМИС (не JSON) для карточек
function createOrdersCard(data) {
    console.log(data);
    // if (data.length > 1000) {
    //   let ll = document.createElement("li");
    //   ll.textContent = "Товаро больше 1000, придётся подождать";
    //   console.log(ll);
    //   document.querySelector(".apiInfo_all").append(ll);
    // }
    // Очищаем счётчик
    // counterOrdersNull();
    data.forEach((params, i) => {
      const orders = new Orders(params, i);
      const cardOrdersssss = orders._cardBackgroundOrders();
    });
    // counterAllOrders();
  }

  createOrdersCard



