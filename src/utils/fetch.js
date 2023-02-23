const helpFunction = async (url, nodeId) => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), 20000);

  var myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    signal: controller.signal,
  };

  return await fetch(`${url}/${nodeId}/status`, requestOptions)
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
  const listOfNodes = ["https://alice.muon.net/test-proxy/nodes"];
  let tryed = 0;
  let res;
  var flag = false;

  while (tryed < 4 && !flag) {
    res = await helpFunction(listOfNodes[tryed % 4], nodeId);
    if (res === "timeOut" || res === false) {
      tryed++;
      res = false;
    } else {
      console.log(res);
      return res;
    }
  }
  return res;
};

export { getNodeInfo };
