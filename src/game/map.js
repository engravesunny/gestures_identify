// 初始化地图  现在所有的位置type都是0
export function initMap(map,width,height) {
  const clientWidth = width - 20;
  const clientHeight = height - 40;
  // 行数
  const gameRow = Math.floor(clientHeight / 54);

  // 列数
  const gameCol = Math.floor(clientWidth / 54);
  for (let i = 0; i < gameRow; i++) {
    const arr= [];
    for (let j = 0; j < gameCol; j++) {
      arr.push(0);
    }
    map.push(arr);
  }
  return map;
}