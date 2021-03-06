const CONTROLL_BUTTONS = {
    LEFT: 'a',
    RIGHT: 'd',
    SPACE: 's'
}

let game = {

    context: null,

    ball: null, // Objects
    platform: null,
    blocks: [],
    settings : { // game settings
        width: 800,
        height: 600,
    },

    objectsAnimation: { // VISUAL objects components
        background: null,
        ball: null,
        platform: null,
        block: null
    },

    initialize() {
        this.context = document.querySelector('#canvasId').getContext('2d');
        this.commandKeyHandler();
    },

    commandKeyHandler() {
        window.addEventListener('keypress', event => {
            if (event.key === CONTROLL_BUTTONS.LEFT || CONTROLL_BUTTONS.RIGHT || CONTROLL_BUTTONS.SPACE) {
                this.platform.launchBall(event.key);
                this.platform.move(event.key);
            }
        })
    },

    blocksInit() { // This method is responsible for the arrangement of blocks
        let row = 3;
        let col = 4;
        let offset = 70;

        for (let i = 0; i < col; i++) {
            for (let j = 0; j < row; j++) {
                this.blocks.push({
                    x: 170 * i + offset, //TODO вынести фиксированные значения вне метода
                    y: 35 * j + offset
                })
            }
        }
    },

    preload(callBack) { // callBack = this.render()
        let start = 0;
        let end = Object.keys(this.objectsAnimation).length;

        for (let key in this.objectsAnimation) {
            this.objectsAnimation[key] = new Image();
            this.objectsAnimation[key].src = `../img/${key}.png`;
            this.objectsAnimation[key].addEventListener('load', () => {
                ++start;
                if (start >= end) {
                    callBack();
                }
            })
        }
    },

    render() { // Graphic rendering of all objects
        setInterval(() => {
            this.context.clearRect(0, 0, this.settings.width, this.settings.height); // clear previous images

            for (let key in this.objectsAnimation) {
                window.requestAnimationFrame(() => {
                    switch (key) {
                        case 'background': {
                            this.context.drawImage(this.objectsAnimation[key], 0, 0);
                            break;
                        }
                        case 'ball': {
                            this.context.drawImage(
                                this.objectsAnimation[key],
                                0,
                                0,
                                this[key].width,
                                this[key].height,
                                this[key].x,
                                this[key].y,
                                this[key].width,
                                this[key].height
                            );
                            break;
                        }
                        case 'block': {
                            this.blocks.forEach(block => {
                                this.context.drawImage(this.objectsAnimation[key], block.x, block.y);
                            })
                            break;
                        }
                        case 'platform': {
                            this.context.drawImage(this.objectsAnimation[key], this[key].x, this[key].y);
                        }
                    }
                });
            }
        }, 5)
    },

    start() {
        this.initialize();
        this.blocksInit();
        this.preload(() => this.render());
    },

    util: { // utils methods
        random : (min, max) => { // random value 
            return Math.round(Math.random() * (max - min) + min);
        }
    }
};

game.ball = {
    x: 390,
    y: 450,
    width: 20,
    height: 20,

    start() {
        const offset = game.util.random(-10, 10); // start / end offsets
        setInterval(() => {
            this.y -= 5;
            this.x -= offset;
        }, 30);
    }
}

game.platform = {
    x: 280,
    y: 460,
    offset: 6,
    ball: game.ball,

    launchBall(key) {
        if(key === CONTROLL_BUTTONS.SPACE && this.ball !== null) {
            this.ball.start();
            this.ball = null;
        }
    },

    move(key) {
        if (key === CONTROLL_BUTTONS.RIGHT) {
            this.ball !== null ? this.ball.x += this.offset : null; //TODO Улучшить этот метод
            this.x += this.offset;
        }
        if (key === CONTROLL_BUTTONS.LEFT) {
            this.ball !== null ? this.ball.x -= this.offset : null;
            this.x -= this.offset;
        }
    }
}

game.settings = {
    setSettings() {
        // some logic
    }
}

window.addEventListener('load', () => {
    game.start();
})