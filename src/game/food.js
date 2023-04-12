import { randomIntegerInRange } from '../utils/readomNum.js'
import useSnakeGame from "../store/snakeGame"
import { storeToRefs } from 'pinia'
const gameInfo = storeToRefs(useSnakeGame())
console.log(11111,gameInfo.gameCol.value);

export class Food {
    x
    y
    status
    constructor(){
        this.x = randomIntegerInRange(0, gameInfo.gameCol.value - 1);
        this.y = randomIntegerInRange(0, gameInfo.gameRow.value - 1);
    }
    change(snake){
        // 生成一个随机的位置
        const newX = randomIntegerInRange(0, gameInfo.gameCol.value - 1);
        const newY = randomIntegerInRange(0, gameInfo.gameRow.value - 1);
        // 1.获取蛇头的坐标
        const x = snake.head.x;
        const y = snake.head.y;
        // 2.获取身体
        const bodies = snake.bodies;
        // 3.食物不可以和头部以及身体重合
        const isRepeatBody = bodies.some((body) => {
            return body.x === newX && body.y === newY;
        });
        const isRepeatHead = newX === x && newY === y;
        // 不满足条件重新随机
        if (isRepeatBody || isRepeatHead) {
            this.change(snake);
        } else {
            this.x = newX;
            this.y = newY;
            console.log('新坐标',this.x,this.y);
        }
    }
}