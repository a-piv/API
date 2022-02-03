// Создаем ссылка на картинку в sales, orders, stocs
function imageCrеate(nmId) {
  // Примет ссылки на картинку https://img1.wbstatic.net/tm/new/25210000/25217028-1.jpg
  const imageURL = "https://img1.wbstatic.net/tm/new/";
  const imagSub = String(nmId).substring(0, 4);
  const image = `${imageURL}${imagSub}0000/${nmId}-1.jpg`;
  return image;
}

function getDiscount(price, discount) {
  return Math.round(price - (price / 100) * discount);
}

// Указать вчерашнюю дату
function dateTime() {
  let date = document.getElementById("dateTime");
  //  console.log(new Date());
  console.log(date.value);
  date.value = new Date();
  console.log(date);
  // date.set;

  // document.getElementById(
  //   "dateTime"
  // ).value = `${today.getFullYear()}-${today.getMonth()}-${0}${today.getDate()}`;
}
// dateTime();
// console.log(new Date());
// console.log(new Date("2020-09-20"));

// Используется для текста в обращении для поддержки
function getAPI() {
  const dateApi = document.querySelector("#dateApi").value;
  const api = document.querySelector(".inputApi").value;

  const stockURL = `https://suppliers-stats.wildberries.ru/api/v1/supplier/sales?dateFrom=${dateApi}T00:00:00.000Z&flag=${flag}&key=${api}`;
  console.log(stockURL);
  return stockURL;
}
