var livingBeings = {
    "humans": [],
    "elves": [],
    "dwarves": []
};

function getAllLivingBeings() {
    // var l = [];
    // Object.values(livingBeings).forEach(lbType => {
    //     lbType.forEach(lb => {
    //         l.push(lb);
    //     });
    // });
    // return l;
    return Object.values(livingBeings).flat();
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

setTimeout(populateWorld(4), 1000);
console.log(getAllLivingBeings());

// World Tick Function for World Clock
var ticks = 0; // Also is the number for the time of each day in the simulation, measured in ticks of course
const startWorkTime = 9000; // 9:00 AM is the startWorkTime
const leaveWorkTime = 17000; // 5:00 PM is the leaveWorkTime
var tickLoop = setInterval(() => {
    // Increase the timer for the clock, which is then used by all the other functions to know the time passed
    if (ticks == 24000) {ticks = 0; console.log("A new day has begun.")}

    var allLivingBeings = getAllLivingBeings();
    for (var i = 0; i < allLivingBeings.length; i++) {
        allLivingBeings[i].performWork(ticks);
    }

    ticks += 1;

    if (ticks == startWorkTime || ticks == leaveWorkTime || ticks == (leaveWorkTime+1000)) {
        console.log(ticks);
    }
}, 25 /* An interval of 25ms == 40 ticks per second */);