const buttonGetPosition = document.querySelector(".buttonGetPosition");
const buttonOpenSiteWB = document.querySelector(".buttonOpenSiteWB");
// let linkCategory = "";
const URLrequest =
  "https://catalog.wb.ru/catalog/toys5/catalog?appType=1&couponsGeo=12,3,18,15,21&curr=rub&dest=-1029256,-102269,-226149,-446117&emp=0&lang=ru&locale=ru&pricemarginCoeff=1.0&reg=1&regions=68,64,83,4,38,80,33,70,82,86,75,30,69,22,66,31,40,1,48,71&spp=27&subject=2193;2378;2547;2676;3885;4060;4677;6128";

let massivID = [];
let searchQuery = "";
// После клика на "Получить позиции".
buttonGetPosition.addEventListener("click", () => {
  // getCategotyJSON();
  getSearchQuery();
  getAllid();
});
// Получаем поисковй запрос на WB (слово+второе+слово) Один раз
function getSearchQuery() {
  let searchRequestValue = document.querySelector(".searchRequesnClass").value;
  let searchRequestSplit = searchRequestValue.split(" ");
  searchQuery = searchRequestSplit.join("+");
  console.log(`Поисковой запрос: ${searchQuery}`);
  return searchQuery;
}

function sendRequest(url) {
  return fetch(url);
}

sendRequest(URLrequest)
  .then((data) => console.log(data))
  .catch((data) => console.log(data));
// const p = new Promise(function (resolve, reject) {
//   const xhr = new XMLHttpRequest();
//   xhr.open(method, url);
//   xhr.responseType = "json";
//   xhr.onload();

//   positionURLLinkk = `https://catalog.wb.ru/catalog/toys5/catalog?appType=1&couponsGeo=12,3,18,15,21&curr=rub&dest=-1029256,-102269,-226149,-446117&emp=0&lang=ru&locale=ru&pricemarginCoeff=1.0&reg=1&regions=68,64,83,4,38,80,33,70,82,86,75,30,69,22,66,31,40,1,48,71&spp=27&subject=2193;2378;2547;2676;3885;4060;4677;6128`;
//   resolve(positionURLLinkk);
// });
// p.then((data) => {
//   console.log(data);
// });

// Получаем массив карточек из поискового запроса
async function getPositionJSON(searchQuery, page = 1) {
  let linkCategory = document.querySelector(".linkCategory").value;
  let positionURL = "";
  if (linkCategory == "") {
    positionURL = `https://search.wb.ru/exactmatch/ru/common/v4/search?appType=1&couponsGeo=12,3,18,15,21&curr=rub&dest=-1029256,-102269,-226149,-446117&emp=0&lang=ru&locale=ru&page=${page}&pricemarginCoeff=1.0&query=${searchQuery}&reg=1&regions=68,64,83,4,38,80,33,70,82,86,75,30,69,22,66,31,40,1,48,71&resultset=catalog&sort=popular&spp=23&suppressSpellcheck=false`;
    console.log(positionURL);
  } else {
    // positionURL = linkCategory;
    // console.log(linkCategory);
    positionURL = `https://catalog.wb.ru/catalog/toys5/catalog?appType=1&couponsGeo=12,3,18,15,21&curr=rub&dest=-1029256,-102269,-226149,-446117&emp=0&lang=ru&locale=ru&pricemarginCoeff=1.0&reg=1&regions=68,64,83,4,38,80,33,70,82,86,75,30,69,22,66,31,40,1,48,71&spp=27&subject=2193;2378;2547;2676;3885;4060;4677;6128`;
    console.log(`Отправляем запрос на категорию: ${positionURL}`);
  }
  let positionMassiv = await fetch(positionURL);
  console.log(positionMassiv);
  return positionMassiv.json();
}

// Получаем массив карточек из указанной ссылки
async function getCategotyJSON() {
  let linkCat = document.querySelector(".linkCategory");
  let categotyLink = await fetch(linkCat);
  // console.log(categotyLink);
  return categotyLink.json();
}

// Получаем JSON товара
async function getJSONId(artikle) {
  let urlNmJSON = `https://wbx-content-v2.wbstatic.net/ru/${artikle}.json`;
  let мassivJSON = await fetch(urlNmJSON);
  let NmJSON = await мassivJSON.json();
  // let json = nmMassiv;
  // console.log(NmMassiv.imt_name);
  // // console.log(positionMassiv.json());
  return NmJSON;
}

// Получаем JSON всех товаров
async function getNmID(massivID) {
  // console.log(massivID);
  let massivCard='';
  for (let key of massivID) {
    console.log(key.id);
    massivCard +=key.id+`;`
  }
console.log(massivCard)
// Попытка через фетч. Не 
// fatch(`https://card.wb.ru/cards/detail?spp=21&regions=68,64,83,4,38,80,33,70,82,86,30,69,22,66,31,40,1,48&pricemarginCoeff=1.0&reg=1&appType=1&emp=0&locale=ru&lang=ru&curr=rub&couponsGeo=2,7,3,6,19,21,8&dest=-389344,-108081,-1030057,123585477&nm=${massivCard}`)



  let urlNmId = `https://card.wb.ru/cards/detail?spp=21&regions=68,64,83,4,38,80,33,70,82,86,30,69,22,66,31,40,1,48&pricemarginCoeff=1.0&reg=1&appType=1&emp=0&locale=ru&lang=ru&curr=rub&couponsGeo=2,7,3,6,19,21,8&dest=-389344,-108081,-1030057,123585477&nm=${massivCard}`;
  console.log(urlNmId)  
  // let positionMassiv = await fetch(urlNmId);
  // console.log(positionMassiv)  
  // console.log(positionMassiv.join);
  // return positionMassiv.json();
}

async function getAllid() {
  let a = await getPositionJSON(searchQuery, (page = 1));
  console.log(a);
  let massiv = a.data.products;
  console.log(massiv);
  let massvvAll = await getNmID(massiv);

  massiv.forEach((element) => {
    // Создеём массив с ID всех товаров
    let artikle = element.id;
    massivID.push(artikle);
    // console.log(massivID);

    let idJSON = getJSONId(artikle);
    idJSON.then((nm) => {
      // console.log(nm.imt_name);
      const cardSEO = new CreateTrCard(nm);
      cardSEO._createTableTr();
    });
  });
}

// После клика на "Открыть запрос на WB"
buttonOpenSiteWB.addEventListener("click", () => {
  const query = getSearchQuery();

  let linkWb = `https://www.wildberries.ru/catalog/0/search.aspx?&sort=popular&search=${query}`;
  console.log(`Ссылка на запрос на сайте WB: ${linkWb}`);
  window.open(linkWb, "_blank");
});

class CreateTrCard {
  constructor(massiv) {
    this.imt_id = massiv.imt_id;
    this.nm_id = massiv.nm_id;
    this.imt_name = massiv.imt_name;
    this.subj_name = massiv.subj_name;
    this.subj_root_name = massiv.subj_root_name;
    this.description = massiv.description;
    this.options = massiv.options;
    this.grouped_options = massiv.grouped_options;
    this.colors = massiv.colors;
    this.full_colors = massiv.full_colors;
    this.selling = massiv.selling;
    this.media = massiv.media;
    this.data = massiv.data;
    this.is_new_content = massiv.is_new_content;
  }

  _getTableTr() {
    let tableTr = document
      .querySelector(".templateTabeTr")
      .content.querySelector(".idTabeTr")
      .cloneNode(true);
    document.querySelector(".idTabeBody").append(tableTr);
    return tableTr;
  }

  _createTableTr() {
    this.trSEO = this._getTableTr();
    // this.trSEO.querySelector(".imt_id").textContent = this.imt_id;
    this.trSEO.querySelector(".nm_id").textContent = this.nm_id;
    this.trSEO.querySelector(
      ".imt_name"
    ).textContent = `${this.imt_name} (символов: ${this.imt_name.length})`;
    this.trSEO.querySelector(".subj_name").textContent = this.subj_name;
    this.trSEO.querySelector(".subj_root_name").textContent =
      this.subj_root_name;
    this.trSEO.querySelector(".description").textContent = `${this.description} (символов: ${this.description.length}) `;
    // Здесь ОБЪЕКТ, сделать разбивку нужно
    this.trSEO.querySelector(".options").innerHTML = showProps(this.options);
    function showProps(obj) {
      let result = "0";
      let resultText = "";
      let vafeed = "\n";
      for (let i in obj) {
        result++;
        // console.log(`${obj[i].name}: ${obj[i].value}`);
        resultText += `${result}. ${obj[i].name}: ${obj[i].value} ${vafeed}<br>`;
        // resultText.innerHTML;
      }
      return resultText;
    }
    this.trSEO.querySelector(".grouped_options").textContent = grouped_options(
      this.grouped_options
    );
    function grouped_options(obj) {
      // obj.forEach((i) => {
      //   console.log(i);
      // });
      // console.log(obj[1]);
      return obj[1];
    }
    this.trSEO.querySelector(".colors").innerHTML = colors(this.colors);
    function colors(options) {
      // console.log(options);
      let optionsLength = options.length;
      let optionsMas = "";
      options.forEach((i) => {
        // console.log(i);
        optionsMas = `${optionsMas} ${i}<br>`;
      });
      return optionsMas;
    }
    // this.trSEO.querySelector(".full_colors").textContent = this.full_colors;
    let sellingLink = this.trSEO.querySelector(".selling");

    sellingLink.textContent = this.selling.brand_name;
    if (this.selling.supplier_id) {
      let supplier_id = this.selling.supplier_id;

      sellingLink.setAttribute(
        "onclick",
        `javascript:window.open(href="https://www.wildberries.ru/seller/${supplier_id}", '_blank')`
      );
      sellingLink.setAttribute("style", "cursor:pointer; color:blue");
    }

    this.trSEO.querySelector(".media").innerHTML = mediaCount(this.media);
    function mediaCount(media) {
      let aaa = "";
      if (media.has_video) {
        aaa = `${media.photo_count}<br> Есть видео`;
      } else {
        aaa = media.photo_count;
      }
      return aaa;
    }
    // ${this.media.photo_count}
    // this.trSEO.querySelector(".data").textContent = this.data;

    // Получаем фотку товара
    this.trSEO
      .querySelector(".photo-card-link_th")
      .setAttribute(
        "href",
        `https://www.wildberries.ru/catalog/${this.nm_id}/detail.aspx`
      );

    this.trSEO.querySelector(".photo-card_small_th").src = `${imageCrеateSeo(
      this.nm_id
    )}`;
    this.trSEO.querySelector(".is_new_content").textContent =
      this.is_new_content;
  }
}


// Было до изменения ссылки на картинку
// function imageCrеateSeo(nmId) {
//   // Примет ссылки на картинку https://img1.wbstatic.net/tm/new/25210000/25217028-1.jpg
//   const imageURL = "https://img1.wbstatic.net/tm/new/";
//   const imagSub = String(nmId).substring(0, 4);
//   const image = `${imageURL}${imagSub}0000/${nmId}-1.jpg`;
//   return image;
// }


// Новая функция для определения сслыки на картинку
function imageCrеateSeo(nmId){
  // в одном basket-03 содержится 14400000 артикулов
  // https://basket-01.wb.ru/vol0/part1/1001/images/c246x328/1.jpg - формат первого товара
  // https://basket-01.wb.ru/vol1/part100/100072/images/c246x328/1.jpg
  // https://basket-01.wb.ru/vol10/part1022/1022711/images/c246x328/1.jpg
  // https://basket-01.wb.ru/vol143/part14399/14399999/images/c246x328/1.jpg
  
  // до 14400000 basket-01
  // !!!  https://basket-02.wb.ru/vol144/part14400/14400000/images/c246x328/1.jpg
  // !!!  https://basket-02.wb.ru/vol287/part28799/28799999/images/c246x328/1.jpg
  
  // до 28799999 (+14400000)
  // !!!  https://basket-03.wb.ru/vol288/part28800/28800000/images/c246x328/1.jpg
  // !!!  https://basket-03.wb.ru/vol431/part43199/43199999/images/c246x328/1.jpg
  
  // (+28800000)
  // !!!  https://basket-04.wb.ru/vol432/part43200/43200000/images/c246x328/1.jpg
  // !!!  https://basket-04.wb.ru/vol719/part71999/71999999/images/c246x328/1.jpg
  
  // (+28800000)
  // !!!  https://basket-05.wb.ru/vol720/part72000/72000000/images/c246x328/1.jpg
  // !!!  https://basket-05.wb.ru/vol1007/part100799/100799999/images/c246x328/1.jpg
  
  // (+5 400 000)
  // !!!  https://basket-06.wb.ru/vol1008/part100800/100800000/images/c246x328/1.jpg
  // !!!  https://basket-06.wb.ru/vol1061/part106199/106199999/images/c246x328/1.jpg

  // (+5 400 000)
  // https://basket-07.wb.ru/vol1062/part106200/106200000/images/c246x328/1.jpg
  // https://basket-07.wb.ru/vol1115/part111599/111599999/images/c246x328/1.jpg

  // (+5 400 000)
  // https://basket-08.wb.ru/vol1116/part111600/111600000/images/c246x328/1.jpg
  // https://basket-08.wb.ru/vol1169/part116999/116999999/images/c246x328/1.jpg

  // +14 400 000 (не факт, возможо другое число)
  // https://basket-09.wb.ru/vol1170/part117000/117000000/images/c246x328/1.jpg
  // https://basket-09.wb.ru/vol1309/part130900/130900000/images/c246x328/1.jpg
  // https://basket-09.wb.ru/vol1311/part131199/131200000/images/c246x328/1.jpg

  //basket-10.wb.ru/vol1315/part131500/131500000/images/c246x328/1.jpg
  // https://basket-10.wb.ru/vol1320/part132000/132000000/images/c246x328/1.jpg
  
  // https://basket-10.wb.ru/vol1458/part145800/145800000/images/c246x328/1.jpg

  
    // basket-01.wb.ru = корзина от... до...
  // vol1 = значения от 0 до ВЫЯСНИТЬ (1449 есть)
  // part144989 = "часть" 
  let basketNumber = "01";
  if (nmId <= 14399999){basketNumber = "01"}else
  if (nmId <= 28799999){basketNumber = "02"}else
  if (nmId <= 43199999){basketNumber = "03"}else
  if (nmId <= 71999999){basketNumber = "04"}else
  if (nmId <= 100799999){basketNumber = "05"}else
  if (nmId <= 106199999){basketNumber = "06"}else
  if (nmId <= 111599999){basketNumber = "07"}else
  if (nmId <= 116999999){basketNumber = "08"}else
  if (nmId <= 131200000){basketNumber = "09"}else
  if (nmId > 131200000){basketNumber = "10"};
  
  const imageURL = `https://basket-${basketNumber}.wb.ru`;
  
  // Делим значение на 100000 и берём целую часть
  const imagVol = `vol${Math.trunc(nmId/100000)}`
    // Делим значение на 1000 и берём целую часть
  const imagePart = `part${Math.trunc(nmId/1000)}`;
  const imageOkoncanie= 'images/c246x328/1.jpg'
  const image = `${imageURL}/${imagVol}/${imagePart}/${nmId}/${imageOkoncanie}`;
  
  return image;
}



