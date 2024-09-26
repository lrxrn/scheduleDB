// take a file as input
const fs = require('fs');
const path = require('path');

// prompt user for the file names
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

readline.question('Enter the file name: ', (fileName) => {
    formatJson(fileName);
    readline.close();
});

formatJson = (fileName) => {
        
    // read the file
    const data = fs.readFileSync(path.join(__dirname, fileName), 'utf8');
    const jsonData = JSON.parse(data);

    // log the json object count in the file
    console.log(`File has ${Object.keys(jsonData).length} json objects and has ${Object.values(jsonData).flat().length} values`);

    // resave the file with the same data
    fs.writeFileSync(fileName, JSON.stringify(jsonData, null, 2));
    console.log('File has been formatted');
}