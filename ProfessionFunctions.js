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
    randEnemy["intelligence"] = Math.round(Math.random() * 55);
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

function getRandomAnimal() {
    var animals = [
        "pig",
        "sheep"
    ];

    var randAnimal = {};
    randAnimal["name"] = animals[Math.round(Math.random() * (animals.length-1))];
    randAnimal["agility"] = Math.round(Math.random() * 55);
    switch(randAnimal.name) {
        case "pig":
            randAnimal["loot"] = "pork";
            break;
        case "sheep":
            randAnimal["loot"] = "mutton";
            break;
    }

    return randAnimal;
}

function getRandomFish() {
    var fishes = [
        "sardine",
        "salmon",
        "trout",
        "shrimp"
    ];

    return fishes[Math.round(Math.random() * (fishes.length-1))];
}