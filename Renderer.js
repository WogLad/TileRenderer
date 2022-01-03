const hexCharacters = ["0", "1", "2", "3", '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
function getRandomColor() {
    var color = "#";
    for (var c = 0; c < 6; c++) {
        color += hexCharacters[Math.round(Math.random() * 15)]
    }
    return color;
}

// CANVAS SETUP
var canvas = document.getElementById("main-canvas");
var ctx = canvas.getContext("2d");
ctx.fillStyle = "#242424";
ctx.font = "40px monospace";
ctx.textAlign = "center";
ctx.fillRect(0, 0, 500, 500);

// var updateLoop = setInterval(() => { // MAIN UPDATE LOOP
//     ctx.fillStyle = "#242424";
//     ctx.fillRect(0, 0, 500, 500);
//     // All code related to drawing something every frame goes after this line
// }, 10);

// canvas.onpointermove = (e) => { // For displaying the pressure input of the pointer on the canvas
//     ctx.fillStyle = "#242424";
//     ctx.fillRect(0, 0, 500, 500);
//     ctx.fillStyle = "#ffffff";
//     ctx.fillText(String(e.pressure), canvas.width/2, canvas.height/2);
// }

// var i = 0;
// var updateIntervalFunction = setInterval(() => {
//     ctx.fillStyle = getRandomColor();
//     ctx.fillRect(i, i, 10, 10);
//     ctx.fillRect(500-i, i, 10, 10);
//     i++;
//     if (i > 500) {clearInterval(updateIntervalFunction);}
//     // console.log(i);
// }, 10);