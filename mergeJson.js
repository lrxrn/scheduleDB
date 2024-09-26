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

// function to merge two json files
function mergeJson(firstFile, secondFile, outputFile) {
    // read the first file
    fs.readFile(firstFile, 'utf8', (err, data1) => {
        if (err) {
            console.error(err);
            return;
        }

        // read the second file
        fs.readFile(secondFile, 'utf8', (err, data2) => {
            if (err) {
                console.error(err);
                return;
            }

            try {
                // parse the json data
                const jsonData1 = JSON.parse(data1);
                const jsonData2 = JSON.parse(data2);

                // merge the two json objects
                const mergedData = { ...jsonData1, ...jsonData2 };

                // write the merged data to the output file
                fs.writeFile(outputFile, JSON.stringify(mergedData, null, 2), 'utf8', (err) => {
                    if (err) {
                        console.error('Error writing JSON file:', err);
                        return;
                    }

                    console.log(`Merged JSON files successfully and saved to ${outputFile}`);
                });
            } catch (error) {
                console.error('Error parsing JSON:', error);
            }
        });
    });
}