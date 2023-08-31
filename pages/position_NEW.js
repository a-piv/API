//-------------------------------- НОВый инструмент от 13.08.2023----------------------------------------

let positionURL_WB =
  "https://search.wb.ru/exactmatch/ru/male/v4/search?TestGroup=control&TestID=216&appType=1&curr=rub&dest=-1257786&regions=80,38,83,4,64,33,68,70,30,40,86,75,69,22,1,31,66,110,48,71,114&resultset=catalog&sort=popular&spp=28&suppressSpellcheck=false&uclusters=1";
// Добавить страницу &page=2
// Добавить запрос &query=брелок+для+ключей
let positionURL_WB_zaprosAll =
  "https://search.wb.ru/exactmatch/ru/male/v4/search?TestGroup=control&TestID=216&appType=1&curr=rub&dest=-1257786&regions=80,38,83,4,64,33,68,70,30,40,86,75,69,22,1,31,66,110,48,71,114&resultset=catalog&sort=popular&spp=28&suppressSpellcheck=false&uclusters=1&page=2&query=%D0%B1%D1%80%D0%B5%D0%BB%D0%BE%D0%BA+%D0%B4%D0%BB%D1%8F+%D0%BA%D0%BB%D1%8E%D1%87%D0%B5%D0%B9";

const buttonGetPosition = document.querySelector(".buttonGetPosition");
let positionMasivArticle = []; // Все артикулы, котоые нужно найти, которые пишем на сайте
let searchAllRequest = []; // Все поисковые запросы

// Кнопка "Добавить товар" (артикул для поиска)
const buttonAddArtikul = document.querySelector(".buttonAddArtikul");
buttonAddArtikul.addEventListener('click', ()=>{
  let templeteArt = document.querySelector('.articulNumberInputTemplete').content.querySelector(".positionArticleField")
  .cloneNode(true);
  console.log(templeteArt)
  let formSearchArtikle = document.querySelector('.positionAllArticlesForm');
  formSearchArtikle.append(templeteArt)
})

// Все функции после нажатия на "Получить позиции"
buttonGetPosition.addEventListener("click", () => {
  searchAllInputArticul(".positionArticleOne");
  table();
  // reee()
  // eerr('Брелок для ключей')
  getAllSearchRequest(".positionSearchRequestOne");
  // poisk(poiskFraza);
  // console.log(positionMasivArticle);
  // searchAllInputSearchRequest();
  // searchArtikleInMassiv(positionMasivArticle, searchAllRequest);
});

// 1. Массив со всеми введёнными артикулами
function searchAllInputArticul(className) {
  let domArtikle = document.querySelectorAll(className);
  let massivArtikle = [];
  domArtikle.forEach((art) => {
    article = art.value.trim();
    if (article) {
      //проверяем чтобы поле было не пустое
      massivArtikle.push(article);
    }
  });
  return massivArtikle;
}

// 2. Собираем массив со всеми поисковыми запросами.
function searchAllInputSearchRequest(className) {
  let searchRequestAll = document.querySelectorAll(className);
  searchRequestAll.forEach((searchRequest) => {
    let searchRequestValueOne = searchRequest.value.trim();
    if (searchRequestValueOne) {
      searchAllRequest.push(searchRequestValueOne);
    }
  });
  // console.log(searchAllRequest);
}

// 3. В найденном массиве ЭП находим наши товары
//   - Возвращаем: найденный товар; позицию; страницу
//   - Удаляем найденные товары из массива с товарами
/////////////// Написать функцию, в которую передаём ЭП WB (с найденными артикулами и массив с искомыми товарами)
// выводит: арт:.. товар не найден на странице 1 или позиция товара 1 (страица 2). Возвращает 3 параметра:
// 1. Позицию из массива искомого товара из массива [1]
// 2. Найденную позицию (число), если не найден текст "Не найдено"
// 3. Страницу на которой был поиск
// Передаём эти данные в таблицу
// Удаляем найденный артикул из массива
// Ищем на следующей странице
// Ищем на 60 страницах
// Если 429 ошибка до 60 страницы, ждём 2 мин

// сделаем на одном слове, потом перебор всех
let poiskFraza = "Платье фиолетове";
// сравниваем артикулы из двух массивов

// 2. Сравниваем полученный список с каждым артикулом (каждый артикул отдельно)
function poisk(poiskFraza) {
  let testClass = new ParserPositionWB(poiskFraza); // Получаем ЭП WB
  // let articleWB = testClass._searchRequest(); // Получаем все товары из ЭП WB
  let masArt = searchAllInputArticul(".positionArticleOne"); //Получаем все искомые артикулы

  // searchPosition(articleWB, masArt)
  // let searchArt = testClass._searchArtikleInFound (poiskFraza, allArtikleWB)
}

function table() {
  // Создаём заголовок таблицы.
  let table = new PositionTable(searchAllInputArticul(".positionArticleOne")); //Отправляем все артикулы в класс таблицы
  table._createHeaderPositionTable("Поисковый запрос:"); // Создаём заголовк таблицы (слева подпись)
  // Создаём картинки товаров и поисковые в таблице
  searchAllInputSearchRequest(".positionSearchRequestOne"); //запускаем функцию определить все поисковые запросы, в  searchAllRequest
  searchAllRequest.forEach((zapros, id) => {
    table._createRowPositionTable(zapros, id);
  });
}

// 4. Создаём таблицу со всеми картинками и поисковыми запросами
// 5. Получаем найденные товары по запросу ЭП
// async function massivEndpointWB (searchZapros, page, endpoint){
//   let fullLinkEndpoint = `${endpoint}&query=${searchZapros}&page=${page}`
//   let response = await fetch (fullLinkEndpoint)
//   let responseJson = await response.json();
//   let resp = responseJson.data.products;
//   console.log(resp)
//   return resp
// }

// let ffffs = massivEndpointWB('Платье',  1, positionURL_WB)

// async function testFetch(zapros, page) {
//   try {
//     let link = positionURL_WB;
//     let zaprozAndPage = `${link}&query=${zapros}&page=${page}`;
//     // Выводит поисковый запрос API WB
//     console.log(zaprozAndPage);
//     const response = await fetch(zaprozAndPage);
//     if (!response.ok) {
//       throw new Error("Ответ сети был не ok.");
//     }
//     let allPositionRequestWBJSON = await response.json();
//     let allPositionRequestWB = allPositionRequestWBJSON.data.products;

//     allPositionRequestWB.forEach((i, num) => {
//       console.log(`Товар: ${i.id} и порядковый номер: ${num}`);

//       // ЗДЕСЬ ДЕЛАЕМ ПРОВРКУ НАЙДЕННЫХ АРТИКУЛОВ С НАЙДЕННЫМИ
//       // Если найден товар из массива WB, то выводим текст "Найдено совпадение"
//       console.log(positionMasivArticle);
//       positionMasivArticle.forEach((art, nm) => {
//         if (i.id == art) {
//           console.log(`Найдено совпадение :${i.id} порядковый номер: ${nm}`);
//         } else {
//           console.log(`не найден товар: ${art}`);
//           nm++;
//         }
//       });
//     });

//     return allPositionRequestWB;
//     // const myBlob = await response.id();
//     // const objectURL = URL.createObjectURL(myBlob);
//     // myImage.src = objectURL;
//   } catch (error) {
//     console.log("Возникла проблема с вашим fetch запросом: ", error.message);
//     // console.log("Не отдаются больше страицы, ошибки нет: ", allPositionRequestWBJSON);

//     // if (allPositionRequestWB.name) => {console.log("Возникла проблема с вашим fetch запросом: ", error.message)};
//   }
// }

const alllMasivvArt = searchAllInputArticul(".positionArticleOne"); //Массив со всеми введёнными артикулами

let linkEPWB_NotPage_NotSearchRequest = `https://search.wb.ru/exactmatch/ru/male/v4/search?TestGroup=bsk_req_repurchase_block&TestID=227&appType=1&curr=rub&dest=-446117&regions=80,38,83,4,64,33,68,70,30,40,86,75,69,1,31,66,22,110,48,71,114&resultset=catalog&sort=popular&spp=25&suppressSpellcheck=false&uclusters=1`;

//Перебераем все наши поисковые запросы и для каждого запускаем функцию поиска товаров в ЭП
// .positionSearchRequestOne - класс у введённых поисковых запросов
function getAllSearchRequest(className) {
  let searchName = document.querySelectorAll(className);
  // console.log(searchName);
  searchName.forEach((name, idClassRow) => {
    console.log(name.value, idClassRow);
    eerr(name.value, idClassRow); //idClass - идентификатор класса, по номеру определяем нужную строку с запросами
  });
}

// Получаем поисковый запрос и в следующей функции ищем товары
function eerr(searchRequest, idClassRow) {
  let searchWords = searchRequest
    .trim()
    .toLowerCase()
    .replace("  ", " ")
    .replace(" ", "+");
  // Нет страницы
  searchRequest_notPage = `${linkEPWB_NotPage_NotSearchRequest}&query=${searchWords}`;
  // console.log(searchRequest_notPage);
  // Если массив > 0 то выполняем цикл, каждый раз добавляем страницу до 60 номера
  let masivvArt = alllMasivvArt.slice(); // Делаем копию массива, чтобы потом удалять найденные товары из массива при поиске

  // -------------Здесь запускаем цикл, чтобы 60 страниц парсилось-------------
  if (alllMasivvArt.length > 0) {
    for (let page = 1; page <= 60; page++) {
      // console.log(masivvArt.length)
      console.log(`Запустили страницу: ${page}`);
      reee(page);
      
      // -----------------------------------------------------------------

      // Получаем массив товаров из ЭП и находим наши
      function reee(page) {
        let linkWBEndpoint = `${searchRequest_notPage}&page=${page}`;
        console.log(`Запустили страницу ${page}`)
        console.log(`Ссылка на ЭП запроса: ${linkWBEndpoint}`)

        async function testEPWB(linkEP) {
          let reeee = await fetch(linkEP);
          let respArt = reeee.json();
          // Возвращает промис, обрабатываем его позже(ниже)
          return respArt;
        }

        // Поиск наших артикулов в найденном массиве.
        testEPWB(linkWBEndpoint)
          .then((resp) => {
            let findArt = resp.data.products; //Получаме объект со всеми товарами 
            console.log(`Выводим один раз. Кол-во итераций(для каждого нового поискового запроса должно быть 13): ${alllMasivvArt.length}`);
            let massivvSearchRequest = searchAllInputSearchRequest(".positionSearchRequestOne") //Массив со всеми поисковыми запросами.
            
            // Для каждого найденного артикула проводим проверку, проверяем нет ли у нас такого артикула
            findArt.forEach((art, nm) => {
              console.log(`Все найденные по запросу ЭП ${nm}: ${art.id}`); // Выводит только найденные арткулы.
              let artWB = art.id;
              // console.log(`${nm}: артикул WB: ${artWB}`);
              console.log(`Кол-во данных в массиве с искомыми товарами: ${masivvArt.length}`)

              
              for (let nmNumber = 0; nmNumber < masivvArt.length; nmNumber++) {
                console.log(`Поиск на страницеtt: ${page}`)
                if (artWB == masivvArt[nmNumber]) {
                  console.log(
                    `Позиция товара: ${nm + 1}, артикул товара: ${art.id}`
                  );
                  let classArt = `.nm-${idClassRow}-${art.id}`; //определяем класс нужной карточки
                  document.querySelector(classArt).textContent = `Позиция: ${
                    nm + 1
                  }, страица: ${page} артикул товара: ${art.id}`;
                  masivvArt.splice(nmNumber, 1); //Удаляем из массива найденную позицию.
                } else {
                  // console.log(`.nm-0-${masivvArt[nmNumber]}`);
                  // console.log(document.querySelector(`.buttonGetPosition`));
                  document.querySelector(
                    `.nm-${idClassRow}-${masivvArt[nmNumber]}`
                  ).innerHTML = `Не найден на страице: ${page}`;
                  
                }
              }
              // return masivvArt;
            });
            // console.log(masivvArt);
            console.log(alllMasivvArt);
          })
          .catch((err) => {
            console.log(`Ошибка в адресе ЭП ${err}`);
          });
      }

      // -------------Здесь закрываем цикл, чтобы 60 страниц парсилось-------------
    }
  }
}
// -----------------------------------------------------------------
