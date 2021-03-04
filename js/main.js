let game = {

    context: null,

    ball: null, // Objects
    platform: null,
    blocks: [],

    objectsAnimation: { // VISUAL objects components
        background: null,
        ball: null,
        platform: null,
        block: null
    },

    initialize() {
        this.context = document.querySelector('#canvasId').getContext('2d');
        this.platformMoveHandler();
    },

    platformMoveHandler() {
        window.addEventListener('keypress', event => {
            switch(event.key) {
                case 'a' : {
                    this.platform.moveLeft();
                    this.render();
                    break;
                }
                case 'd' : {
                    this.platform.moveRight();
                    this.render();
                }
            }
        })
    },

    blocksInit() { // This method is responsible for the arrangement of blocks
        let row = 3;
        let col = 6;
        let offset = 70;

        for(let i = 0; i < col; i++) {
            for(let j = 0; j < row; j++) {
                this.blocks.push({
                    x: 70 * i + offset,
                    y: 30 * j + offset
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
    },

    start() {
        this.initialize();
        this.blocksInit();
        this.preload(() => this.render());
    }
};

game.ball = {
    x: 320,
    y: 240,
    width: 20,
    height: 20
}

game.platform = {
    x: 280,
    y: 260,
    offset: 6,

    moveRight() {
        this.x += this.offset;
    },

    moveLeft(){
        this.x -= this.offset;
    }
}

window.addEventListener('load', () => {
    game.start();
})