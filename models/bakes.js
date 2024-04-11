const dataFile = require('../data/data.json');

const fs = require("fs"); 

module.exports = function(dataFile) {
    // Read data.json file 
    fs.readFile(dataFile, function(err, data) { 
        // Check for errors 
        if (err) throw err; 

        // Converting to JSON 
        const bakes = JSON.parse(data); 
        return data; // Print bakes data
    }); 
}