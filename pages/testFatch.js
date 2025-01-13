// setTimeout(() => resolve("done"), 1000);

function pageR(page){
    fetch (`https://search.wb.ru/exactmatch/ru/male/v4/search?TestGroup=control&TestID=216&appType=1&curr=rub&dest=-1257786&regions=80,38,83,4,64,33,68,70,30,40,86,75,69,22,1,31,66,110,48,71,114&resultset=catalog&sort=popular&spp=28&suppressSpellcheck=false&uclusters=1&page=${page}&query=%D0%B1%D1%80%D0%B5%D0%BB%D0%BE%D0%BA+%D0%B4%D0%BB%D1%8F+%D0%BA%D0%BB%D1%8E%D1%87%D0%B5%D0%B9`)
    .then(response => {
        console.log(`страница ${page}`)
        console.log(response.status)
        console.log(response)

    }).catch(
        console.log(err => console.log('err')
        )
    )

}


function parser (){
    for (let i = 1; i <= 60; i++) {
        pageR(i)
        
    }
}

const resp = new Promise((resolve, reject) => {
    fetch (`https://search.wb.ru/exactmatch/ru/male/v4/search?TestGroup=control&TestID=216&appType=1&curr=rub&dest=-1257786&regions=80,38,83,4,64,33,68,70,30,40,86,75,69,22,1,31,66,110,48,71,114&resultset=catalog&sort=popular&spp=28&suppressSpellcheck=false&uclusters=1&page=2&query=%D0%B1%D1%80%D0%B5%D0%BB%D0%BE%D0%BA+%D0%B4%D0%BB%D1%8F+%D0%BA%D0%BB%D1%8E%D1%87%D0%B5%D0%B9`)
    .then(response => {
        // console.log(`страница ${page}`);
        console.log(response.status);
        if (response.ok){
            console.log(response.status);
            resolve (response.json())
        }else{
            c
        }

    })
})

console.log(resp)