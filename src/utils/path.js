const point = {
    x: 0,
    y: 0,
    z: 0,
    direction: { x: 1, y: 0, z: 0 },
    speed: 0.1,
    path: [{ x: 0, y: 0, z: 0 }, { x: 10, y: 0, z: 0 }, { x: 10, y: 10, z: 0 }, { x: 0, y: 10, z: 0 }, { x: 0, y: 0, z: 0 }]
  };
  
  let currentIndex = 0;
  
  function updatePointPosition() {
    const currentPos = point.path[currentIndex];
    const nextPos = point.path[currentIndex + 1];
  
    const distance = Math.sqrt(Math.pow(nextPos.x - currentPos.x, 2) + Math.pow(nextPos.y - currentPos.y, 2) + Math.pow(nextPos.z - currentPos.z, 2));
    const t = point.speed / distance;
  
    point.x = currentPos.x + t * (nextPos.x - currentPos.x);
    point.y = currentPos.y + t * (nextPos.y - currentPos.y);
    point.z = currentPos.z + t * (nextPos.z - currentPos.z);
  
    if (t >= 1) {
      currentIndex++;
      if (currentIndex >= point.path.length - 1) {
        currentIndex = 0;
      }
      point.direction = {
        x: point.path[currentIndex + 1].x - point.path[currentIndex].x,
        y: point.path[currentIndex + 1].y - point.path[currentIndex].y,
        z: point.path[currentIndex + 1].z - point.path[currentIndex].z
      };
    }
  }
  
  setInterval(() => {
    updatePointPosition();
    // 在这里更新点的位置
  }, 10);
  