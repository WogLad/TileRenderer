const hexCharacters = ["0", "1", "2", "3", '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
function getRandomColor() {
    var color = "#";
    for (var c = 0; c < 6; c++) {
        color += hexCharacters[Math.round(Math.random() * (hexCharacters.length - 1))]
    }
    return color;
}

class HTMLCanvas {
    constructor(canvasContext, bgColor="#000000") {
        this.canvasContext = canvasContext;
        this.bgColor = bgColor
    }

    drawRect(x, y, width, height, color) {
        this.canvasContext.fillStyle = color;
        this.canvasContext.fillRect(x, y, width, height);
        this.canvasContext.fillStyle = this.bgColor;
    }
}

// CANVAS SETUP
var canvas = document.getElementById("main-canvas");
var ctx = canvas.getContext("2d");
ctx.fillStyle = "#242424";
ctx.font = "40px monospace";
ctx.textAlign = "center";
ctx.fillRect(0, 0, 500, 500);

var htmlCanvas = new HTMLCanvas(ctx, "#242424");

var mousePos = {x:0, y:0};
canvas.onpointermove = (e) => {
    var rect = e.target.getBoundingClientRect();
    mousePos.x = e.clientX - rect.left; //x position within the element.
    mousePos.y = e.clientY - rect.top;  //y position within the element.
}

const tileSize = 25; // A tile size of 25x25 pixels per tile results in a TileMap of 20x20 tiles on a 500x500 pixel canvas
function drawTile(x, y, color) {
    if ((canvas.width/tileSize >= x && canvas.height/tileSize >= y) == false) {return false;}
    htmlCanvas.drawRect(x*tileSize, y*tileSize, tileSize, tileSize, color);
    return true;
}

var lastLoop = new Date(); // For the FPS to keep track of the time of the last frame
function bottomLeftStatsUpdater() { 
    // For the FPS
    var thisLoop = new Date();
    var fps = 1000 / (thisLoop - lastLoop);
    lastLoop = thisLoop;

    document.getElementById("fpsDisplay").innerText = (
        `Ticks: ${ticks}\n` +
        `FPS: ${Math.floor(fps*100)}`
    );
}

// MAIN UPDATE LOOP
var s = 0;
var updateLoop = setInterval(() => {
    htmlCanvas.drawRect(0, 0, canvas.width, canvas.height, htmlCanvas.bgColor); // Clears the screen every frame


    // ALL CODE RELATED TO DRAWING SOMETHING EVERY FRAME GOES AFTER THIS LINE
    
    // Draws a red square to the TileMap that follows the mouse
    htmlCanvas.drawRect(Math.floor(mousePos.x/tileSize)*tileSize, Math.floor(mousePos.y/tileSize)*tileSize, tileSize, tileSize, "#ff0000");

    // Sin Wave on the TileMap
    // for (var x = 0; x < canvas.width/tileSize; x++) {
    //     for (var y = 0; y < canvas.height/tileSize; y++) {
    //         drawTile(x, y, `rgba(255, 255, 255, ${Math.sin(x+s)})`);
    //     }
    // }

    // Sin Wave on the Canvas
    for (var x = 0; x < canvas.width; x+=6) {
        for (var y = 0; y < canvas.height; y+=6) {
            htmlCanvas.drawRect(x, y, 6, 6, `rgba(255, 255, 255, ${Math.sin(x+s)})`);
        }
    }
    s += 0.1; // How much distance the sin wave travels on the x-axis every frame
}, 10);

setInterval(() => {bottomLeftStatsUpdater()}, 1000); // Updates the stats in the bottom left corner of the page once every second