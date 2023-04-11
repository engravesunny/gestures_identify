<template>
    <div>
        <div class="threeBody">
            <div class="button">上传文件<input class="file" multiple type="file" @change="($event)=>readIt($event)"></div>
            <div class="btn" @click="goBack">返回</div>
        </div>
    </div>
</template>

<script setup type="module">
import * as THREE from 'three'
import * as TWEEN from 'tween.js'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import readCsv from '../../../../utils/readCsv';
import useGesStore from '../../../../store';
import { storeToRefs } from 'pinia';
const { show3D } = storeToRefs(useGesStore())

let goBack = () => {
    show3D.value = false
}



const scene = new THREE.Scene();
const loader = new FontLoader();
let font;


// 创建第一象限的三个面的网格
const createGrid = () =>{
    const gridXY = new THREE.GridHelper(100, 5);
    const gridSegmentsXY = new THREE.LineSegments(gridXY.geometry, new THREE.LineBasicMaterial({ color: 0xaaaaaa, linewidth: 4 }));
    gridSegmentsXY.rotation.x = Math.PI / 2;
    gridSegmentsXY.position.set(0, 0, -50);
    scene.add(gridSegmentsXY);

    const gridYZ = new THREE.GridHelper(100, 5);
    const gridSegmentsYZ = new THREE.LineSegments(gridYZ.geometry, new THREE.LineBasicMaterial({ color: 0xaaaaaa, linewidth: 4 }));
    gridSegmentsYZ.rotation.z = Math.PI / 2;
    gridSegmentsYZ.position.set(-50, 0, 0);
    scene.add(gridSegmentsYZ);

    const gridXZ = new THREE.GridHelper(100, 5);
    const gridSegmentsXZ = new THREE.LineSegments(gridXZ.geometry, new THREE.LineBasicMaterial({ color: 0xaaaaaa, linewidth: 4 }));
    gridSegmentsXZ.position.set(0, -50, 0);
    scene.add(gridSegmentsXZ);
    scene.background = new THREE.Color(0xffffff)
}
createGrid()

// 创建坐标
loader.load('../../../../../node_modules/three/examples/fonts/helvetiker_regular.typeface.json',(f)=>{
    font = f
    const axisHelper = new THREE.Group();
    const size = 100;
    const divisions = 5;
    // 在 x 轴上添加坐标数字
    for (let i = 0; i <= divisions; i++) {
        const color = 0x00000;
        const shapes = font.generateShapes( (i * (size / divisions)-50).toString(), 3 )
        const geometry = new THREE.ShapeGeometry( shapes );
        const matLite = new THREE.MeshPhongMaterial( {
            color: color
        } );
        const label = new THREE.Mesh(geometry,matLite);
        label.position.x = (i / divisions) * size - size / 2;
        label.position.y = -50;
        label.position.z = -50;
        axisHelper.add(label);
    }

    // 在 y 轴上添加坐标数字
    for (let i = 0; i <= divisions; i++) {
        const color = 0x00000;
        const shapes = font.generateShapes( (i * (size / divisions)-50).toString(), 3 )
        const geometry = new THREE.ShapeGeometry( shapes );
        const matLite = new THREE.MeshPhongMaterial( {
            color: color
        } );
        const label = new THREE.Mesh(geometry,matLite);
        label.position.x = -50;
        label.position.y = (i / divisions) * size - size / 2;
        label.position.z = -50;
        axisHelper.add(label);
    }

    // 在 z 轴上添加坐标数字
    for (let i = 0; i <= divisions; i++) {
        const color = 0x00000;
        const shapes = font.generateShapes( (i * (size / divisions)-50).toString(), 3 )
        const geometry = new THREE.ShapeGeometry( shapes );
        const matLite = new THREE.MeshPhongMaterial( {
            color: color
        } );
        const label = new THREE.Mesh(geometry,matLite);
        label.position.z = (i / divisions) * size - size / 2;
        label.position.y = -50;
        label.position.x = -50
        label.rotation.y = Math.PI / 2;
        axisHelper.add(label);
    }
    console.log(axisHelper);
    scene.add(axisHelper)
})

// 创建坐标轴

let createXYZ = () => {
    // x轴
    const pointX = [];
    pointX.push( new THREE.Vector3( -50, -50, -50 ) );
    pointX.push( new THREE.Vector3( 50, -50, -50 ) );
    const lineX = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints( pointX ),
        new THREE.LineBasicMaterial({ color:0X333333,linewidth:3 })
    )
    scene.add( lineX );
    // y轴
    const pointY = [];
    pointY.push( new THREE.Vector3( -50, -50, -50 ) );
    pointY.push( new THREE.Vector3( -50, 50, -50 ) );
    const lineY = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints( pointY ),
        new THREE.LineBasicMaterial({ color:0X333333,linewidth:3 })
    )
    scene.add( lineY );
    // z轴
    const pointZ = [];
    pointZ.push( new THREE.Vector3( - 50, -50, -50 ) );
    pointZ.push( new THREE.Vector3( -50, -50, 50 ) );
    const lineZ = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints( pointZ ),
        new THREE.LineBasicMaterial({ color:0X333333,linewidth:3 })
    )
    scene.add( lineZ );
}

createXYZ()


// 分析文件创建点线

const colors = [
    0x000000,
    0x0532ff,
    0xff2700,
    0xff9300,
    0xfffb0d,
    0x494824
]

// 球状图
const sprite = new THREE.TextureLoader().load( 'https://gcore.jsdelivr.net/gh/engravesunny/CDN/image/disc.png' );
console.log(sprite);
const readIt = (e) => {
    const files = e.target.files
    // const points = readCsv(files)
    const points = []
    for(let i=0;i<files.length;i++){
        points.push(readCsv(files[i]))
    }
    setTimeout(() => {
        console.log(points);
        points.map(item=>{
            const geometry = new THREE.BufferGeometry(); 
            const position = new Float32Array([item[1][1]*50, item[1][2]*50, item[1][3]*50]); 
            geometry.setAttribute('position', new THREE.BufferAttribute(position, 3)); 
            const material = new THREE.PointsMaterial({ color: colors[Math.floor(Math.random()*6)],size:3,map:sprite, alphaTest: 0.5, transparent: true }); 
            const point = new THREE.Points(geometry, material);
            material.needsUpdate = true
            // 创建动画
            let index = 1
            let frame = 0
            let maxFrame = +(item[item.length-2][0]+1)
            const timer = setInterval(() => {

                if(item[index][0]==frame){
                    const x = item[index][1]*50; // 当前帧的 x 坐标
                    const y = item[index][2]*50; // 当前帧的 y 坐标
                    const z = item[index][3]*50; // 当前帧的 z 坐标

                    index++
                    geometry.attributes.position.setXYZ(0, x, y, z);
                    geometry.attributes.position.needsUpdate = true;
                    scene.add(point);
                } else {
                    scene.remove(point)
                }

                
                if(index >= item.length-1){
                    clearInterval(timer)
                    scene.remove(point)
                }
                frame++
            }, 100);
            console.log(point);
            scene.add(point);
        }) 
    }, 200);
}


// 将相机设置到坐标轴的正方向，以便只显示第一象限
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(65,30, 80);
camera.lookAt(0,0,0);

const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

const controls = new OrbitControls( camera, renderer.domElement );
function animate() {
    requestAnimationFrame(animate)
    TWEEN.update();
    controls.update();
    renderer.render(scene,camera)
}

onMounted(() => {
    const threeBody = document.querySelector('.threeBody')
    threeBody.appendChild(renderer.domElement) 
    animate();
})

</script>

<style lang="less" scoped>
    .button{
        position: fixed;
        top: 50px;
        left: 50px;
        z-index: 99;
        width: 100px;
        text-align: center;
        line-height: 40px;
        height: 40px;
        background-color: #333;
        color: #fff;
        border-radius: 10px;
        cursor: pointer;
        .file{
            position: fixed;
            top: 50px;
            left: 50px;
            opacity: 0;
            z-index: 100;
            width: 100px;
            height: 40px;
            cursor: pointer;
            button{
                cursor: pointer;
            }
        }
    }
    .button:hover,.btn:hover{
        background-color: #fff;
        color: #333;
        border: 1px solid #333;
    }
    .btn{
        position: fixed;
        top: 100px;
        left: 50px;
        z-index: 99;
        width: 100px;
        text-align: center;
        line-height: 40px;
        height: 40px;
        background-color: #333;
        color: #fff;
        border-radius: 10px;
        cursor: pointer;
    }
</style>



// const lineX = []
// lineX.push(new THREE.Vector3(-1.5,-1.5,0))
// lineX.push(new THREE.Vector3(1.5,-1.5,0))

// const lineY = []

// lineY.push(new THREE.Vector3(-1.5,-1.5,0))
// lineY.push(new THREE.Vector3(-1.5,1.5,0))

// const lineZ = []

// lineZ.push(new THREE.Vector3(-1.5,-1.5,0))
// lineZ.push(new THREE.Vector3(-1.5,-1.5,3.0))

// const geometryX = new THREE.BufferGeometry().setFromPoints(lineX)
// const geometryY = new THREE.BufferGeometry().setFromPoints(lineY)
// const geometryZ = new THREE.BufferGeometry().setFromPoints(lineZ)

// const material = new THREE.LineBasicMaterial({color:0xffffff})

// const linex = new THREE.Line(geometryX,material)
// const liney = new THREE.Line(geometryY,material)
// const linez = new THREE.Line(geometryZ,material)

// const geometry = new THREE.BoxGeometry(1,1,1)
// const material = new THREE.MeshBasicMaterial({color: 0x00ff00})

// const points = []




// const cube = new THREE.Mesh(geometry,material)
// cube.rotation.x += 1
// cube.rotation.y += 2
// scene.add(cube)

// scene.add(linex)
// scene.add(liney)
// scene.add(linez)


// camera.position.z = 5