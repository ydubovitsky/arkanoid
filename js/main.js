let game = {

    context: null,

    ball: null,
    platform: null,

    objectsAnimation: {
        background: null,
        ball: null,
        platform: null
    },

    initialize() {
        this.context = document.querySelector('#canvasId').getContext('2d');
    },

    preload(callBack) {
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

    render() {
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
                    default: {
                        this.context.drawImage(this.objectsAnimation[key], this[key].x, this[key].y);
                    }
                }
            });
        }
    },

    start() {
        this.initialize();
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
    y: 260
}

window.addEventListener('load', () => {
    game.start();
})