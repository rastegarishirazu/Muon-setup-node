const helpFunction = async (url, nodeId) => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), 15000);
  return await fetch(
    `${url}?app=explorer&method=node-peer&params[id]=${nodeId}`,
    // "https://catfact.ninja/fact"
    { signal: controller.signal }
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data?.success && data?.result?.peerInfo?.multiaddrs.length > 0) {
        return data;
      } else {
        return false;
      }
    })
    .catch((err) => {
      console.log(err);
      clearTimeout(id);
      return "timeOut";
    });
};
const getNodeInfo = async (nodeId) => {
  const listOfNodes = [
    "https://alice.muon.net/v1/",
    "https://alice.muon.net/v1-1/",
    "https://alice.muon.net/v1-2/",
    "https://alice.muon.net/v1-3/",
  ];
  let tryed = 0;
  let res;
  var flag = false;

  while (tryed < 4 && !flag) {
    console.log(listOfNodes[tryed % 4]);
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
