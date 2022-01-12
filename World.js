var livingBeings = [];

function getRandomLivingBeing() {
    return livingBeings[Math.round(Math.random() * (livingBeings.length-1))];
}

// Spawn the first generation of humans & other species and let them live out their lives as designed
function populateWorld(startingAmount) {
    var species = [
        Human,
        Elf,
        Dwarf
    ]
    for (var i = 0; i < startingAmount; i++) {
        livingBeings.push(new species[Math.round(Math.random() * (species.length-1))])
    }
}

setTimeout(populateWorld(12), 1000);
console.log(livingBeings);

// World Tick Function for World Clock
var ticks = 0; // Also is the number for the time of each day in the simulation, measured in ticks of course
const startWorkTime = 9000; // 9:00 AM is the startWorkTime
const leaveWorkTime = 17000; // 5:00 PM is the leaveWorkTime
console.log(new Date());
var tickLoop = setInterval(() => {
    // Increase the timer for the clock, which is then used by all the other functions to know the time passed
    if (ticks == 24000) {ticks = 0; console.log("A new day has begun."); console.log(new Date()); /*clearInterval(tickLoop);*/}

    for (var i = 0; i < livingBeings.length; i++) {
        if (livingBeings[i].isAlive == true) {
            livingBeings[i].performWork(ticks);
        }
    }

    ticks += 1;
}, 12.5 /* An interval of 12.5ms == 80 ticks per second, 1 simulation day == 5 minutes in real world time */);