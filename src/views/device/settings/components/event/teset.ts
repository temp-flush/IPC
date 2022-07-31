const getTreee = (params: any): {}[] => {
  const Tree: object[] = [];
  for (const key in params) {
    if (key == 'ownArea') {
      // 已经没有子节点
      if (params[key].length == 0) {
        params.children = [];
        getDevice(params);
        Tree.push(params);
      } else {
        // 还有子节点
        params[key].forEach((element) => {
          if (!params.children) {
            params.children = [];
            getDevice(params);
          }
          if (areaList[element].ownArea) {
            getTreee(areaList[element]);
          }
          areaList[element].parentId = params.id;
          params.children.push(areaList[element]);
        });
        Tree.push(params);
      }
    }
    if (key == 'ownDevice') {
      if (params[key].length == 0) {
        params.children = [];
        Tree.push(params);
      }
    }
  }
  return Tree;
};

const getDevice = (params) => {
  if (params['ownDevice'].length != 0) {
    params['ownDevice'].forEach((element) => {
      const cloneList = JSON.parse(JSON.stringify(deviceList));
      console.log(deviceList);
      cloneList[element].parentId = params.id;
      params.children.push(cloneList[element]);
    });
  }
};
const parentNode = {
  id: 1,
  areaId: 1,
  name: '小学部',
  ownArea: [2],
  ownDevice: [1, 2],
};
const areaList = {
  2: {
    id: 2,
    areaId: 2,
    name: '中学部',
    ownArea: [3],
    ownDevice: [1, 2],
  },
  3: { id: 3, areaId: 3, name: '大学部', ownArea: [], ownDevice: [1, 2] },
};
const deviceList = {
  1: {
    id: 2,
    areaId: 2,
    name: '设备1',
    ownArea: [3],
    ownDevice: [1, 2],
  },
  2: { id: 3, areaId: 3, name: '设备2', ownArea: [], ownDevice: [1, 2] },
};
console.log(getTreee(parentNode));
