<template>
    <div id="app">
    <div id="begin" @click="move">
      开始游戏
    </div>
    <div id="map">
      <div class="blocks" v-for="(index,i) in 15*15" v-bind:id="coord(index)"></div>
    </div>
  </div>
  <div id="win">
    恭喜过关！<br> 
  </div>
</template>

<script>
import useGesStore from '../../../store';
import { gameMeaning } from '../../../contents/gestureMeaning';
import $ from 'jquery'

var levels = [
  {
    level: 1,
    map: {
      walls: [
        [4,4,4,5,5,6,6,6,6,6,7,7,7,7,8,8,8,8,9,9,9,9,9,10,10,11,11,11],
        [7,8,9,7,9,4,5,6,7,9,4,9,10,11,4,5,6,11,6,8,9,10,11,6,8,6,7,8]
      ],
      boxes: [
        [7,7,8,9],
        [6,8,8,7]
      ],
      finish: [
        [7,5,10,8],
        [5,8,7,10]
      ],
      man: [8,7]
    }
  }
]

var level = 0;
export default {
    data:()=> {
    return {
        level: levels[level],
        manPosition: levels[level].map.man.concat(),
        isWin: 0,
        win: false,
        wall: `<img src="https://gcore.jsdelivr.net/gh/engravesunny/CDN/image/wall.png" class="pics">`,
        floor: `<img src="https://gcore.jsdelivr.net/gh/engravesunny/CDN/image/floor.png" class="pics">`,
        box: `<img src="https://gcore.jsdelivr.net/gh/engravesunny/CDN/image/box.png" class="pics">`,
        man: `<img src="https://gcore.jsdelivr.net/gh/engravesunny/CDN/image/man.png" class="pics">`,
        finish: `<img src="https://gcore.jsdelivr.net/gh/engravesunny/CDN/image/finish.png" class="pics">`,
    }
  },
  methods: {
    coord: function (index) {
      var x = Math.floor((index-1)/15);
      var y = index-15*x-1;
      return x+'-'+y;
    },
    move: function () {
      $('#begin').css('display','none');
      var self = this;
      $('body').keyup(function (eve) {
        if (self.win) {
          return;
        }
        const now = new Date()
        const hours = ('0' + now.getHours()).slice(-2);
        const minutes = ('0' + now.getMinutes()).slice(-2);
        const seconds = ('0' + now.getSeconds()).slice(-2);
        const time = `${hours}:${minutes}:${seconds}`
        var key = eve.which;
        switch (key) {
          case 37:
            console.log('left');
            self.go('left');
            useGesStore().addGesName(gameMeaning.ArrowLeft,time)
            break;
          case 38:
            console.log('up');
            self.go('up');
            useGesStore().addGesName(gameMeaning.ArrowUp,time)
            break;
          case 39:
            console.log('right');
            self.go('right');
            useGesStore().addGesName(gameMeaning.ArrowRight,time)
            break;
          case 40:
          console.log('down');
            self.go('down');
            useGesStore().addGesName(gameMeaning.ArrowDown,time)
            break;
          default:
            break;
        }
      })
    },
    addFloor: function (self) {
      for (var i = 0; i < 15; i++) {
        for (var j = 0; j < 15; j++) {
          var ele = $('#'+i+'-'+j);
          if ($('#'+i+'-'+j+'>img').length==0) {
            $(ele).html(self.floor);
          } else {
            continue;
          }
        }
      }
    },
    go: function (direction) {
      var self = this;
      var thisP = '#'+(self.manPosition[0])+'-'+self.manPosition[1];
      var src1,src2;
      switch (direction) {
        case 'up':
          src1 = $('#'+(self.manPosition[0]-1)+'-'+self.manPosition[1]+'>img').attr('src');
          src2 = $('#'+(self.manPosition[0]-2)+'-'+self.manPosition[1]+'>img').attr('src');
          break;
        case 'left':
          src1 = $('#'+(self.manPosition[0])+'-'+(self.manPosition[1]-1)+'>img').attr('src');
          src2 = $('#'+(self.manPosition[0])+'-'+(self.manPosition[1]-2)+'>img').attr('src');
          break;
        case 'right':
          src1 = $('#'+(self.manPosition[0])+'-'+(self.manPosition[1]+1)+'>img').attr('src');
          src2 = $('#'+(self.manPosition[0])+'-'+(self.manPosition[1]+2)+'>img').attr('src');
          break;
        case 'down':
          src1 = $('#'+(self.manPosition[0]+1)+'-'+(self.manPosition[1])+'>img').attr('src');
          src2 = $('#'+(self.manPosition[0]+2)+'-'+(self.manPosition[1])+'>img').attr('src');
          break;
        default:
          break;
      }
      console.log(src1);
      if (src1 == 'https://gcore.jsdelivr.net/gh/engravesunny/CDN/image/wall.png') {
        return;
      } else if (src1 =='https://gcore.jsdelivr.net/gh/engravesunny/CDN/image/floor.png'||src1 == 'https://gcore.jsdelivr.net/gh/engravesunny/CDN/image/finish.png') {
        if (self.finishP(thisP)) {
          $('#'+(self.manPosition[0])+'-'+self.manPosition[1]+'>img').attr('src','https://gcore.jsdelivr.net/gh/engravesunny/CDN/image/finish.png');
        } else {
          $('#'+(self.manPosition[0])+'-'+self.manPosition[1]+'>img').attr('src','https://gcore.jsdelivr.net/gh/engravesunny/CDN/image/floor.png');
        }
        switch (direction) {
          case 'up':
            self.manPosition[0]--;
            break;
          case 'left':
            self.manPosition[1]--;
            break;
          case 'right':
            self.manPosition[1]++;
            break;
          case 'down':
            self.manPosition[0]++;
            break;
          default:
            break;
        }
        $('#'+(self.manPosition[0])+'-'+self.manPosition[1]+'>img').attr('src','https://gcore.jsdelivr.net/gh/engravesunny/CDN/image/man.png');
      } else if (src1 == 'https://gcore.jsdelivr.net/gh/engravesunny/CDN/image/box.png') {
        if (src2 == 'https://gcore.jsdelivr.net/gh/engravesunny/CDN/image/wall.png'||src2 == 'https://gcore.jsdelivr.net/gh/engravesunny/CDN/image/box.png') {
          return;
        } else {
          if (self.finishP(thisP)) {
            $('#'+(self.manPosition[0])+'-'+self.manPosition[1]+'>img').attr('src','https://gcore.jsdelivr.net/gh/engravesunny/CDN/image/finish.png');
          } else {
            $('#'+(self.manPosition[0])+'-'+self.manPosition[1]+'>img').attr('src','https://gcore.jsdelivr.net/gh/engravesunny/CDN/image/floor.png');
          }
          switch (direction) {
            case 'up':
              self.manPosition[0]--;
              $('#'+(self.manPosition[0]-1)+'-'+self.manPosition[1]+'>img').attr('src','https://gcore.jsdelivr.net/gh/engravesunny/CDN/image/box.png');
              break;
            case 'left':
              self.manPosition[1]--;
              $('#'+(self.manPosition[0])+'-'+(self.manPosition[1]-1)+'>img').attr('src','https://gcore.jsdelivr.net/gh/engravesunny/CDN/image/box.png');
              break;
            case 'right':
              self.manPosition[1]++;
              $('#'+(self.manPosition[0])+'-'+(self.manPosition[1]+1)+'>img').attr('src','https://gcore.jsdelivr.net/gh/engravesunny/CDN/image/box.png');
              break;
            case 'down':
              self.manPosition[0]++;
              $('#'+(self.manPosition[0]+1)+'-'+self.manPosition[1]+'>img').attr('src','https://gcore.jsdelivr.net/gh/engravesunny/CDN/image/box.png');
              break;
            default:
              break;
          }
          $('#'+(self.manPosition[0])+'-'+self.manPosition[1]+'>img').attr('src','https://gcore.jsdelivr.net/gh/engravesunny/CDN/image/man.png');
        }
      }
      self.win = self.judgeWin();
      if (self.win) {
        $('#win').css('display','block');
        $('#win').click(function () {
          window.opener=null;window.open('','_self');window.close();
        })
        return;
      }
    },
    finishP: function (id) {
      var self = this;
      var flag = false;
      self.level.map.finish[0].forEach(function (e,i) {
        if (id == '#'+e+'-'+self.level.map.finish[1][i]) {
          flag == true;
        }
      })
      return flag;
    },
    judgeWin: function () {
      var self = this;
      self.level.map.finish[0].forEach(function (e,i) {
        if ($('#'+e+'-'+self.level.map.finish[1][i]+'>img').attr('src') == 'https://gcore.jsdelivr.net/gh/engravesunny/CDN/image/box.png') {
          self.isWin++;
        }
      })
      if (self.isWin == self.level.map.finish[0].length) {
        return true;
      } else {
        self.isWin = 0;
        return false;
      }
    },
  },
  mounted: function () {
    $('#win').css('display','none');
    var self = this;
    self.level.map.walls[0].forEach(function(e,i) {
      var currentID = e+'-'+self.level.map.walls[1][i];
      $('#'+currentID).html(self.wall);
    });
    self.level.map.finish[0].forEach(function(e,i) {
      var currentID = e+'-'+self.level.map.finish[1][i];
      $('#'+currentID).html(self.finish);
    });
    self.level.map.boxes[0].forEach(function (e,i) {
      var currentID = e+'-'+self.level.map.boxes[1][i];
      $('#'+currentID).html(self.box);
    })
    $('#'+self.level.map.man[0]+'-'+self.level.map.man[1]).html(self.man);
    self.addFloor(self);
  }
}

</script>

<style lang="less" scoped>
    #map {
  z-index: 1000;
  width: 600px;
  height: 600px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  border: 1px solid black;
  display: flex;
  flex-wrap: wrap;
}
.blocks {
  display: inline-block;
  width: 40px;
  height: 40px;
  /* border: 1px solid gray; */
  img{
    width: 40px;
    height: 40px;
  }
}
h4 {
  text-align: center;
}

#win {
  z-index: 1001;
  background: rgba(100, 100, 100, 0.3);
  width: 600px;
  height: 600px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  text-align: center;
  line-height: 600px;
  font-size: 30px;
  color: white;
}
input {
  margin: 0 auto;
}
#begin {
  cursor: pointer;
  z-index: 1002;
  width: 100px;
  background-color: burlywood;
  height: 30px;
  font-size: 20px;
  text-align: center;
  line-height: 30px;
  margin: auto;
  border-radius: 10px;
}
#buttons {
  display: flex;
}
button {
  border: none;
  width: 80px;
  height: 30px;
}
</style>