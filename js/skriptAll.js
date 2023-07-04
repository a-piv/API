
        // Функция для генерации списка под апи
        function createLiTwoPapam(quantity, summ){
            let liCreate = document.createElement('li');
            liCreate.textContent=`${quantity}: ${summ}шт.`;
            document.querySelector('.apiInfo_all').append(liCreate)
          }
          
          function createLiFreePapam(deckr,quantity, summ){
            let liCreate = document.createElement('li');
            liCreate.textContent=`${deckr}: ${quantity}шт. на общую сумму: ${summ}руб.`;
            // liCreate.textContent=`Всего заказов: ${response.length}шт.`;
            document.querySelector('.apiInfo_all').append(liCreate)
          }
          
          function createLiFreePapamRED(deckr,quantity, summ){
            let liCreate = document.createElement('li');
            liCreate.classList = 'background_color_text_error';
            liCreate.textContent=`${deckr}: ${quantity}шт. на общую сумму: ${summ}руб.`;
            // liCreate.textContent=`Всего заказов: ${response.length}шт.`;
            document.querySelector('.apiInfo_all').append(liCreate)
          }
          

function razdelitel (){
    let razdell = '---------------------------------------------------------------------------------'
     // liCreate.textContent=`${deckr}: ${quantity}шт. на общую сумму: ${summ}руб.`;
     // liCreate.textContent=`Всего заказов: ${response.length}шт.`;
     document.querySelector('.apiInfo_all').append(razdell)
   }