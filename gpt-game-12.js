

const experimentNumber = Number(new URLSearchParams(window.location.search).get("experiment"));

console.log("experiment " + experimentNumber);


import { vertices as verticesDogsCats } from './embeddings-dogs-cats.js';
import { vertices as verticesMovies } from './embeddings-movies.js';
import { vertices as verticesSports } from './embeddings-sports.js';
import { vertices as verticesSenate } from './embeddings-senate.js';

let vertices;

switch (experimentNumber) {
    case 1:
        vertices = verticesDogsCats;
        break;
    case 2:
        vertices = verticesMovies;
        console.log("experiment 2");
        break;
    case 3:
        vertices = verticesSports;
        break;
        
    case 4:
        vertices = verticesSenate;
        console.log("experiment 4");
        break;


    default:
        console.log("Unknown experiment");
        break;
}


    

  //   import { vertices } from './embeddings-dogs-cats.js';
   console.log("version 1.0");


    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

     // Adding ambient light
     const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Adding directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(0, 1, 1);
    scene.add(directionalLight);

    var image = new Image();

   // Load sky texture
    const loader = new THREE.TextureLoader();
  

    const skyTexture = loader.load("img/sky.png");  
    const groundTexture = loader.load("img/ground.png");
    const stoneTexture = loader.load("img/stone.png"); 

    // Determine the dimensions to cover
    const WORLD_SIZE = 400;
    const w = WORLD_SIZE; //Math.max(...vertices.map(vertex => vertex[0]));  
    const h = WORLD_SIZE; //Math.max(...vertices.map(vertex => vertex[1]));

    var glideSpeed = 0; //glide speed
    var cycle = 0; //for cycling through verices
    const MAX_GLIDE_SPEED = 1; //max glide speed
    const MIN_GLIDE_SPEED = .01; //min glide speed
    var glideX = 0;
    var glideY = 0;
    var glideZ = 0;
    

    const BOUND_MAX = 95;
    const BOUND_MIN = 5;

    const START_X = 250;
    const START_Y = 250;
    const START_Z = 250;

    const BOX_SIZE = 6;
    

    // Create a plane to act as the background
    const planeGeometry = new THREE.PlaneGeometry(w, h);
    const planeMaterialsky = new THREE.MeshBasicMaterial({ map: skyTexture, side: THREE.DoubleSide });
    const planeMaterialground = new THREE.MeshBasicMaterial({ map: groundTexture, side: THREE.DoubleSide });    
    const planeMaterialstone = new THREE.MeshBasicMaterial({ map: stoneTexture, side: THREE.DoubleSide });
    
    const plane1 = new THREE.Mesh(planeGeometry, planeMaterialsky);
    const plane1b = new THREE.Mesh(planeGeometry, planeMaterialstone);

    const plane2 = new THREE.Mesh(planeGeometry, planeMaterialsky);
    plane2.rotation.y = Math.PI / 2;
    const plane2b = new THREE.Mesh(planeGeometry, planeMaterialstone);
    plane2b.rotation.y = Math.PI / 2;
   


    const plane3 = new THREE.Mesh(planeGeometry, planeMaterialsky);
    plane3.rotation.y = Math.PI / 2;
    const plane3b = new THREE.Mesh(planeGeometry, planeMaterialstone);
    plane3b.rotation.y = Math.PI / 2;

    const plane4 = new THREE.Mesh(planeGeometry, planeMaterialground);
    const plane4b = new THREE.Mesh(planeGeometry, planeMaterialground);
    plane4.rotation.x = Math.PI / 2;

    // Position the sky and ground
    plane1.position.set(w / 2, h / 2, 0); // Centered on the middle of the plane
    scene.add(plane1);
    plane2.position.set(0, h / 2, w / 2); // Centered on the middle of the plane
    scene.add(plane2);
    plane3.position.set(WORLD_SIZE, h / 2, w / 2); // Centered on the middle of the plane
    scene.add(plane3);
    plane4.position.set(h/2,0, w/2); // Centered on the middle of the plane
    scene.add(plane4);



    plane1b.position.set(w / 2, h / 2, -1); // Centered on the middle of the plane
    scene.add(plane1b);
    plane2b.position.set(-1, h / 2, w / 2); // Centered on the middle of the plane
    scene.add(plane2b);
    plane3b.position.set( WORLD_SIZE + 1,h / 2, w / 2); // Centered on the middle of the plane
    scene.add(plane3b);



    // Create a canvas texture with "ABC"
    function createTextTexture(label) {
        const canvas = document.createElement('canvas');
        const size = 256; // Size of the canvas
        canvas.width = size;
        canvas.height = size;
        const context = canvas.getContext('2d');
        
        // Fill background
        context.fillStyle = '#ffffff';
        context.fillRect(0, 0, size, size);

        // Draw text
        context.fillStyle = '#000000';
        context.font = '30px Arial';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillText(label, size / 2, size / 2);

        const texture = new THREE.CanvasTexture(canvas);
        return texture;
    }

    // Axes helper
    const axesHelper = new THREE.AxesHelper(20);


    const group1 = new THREE.Group();
    const group2 = new THREE.Group();

    // Geometry and material for cubes
    const geometry = new THREE.BoxGeometry(BOX_SIZE, BOX_SIZE, BOX_SIZE);
    //const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

    // Creating and adding cubes to the scene
  
    vertices.forEach(vertex => {
        var texture = createTextTexture(vertex[0]);
        var material = new THREE.MeshStandardMaterial({ map: texture });

        const cube = new THREE.Mesh(geometry, material);
        
        cube.position.set((vertex[1][0]+1)/2*WORLD_SIZE, (vertex[1][1]+1)/2*WORLD_SIZE, (vertex[1][2]+1)/2*WORLD_SIZE);

        //scene.add(cube);
        group1.add(cube);
        
    });

    vertices.forEach(vertex => {
        var texture = createTextTexture(vertex[0]);
        var material = new THREE.MeshStandardMaterial({ map: texture });

        const cube = new THREE.Mesh(geometry, material);
        
        cube.position.set((vertex[1][5]+1)/2*WORLD_SIZE, (vertex[1][4]+1)/2*WORLD_SIZE, (vertex[1][3]+1)/2*WORLD_SIZE);

        //scene.add(cube);
        group2.add(cube);
        
    });

    scene.add(group1);
    scene.add(group2);

    let currentGroup = 1;

function switchGroups() {
    if (currentGroup === 1) {
        group1.visible = false;
        group2.visible = true;
        currentGroup = 2;
    } else {
        group1.visible = true;
        group2.visible = false;
        currentGroup = 1;
    }
}

// Initially show group 1 and hide group 2
group1.visible = true;
group2.visible = false;

// Switch groups every 5 seconds
//setInterval(switchGroups, 5000);




    // Center point the camera will orbit around
    const centerPoint = new THREE.Vector3(START_X, START_Y, START_Z);

    // Camera initial position
    let cameraAngleY = 0;
    let cameraAngleX = 0;
    const radius = 1; // Distance from the center point

    // Update camera's initial position and look at the center point
    function updateCameraPosition() {
        camera.position.x = centerPoint.x + radius * Math.cos(cameraAngleY) * Math.cos(cameraAngleX);
        camera.position.y = centerPoint.y + radius * Math.sin(cameraAngleX);
        camera.position.z = centerPoint.z + radius * Math.sin(cameraAngleY) * Math.cos(cameraAngleX);
        camera.lookAt(centerPoint);
                      
    }
    updateCameraPosition();

    // Camera control
    function onDocumentKeyDown(event) {
        var keyCode = event.which;
        const speed = 0.05; // Rotation speed in radians
        const zoomSpeed = 0.1; // Adjust zoom speed
        const moveSpeed = 5; // Adjust move speed

        switch (keyCode) {
            case 37: // left arrow
                cameraAngleY -= speed;
                break;
            case 39: // right arrow
                cameraAngleY += speed;
                break;
            case 38: // up arrow
                cameraAngleX = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, cameraAngleX + speed));
                break;
            case 40: // down arrow
                cameraAngleX = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, cameraAngleX - speed));
                console.log("down key");
                break;

            case 83: // 'W' key
                camera.fov = Math.max(10, camera.fov - 5);
                camera.updateProjectionMatrix();
                console.log("w key");
                 break;

            case 87: // 'S' key
                camera.fov = Math.min(100, camera.fov + 5);
                camera.updateProjectionMatrix();
                break; 

            case 32: // Space bar
                startGlide()
                glideSpeed = MAX_GLIDE_SPEED;
            break;       
        }
        updateCameraPosition();
    }

    // Event listener for keyboard
    document.addEventListener('keydown', onDocumentKeyDown, false);

    function inBounds(value){

        /*
        //console.log("value= " + value);
        if (value < BOUND_MAX && value > BOUND_MIN)
            console.log("true")
        else{
  
           console.log("false")
        }
        */
        return true;
    }

    function startGlide(){

        glideX = cameraAngleX;
        glideY = cameraAngleY;
        //glideZ = cameraAngleZ;
    }



    // Animation loop
    function animate() {
        updateCameraPosition();
    
        // glide forward
                        if(inBounds(centerPoint.z))
                            centerPoint.z -= glideSpeed * Math.sin(glideY);
                        if(inBounds(centerPoint.x))
                            centerPoint.x -= glideSpeed * Math.cos(glideY);
                    if (glideX !== 0) {
                        if(inBounds(centerPoint.y))
                            centerPoint.y -= glideSpeed * Math.sin(glideX);
                    }
                    if(glideSpeed > MIN_GLIDE_SPEED)
                        glideSpeed *= .95;
                    else
                        glideSpeed = 0;   

                    


        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }
    animate();
