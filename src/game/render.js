
export function render(map, snake, food) {
    // 重置map
    reset(map);
    // 渲染蛇头
    _renderSnakeHead(map, snake.head);
    // 渲染蛇身
    _renderSnakeBody(map, snake.bodies);
    // 渲染食物
    _renderFood(map, food);
  }
  
  // 重置map 将二维数组所有元素重置为0
  export function reset(map) {
    for (let i = 0; i < map.length; i++) {
      for (let j = 0; j < map[0].length; j++) {
        if (map[i][j] !== 0) {
          map[i][j] = 0;
        }
      }
    }
  }
  
  // 渲染蛇身 -1 食物 1 蛇身体 2 蛇头
  function _renderSnakeBody(map, bodiesBodies) {
    for (let i = 0; i < bodiesBodies.length; i++) {
      const row = bodiesBodies[i].y;
      const col = bodiesBodies[i].x;
      map[row][col] = 1;
    }
  }
  
  // 渲染蛇头 -1 食物 1 蛇身体 2 蛇头
  function _renderSnakeHead(map, headHead) {
    const row = headHead.y;
    const col = headHead.x;
    map[row][col] = 2;
  }
  
  // 渲染食物 -1 食物 1 蛇身体 2 蛇头
  function _renderFood(map, food) {
    const row = food.y;
    const col = food.x;
    map[row][col] = -1;
  }
