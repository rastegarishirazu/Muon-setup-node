const helpFunction = async (url, nodeId) => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), 20000);

  var myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    signal: controller.signal,
    // redirect: "follow",
  };

  return await fetch(
    `${url}/${nodeId}/status`,
    // "https://catfact.ninja/fact"
    requestOptions
  )
    .then((response) => response.json())
    .then((data) => {
      return data["result"];
    })
    .catch((err) => {
      console.log(err);
      clearTimeout(id);
      return "timeOut";
    });
};
const getNodeInfo = async (nodeId) => {
  const listOfNodes = ["http://103.75.196.96/nodes"];
  let tryed = 0;
  let res;
  var flag = false;

  var myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");

  var requestOptions = {
    method: "GET",
    // mode: "no-cors",
    headers: myHeaders,
    // redirect: "follow",
  };

  // await fetch("http://103.75.196.96/nodes/45/status", requestOptions)
  //   .then((response) => response.json())
  //   .then((result) => console.log(result))
  //   .catch((error) => console.log("error", error));

  while (tryed < 4 && !flag) {
    console.log(listOfNodes[tryed % 1]);
    res = await helpFunction(listOfNodes[tryed % 4], nodeId);
    if (res === "timeOut" || res === false) {
      tryed++;
      res = false;
      // clearTimeout(id);
    } else {
      console.log(res);
      return res;
    }
  }
  return res;
};

export { getNodeInfo };
