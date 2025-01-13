//Эндпойт с меню https://static-basket-01.wb.ru/vol0/data/main-menu-ru-ru-v2.json
//Эндпойт с фильтром https://catalog.wb.ru/catalog/wedding/v4/filters?appType=1&cat=10320&color=12632256;15450807;15631085;15791590;16119260;16119261;16711167;16766720;16777215&curr=rub&dest=-446117&regions=80,38,83,4,64,33,68,70,30,40,86,75,69,1,31,66,22,110,48,71,114&spp=25&uclusters=1

class GetAllCategories {
  constructor(param, i) {
    i++;
    // console.log(param);
    this.id = param.id;
    this.name = param.name;
    this.url = param.url;
    this.shard = param.shard;
    this.query = param.query;
    this.landing = param.landing;
    this.childs = param.childs;
  }

  _getFilters(filter){
    console.log(filter)
  }

  _getTemplateCatalogMenu() {
    // Создаём главное меню
    let mailCatalogMenu = document.querySelector("#menu");
    let createUl = document.createElement("ul");
    createUl.classList.add("mainCategory");
    let createLi = document.createElement("li");
    createLi.classList.add("mainCategoryLi");

            let a = document.createElement('a');
            a.setAttribute('href', `https://wildberries.ru${this.url}`);
            a.setAttribute('target', '_blank');
            a.textContent = `${this.name} (id: ${this.id})`;
            createLi.append(a)


    // createLi.textContent = `${this.name} (id: ${this.id})`;
    createUl.append(createLi)

    // создаём подменю
    if (this.childs) {
      console.log("Есть подкатегории 1-ого уровня");
      let subMenu = document.createElement("ul");
      subMenu.classList.add("subCategory");
      let createSubLi = document.createElement("li");
    //   subMenu.append(createSubLi);
      
      // создаём ПодПодменю
      let masssdd = this.childs;
      masssdd.forEach((element) => {
        console.log(`${element.name} (id:${element.id})`);
        let createLiSubmenu = document.createElement("li");
        createLiSubmenu.classList.add("subCategoryLi");
        // createLiSubmenu.textContent = `${element.name} (id:${element.id})`;
        // createLiSubmenu.createElement('a')
        let a = document.createElement('a');
        a.setAttribute('href', `https://wildberries.ru${element.url}`);
        a.setAttribute('target', '_blank');
        a.textContent = `${element.name} (id:${element.id})`;
        createLiSubmenu.append(a)
        subMenu.append(createLiSubmenu);
        mailCatalogMenu.append(createLi);
        // создаём ПодПодПодменю (меню 3-его уровня)
        // console.log(element.childs)
        if (element.childs) {
          //   console.log(`еСТЬ ЗНАЧЕНЯ`);
          //   console.log(element.childs.length)
          let createUlSub = document.createElement("ul");
          let len = element.childs.length;
          for (let index = 0; index < len; ++index) {
            console.log(element.childs[index].name);
            let createLiSubSubmenu = document.createElement("li");
            createLiSubSubmenu.classList.add("subSubCategoryLi");
            
            let a = document.createElement('a');
            a.setAttribute('href', `https://wildberries.ru${element.childs[index].url}`);
            a.setAttribute('target', '_blank');
            a.textContent = `${element.childs[index].name} (id:${element.childs[index].id})`;
            createLiSubSubmenu.append(a)

            // createLiSubSubmenu.textContent = `${element.childs[index].name} (id:${element.childs[index].id})`;
            createUlSub.append(createLiSubSubmenu);

            // return createUlSub;
          }
          console.log(createUlSub);
          createLiSubmenu.append(createUlSub)
        //   createLi.append(createUlSub);
          //   element.forEach((elem)=>{
          //     console.log (elem.childs)
          //   })
        }
      });
      createLi.append(subMenu)
    } else {
      console.log("НЕТ пдкатегрии");
    }
    // return mailCatalogMenu;
  }
}
