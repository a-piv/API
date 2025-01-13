// Новая функция для определения сслыки на картинку

class imageCrеateSeo{
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
    
    // 5 400 000
    constructor(nmId){
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
    if (nmId <= 160199999){basketNumber = "10"}else
    if (nmId <= 165599999){basketNumber = "11"}else
    if (nmId <= 191999999){basketNumber = "12"}else
    if (nmId > 191999999){basketNumber = "13"};
    
    const imageURL = `https://basket-${basketNumber}.wbbasket.ru`;
    
    // Делим значение на 100000 и берём целую часть
    const imagVol = `vol${Math.trunc(nmId/100000)}`
      // Делим значение на 1000 и берём целую часть
    const imagePart = `part${Math.trunc(nmId/1000)}`;
    this.pathNM = `${imageURL}/${imagVol}/${imagePart}/${nmId}`
    // console.log (pathNM)
    // return pathNM;
    }
  
    _getImage(){
      // формат https://basket-08.wb.ru/vol1164/part116499/116499325/images/c246x328/1.webp
      const imageOkoncanie= 'images/c246x328/1.webp'
      let image = `${this.pathNM}/${imageOkoncanie}`;
      // console.log (image);
      return image;
    }
    _getNmIdJson(){
      // формат https://basket-11.wb.ru/vol1655/part165599/165599999/info/ru/card.json
      const pathNmIdJson= 'info/ru/card.json'
      let nmIdJson = `${this.pathNM}/${pathNmIdJson}`;
      // console.log(nmIdJson)
      return nmIdJson;
    }
    
  }
  
  

  // function nmIdJSON(nmId){
  //   let basketNumber = "01";
  //   if (nmId <= 14399999){basketNumber = "01"}else
  //   if (nmId <= 28799999){basketNumber = "02"}else
  //   if (nmId <= 43199999){basketNumber = "03"}else
  //   if (nmId <= 71999999){basketNumber = "04"}else
  //   if (nmId <= 100799999){basketNumber = "05"}else
  //   if (nmId <= 106199999){basketNumber = "06"}else
  //   if (nmId <= 111599999){basketNumber = "07"}else
  //   if (nmId <= 116999999){basketNumber = "08"}else
  //   if (nmId <= 131200000){basketNumber = "09"}else
  //   if (nmId <= 160199999){basketNumber = "10"}else
  //   if (nmId <= 165599999){basketNumber = "11"}else
  //   if (nmId > 165600000){basketNumber = "12"};
    

  //   const imageURL = `https://basket-${basketNumber}.wb.ru`;
    
  //   // Делим значение на 100000 и берём целую часть
  //   const imagVol = `vol${Math.trunc(nmId/100000)}`
  //     // Делим значение на 1000 и берём целую часть
  //   const imagePart = `part${Math.trunc(nmId/1000)}`;
  //   const imageOkoncanie= 'images/c246x328/1.jpg'
  //   const nmJSON = `${imageURL}/${imagVol}/${imagePart}/${nmId}/info/ru/card.json`;
  //   // https://basket-11.wb.ru/vol1655/part165599/165599999/info/ru/card.json
  //   return nmJSON;
  // }
  
  
  