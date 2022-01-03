// var humans = [];
// var elves = [];
var livingBeings = {
    "humans": [],
    "elves": [],
    "dwarves": []
};

function getAllLivingBeings() {
    var l = [];
    // for (var i in humans) {livingBeings.push(humans[i]);}
    // for (var i in elves) {livingBeings.push(elves[i]);}
    Object.values(livingBeings).forEach(lbType => {
        lbType.forEach(lb => {
            l.push(lb);
        });
    });
    return l;
}

// Spawn the first generation of humans & other species and let them live out their lives as designed
function populateWorld(startingAmount) {
    for (var i = 0; i < startingAmount; i++) {
        livingBeings["humans"].push(new Human());
    }
    for (var i = 0; i < startingAmount; i++) {
        livingBeings["elves"].push(new Elf());
    }
    for (var i = 0; i < startingAmount; i++) {
        livingBeings["dwarves"].push(new Dwarf());
    }
}

populateWorld(4);
console.log(getAllLivingBeings());