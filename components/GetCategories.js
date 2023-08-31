//Эндпойт с меню https://static-basket-01.wb.ru/vol0/data/main-menu-ru-ru-v2.json

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
