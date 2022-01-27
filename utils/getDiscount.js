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

function getNextSelector(selector) {
  console.log(document.querySelector(selector));
}
