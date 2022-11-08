import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "lil-gui";
import { MeshStandardMaterial } from "three";
import {FontLoader} from 'three/examples/jsm/loaders/FontLoader';
import {TextGeometry} from "three/examples/jsm/geometries/TextGeometry"
import gsap from 'gsap'

console.log(gsap.timeline())
/**
 * Base
 */
// Debug
// const gui = new dat.GUI();


// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();
const fog = new THREE.Fog("#262837", 1, 15);
scene.fog = fog;
/**
 * Textures
 */

 const fontLoader = new FontLoader()
const textureLoader = new THREE.TextureLoader();


const doorColorTexture = textureLoader.load("/textures/door/color.jpg");
const doorAlphaTexture = textureLoader.load("/textures/door/alpha.jpg");
const doorAmbientOcclusionTexture = textureLoader.load(
  "/textures/door/ambientOcclusion.jpg"
);
const doorHeighTexture = textureLoader.load("/textures/door/height.jpg");
const doorNormalTexture = textureLoader.load("/textures/door/normal.jpg");
const doorMetalnessTexture = textureLoader.load("/textures/door/metalness.jpg");
const doorRoughnessTexture = textureLoader.load("/textures/door/roughness.jpg");

const brickColorTexture = textureLoader.load("/textures/bricks/color.jpg");
const brickAmientOcculusionTexture = textureLoader.load(
  "/textures/bricks/ambientOcclusion.jpg"
);
const brickNormalTexture = textureLoader.load("/textures/bricks/normal.jpg");
const brickRoughnessTexture = textureLoader.load(
  "/textures/bricks/roughness.jpg"
);

const grassColorTexture = textureLoader.load("/textures/grass/color.jpg");
const grassAmientOcculusionTexture = textureLoader.load(
  "/textures/grass/ambientOcclusion.jpg"
);
const grassNormalTexture = textureLoader.load("/textures/grass/normal.jpg");
const grassRoughnessTexture = textureLoader.load(
  "/textures/grass/roughness.jpg"
);

grassColorTexture.repeat.set(8, 8);
grassAmientOcculusionTexture.repeat.set(8, 8);
grassNormalTexture.repeat.set(8, 8);
grassRoughnessTexture.repeat.set(8, 8);

grassColorTexture.wrapS = THREE.RepeatWrapping;
grassAmientOcculusionTexture.wrapS = THREE.RepeatWrapping;
grassNormalTexture.wrapS = THREE.RepeatWrapping;
grassRoughnessTexture.wrapS = THREE.RepeatWrapping;

grassColorTexture.wrapT = THREE.RepeatWrapping;
grassAmientOcculusionTexture.wrapT = THREE.RepeatWrapping;
grassNormalTexture.wrapT = THREE.RepeatWrapping;
grassRoughnessTexture.wrapT = THREE.RepeatWrapping;

/**
 * House
 */
// Temporary sphere
//walls

const house = new THREE.Group();

const walls = new THREE.Mesh(
  new THREE.BoxGeometry(4, 2.5, 4),
  new MeshStandardMaterial({
    map: brickColorTexture,
    aoMap: brickAmientOcculusionTexture,
    normalMap: brickNormalTexture,
    roughnessMap: brickRoughnessTexture,
  })
);
walls.geometry.setAttribute(
  "uv2",
  new THREE.Float32BufferAttribute(walls.geometry.attributes.uv.array, 2)
);

walls.position.y = 1.25;

const roof = new THREE.Mesh(
  new THREE.ConeGeometry(3.5, 1, 4),
  new THREE.MeshStandardMaterial({ color: "#b35f45" })
);

roof.rotation.y = Math.PI * 0.25;
roof.position.y = 2.5 + 0.5;

const door = new THREE.Mesh(
  new THREE.PlaneGeometry(2.2, 2.2, 100, 100),
  new THREE.MeshStandardMaterial({
    map: doorColorTexture,
    transparent: true,
    alphaMap: doorAlphaTexture,
    aoMap: doorAmbientOcclusionTexture,

    displacementMap: doorHeighTexture,
    displacementScale: 0.1,
    normalMap: doorNormalTexture,
    metalnessMap: doorMetalnessTexture,
    roughnessMap: doorRoughnessTexture,
  })
);

door.geometry.setAttribute(
  "uv2",
  new THREE.Float32BufferAttribute(door.geometry.attributes.uv.array, 2)
);

const windows = new THREE.Mesh(
  new THREE.PlaneGeometry(2, 1),
  new THREE.MeshStandardMaterial()
);

// Bushes

const bushGeometry = new THREE.SphereGeometry(1, 16, 16);
const bushMaterial = new THREE.MeshStandardMaterial({ color: "#89c854" });
const bush1 = new THREE.Mesh(bushGeometry, bushMaterial);

bush1.scale.set(0.5, 0.5, 0.5);
bush1.position.set(1.2, 0.2, 2.5);

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial);

bush2.scale.set(0.25, 0.25, 0.25);
bush2.position.set(1.9, 0.2, 2.5);

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial);

bush3.scale.set(0.4, 0.4, 0.4);
bush3.position.set(-1.9, 0.2, 2.5);

const bush4 = new THREE.Mesh(bushGeometry, bushMaterial);

bush4.scale.set(0.15, 0.15, 0.15);
bush4.position.set(-1.4, 0.2, 2.5);

door.position.z = 2 + 0.01;
door.position.y = 1.1;

windows.position.x = 2.02;
windows.position.y = 1.6;
windows.rotation.y = Math.PI * 0.5;
house.add(walls, roof, door, windows, bush1, bush2, bush3, bush4);

//gave

const graves = new THREE.Group();

const graveGeomerty = new THREE.BoxGeometry(0.6, 0.8, 0.2);
const graveMaterial = new THREE.MeshStandardMaterial({ color: "#b2b6b1" });

for (let index = 0; index < 50; index++) {
  const angle = Math.random() * Math.PI * 2;
  const raduis = 3 + Math.random() * 6;
  const x = Math.sin(angle) * raduis;
  const z = Math.cos(angle) * raduis;
  const grave = new THREE.Mesh(graveGeomerty, graveMaterial);
  grave.position.set(x, 0.3, z);

  grave.rotation.z = (Math.random() - 0.5) * 0.4;
  grave.rotation.y = (Math.random() - 0.5) * 0.4;
  grave.castShadow = true;
  graves.add(grave);
}
scene.add(graves);

scene.add(house);

// Floor
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(20, 20),
  new THREE.MeshStandardMaterial({
    map: grassColorTexture,
    aoMap: grassAmientOcculusionTexture,
    normalMap: grassNormalTexture,
    roughnessMap: grassRoughnessTexture,
  })
);

floor.geometry.setAttribute(
  "uv2",
  new THREE.Float32BufferAttribute(floor.geometry.attributes.uv.array, 2)
);

floor.rotation.x = -Math.PI * 0.5;
floor.position.y = 0;
scene.add(floor);

/**
 * Lights
 * 
 c
 */

const doorLight = new THREE.PointLight("#ff7d46", 1, 7);
doorLight.position.set(0, 2.2, 2.7);
house.add(doorLight);

//Ghost

const ghost1 = new THREE.PointLight("#ff00ff", 2, 3);
scene.add(ghost1);
const ghost2 = new THREE.PointLight("#00ffff", 2, 3);
scene.add(ghost2);
const ghost3 = new THREE.PointLight("#ffff00", 2, 3);
scene.add(ghost3);

// Ambient light
const ambientLight = new THREE.AmbientLight("#b9d5ff", 0.12);
// gui.add(ambientLight, "intensity").min(0).max(1).step(0.001);
scene.add(ambientLight);

// Directional light
const moonLight = new THREE.DirectionalLight("#b9d5ff", 0.12);
// moonLight.position.set(4, 5, -2);
// gui.add(moonLight, "intensity").min(0).max(1).step(0.001);

scene.add(moonLight);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
//camera.position.x = 4;
camera.position.y = 18;
//camera.position.z = 9;
fontLoader.load(
    '/fonts/helvetiker_bold.typeface.json',
    (font)=>{
      const textGeomerty = new TextGeometry(
          'Made by OLA',
          {
              font:font,
              size:0.3,
              height:0.3,
              curveSegments:5,
              bevelEnabled:true,
              bevelThickness:0.03,
              bevelSize:0.02,
              bevelOffset:0,
              bevelSegments:5,
            
          }
      )
      textGeomerty.center();

      const textMaterial = new THREE.MeshStandardMaterial();
      const text= new THREE.Mesh(textGeomerty,textMaterial);
     text.position.y= -1;
    text.position.z= 3.5 + 0.5;
    

    gsap.timeline()
//.from(camera.position, {y:19 *0.5,duration:2})
.to(camera.position, {y:8,duration:5})
.to(camera.position, { x: 0, z:10,duration:2 })
.to(camera.position, { y: 5, x:3,duration:2 })
.to(camera.position, { y: 2, duration:2 })
.to(text.position,{y:3.5 + 0.5,duration:1})
.to(text.position,{x:0,z:0,y:3.8,duration:1})
      scene.add(text);
        });

// gui.add(camera.position, "x").min(0).max(45).step(1).name('x');
// gui.add(camera.position, "y").min(0).max(45).step(1).name('y');
// gui.add(camera.position, "z").min(0).max(45).step(1).name('z');
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor("#262837");

moonLight.castShadow = true;
doorLight.castShadow = true;
ghost1.castShadow = true;
ghost2.castShadow = true;
ghost3.castShadow = true;
walls.castShadow = true;
bush1.castShadow = true;
bush2.castShadow = true;
bush3.castShadow = true;
bush4.castShadow = true;
floor.receiveShadow = true;

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;

doorLight.shadow.mapSize.width = 256;
doorLight.shadow.mapSize.height = 256;
doorLight.shadow.camera.far = 7;

ghost1.shadow.mapSize.width = 256;
ghost1.shadow.mapSize.height = 256;
ghost1.shadow.camera.far = 7;

ghost2.shadow.mapSize.width = 256;
ghost2.shadow.mapSize.height = 256;
ghost2.shadow.camera.far = 7;

ghost3.shadow.mapSize.width = 256;
ghost3.shadow.mapSize.height = 256;
ghost3.shadow.camera.far = 7;


// gui.add(camera.position, "x").min(0).max(100).step(2);
// gui.add(camera.position, "y").min(1).max(100).step(2);
// gui.add(camera.position, "z").min(1).max(100).step(2);

/**
 * Animate
 */

 //.to(camera.position, { x: 5, y: 5,delay:3 });
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  const ghostAngle = elapsedTime * 0.5;
  ghost1.position.x = Math.cos(ghostAngle) * 4;
  ghost1.position.z = Math.sin(ghostAngle) * 4;
  ghost1.position.y = Math.sin(elapsedTime * 3);

  const ghostAngle2 = -elapsedTime * 0.32;
  ghost2.position.x = Math.cos(ghostAngle2) * 5;
  ghost2.position.z = Math.sin(ghostAngle2) * 5;
  ghost2.position.y = Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5);

  const ghostAngle3 = -elapsedTime * 0.18;
  ghost3.position.x =
    Math.cos(ghostAngle3) * (7 + Math.sin(ghostAngle3 * 0.32));
  ghost3.position.z = Math.sin(ghostAngle3) * Math.sin(ghostAngle3 * 0.6);
  ghost3.position.y = Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5);
  // Update controls



  // floor.rotation.x=elapsedTime * 0.15;
  //camera.position.x+=Math.sin(camera.rotationy)*3;
  //     camera.position.z=Math.cos(ghostAngle3)* 20;
  //  camera.position.y= - Math.sin(ghostAngle3) * 4;
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
function setCookie(c_name,value,exdays)
{
    var exdate=new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
    document.cookie=c_name + "=" + c_value;
}

function getCookie(c_name)
{
    var i,x,y,ARRcookies=document.cookie.split(";");
    for (i=0;i<ARRcookies.length;i++)
    {
      x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
      y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
      x=x.replace(/^\s+|\s+$/g,"");
      if (x==c_name)
        {
        return unescape(y);
        }
      }
}

var song = document.getElementsByTagName('audio')[0];
var played = false;
var tillPlayed = getCookie('timePlayed');
function update()
{
    
    if(!played){
        if(tillPlayed){
        song.currentTime = tillPlayed;
        song.volume=0.1;
        song.play();
        played = true;
        }
        else {
                song.play();
                played = true;
        }
    }

    else {
    setCookie('timePlayed', song.currentTime);
    }
}
setInterval(update,1000);