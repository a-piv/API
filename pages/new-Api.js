const buttonCheckNewApi = document.querySelector(".buttonCheckNewApi");

buttonCheckNewApi.addEventListener("click", () => {
  check_New_API();
});

function check_New_API() {
  const apiClient = document.querySelector(".inputNewApi").value;
  api = apiClient.trim();
  console.log(api);
  return api;
}

const body = {
  id: 1,
  jsonrpc: "2.0",
  params: {
    isArchive: false,
    query: {
      limit: 10000,
      offset: 0,
      total: 0,
    },
    withError: false,
  },
};

const headers = {
  Authorization:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3NJRCI6IjYxMWVjMjExLTFkN2QtNDc2Ni1hMjU3LTBmNTkxNzRjYWMwZiJ9.C15e06FaDAyXfN6YRC8ye8rP87l-ePVPl1ZrPwws4ho",
  "Content-Type": "application/json",
};

const link_apiv2_list = "https://suppliers-api.wildberries.ru/card/list";
const testUrl = "https://jsonplaceholder.typicode.com/users";

function sendRequest(method, url, body = null) {
  return fetch(url, {
    method: method,
    body: JSON.stringify(body),
    headers: headers,
  }).then((response) => {
    return response.json();
  });
  //
  // return fetch(url, {
  //   method: method,
  //   body: JSON.stringify(body),
  //   // headers,
  // }).then((response) => {
  //   return response.json();
  // });
}

sendRequest("POST", link_apiv2_list, body)
  .then((data) => console.log(data))
  .catch((err) => console.log("ОШибка нахер"));
