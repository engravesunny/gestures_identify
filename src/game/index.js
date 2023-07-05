import { GameControl } from './GameControl';
import { initMap } from './map';
let gameControl;

import useSnakeGame from '../store/snakeGame';
let gameInfo = useSnakeGame()

// 开始游戏
export function startGame() {
  gameControl.start();
}


// 重新开始游戏
export function replayGame() {
  gameControl.replay();
}

// 移动端修改移动方向
export function changeMoveDirection(x, y) {
  gameControl.snake.changeMoveDirection(x, y);
}

// 移动端修改移动方向
export function changeDirection(direction) {
  gameControl.snake.changeDirection(direction);
}
// 初始化游戏
export function initGame(map, width, height, isLive) {
  gameInfo.gameRow = Math.floor(height / 54)
  gameInfo.gameCol = Math.floor(width / 54)
  console.log(gameInfo);
  gameControl = new GameControl(initMap(map, width, height), isLive);
}

PubSub.subscribe('snakeMove', (a, x) => {
  const event = { key: x }
  gameControl.keydownHandler(event)
})

// 在相应vue文件中获取dom，然后将map初始化也在响应vue文件中进行