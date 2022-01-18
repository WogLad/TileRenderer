/*
    (DONE): Make global variables containing information about the mountain.

    (WIP): Make a "MountainSection" class that contains a random amount of rocks within a range and sets their position in the
    mountain section, and keep track of all the miners that are in that specific "MountainSection" class instance.

    (TODO): Assign all the rocks in the mountain section to a single miner each.

    (DONE): Make a hard-coded two-dimensional array where each element contains an instance of the "MountainSection" class if there
    is a mountain section at that coordinate.

    (TODO): Draw the background, rocks, and miners in the mountain section currently selected onto the canvas.

    (TODO): Make the "mountainMap" be dynamically generated.
*/

var mountainMap = [
    [1, 1, 1, 0, 0],
    [0, 1, 1, 0, 0],
    [1, 1, 1, 1, 0],
    [0, 0, 0, 1, 0],
    [0, 0, 1, 1, 0],
];

class MountainSection {
    constructor() {
        this.rocks = [
            // Format:- {x: 0, y: 0}
        ];
        this.miners = [
            // Format:- {<instance of miner>: {x: 0, y: 0}}
        ];
    }
}

function generateMountain() {
    for (var x = 0; x < mountainMap[0].length; x++) {
        for (var y = 0; y < mountainMap.length; y++) {
            if (mountainMap[x][y] == 1) {
                mountainMap[x][y] = new MountainSection();
            }
        }
    }
}

generateMountain();