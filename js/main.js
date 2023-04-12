const GAME = {
    start: function () {
        this.ctx = document.getElementById("canvasId").getContext("2d");
        const backgroundImage = new Image();
        backgroundImage.src = "../img/background.png";

        window.requestAnimationFrame(() => {
            this.ctx.drawImage(backgroundImage, 0, 0);
        })
    }
}

window.addEventListener("load", () => {
    GAME.start();
})