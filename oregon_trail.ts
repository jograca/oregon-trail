(function () {

    // Global Functions for Random Numbers

    function getAnyRandom(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    function getZeroToOneRandom() {
        return Math.random();
    }

    /*
    * Interfaces
    */

    //interface describing what attributes and methods a traveler should have
    interface ITraveler {
        food: number;
        name: string;
        isHealthy: boolean;

        //when implemented, There should be 50% chance to increase the traveler's food by 100.
        //return the travelers new food value        
        hunt(): number;

        //when implemented, we should check to see if the traveler has a food supply of 20
        //If they do then we should consume 20 of the available food supply
        //If they don't have 20 food then we should change isHealthy to false
        //return the travelers health after attempting to eat
        eat(): boolean;

    }

    //interface describing attributes and methods a wagon should have
    interface IWagon {
        capacity: number;
        passengerArray: Traveler[];

        //when implemented, we should add the traveler to the wagon if the capacity permits
        //this function should return the string "added" on success and "sorry" on failure
        addPassenger(traveler: Traveler): string;

        //this should return true if there is at least one unhealthy person in the wagon
        //if everyone is healthy false should be returned
        isQuarantined(): boolean;

        //Return the total amount of food among all passengers of the wagon.
        getFood(): number;

    }

    /*
    * Classes
    */

    //The traveler class that implements the ITraveler interface
    //This is currently in violation of its contract with the interface. 
    //Create the code required to satisfy the contract with the interface
    class Traveler implements ITraveler {
        food: number;
        name: string;
        isHealthy: boolean;

        constructor(food: number, name: string, isHealthy: boolean){
            this.food = food;
            this.name = name;
            this.isHealthy = isHealthy;
        }

        hunt() {
            // Run the Random function to get a number from zero to one
            // Increase Food by by 100 if over 0.5 is returned (either way works)
            if (getZeroToOneRandom() >= 0.5) {
                console.log(getZeroToOneRandom());
                this.food = this.food + 100; 
            }
            return this.food;
        };

        eat() {
            // If food is over 20, deduct 20 food
            // Player is still alive
            if (this.food >= 20) {
                this.food = this.food - 20;
                this.isHealthy = true;
            }
            // If food is under 20, player is dead 
            // Set isHealthy to false
            else {
                this.isHealthy = false;
            }
            return this.isHealthy; 
        };

    }

    //The wagon class that implements the IWagon interface
    //This is currently in violation of its contract with the interface.
    //Create the code required to satisfy the contract with the interface 
    class Wagon implements IWagon {
        capacity: number;
        passengerArray: Traveler[];

        constructor(capacity: number, passengerArray: Traveler[]){
            this.capacity = capacity;
            this.passengerArray = passengerArray;
        }

        addPassenger(Traveler) {
            // If the overall capacity is less than the size of the array of passenges
            // Add the Traveler
            // Return the String "added"
            if (this.capacity > this.passengerArray.length) {
                this.passengerArray.push(Traveler);
                return "added";
            }
            // If above condition is not met, return "sorry"
            return "sorry";
        };

        isQuarantined() {
            // Loop through the Passengers Array
            // Return true if someone is not healthy
            for (let i in this.passengerArray) {
                if (!this.passengerArray[i].isHealthy) {
                    return true;
                }
            }
            return false;
        };

        getFood() {
            // Set a variale to hold total food
            // Loop through the Passengers Array and add all the food values
            // Return the total food
            let totalFood = 0;
            for (let i in this.passengerArray) {
                totalFood = totalFood + this.passengerArray[i].food;
            }
            return totalFood;       
        };

    }

    /*
    * Play the game
    *
    * Create 5 healthy travelers object with a random amount of food between 0 and 100 (inclusive)
    *
    * Create wagon with an empty passenger list and a capacity of 4.
    *
    * Make 3 of 5 the travelers eat by calling their eat methods
    *
    * Make the remaining 2 travelers hunt
    *
    * Create an array of your travelers, loop over the array of travelers and give each traveler a 50% chance
    * of attempting to be being added to the wagon using the wagons addPassenger method.
    *
    * Run the isQuarantined method for the wagon
    *
    * Run the getFood method for the wagon
    *
    * the return values of all the methods should be displayed in the console using console.log()
    * the console.log statements should not live inside any methods on the objects 
    *
    */

})();
