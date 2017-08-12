(function() {
    let main = document.getElementById('main');

    let size = 5;
    let cubeSize = 40;
    let gap = 5;

    main.style.width = `${size * (cubeSize + gap)}px`;
    main.style.height = `${size * (cubeSize + gap)}px`;


    for (let x = 0; x < size; x++) {
        for (let y = 0; y < size; y++) {
            let cube = createCube({ 
                width: `${cubeSize}px`, 
                height: `${cubeSize}px`,
                backgroundColor: getColorByPos(size, x, y),
                transform: `translateX(${x * (cubeSize + gap)}px) translateY(${y * (cubeSize + gap)}px) translateZ(0px)`
            });

            cube.animate([
                { transform: `translateX(${x * (cubeSize + gap)}px) translateY(${y * (cubeSize + gap)}px) translateZ(0px)` },
                { transform: `translateX(${x * (cubeSize + gap)}px) translateY(${y * (cubeSize + gap)}px) translateZ(50px)` }
            ], {
                duration: 1000,
                easing: 'ease-in',
                direction: 'alternate',
                iterations: Infinity,
                delay: 100 * y
            });

            main.appendChild(cube);
        }
    }

    setPosition();

    function setPosition() {
        let x = window.innerWidth / 2;
        let y = window.innerHeight / 2;

        main.animate([
            { transform: `translateX(${x - main.offsetWidth / 2}px) translateY(${y - main.offsetHeight / 2}px) rotateX(80deg) rotateZ(20deg)` },
            { transform: `translateX(${x - main.offsetWidth / 2}px) translateY(${y - main.offsetHeight / 2}px) rotateX(80deg) rotateZ(380deg)` }
        ], {
            duration: 30000,
            iterations: Infinity
        });
    }

    function getColorByPos(max, x, y) {
        let r = parseInt(x / max * 255, 10);
        let g = parseInt(y / max * 255, 10);
        let b = parseInt(x + y / max * 255, 10);

        return `rgb(${r}, ${g}, ${b})`;
    }

    function createCube(style = {}) {
        let cube = document.createElement('div');
        let sharedStyle = { 
            width: style.width, 
            height: style.height,
            backgroundColor: style.backgroundColor
        };

        let offsetX = `translateZ(${parseInt(style.width, 10) / 2}px)`;
        let offsetY = `translateZ(${parseInt(style.height, 10) / 2}px)`;

        let front = createPlane(Object.assign({ transform: `rotateY(0deg) ${offsetX}` }, sharedStyle));
        let left = createPlane(Object.assign({ transform: `rotateY(-90deg) ${offsetX}` }, sharedStyle));
        let right = createPlane(Object.assign({ transform: `rotateY(90deg) ${offsetX}` }, sharedStyle));
        let back = createPlane(Object.assign({ transform: `rotateY(180deg) ${offsetX}` }, sharedStyle));
        let top = createPlane(Object.assign({ transform: `rotateX(90deg) ${offsetY}` }, sharedStyle));
        let bottom = createPlane(Object.assign({ transform: `rotateX(-90deg) ${offsetY}` }, sharedStyle));

        cube.appendChild(front);
        cube.appendChild(left);
        cube.appendChild(right);
        cube.appendChild(back);
        cube.appendChild(top);
        cube.appendChild(bottom);

        cube.className = 'cube';
        Object.assign(cube.style, style);

        return cube;
    }

    function createPlane(style = {}) {
        let plane = document.createElement('div');

        plane.className = 'plane';
        Object.assign(plane.style, style);

        return plane;
    }
})()
