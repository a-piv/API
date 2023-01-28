const buttonGetPosition = document.querySelector(".buttonGetPosition");
const buttonOpenSiteWB = document.querySelector(".buttonOpenSiteWB");
let buttonPositionNumber = document.querySelector(".searchRequest");
let positionMassiv = "";
let searchQuery = "";
let article = "";
let page = 1;
let positionNumber = "";

// Получаем поисковй запрос на WB (слово+второе+слово) Один раз
function getSearchQuery() {
  const searchRequestValue = document.querySelector(
    ".searchRequesnClass"
  ).value;
  let searchRequestSplit = searchRequestValue.split(" ");
  searchQuery = searchRequestSplit.join("+");
  console.log(`Поисковой запрос: ${searchQuery}`);
  return searchQuery;
}

// Получаем артикул товара
function getArtikleSearch() {
  article = document.querySelector(".positionArticle").value;
  article = article.trim();
  console.log(`Артикул товара ${article}`);
  return article;
}

// Получаем ссылку на промис с массивом данных
async function getPositionJSON(searchQuery, page) {
  // let positionURL = `https://search.wb.ru/exactmatch/ru/common/v4/search?appType=1&couponsGeo=12,3,18,15,21&curr=rub&dest=-1029256,-102269,-226149,-446117&emp=0&lang=ru&locale=ru&page=${page}&pricemarginCoeff=1.0&query=${searchQuery}&reg=1&regions=68,64,83,4,38,80,33,70,82,86,75,30,69,22,66,31,40,1,48,71&resultset=catalog&sort=popular&spp=23&suppressSpellcheck=false`;
  // let positionURL = `https://search.wb.ru/exactmatch/ru/male/v4/search?appType=1&couponsGeo=12,3,18,15,21&curr=rub&dest=-1029256,-102269,-2162196,-1257786&emp=0&lang=ru&locale=ru&page=${page}&pricemarginCoeff=1.0&query=${searchQuery}&reg=1&regions=68,64,83,4,38,80,33,70,82,86,75,30,69,1,48,22,66,31,40,71&resultset=catalog&sort=popular&spp=0&suppressSpellcheck=false`;
  
// категория не работает let positionURL = `https://catalog.wb.ru/catalog/beauty6/catalog?appType=1&couponsGeo=2,12,7,6,9,21,11&curr=rub&dest=-1221185,-151223,-1782064,-1785054&emp=0&ext=63808&lang=ru&locale=ru&page=${page}&pricemarginCoeff=1&reg=1&regions=80,64,4,38,70,82,69,86,30,40,48,1,22,66&sort=popular&spp=30&sppFixGeo=4&subject=341;357;359;360;361;362;363;365;367;377;382;403;439;708;871;950;958;959;1246;1522;1566;1672;1867;1963;2259;2741;3151;5976;7424`;

  // let positionURL = `https://search.wb.ru/exactmatch/ru/male/v4/search?appType=1&couponsGeo=12,3,18,15,21&curr=rub&dest=-1029256,-102269,-226149,-446117&emp=0&lang=ru&locale=ru&page=${page}&pricemarginCoeff=1.0&query=${searchQuery}&reg=1&regions=80,68,64,83,4,38,33,70,82,69,86,75,30,40,48,1,22,66,31,71&resultset=catalog&sort=popular&spp=25&suppressSpellcheck=false`;
  let positionURL = `https://search.wb.ru/exactmatch/ru/male/v4/search?appType=1&couponsGeo=12,3,18,15,21&curr=rub&dest=-1029256,-102269,-226149,-446117&emp=0&lang=ru&locale=ru&page=${page}&pricemarginCoeff=1.0&query=${searchQuery}&reg=1&regions=80,64,83,4,38,33,70,82,69,68,86,75,30,40,48,1,22,66,31,71&resultset=catalog&sort=popular&spp=28&sppFixGeo=4&suppressSpellcheck=false`
  
  

  // let positionURL =  https://search.wb.ru/exactmatch/ru/male/v4/search?appType=1&couponsGeo=12,3,18,15,21&curr=rub&dest=-1029256,-102269,-226149,-446117&emp=0&lang=ru&locale=ru&page=24&pricemarginCoeff=1.0&query=%D0%BA%D0%BE%D0%BB%D1%8C%D1%86%D0%BE%20%D0%B8%D0%B7%20%D0%B1%D0%B8%D1%81%D0%B5%D1%80%D0%B0&reg=1&regions=68,64,83,4,38,80,33,70,82,86,75,30,69,1,48,22,66,31,40,71&resultset=catalog&sort=popular&spp=24&suppressSpellcheck=false
  // каталог: https://catalog.wb.ru/catalog/interior3/catalog?appType=1&couponsGeo=12,3,18,15,21&curr=rub&dest=-1029256,-102269,-226149,-446117&emp=0&lang=ru&locale=ru&page=2&pricemarginCoeff=1.0&reg=1&regions=68,64,83,4,38,80,33,70,82,86,75,30,69,1,48,22,66,31,40,71&sort=popular&spp=25&subject=331;1760;5229;7161;7162;7707
  // let positionURL = `https://catalog.wb.ru/catalog/interior3/catalog?appType=1&couponsGeo=12,3,18,15,21&curr=rub&dest=-1029256,-102269,-226149,-446117&emp=0&lang=ru&locale=ru&page=${page}&pricemarginCoeff=1.0&reg=1&regions=68,64,83,4,38,80,33,70,82,86,75,30,69,1,48,22,66,31,40,71&sort=popular&spp=25&subject=331;1760;5229;7161;7162;7707`;
  let positionMassiv1 = await fetch(positionURL);
  console.log(positionMassiv1.json);
  return positionMassiv1.json();

  
}

async function getPositionJSONPromise(searchQuery, page) {
  let positionURL = `https://search.wb.ru/exactmatch/ru/common/v4/search?appType=1&couponsGeo=12,3,18,15,21&curr=rub&dest=-1029256,-102269,-2162196,-1257786&emp=0&lang=ru&locale=ru&page=${page}&pricemarginCoeff=1.0&query=${searchQuery}&reg=0&regions=68,64,83,4,38,80,33,70,82,86,75,30,69,1,48,22,66,31,40,71&resultset=catalog&sort=popular&spp=0&suppressSpellcheck=false`;
  let positionMassiv1 = await fetch(positionURL);
  return positionMassiv1.json();
}

// После клика на "Получить позиции". Получаем "поисковый запрос", "артикул" товара и передаём.
buttonGetPosition.addEventListener("click", () => {
  resetParam();
  getSearchQuery();
  getArtikleSearch();
  getAllid();
});

function resetParam() {
  searchQuery = "";
  article = "";
  page = 1;
  let buttonResult = document.querySelector(".searchRequest");
  buttonResult.classList.remove("background_color_green");
  buttonResult.classList.remove("background_color_red");
  buttonResult.classList.add("searchRequestNone");
  buttonResult.value = "Оптередяется позиция товара";
}

async function getAllid() {
  console.log(positionNumber);
  for (page = 1; page < 100; page++) {
    document
      .querySelector(".searchRequest")
      .classList.remove("searchRequestNone");
    let positionNumber = await pagePlus(searchQuery, page);
    if (positionNumber > 0) {
      buttonPositionNumber.value = `Страница ${page}, позиция товара ${positionNumber}`;
      buttonPositionNumber.classList.add("background_color_green");
      break;
    }
    console.log(`Страница ${page}, позиция товара ${positionNumber}`);
    document.querySelector(
      ".searchRequest"
    ).value = `Оптередяется позиция. Страница: ${page}`;
  }
  // console.log(positionNumber);
  if (positionNumber == "") {
    console.log(`Товар не найден на странице`);
    buttonPositionNumber.value = `Товар не найден на странице`;
    buttonPositionNumber.classList.add("background_color_red");
  }
}

async function pagePlus(searchQuery, page) {
  let a = await getPositionJSON(searchQuery, page);
  let massiv = a.data.products;
  console.log(massiv);
  massiv.forEach((element, i) => {
    console.log(element.id);
    if (article == element.id) {
      console.log(`Позиция товара ${i + 1}`);
      // let positionn = document.querySelector(".searchRequest");
      // positionn.value = `Позиция товара ${i}`;
      positionNumber = i + 1;
    }
  });
  return positionNumber;
}

// После клика на "Открыть запрос на WB"
buttonOpenSiteWB.addEventListener("click", () => {
  const query = getSearchQuery();

  let linkWb = `https://www.wildberries.ru/catalog/0/search.aspx?&sort=popular&search=${query}`;
  console.log(`Ссылка на запрос на сайте WB: ${linkWb}`);
  window.open(linkWb, "_blank");
});

async function poiskvmassive(massiv) {
  massiv.forEach((element, i) => {
    // console.log(element.id);
    if (article == element.id) {
      console.log(
        `Позиция товара:${i + 1}, товар находится на странице: ${page}`
      );
      position = i + 1;
      return element.id;
    }
  });
}
