fetch ("https://card.wb.ru/cards/detail?spp=21&regions=68,64,83,4,38,80,33,70,82,86,30,69,22,66,31,40,1,48&pricemarginCoeff=1.0&reg=1&appType=1&emp=&locale=ru&lang=ru&curr=rub&couponsGeo=2,7,3,6,19,21,8&dest=-389344,-108081,-1030057,123585477&nm=118843788")
    .then(response => {
        console.log('Выполнен')
        console.log(response)
    }).catch(
        console.log(err => console.log('err')
        
        )
        
    )