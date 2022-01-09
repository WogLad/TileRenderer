// (TODO): Return a random ore from a list of ores
function getRandomOre() {
    // var ore;
    // return ore;
    return "iron";
}

function getRandomEnemy() {
    var enemies = [
        "zombie",
        "skeleton"
    ];

    var randEnemy = {};
    randEnemy["name"] = enemies[Math.round(Math.random() * (enemies.length-1))];
    randEnemy["strength"] = Math.round(Math.random() * 55);
    switch(randEnemy.name) {
        case "zombie":
            randEnemy["loot"] = "flesh";
            break;
        case "skeleton":
            randEnemy["loot"] = "bone";
            break;
    }

    return randEnemy;
}