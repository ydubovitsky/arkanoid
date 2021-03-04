let game = {
    start: function() {
        this.context = document.querySelector("#canvasId").getContext("2d");
        let background = new Image();
        background.src = "../img/background.png";
        window.requestAnimationFrame(() => {
            this.context.drawImage(background, 0, 0);
        });
    }
};

window.addEventListener("load", () => {
    game.start();
})