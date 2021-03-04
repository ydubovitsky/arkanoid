let game = {

    context: null,

    objects: {
        background: null,
        ball: null,
        platform: null
    },

    initialize() {
        this.context = document.querySelector('#canvasId').getContext('2d');
    },

    preload (callBack) {
        let start = 0;
        let end = Object.keys(this.objects).length;

        for (let key in this.objects) {
            this.objects[key] = new Image();
            this.objects[key].src = `../img/${key}.png`;
            this.objects[key].addEventListener('load', () => {
                ++start;
                if (start >= end) {
                    callBack();
                }
            })
        }
    },

    render() {
        for (let key in this.objects) {
            window.requestAnimationFrame(() => {
                this.context.drawImage(this.objects[key], 0, 0);
            });
        }
    },

    start() {
        this.initialize();
        this.preload(() => this.render());
    }
};

window.addEventListener('load', () => {
    game.start();
})