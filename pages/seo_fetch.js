const buttonGetPosition = document.querySelector(".buttonGetPosition");
const buttonOpenSiteWB = document.querySelector(".buttonOpenSiteWB");
let allProd ={};
// let linkCategory = "";

// Запрос, без страницы и поискового запроса. Страница: &page=2, Запрос: &query=Брелокии%20для%20ключей
let searchURLrequest ="https://search.wb.ru/exactmatch/ru/common/v4/search?TestGroup=main_page_delete_purch&TestID=204&appType=1&curr=rub&dest=-446117&regions=80,38,83,4,64,33,68,70,30,40,86,75,69,22,1,31,66,110,48,71,114&resultset=catalog&sort=popular&spp=30&suppressSpellcheck=false&uclusters=1"
let searchQuery = '';
let urlSeo = '';


// Это ссылка на КАТАЛОГ "https://catalog.wb.ru/catalog/bijouterie2/catalog?appType=1&curr=rub&dest=-446117&regions=80,38,83,4,64,33,68,70,30,40,86,75,69,22,1,31,66,110,48,71,114&sort=popular&spp=30&subject=297&uclusters=1&page=2";
// Это ссылка на РЕКЛАМУ В КАТАЛОГЕ (menuid можено менять, брать из апи рекаламы)  https://catalog-ads.wildberries.ru/api/v6/catalog?menuid=130486
// Поиская выдача (Без РЕКЛАМЫ) https://search.wb.ru/exactmatch/ru/common/v4/search?TestGroup=main_page_delete_purch&TestID=204&appType=1&curr=rub&dest=-446117&page=2&query=Брелок%20для%20ключей&regions=80,38,83,4,64,33,68,70,30,40,86,75,69,22,1,31,66,110,48,71,114&resultset=catalog&sort=popular&spp=30&suppressSpellcheck=false&uclusters=1


// let massivID = [];
// let searchQuery = "";

// После клика на "Получить позиции".
buttonGetPosition.addEventListener("click", () => {
  // getCategotyJSON();
  // getSearchQuery();
  getSearchURL(1);
  // getAllid();

  // sendRequest(searchURLrequest)
  // .then((data) => console.log(data))
  // .catch((data) => console.log(data));
  getAllProdukts()
});

// Получаем поисковй запрос на WB (слово+второе+слово), вместо пробелов ставим "+" и возвращаем готовый запрос
function getSearchQuery() {
  let searchRequestValue = document.querySelector(".searchRequesnClass").value;
  let searchRequestSplit = searchRequestValue.split(" ");
  let searchQuery = searchRequestSplit.join("+");
  console.log(`Поисковой запрос: ${searchQuery}`);
  // searchURLrequest = `${searchURLrequest}&query=${searchQuery}&page=1`
  return searchQuery;
}

// Получаем ссылка на страницу с товарами
function getSearchURL (pageNumber=1) {
  let search = getSearchQuery()
  urlSeo = `${searchURLrequest}&query=${search}&page=${pageNumber}`
  console.log(urlSeo)
return urlSeo;
}

// function sendRequest(url) {
//   return fetch(url);
// }


// Получаем все id-товаров из массива данных
function getAllProdukts(){
fetch(urlSeo)
  .then(response => response.json())
  .then(response_products => {allProd = (response_products.data.products.forEach((artikle)=> {
  
  // Получаем JSON товара

// httpGetXMLHttpRequest(artikle.id)
// let linkId = nmIdJSON(artikle.id)
// console.log(linkId)

// Путь в файлу nm в формате https://basket-11.wb.ru/vol1655/part165599/165599999/info/ru/card.json
let imagePath = new imageCrеateSeo(artikle.id);
let linkId = imagePath._getNmIdJson();
promiseLinkID(linkId)


  }))
  })
}

function promiseLinkID (url){
  fetch(url)
  .then(response => response.json())
  .then(commits => 
    {const cardSEO = new CreateTrCard(commits);
          cardSEO._createTableTr();
    // console.log(commits)
  });
}



// // Получаем JSON всех товаров
// async function getNmID(massivID) {
//   // console.log(massivID);
//   let massivCard='';
//   for (let key of massivID) {
//     console.log(key.id);
//     massivCard +=key.id+`;`
//   }
// console.log(massivCard)
// // Попытка через фетч. Не 
// // fatch(`https://card.wb.ru/cards/detail?spp=21&regions=68,64,83,4,38,80,33,70,82,86,30,69,22,66,31,40,1,48&pricemarginCoeff=1.0&reg=1&appType=1&emp=0&locale=ru&lang=ru&curr=rub&couponsGeo=2,7,3,6,19,21,8&dest=-389344,-108081,-1030057,123585477&nm=${massivCard}`)



//   let urlNmId = `https://card.wb.ru/cards/detail?spp=21&regions=68,64,83,4,38,80,33,70,82,86,30,69,22,66,31,40,1,48&pricemarginCoeff=1.0&reg=1&appType=1&emp=0&locale=ru&lang=ru&curr=rub&couponsGeo=2,7,3,6,19,21,8&dest=-389344,-108081,-1030057,123585477&nm=${massivCard}`;
//   console.log(urlNmId)  
//   // let positionMassiv = await fetch(urlNmId);
//   // console.log(positionMassiv)  
//   // console.log(positionMassiv.join);
//   // return positionMassiv.json();
// }

// async function getAllid() {
//   let a = await getPositionJSON(searchQuery, (page = 1));
//   console.log(a);
//   let massiv = a.data.products;
//   console.log(massiv);
//   let massvvAll = await getNmID(massiv);

//   massiv.forEach((element) => {
//     // Создеём массив с ID всех товаров
//     let artikle = element.id;
//     massivID.push(artikle);
//     // console.log(massivID);

//     let idJSON = getJSONId(artikle);
//     idJSON.then((nm) => {
//       // console.log(nm.imt_name);
//       const cardSEO = new CreateTrCard(nm);
//       cardSEO._createTableTr();
//     });
//   });
// }

// После клика на "Открыть запрос на WB"
buttonOpenSiteWB.addEventListener("click", () => {
  const query = getSearchQuery();

  let linkWb = `https://www.wildberries.ru/catalog/0/search.aspx?&sort=popular&search=${query}`;
  console.log(`Ссылка на запрос на сайте WB: ${linkWb}`);
  window.open(linkWb, "_blank");
});


//Класс Построить таблицу с данными на сайте (вынести в другой файл)
class CreateTrCard {
  constructor(massiv) {
    this.imt_id = massiv.imt_id;
    this.nm_id = massiv.nm_id;
    this.imt_name = massiv.imt_name;
    this.subj_name = massiv.subj_name;
    this.subj_root_name = massiv.subj_root_name;
    this.vendor_code = massiv.vendor_code;
    this.description = massiv.description;
    this.grouped_options = massiv.grouped_options;
    // console.log(this.grouped_options)
    this.options = massiv.options;
    this.certificate = massiv.certificate;
    this.nm_colors_names = massiv.nm_colors_names;
    this.colors = massiv.colors;
    this.contents = massiv.contents;
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
    // console.log(this.trSEO);
    // this.trSEO.querySelector(".imt_id").textContent = this.imt_id;
    this.trSEO.querySelector(".nm_id").textContent = this.nm_id;
    this.trSEO.querySelector(
      ".imt_name"
    ).textContent = `${this.imt_name} (символов: ${this.imt_name.length})`;
    this.trSEO.querySelector(".subj_name").textContent = this.subj_name;
    this.trSEO.querySelector(".subj_root_name").textContent = this.subj_root_name;
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
    this.trSEO.querySelector(".grouped_options").innerHTML = grouped_options(
      this.grouped_options
    );
    function grouped_options(obj) {
      // console.log(obj)
      let result = "0";
      let resultText = "";
      let vafeed = "\n";
      // for (let i in obj) {
      //   result++;
      //   // console.log(`${obj[i].name}: ${obj[i].value}`);
      //   resultText += `${result}. ${obj[i].group_name} <br>${obj[i].options}: ${obj[i].options} ${vafeed}<br>`;
      //   // resultText.innerHTML;
      // }
      obj.forEach((element)=>{
        // console.log (element.group_name)
        resultText += `${element.group_name}<br>`;
        // console.log (element.options)
        element.options.forEach((elementOption, i) => {
          i ++;
          resultText += `${i}) ${elementOption.name}: ${elementOption.value} <br>`;
        })
        resultText += `<br>`;
        
      })
      return resultText;
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


    this.trSEO.querySelector(".data").innerHTML = dataCount (this.data);
    function dataCount(data){
      let dataSubject_id = data.subject_id;
      let datasubject_root_id = data.subject_root_id;
      let dataSubject = `Категория: ${dataSubject_id}<br> Родительская ${datasubject_root_id}`;
      // console.log(dataSubject);
      return dataSubject
    }



    // Получаем фотку товара
    this.trSEO
      .querySelector(".photo-card-link_th")
      .setAttribute(
        "href",
        `https://www.wildberries.ru/catalog/${this.nm_id}/detail.aspx`
      );

    // this.trSEO.querySelector(".photo-card_small_th").src = imageCrеateSeo(this.nm_id);

    let imagePath = new imageCrеateSeo(this.nm_id);
    let image = imagePath._getImage();
    this.trSEO.querySelector(".photo-card_small_th").src = image;
    console.log (imageCrеateSeo(this.nm_id));
    // this.trSEO.querySelector(".is_new_content").textContent =  this.is_new_content;
  }
}


// ------------------------------------ МЕНЮ ------------------------------------

async function parseMenuWB (link){
  let parseMenuWB =  await fetch(link);
  // fetch(positionURL);
  
  let massivMenu =  await parseMenuWB.json()
  console.log( massivMenu)
  massivMenu.forEach((art)=>{
    
    let menuWB = new GetAllCategories(art);
    menuWB._getTemplateCatalogMenu()
    // console.log(art.childs)
  })
  return massivMenu;
}
let buttonGetMenu = document.querySelector('.buttonGetMenu');
buttonGetMenu.addEventListener('click', () => {
  console.log("ckbr menu")
  let linkMenuWB = `https://static-basket-01.wb.ru/vol0/data/main-menu-ru-ru-v2.json`;
  let menuuu = parseMenuWB(linkMenuWB);
  // menuuu.then(){}
  
  // menuuu.forEach((art)=>{
  //   console.log(art)
  //   // let menuWB = new GetAllCategories(art);
  //   // let met = menuWB._getTemplateCatalogMenu()
  // })
  
})

