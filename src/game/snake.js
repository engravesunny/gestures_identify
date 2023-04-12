import { hitFence,hitSelf } from "./hit"

export class Snake {
    bodies
    head
    direction
    constructor(){
        this.direction = 'Right';
        this.head = {
            x:1,
            y:0,
            status:2
        }
        this.bodies = [
            {
                x:0,
                y:0,
                status:1
            }
        ]
    }
    checkEat(food){
        if(this.head.x === food.x && this.head.y === food.y){
            food.change(this)
            this.bodies.unshift({
                x: food.x,
                y: food.y,
                status: 1,
            });
        }
        
    }
    move(food) {
        // 判断是否游戏结束
        if (hitFence(this.head, this.direction) || hitSelf(this.head, this.bodies)) {
          debugger
          throw new Error('游戏结束');
        }
        const headX = this.head.x;
        const headY = this.head.y;
        const bodyX = this.bodies[this.bodies.length - 1].x;
        const bodyY = this.bodies[this.bodies.length - 1].y;
        switch (this.direction) {
          case 'ArrowUp':
          case 'Up':
            // 向上移动 需要检测按键是否相反方向
            if (headY - 1 === bodyY && headX === bodyX) {
              moveDown(this.head, this.bodies);
              this.direction = 'Down';
              return;
            }
            moveUp(this.head, this.bodies);
            break;
          case 'ArrowDown':
          case 'Down':
            // 向下移动 需要检测按键是否相反方向
            if (headY + 1 === bodyY && headX === bodyX) {
              moveUp(this.head, this.bodies);
              this.direction = 'Up';
              return;
            }
            moveDown(this.head, this.bodies);
            break;
          case 'ArrowLeft':
          case 'Left':
            // 向左移动 需要检测按键是否相反方向
            if (headY === bodyY && headX - 1 === bodyX) {
              moveRight(this.head, this.bodies);
              this.direction = 'Right';
              return;
            }
            moveLeft(this.head, this.bodies);
            break;
          case 'ArrowRight':
          case 'Right':
            // 向右移动 需要检测按键是否相反方向
            if (headY === bodyY && headX + 1 === bodyX) {
              moveLeft(this.head, this.bodies);
              this.direction = 'Left';
              return;
            }
            moveRight(this.head, this.bodies);
            break;
          default:
            break;
        }
        // 检查蛇是否吃到食物
        this.checkEat(food);
      }
}


// 向上移动
function moveUp(head, bodies) {
    head.y--;
    bodies.push({
      x: head.x,
      y: head.y + 1,
      status: 1,
    });
    bodies.shift();
  }
  
  // 向下移动
  function moveDown(head, bodies) {
    head.y++;
    bodies.push({
      x: head.x,
      y: head.y - 1,
      status: 1,
    });
    bodies.shift();
  }
  
  // 向右移动
  function moveRight(head, bodies) {
    head.x++;
    bodies.push({
      x: head.x - 1,
      y: head.y,
      status: 1,
    });
    bodies.shift();
  }
  
  // 向左移动
  function moveLeft(head, bodies) {
    head.x--;
    bodies.push({
      x: head.x + 1,
      y: head.y,
      status: 1,
    });
    bodies.shift();
  }