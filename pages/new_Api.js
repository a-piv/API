const buttonCheckNewApi = document.querySelector(".buttonGetOrders_v2");

buttonCheckNewApi.addEventListener("click", () => {
  // Получаем все введённые значения

  check_New_API();
});

// function getAllParametrs(){
//   document.querySelector('')
// }

// ***В отдельный класс поместить

async function check_New_API() {
  const dateApi = document.querySelector("#dateApi").value;
  const apiClient = document.querySelector(".inputApi").value;
  let apiResponse = `https://statistics-api.wildberries.ru/api/v1/supplier/orders?dateFrom=${dateApi}&flag=${validate()}`;
  // let parammm = {
  //   method: "GET",
  //   headers: {
  //     'Authorization': apiClient,
  //   }
  // let apiResponse = "https://api.itgid.info/api/26/random/random-number";
  // const apiClient = 'ehlKfEGnrQ7s0jXL'

  await fetch(apiResponse, {
    method: "GET",
    // mode: "cors", // no-cors, *cors, same-origin
    headers: {
      // Authorization: apiClient,
      Authorization: apiClient,
    },
  })
    .then((response) => {
      if (!response.ok) {
        console.log(`Ошибка: ${response.status}`);
        console.log(response);
      }
      return response.json()
    })
    .then((response) => console.log(response))
    // .catch((response)=>{
    //   console.log(`Ошибка: ${response}`);}
    // );
}

// const body = {
//   id: 1,
//   jsonrpc: "2.0",
//   params: {
//     isArchive: false,
//     query: {
//       limit: 10000,
//       offset: 0,
//       total: 0,
//     },
//     withError: false,
//   },
// };

// const headers = {
//   Authorization:
//    eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3NJRCI6IjY2MmNlNTljLTNiYmMtNDMzOC1hMWM0LTQxYTFhZGEzNGZmYyJ9.ah3iH8jtHJHGS7V60cTrHAIXhADKS2H9I4HZpTvuomU
//   "Content-Type": "application/json",
// };

// const link_apiv2_list = "https://suppliers-api.wildberries.ru/card/list";
// const testUrl = "https://jsonplaceholder.typicode.com/users";

// function sendRequest(method, url, body = null) {
//   return fetch(url, {
//     method: method,
//     body: JSON.stringify(body),
//     headers: headers,
//   }).then((response) => {
//     return response.json();
//   });
//   //
//   // return fetch(url, {
//   //   method: method,
//   //   body: JSON.stringify(body),
//   //   // headers,
//   // }).then((response) => {
//   //   return response.json();
//   // });
// }

// sendRequest("POST", link_apiv2_list, body)
//   .then((data) => console.log(data))
//   .catch((err) => console.log("ОШибка нахер"));
