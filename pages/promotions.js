const buttonGetAction = document.querySelector(".buttonGetAction");

buttonGetAction.addEventListener("click", () => {
  console.log("Клик акции");
  // Убрать кпопку "Получить все "Акции""
        document.querySelector('.buttons-getAction').remove();

  getAllPositionJSON()
});

// Получаем все акции

const positionLink =
  "https://banners-website.wildberries.ru/public/v1/banners?urltype=16384&apptype=1&displaytype=2&longitude=37.356651&latitude=55.64155&country=1&culture=ru";
function getAllPositionJSON() {
  fetch(positionLink)
    .then((res) => res.json())
    .then((ress) => {
      ress.forEach((element) => {
        // console.log(element);
        const oneAction = new Promotions(element);
        oneAction._generateCardPromotions()
      });
    })

    // .then((dataw) => console.log(dataw))
    .catch((error) => console.log("Какая-то ошибка", error));
}
