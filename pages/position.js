const buttonGetPosition = document.querySelector(".buttonGetPosition");
const buttonOpenSiteWB = document.querySelector(".buttonOpenSiteWB");
let buttonPositionNumber = document.querySelector(".searchRequest");
let positionMassiv = "";
let searchQuery = "";
let article = "";
let page = "";
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
  let positionURL = `https://search.wb.ru/exactmatch/ru/common/v4/search?appType=1&couponsGeo=12,3,18,15,21&curr=rub&dest=-1029256,-102269,-2162196,-1257786&emp=0&lang=ru&locale=ru&page=${page}&pricemarginCoeff=1.0&query=${searchQuery}&reg=0&regions=68,64,83,4,38,80,33,70,82,86,75,30,69,1,48,22,66,31,40,71&resultset=catalog&sort=popular&spp=0&suppressSpellcheck=false`;
  let positionMassiv1 = await fetch(positionURL);
  console.log(positionMassiv1);

  return positionMassiv1.json();

  // fetch(positionURL).then((data) => {
  //   let result = data.json();
  //   result.then((dataNM) => {
  //     // console.log(dataNM.data.products);
  //     positionMassiv = dataNM.data.products;
  //     console.log(positionMassiv);
  //     return positionMassiv;
  //   });
  // });
}

// После клика на "Получить позиции". Получаем "поисковый запрос", "артикул" товара и передаём.
buttonGetPosition.addEventListener("click", () => {
  getSearchQuery();
  getArtikleSearch();
  getAllid();

  // let massivv = getPositionAPI(article);
  // poiskvmassive(massivv);

  // getPositionAPI(searchQuery, page);

  // getPositionAPI(searchQuery, article, page);
  // console.log(positionMassiv);
  // createMass(positionMassiv, article);
});

async function go() {
  let a = await getPositionJSON(searchQuery, page);
  let massiv = a.data.products;
  console.log(massiv);
  await poiskvmassive(massiv);
  console.log(position);
  if (position == 0) {
    // a = await getPositionJSON(searchQuery, page);
    massiv = a.data.products;
    console.log(massiv);
    // await poiskvmassive(massiv);
    // console.log(position);
  }
}

async function getAllid() {
  // let a = await getPositionJSON(searchQuery, page);
  // let massiv = a.data.products;
  console.log(positionNumber);
  // massiv.forEach((element, i) => {
  //   console.log(element.id);
  //   if (article == element.id) {
  //     console.log(`Позиция товара ${i + 1}`);
  //     buttonPositionNumber.value = `Страница${page} Позиция товара ${i}`;
  //     positionNumber = i;
  //   }
  // });
  for (page = 1; page < 100; page++) {
    // выведет 0, затем 1, затем 2

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
  }
  // console.log(positionNumber);
  if (positionNumber == "") {
    console.log(`Товар не найден на странице`);
    buttonPositionNumber.value = `Товар не найден на странице`;
    buttonPositionNumber.classList.add("background_color_red");
  }

  // if (positionNumber == "") {
  //   // buttonPositionNumber.value = `Товар не найден на странице`;
  //   page++;
  //   console.log(`Следующая Страница ${page}`);
  //   pagePlus(searchQuery, page);
  // } else {
  //   buttonPositionNumber.value = `Страница ${page}, позиция товара ${positionNumber}`;
  // }
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

// Получаем апи с запросом
// async function getPositionAPI(page) {
//   let position = await getPositionJSON(searchQuery, page);
//   // let positionURL = `https://search.wb.ru/exactmatch/ru/common/v4/search?appType=1&couponsGeo=12,3,18,15,21&curr=rub&dest=-1029256,-102269,-226149,-446117&emp=0&lang=ru&locale=ru&page=${page}&pricemarginCoeff=1.0&query=${searchQuery}&reg=1&regions=68,64,83,4,38,80,33,70,82,86,75,30,69,22,66,31,40,1,48,71&resultset=catalog&sort=popular&spp=23&suppressSpellcheck=false`;
//   // console.log(positionURL);
//   // console.log(article);
//   // fetch(positionURL).then((data) => {
//   //   let result = data.json();
//   //   result.then((dataNM) => {
//   //     positionMassiv = dataNM.data.products;
//   //     // return positionMassiv;
//   //     console.log(dataNM.data.products);
//   //     console.log(typeof positionMassiv);
//   let positionMassiv = position.data;
//   console.log(positionMassiv);
//   return positionMassiv;
// }

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
