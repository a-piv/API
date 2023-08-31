class PositionTable {
  // Создаём таблицу
  constructor(rowQuantityMassiv) {
    this.rowQuantityMassiv = rowQuantityMassiv;

    let table = document.createElement("table");
    table.classList.add("positionResultTable");
    // table.createTHead();
    // table.createTBody();
    let legend = document.querySelector(".legendPosition");
    legend.append(table);
    this.table = table;
    this.table.createTBody().classList.add("tbody");
    // var cell=row.insertCell(0);
    // var cell=row.insertCell(0);
    // var cell=row.insertCell(0);
    // cell.innerHTML="<b>这是个表头</b>";
    // console.log(table)
  }

  //   Первый ряд - заголовок таблицы с картинками и артикулами товаров (без позиций товара)
  _createHeaderPositionTable(nameLeftRow) {
    var header = this.table.createTHead();
    var row = header.insertRow(-1);
    var cell = row.insertCell(-1);
    cell.textContent = nameLeftRow;
    for (let i = 0; i < this.rowQuantityMassiv.length; i++) {
      /* ... делать что-то с obj[key] ... */
      var cell = row.insertCell(-1);
      let image = new imageCrеateSeo(this.rowQuantityMassiv[i]);
      let imageIcon = image._getImage();

      const myImage = new Image(75, 100);
      myImage.src = imageIcon;

      cell.textContent = `${this.rowQuantityMassiv[i]}, Номер: ${[i]}`;
      cell.appendChild(myImage);

      // const img = document.querySelector("img");
      // img.src = imageIcon;
      // console.log(img)
      // cell.innerHTML=`${this.rowQuantityMassiv[i]}<br>${img}`;

      //   console.log(this.rowQuantityMassiv);
      //   console.log(this.rowQuantityMassiv.length);
    }
  }

  //   Строки с поисковыыми запросами
  _createRowPositionTable(nameLeftRowSearch, id) {
    let tbody = this.table.querySelector(".tbody"); //Заголовок таблицы (запросы и артикулы)
    var row = tbody.insertRow(-1);
    var cell = row.insertCell(-1);
    cell.textContent = nameLeftRowSearch;
    for (let i = 0; i < this.rowQuantityMassiv.length; i++) {
      //Здесь добавляем позиции товаров
      /* ... делать что-то с obj[key] ... */
      let cell = row.insertCell(-1);
      
      //   cell.textContent = `${this.rowQuantityMassiv[i]}`;
      cell.textContent = `${i}`; // !!! Сюда сделать позиции товара
      cell.classList.add(`nm-${id}-${this.rowQuantityMassiv[i]}`); // Присваиваем класс "Номер строки_Артикул товара", по этому номеру будем проставлять позицию в ячейку
      // const img = document.querySelector("img");
      // img.src = imageIcon;
      // console.log(img)
      // cell.innerHTML=`${this.rowQuantityMassiv[i]}<br>${img}`;
      //   console.log(this.rowQuantityMassiv);
      //   console.log(this.rowQuantityMassiv.length);
    }
  }
}
