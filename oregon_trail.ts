(function () {

    // Global Functions for Random Numbers

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
                this.food = this.food + 100; 
            }
            return this.food;
        };

        eat() {
            // If food is over 20, deduct 20 food
            // Player is still alive
            if (this.food >= 20) {
                this.food = this.food - 20;
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
        passengerArray: Traveler[] = [];

        constructor(capacity: number){
            this.capacity = capacity;
        }

        addPassenger(traveler: Traveler) {
            // If the overall capacity is less than the size of the array of passenges
            // Add the Traveler
            // Return the String "added"
            if (this.passengerArray.length < this.capacity) {
                this.passengerArray.push(traveler);
                return "added";
            }
            // If above condition is not met, return "sorry"
            return "sorry";
        };

        isQuarantined() {
            // Loop through the Passengers Array
            // Return true if someone is not healthy
            for (let i=0; i < this.passengerArray.length; i++) {
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
            for (let i=0; i < this.passengerArray.length; i++) {
                totalFood += this.passengerArray[i].food;
            }
            return totalFood;       
        };

        // My own thing - gets the passenger name out of the array
        // Makes the console.log below easier to see who 'made it' on the Wagon
        getPassenger() {
            let passengerName = "";
            for (let i=0; i < this.passengerArray.length; i++) {
                passengerName = this.passengerArray.pop().name;

                if (passengerName != null) {
                    return passengerName; 
                }
            }  
            return "This seat is empty"; 
        };

    }
    
    /*
    * Play the game
    */ 
    console.log("*********************");
    console.log("PLAYING OREGON TRAIL!");
    console.log("*********************");

    //Create 5 healthy travelers object with a random amount of food between 0 and 100 (inclusive)

    let bill = new Traveler(10, "Bill", true);
    let jon = new Traveler(90, "Jon", true);
    let gary = new Traveler(80, "Gary", true);
    let mary = new Traveler(70, "Mary", true);
    let mom = new Traveler(60, "Kit", true);

    console.log("Player Created: " + bill.name + " with " + bill.food + " food. isHealthy is: " + bill.isHealthy);
    console.log("Player Created: " + jon.name + " with " + jon.food + " food. isHealthy is: " + jon.isHealthy);
    console.log("Player Created: " + gary.name + " with " + gary.food + " food. isHealthy is: " + gary.isHealthy);
    console.log("Player Created: " + mary.name + " with " + mary.food + " food. isHealthy is: " + mary.isHealthy);
    console.log("Player Created: " + mom.name + " with " + mom.food + " food. isHealthy is: " + mom.isHealthy);
    console.log("*********************");
        
    //Create wagon with an empty passenger list and a capacity of 4.

    let wagon = new Wagon(4);

    console.log("Created a Wagon with a capacity of: " + wagon.capacity);
    console.log("*********************");
    
    // Make 3 of 5 the travelers eat by calling their eat methods

    console.log("About to Make Bill Eat. Food is Currently: " + bill.food);
        bill.eat();
    console.log("Made Bill Eat. Food is now: " + bill.food);

    console.log("About to Make Jon Eat. Food is Currently: " + jon.food);    
        jon.eat();
    console.log("Made Jon Eat. Food is now: " + jon.food);

    console.log("About to Make Gary Eat. Food is Currently: " + gary.food);
        gary.eat();
    console.log("Made Gary Eat. Food is now: " + gary.food);
    console.log("*********************");

    // Make the remaining 2 travelers hunt

    console.log("About to Make Mary Hunt. Food is Currently: " + mary.food);
        mary.hunt();
    console.log("Made Mary Hunt. Food is Now: " + mary.food);    
    
    console.log("About to Make Kit Hunt. Food is Currently: " + mom.food);
        mom.hunt();
    console.log("Made Mom Hunt. Food is Now: " + mom.food); 
    console.log("*********************");     

    // Create an array of your travelers, loop over the array of travelers and give each traveler a 50% chance
    //  of attempting to be being added to the wagon using the wagons addPassenger method.

    let travelersArray = [bill, jon, gary, mary, mom];

    for (let i=0; i < travelersArray.length; i++) {
        if (getZeroToOneRandom() > 0.5) {
            wagon.addPassenger(travelersArray[i]);
        }
    }

    // Print out who is on the Wagon
    for (let i=0; i < travelersArray.length; i++) {
        console.log("Seat on the Wagon: " + wagon.getPassenger());
    }

    // Run the isQuarantined method for the wagon
    let result = wagon.isQuarantined();

    console.log("Is Wagon Quarantined? " + result);
    console.log("*********************");    
    
    // // Run the getFood method for the wagon
    let foodCount = wagon.getFood();

    console.log("Total Food for the Wagon is: " + foodCount);
    console.log("*********************");    

})();
