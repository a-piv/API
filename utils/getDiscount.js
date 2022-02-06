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

function dateZero(d) {
  return d < 10 ? "0" + d : d;
}
// Указать вчерашнюю дату
function dateTime() {
  let dateFull = new Date();
  let FullYear = dateFull.getFullYear();
  let Month = dateZero(dateFull.getMonth() + 1);
  let date = dateZero(dateFull.getDate() - 1);
  let dateFormat = `${FullYear}-${Month}-${date}`;
  return dateFormat;
}

//Устанавливаем вчерашнюю дату
document.querySelector("#dateApi").value = dateTime();
