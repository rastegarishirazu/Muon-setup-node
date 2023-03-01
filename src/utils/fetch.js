const helpFunction = async (url) => {
  const controller = new AbortController();
  const id = setTimeout(() => {
    console.log("my timeout");
    return controller.abort();
  }, 30000);

  var myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    signal: controller.signal,
  };

  return await fetch(url, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.log(err);
      clearTimeout(id);
      return "timeOut";
    })
    .finally(() => {
      clearTimeout(id);
    });
};
const getNodeInfo = async (nodeId) => {
  const listOfNodes = ["https://alice.muon.net/test-proxy/nodes"];
  let tryed = 0;
  let res;
  var flag = false;

  while (tryed < 3 && !flag) {
    res = await helpFunction(
      `${listOfNodes[tryed % listOfNodes.length]}/${nodeId}/status`
    );
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

const checkIP = async (ip) => {
  const listOfNodes = ["https://alice.muon.net/test-proxy/status"];
  let tryed = 0;
  let res;
  var flag = false;

  while (tryed < 3 && !flag) {
    res = await helpFunction(
      `${listOfNodes[tryed % listOfNodes.length]}?ip=${ip}`
    );
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

export { getNodeInfo, checkIP };
