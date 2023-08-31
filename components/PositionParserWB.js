class ParserPositionWB {
  // Выдаёт ЭП с запросом
  constructor(linkNotPageRequest) {
    // Входящий поисковой запрос и страница, на выходе получаем ссылку. ЭТо только для поиска
    // Добавляем страицу и поисковый запрос
    let positionURL_WB_notLink_notPage =
      "https://search.wb.ru/exactmatch/ru/male/v4/search?TestGroup=control&TestID=216&appType=1&curr=rub&dest=-1257786&regions=80,38,83,4,64,33,68,70,30,40,86,75,69,22,1,31,66,110,48,71,114&resultset=catalog&sort=popular&spp=28&suppressSpellcheck=false&uclusters=1";
    // Добавить страницу &page=2
    // Добавить запрос &query=брелок+для+ключей
    // console.log(linkNotPageRequest)
    let link = linkNotPageRequest
      .trim()
      .toLowerCase()
      .replace("  ", " ")
      .replace(" ", "+");
    console.log(link);

    // Нет страницы
    this.searchRequest = `${positionURL_WB_notLink_notPage}&query=${link}`;
    this.massivArticleParseWb = []; // массив с найденными карточками, заполняем в "_searchRequest".
  }
  // Проверяем ответ.
  // - Главная категория отражена там
  // - Если 429 ошибка, оптавляем запрос ещё раз
  // - Если есть заголовок (без товаров), пишем, сколько страниц было просмотрено
  // - Если ошибка 200, пишем что нет запроса..

  // 1. Получаем один список (массив) найденных в ЭП товаров
  async _searchRequest(page = 1) {
    try {
      this.searchRequest = `${this.searchRequest}&page=${page}`;
      // console.log(this.searchRequest); // Выводит поисковый запрос API WB
      const response = await fetch(this.searchRequest);
      if (!response.ok) {
        throw new Error("Ответ сети был не ok.");
      }
      let allPositionRequestWBJSON = await response.json();
      // Здесь сделать функцию, которая принимает массив найденных карточек с нашими артикулами.
      let articleObject = allPositionRequestWBJSON.data.products;
      // console.log(articleObject);
      for (let value of articleObject) {
        this.massivArticleParseWb.push(value.id);
      }
      // console.log(this.massivArticleParseWb);
      // //   Временно сделаем перебор указанных артикулов наших товаров.
      // let art = document.querySelectorAll(".positionArticleOne");
      // let massivArt = [];
      // // здесь делаем массив из наших указанных артикулов
      // art.forEach((art) => {
      //   massivArt.push(art.value);
      //   return massivArt;
      // });
      // console.log(massivArt);
       return this.massivArticleParseWb;
    } catch (error) {
      console.log("Возникла проблема с вашим fetch запросом: ", error.message);
    }
  }

  // // 2. НЕ ИСПОЛЬЗУЕМ В КЛАССЕ ЭТО в position_NEW.js Находим все введённые на сайте артикулы для поиска (по классу)
  // _searchAllInputArticul(className) {
  //   let massivArtikle = document.querySelectorAll(className);
  //   let allPositionMasivArticle = [];
  //   massivArtikle.forEach((art) => {
  //     let article = art.value.trim();
  //     allPositionMasivArticle.push(article);
  //     return allPositionMasivArticle
  //   });
  //   console.log(allPositionMasivArticle)
  // }

  
  // 3. Сравниваем полученный список с каждым артикулом (каждый артикул отдельно)
  _searchArtikleInFound(massivEndpointWB, massivArtikle) {
    this.massivArticleParseWb.forEach((art, i) => {
      for (let nmNumber = 0; nmNumber < massivArtikle.length; nmNumber++) {
        if (art == massivArtikle[nmNumber]) {
          console.log(`Позиция найдена: ${i + 1}, артикул товара: ${art}`);
          // let classArt = `.0_${art}`;
          // console.log('classArt');
          // document.querySelector(classArt).textContent = (`Позиция ${i + 1}, артикул товара: ${art}`);
        } else {
          console.log(`Позиция не найдена`);
        }
      }
    });
  }
  // 3. Листаем все 100 страниц, пока не получим ошибку
  //   _pereborArtikle_Poisk(massivWB, massivSearch) {
  //     let mas = _searchRequest((page = 1));
  //     console.log(mas);
  //   }
}
