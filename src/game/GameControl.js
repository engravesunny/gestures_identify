import { addTicker, intervalTimer, stopTicker } from '../utils/ticker.js'
import { Food } from './food.js'
import { Snake } from './snake.js'
import { render, reset } from './render';

import { useGesStore } from '../store/index.js';
import { gameMeaning } from '../contents/gestureMeaning.js';


export class GameControl {
    // 蛇
    snake;
    // 食物
    _food;
    // 地图
    _map;
    // 游戏状态
    _isLive;

    constructor(map, isLive) {
        this._map = map;
        this.snake = new Snake();
        this._food = new Food();
        this._isLive = isLive;
    }
    // 开始游戏
    start() {
        // 绑定键盘按键按下的事件
        document.addEventListener('keydown', this.keydownHandler.bind(this));
        // 添加到帧循环列表
        addTicker(this.handlerTicker.bind(this));
        // 标记游戏状态为开始
        this._isLive.value = 2;
    }
    // 创建一个键盘按下的响应函数
    keydownHandler(event) {
        console.log(event.key);
        // ArrowUp
        // ArrowRight
        // ArrowDown
        // ArrowLeft
        // Escape
        const now = new Date()
        const hours = ('0' + now.getHours()).slice(-2);
        const minutes = ('0' + now.getMinutes()).slice(-2);
        const seconds = ('0' + now.getSeconds()).slice(-2);
        const time = `${hours}:${minutes}:${seconds}`
        if (event.key === 'ArrowDown') {
            useGesStore().addGesName(gameMeaning.ArrowDown, time)
        } else if (event.key === 'ArrowRight') {
            useGesStore().addGesName(gameMeaning.ArrowRight, time)
        } else if (event.key === 'ArrowLeft') {
            useGesStore().addGesName(gameMeaning.ArrowLeft, time)
        } else if (event.key === 'ArrowUp') {
            useGesStore().addGesName(gameMeaning.ArrowUp, time)
        } else if (event.key === 'Escape') {
            useGesStore().addGesName(gameMeaning.Escape, time)
        }

        this.snake.direction = event.key;
    }
    // attract 上
    // circle 左
    // press 左
    // shrink 右
    // thumb 暂停
    // 渲染map
    _timeInterval = 600;
    // 是否移动蛇
    _isMove = intervalTimer(this._timeInterval);
    // 定义帧循环函数
    handlerTicker(n) {

        if (this._isMove(n)) {

            try {

                this.snake.move(this._food);

            } catch (error) {
                console.log(error);
                // 标记游戏状态为结束
                this._isLive.value = 3;
                // 停止循环
                stopTicker();
            }
        }
        render(this._map, this.snake, this._food);
    }
    // 重新开始游戏
    replay() {
        reset(this._map);
        this.snake.direction = 'Right';
        this.snake = new Snake();
        this._food = new Food();
        this._isLive.value = 2;
        stopTicker();
        addTicker(this.handlerTicker.bind(this));
    }
}