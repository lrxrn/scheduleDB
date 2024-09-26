// takes in two json files and merges them into one json file
const fs = require('fs');
const path = require('path');

// prompt user for the file names
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

readline.question('Enter the first json file name: ', (firstFile) => {
    readline.question('Enter the second json file name: ', (secondFile) => {
        readline.question('Enter the output file name: ', (outputFile) => {
            mergeJson(firstFile, secondFile, outputFile);
            readline.close();
        });
    });
});

// Deep merge function
function deepMerge(obj1, obj2) {
    for (const key in obj1) {
        if (obj1.hasOwnProperty(key)) {
            if (obj2.hasOwnProperty(key)) {
                if (Array.isArray(obj1[key]) && Array.isArray(obj2[key])) {
                    // Merge arrays and remove duplicates
                    obj2[key] = [...new Set([...obj1[key], ...obj2[key]])];
                } else if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
                    // Recursively merge objects
                    deepMerge(obj1[key], obj2[key]);
                } else {
                    obj2[key] = obj1[key];
                }
            } else {
                obj2[key] = obj1[key];
            }
        }
    }
    return obj2;
}

// function to merge two json files
function mergeJson(firstFile, secondFile, outputFile) {
    // check if the files exist
    if (!fs.existsSync(firstFile)) {
        console.error('File not found:', firstFile);
        return;
    }
    if (!fs.existsSync(secondFile)) {
        console.error('File not found:', secondFile);
        return;
    }

    // read the first file
    firstData = fs.readFileSync(firstFile, 'utf8');
    firstJson = JSON.parse(firstData);
    // log the json object count in the first file
    console.log(`First file has ${Object.keys(firstJson).length} json objects and has ${Object.values(firstJson).flat().length} values`);

    // read the second file
    secondData = fs.readFileSync(secondFile, 'utf8');
    secondJson = JSON.parse(secondData);
    // log the json object count in the second file
    console.log(`Second file has ${Object.keys(secondJson).length} json objects and has ${Object.values(secondJson).flat().length} values`);

    // merge the two json objects
    const mergedJson = deepMerge(firstJson, secondJson);
    // log the json object count in the merged file
    console.log(`Merged file has ${Object.keys(mergedJson).length} json objects and has ${Object.values(mergedJson).flat().length} values`);

    // Ask the user to confirm the merge
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });

    writeJsonToFile(outputFile, mergedJson);
}

// function to write the merged json to a file
function writeJsonToFile(outputFile, mergedJson) {
    fs.writeFile(outputFile, JSON.stringify(mergedJson), 'utf8', (err) => {
        if (err) {
            console.error('Error writing JSON file:', err);
            return;
        }
        console.log('Merged JSON file written to', outputFile);
    });
}