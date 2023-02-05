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

  while (tryed < 8 && !flag) {
    res = await fetch(
      `${listOfNodes[tryed % 4]}?app=explorer&method=node&params[id]=${nodeId}`
      // "https://catfact.ninja/fact"
    )
      .then((response) => response.json())
      .then((data) => {
        if (data?.success && data?.result?.nodeInfo?.uptime.length > 1) {
          flag = true;
          return data;
        } else {
          return false;
        }
      })
      .catch((err) => {
        console.log(err);
      });
    tryed++;
  }
  return res;
};

export { getNodeInfo };
