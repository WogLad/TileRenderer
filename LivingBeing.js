var PROFESSION = {
    "Warrior":    0, // Kills monsters around the town
    "Hunter":     1, // Hunts animals to get resources from them like food and crafting ingredients
    "Wizard":     2, // Uses magic to either kill monsters or to protect the town or for other miscellaneous activities
    "Doctor":     3, // Uses magic to heal people
    "Miner":      4, // Mines rocks, minerals, and ores in the mountains
    "Lumberjack": 5, // Cuts trees in the forest and sells the wood and other resources from the trees for money
    "Fisherman":  6, // Goes to the lake and fishes for fish
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
    "Lake":      7,
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
        this.isAlive = true;

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
        this.money = 0; // Increases when the livingBeing gets paid for doing they're work, which is at the "end working hours" time

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
        // The livingBeing goes home as the current time is before or after the working hours and they won't be at the pub at that time as well
        if (t >= (leaveWorkTime + 1000) || t < startWorkTime) {
            this.location = LOCATION.Home;
            return;
        }
        // (DONE): Make the livingBeing go to the "Pub" after working, for 1 hour (at tick 18000, leave the "Pub" and send them home)
        else if (t >= leaveWorkTime && t < (leaveWorkTime + 1000)) {
            this.location = LOCATION.Pub;
        }
        else if (t >= startWorkTime && t < leaveWorkTime) {
            switch (this.profession) {
                case PROFESSION.Warrior:
                    // (DONE): Goes to the dungeon
                    this.location = LOCATION.Dungeon;

                    /* 
                    (DONE): Decide on what monster to fight and run a combat algorithm to see who wins between the warrior and the monster.
                    (DONE): If the monster is too strong, make the warrior run away from it but make there a chance for the warrior to still die.
                    (DONE): If the warrior kills the monster, give monster loot to the warrior as a reward and make them sell all their monster
                            loot when they run out of inventory space, and repeat that process until the "leave work" time comes.
                    */
                    if (this.inventory.length < this.inventoryMax) {
                        if (ticks % 80 == 0 /* Kills monsters at an interval of two seconds */) {
                            var enemy = getRandomEnemy();
                            if (enemy.strength > this.strength && Math.random() < 0.33) {
                                this.isAlive = false;
                                console.log(`%c${this.name} was killed by an enemy(${enemy.name}).`, "color: #ff170f;");
                            }
                            else if (this.strength == enemy.strength && Math.random() < 0.5) {
                                this.isAlive = false;
                                console.log(`%c${this.name} was killed by an enemy(${enemy.name}).`, "color: #ff170f;");
                            }
                            else { // The livingBeing killed the enemy
                                this.inventory.push(enemy.loot);
                                console.log(`${this.name} killed an enemy(${enemy.name}).`);

                                if (Math.random() < 0.2) {
                                    this.strength++;
                                }
                            }
                        }
                    }
                    else { // Sells off all the monster loot the livingBeing has and give them money
                        // (DONE): Make this a forEach loop that checks what's in the inventory and increases the money based on that
                        this.inventory.forEach(item => {
                            switch(item) {
                                case "flesh":
                                    this.money += 5; // The price of one "flesh" is $5
                                    this.inventory.pop(this.inventory.indexOf("flesh"));
                                    break;
                                case "bone":
                                    this.money += 7; // The price of one "bone" is $7
                                    this.inventory.pop(this.inventory.indexOf("bone"));
                                    break;
                            }
                        });
                    }
                    break;
                
                case PROFESSION.Hunter:
                    // (DONE): Goes to the forest
                    this.location = LOCATION.Forest;

                    /* (DONE): Decide on what animal to hunt and hunt it (which means to just add the animal's meat to the inventory
                                of the livingBeing until they run out of inventory space and then they sell it instantly for
                                money and repeat that process until the "leave work" time comes) */
                    if (this.inventory.length < this.inventoryMax) {
                        if (ticks % 80 == 0 /* Kills animals at an interval of two seconds */) {
                            var animal = getRandomAnimal();
                            if (this.agility > animal.agility || (this.agility == animal.agility && Math.random() < 0.5)) { // The livingBeing killed the animal
                                this.inventory.push(animal.loot);
                                console.log(`${this.name} hunted an animal(${animal.name}).`);

                                if (Math.random() < 0.3) {
                                    this.agility++;
                                }
                            }
                        }
                    }
                    else { // Sells off all the meat the livingBeing has and give them money
                        // (DONE): Make this a forEach loop that checks what's in the inventory and increases the money based on that
                        this.inventory.forEach(item => {
                            switch(item) {
                                case "pork":
                                    this.money += 4; // The price of one "pork" is $4
                                    this.inventory.pop(this.inventory.indexOf("pork"));
                                    break;
                                case "mutton":
                                    this.money += 5; // The price of one "mutton" is $5
                                    this.inventory.pop(this.inventory.indexOf("mutton"));
                                    break;
                            }
                        });
                    }
                    break;
            
                case PROFESSION.Wizard:
                    // (DONE): Goes to the MageTower
                    this.location = LOCATION.MageTower;

                    /* 
                    (DONE): Decide on what monster to fight and run a combat algorithm to see who wins between the wizard and the monster.
                    (DONE): If the wizard kills the monster, give monster loot to the wizard as a reward and make them sell all their monster
                            loot when they run out of inventory space, and repeat that process until the "leave work" time comes.
                    */
                    if (this.inventory.length < this.inventoryMax) {
                        if (ticks % 80 == 0 /* Kills monsters at an interval of two seconds */) {
                            var enemy = getRandomEnemy();
                            if (this.intelligence > enemy.intelligence && Math.random() > 0.33)  { // The livingBeing killed the enemy
                                this.inventory.push(enemy.loot);
                                console.log(`${this.name} killed an enemy(${enemy.name}).`);

                                if (Math.random() < 0.2) {
                                    this.intelligence++;
                                }
                            }
                        }
                    }
                    else { // Sells off all the monster loot the livingBeing has and give them money
                        // (DONE): Make this a forEach loop that checks what's in the inventory and increases the money based on that
                        this.inventory.forEach(item => {
                            switch(item) {
                                case "flesh":
                                    this.money += 5; // The price of one "flesh" is $5
                                    this.inventory.pop(this.inventory.indexOf("flesh"));
                                    break;
                                case "bone":
                                    this.money += 7; // The price of one "bone" is $7
                                    this.inventory.pop(this.inventory.indexOf("bone"));
                                    break;
                            }
                        });
                    }
                    break;
            
                case PROFESSION.Doctor:
                    // (DONE): Goes to the clinic
                    this.location = LOCATION.Clinic;

                    /* (DONE): Decide on which livingBeing to heal and heal them
                               Get paid for the healing as well */
                    if (ticks % 120 == 0 /* Heals at an interval of three seconds */) {
                        var lb = getRandomLivingBeing();
                        while (lb == this) {
                            lb = getRandomLivingBeing();
                        }

                        this.money += 20;
                        console.log(`${this.name} healed ${lb.name}.`);
                    }
                    break;
            
                case PROFESSION.Miner:
                    // (DONE): Goes to the mountain
                    this.location = LOCATION.Mountain;

                    /* (DONE): Decide on what ore to get and mine it (which means to just add it to the inventory
                                of the livingBeing until they run out of inventory space and then they sell it instantly for
                                money and repeat that process until the "leave work" time comes) */
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
                    }
                    break;
            
                case PROFESSION.Lumberjack:
                    // (DONE): Goes to the forest
                    this.location = LOCATION.Forest;

                    /* (DONE): Cut down a tree at an interval of one second (which means to just add it to the inventory
                               of the livingBeing until they run out of inventory space and then they sell it instantly for
                               money and repeat that process until the "leave work" time comes) */
                    if (this.inventory.length < this.inventoryMax) {
                        if (ticks % 40 == 0 /* Cuts down trees at an interval of one second */) {
                            this.inventory.push("wood");
                            console.log(`${this.name} cut down a tree for some wood.`);
                        }
                    }
                    else { // Sells off all the wood the livingBeing has and give them money
                        // (DONE): Make this a forEach loop that checks what's in the inventory and increases the money based on that
                        this.inventory.forEach(item => {
                            switch(item) {
                                case "wood":
                                    this.money += 3; // The price of one "wood" is $3
                                    this.inventory.pop(this.inventory.indexOf("wood"));
                                    break;
                            }
                        });
                    }
                    break;
                
                case PROFESSION.Fisherman:
                    // (DONE): Goes to the lake
                    this.location = LOCATION.Lake;

                    /* (DONE): Fishes at an interval of one second (which means to just add the fish to the inventory
                               of the livingBeing until they run out of inventory space and then they sell it instantly for
                               money and repeat that process until the "leave work" time comes) */
                    if (this.inventory.length < this.inventoryMax) {
                        if (ticks % 40 == 0 && Math.random() < 0.5 /* Fishes at an interval of one second */) {
                            var fish = getRandomFish();
                            this.inventory.push(fish);
                            console.log(`${this.name} fished a fish(${fish}).`);
                        }
                    }
                    else { // Sells off all the wood the livingBeing has and give them money
                        // (DONE): Make this a forEach loop that checks what's in the inventory and increases the money based on that
                        this.inventory.forEach(item => {
                            switch(item) {
                                case "sardine":
                                    this.money += 3; // The price of one "sardine" is $3
                                    this.inventory.pop(this.inventory.indexOf("sardine"));
                                    break;
                                case "salmon":
                                    this.money += 5; // The price of one "salmon" is $5
                                    this.inventory.pop(this.inventory.indexOf("salmon"));
                                    break;
                                case "trout":
                                    this.money += 4; // The price of one "trout" is $4
                                    this.inventory.pop(this.inventory.indexOf("trout"));
                                    break;
                                case "shrimp":
                                    this.money += 4; // The price of one "shrimp" is $4
                                    this.inventory.pop(this.inventory.indexOf("shrimp"));
                                    break;
                            }
                        });
                    }
                    break;
            }
        }
    }

    // (TODO): Requires the livingBeing to have a spouse and if the parents are of different species, the child will be one of the two species
    haveChild() {

    }
}