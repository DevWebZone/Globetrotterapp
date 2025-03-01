const fs = require('fs');
let destinations = JSON.parse(fs.readFileSync("assets/data/sample.json", 'utf8'));
//fetchData.getDestinationData();
let correctAnswer;
module.exports.getDestination = function(){
    console.log(destinations.length);
    const randomIndex = Math.floor(Math.random() * destinations.length);
    let destination = destinations[randomIndex];
    const randomFact = Math.floor(Math.random() * destination.fun_fact.length);
    let options = [];
    options.push({
        index: randomIndex,
        city: destination.city,
        country: destination.country
    });
    while(options.length<4){
        const randomIndex1 = Math.floor(Math.random() * destinations.length);
        let destination = destinations[randomIndex1];
        if (!options.some(dest => dest.index === randomIndex1)) {
            options.push({
                index: randomIndex1,
                city: destination.city,
                country: destination.country
            });
        }
    }
    let result = {
        correctAnswer: destination.city + ", " +  destination.country,
        clues: destination.clues,
        fun_fact: destination.fun_fact[randomFact],
        options:options
    }
    correctAnswer = destination.city;
    return result;
};

module.exports.checkAnswer = function(city){
    if(correctAnswer === city)
        return true;
    return false;
};