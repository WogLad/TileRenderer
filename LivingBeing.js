var PROFESSION = {
    "Warrior": 0, // Kills monsters around the town
    "Hunter":  1, // Hunts animals to get resources from them like food and crafting ingredients
    "Wizard":  2, // Uses magic to either kill monsters or to protect the town or for other miscellaneous activities
    "Doctor":  3, // Uses magic to heal people
    "Miner":   4, // Mines rocks, minerals, and ores in the mountains
}
PROFESSION = Object.freeze(PROFESSION);

var LOCATION ={
    "Home":      0,
    "Clinic":    1,
    "Mountain":  2,
    "Forest":    3,
    "Dungeon":   4,
    "MageTower": 5,
    "Pub":       6, // This is where everyone goes after they finish working which is at a fixed time, and this is the place where livingBeing(s) go to socialize and make "friends"
}
LOCATION = Object.freeze(LOCATION);

function calculateProfession(livingBeing) {
    // var p;
    // if (livingBeing.strength > livingBeing.agility && livingBeing.agility > livingBeing.intelligence) {p = PROFESSION.Warrior;}
    // else if (livingBeing.agility > livingBeing.intelligence && livingBeing.intelligence > livingBeing.strength) {p = PROFESSION.Hunter;}
    // else if (livingBeing.intelligence > livingBeing.agility && livingBeing.agility > livingBeing.strength) {p = PROFESSION.Wizard;}
    // else {p = PROFESSION.Doctor;}
    // return p;

    var P = Object.values(PROFESSION)[Math.round(Object.keys(PROFESSION).length * Math.random())];
    while (isNaN(P)) {
        P = Object.values(PROFESSION)[Math.round(Object.keys(PROFESSION).length * Math.random())];
    }
    return P;
}

class LivingBeing {
    constructor(father = null, mother = null) {
        // (DONE): Either "male" or "female" based on the 1/3 people are female and the other 2/3 are male
        if (Math.random() <= 1/3) {
            this.gender = "female";
        }
        else {
            this.gender = "male";
        }
        // (DONE): Set the name of the livingBeing using chance.first({gender: "Use the gender based on the one decided above"})
        this.name = chance.first({gender: this.gender});
        // (TODO): Make a clock in the World.js script that makes time pass in the simulation and make it increase the age of all living beings at a certain rate
        this.age = 0;

        this.heteroSpeciesLikeability = Math.random(); // The factor randomly decided to check if this living being would be attracted to other species
        if ((father != null && mother != null) && this.heteroSpeciesLikeability < 0.5 && father.constructor.name != mother.constructor.name) {
            this.heteroSpeciesLikeability *= 2;
        }

        this.father = father;
        this.mother = mother;
        this.siblings = []; // (WIP)
        this.spouse; // (WIP)
        this.children = []; // (WIP)

        // Personality Stats
        this.personality = Math.round(Math.random() * 25);

        // Combat Stats
        if (father == null && mother == null) {
            this.strength = this.startingStrength = Math.round(Math.random() * 25);
            this.intelligence = this.startingIntelligence = Math.round(Math.random() * 25);
            this.agility = this.startingAgility = Math.round(Math.random() * 25);
            this.age = 18;
            this.personality = Math.round(Math.random() * 100);
        }
        else {
            if (Math.random() < 0.5) {
                this.strength = this.startingStrength = father.startingStrength;
            }
            else {
                this.strength = this.startingStrength = mother.startingStrength;
            }

            if (Math.random() < 0.5) {
                this.intelligence = this.startingIntelligence = father.startingIntelligence;
            }
            else {
                this.intelligence = this.startingIntelligence = mother.startingIntelligence;
            }

            if (Math.random() < 0.5) {
                this.agility = this.startingAgility = father.startingAgility;
            }
            else {
                this.agility = this.startingAgility = mother.startingAgility;
            }
        }

        // Others
        this.money = 0; // Increases when the livinBeing gets paid for doing they're work, which is at the "end working hours" time

        this.inventory = [];
        this.inventoryMax = 10;

        this.location = LOCATION.Home;

        this.profession = calculateProfession(this);

        this.friends = [];
    }

    // Calculates the likeability of all the friends of the living being based on their personality stat and on the concept of opposites attract
    calculateLikeability(livingBeing) {
        //(DONE): Add in a species factor to the likeability calculation.
        var deviation = Math.abs(this.personality-livingBeing.personality);
        // Checks if both livingBeings have a high personality
        if (this.personality >= 50 && livingBeing.personality >= 50 && deviation <= 20) {
            // Checks if the two livingBeing(s) are of different species and if they both have a close enough liking towards other speices
            if (this.constructor.name != livingBeing.constructor.name && (this.heteroSpeciesLikeability >= 0.5 && livingBeing.heteroSpeciesLikeability >= 0.5)) {
                return false; // The livingBeing is not likeable
            }
            else {
                return true; // The livingBeing is likeable
            }
        }
        else {
            return false; // The livingBeing is not likeable
        }
    }

    // (TODO): Makes the livingBeing move from one place to the other such as from their home to the monster zones for warriors or clinics for doctors
    move() {

    }

    performWork(t /*"t" is the ticks of the world clock*/) { // (WIP)
        // The livingBeing doesn't do anything as the current time is before or after the working hours
        if (t < startWorkTime) {
            return;
        }
        // (DONE): Make the livingBeing go to the "Pub" after working for 1 hour (at tick 18000, leave the "Pub" and send them home)
        else if (t == leaveWorkTime) {
            this.location = LOCATION.Pub;
        }
        else if (t == (leaveWorkTime+1000) /*1000 means that the livingBeing will stay in the "Pub" for 1 hour*/ ) {
            this.location = LOCATION.Home;
        }
        // (DONE): Goes to the mountains
        else if (t < leaveWorkTime) {
            switch (this.profession) {
                case PROFESSION.Warrior:
                    break;
                
                case PROFESSION.Hunter:
                    break;
            
                case PROFESSION.Wizard:
                    break;
            
                case PROFESSION.Doctor:
                    break;
            
                case PROFESSION.Miner:
                    this.location = LOCATION.Mountain;

                    /* (DONE): Decide on what ore to get and mine it (which means to just add it to the inventory
                                of the livingBeing until they run out of inventory space and then they sell it instantly for
                                money and repeat that process until the "leave work" time come) */
                    if (this.inventory.length < this.inventoryMax) {
                        if (ticks % 40 == 0 /* Mines at an interval of one second */) {
                            var ore = getRandomOre();
                            this.inventory.push(ore);
                            console.log(`${this.name} mined some ${ore}.`);
                        }
                    }
                    else { // Sells off all the ores the livingBeing has and give them money
                        // (DONE): Make this a forEach loop that checks what's in the inventory and increases the money based on that
                        this.inventory.forEach(item => {
                            switch(item) {
                                case "iron":
                                    this.money += 10; // The price of one "iron" is $10
                                    this.inventory.pop(this.inventory.indexOf("iron"));
                                    break;
                            }
                        });
                        // this.inventory = [];
                    }
                    break;
            }
        }
    }

    // (TODO): Requires the livingBeing to have a spouse and if the parents are of different species, the child will be one of the two species
    haveChild() {

    }
}