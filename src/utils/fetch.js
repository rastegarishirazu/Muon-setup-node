const getNodeInfo = (nodeId) => {
  return fetch(
    `http://alice.muon.net/v1/?app=explorer&method=node&params[id]=${nodeId}`
  );
};

export { getNodeInfo };
