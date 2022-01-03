var PROFESSION = {
    "Warrior": 0, // Kills monsters around the town
    "Hunter":  1, // Hunts animals to get resources from them like food and crafting ingredients
    "Wizard":  2, // Uses magic to either kill monsters or to protect the town or for other miscellaneous activities
    "Doctor":  3  // Uses magic to heal people
}
PROFESSION = Object.freeze(PROFESSION);

function calculateProfession(livingBeing) {
    // var p;
    // if (livingBeing.strength > livingBeing.agility && livingBeing.agility > livingBeing.intelligence) {p = PROFESSION.Warrior;}
    // else if (livingBeing.agility > livingBeing.intelligence && livingBeing.intelligence > livingBeing.strength) {p = PROFESSION.Hunter;}
    // else if (livingBeing.intelligence > livingBeing.agility && livingBeing.agility > livingBeing.strength) {p = PROFESSION.Wizard;}
    // else {p = PROFESSION.Doctor;}
    // return p;
    return Object.values(PROFESSION)[Math.round(3 * Math.random())];
}

class LivingBeing {
    constructor(father = null, mother = null) {
        // (WIP): Either "male" or "female" based on the 1/3 people are female and the other 2/3 are male
        this.gender;
        // (TODO): Set the name of the livingBeing using chance.first({gender: "Use the gender based on the one decided above"})
        this.name = chance.first({gender: this.gender});
        this.age = 0;
        this.heteroSpeciesLikeability = Math.random(); // The factor randomly decided to check if this living being would be attracted to other species

        this.father = father;
        this.mother = mother;
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
        this.inventory = [];
        this.inventoryMax = 2;

        this.profession = calculateProfession(this);

        this.friends = [];

        this.performWork = () => {};
    }

    // Calculates the likeability of all the friends of the living being based on their personality stat and on the concept of opposites attract
    calculateLikeability(livingBeing) {
        //(DONE): Add in a species factor to the likeability calculation.
        var deviation = Math.abs(this.personality-livingBeing.personality);
        // Checks if both livingBeings have a high personality
        if (this.personality >= 50 && livingBeing.personality >= 50 && deviation <= 20) {
            // Checks if the two livingBeing(s) are of different species and if they both have a close enough liking towards other speices
            if (this.constructor.name != livingBeing.constructor.name && Math.abs(this.heteroSpeciesLikeability - livingBeing.heteroSpeciesLikeability) > 0.2) {
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
}