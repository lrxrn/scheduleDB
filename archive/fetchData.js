const fs = require('fs');
const axios = require('axios');

// Function to map each object to a new object with a module
function mapObjectsToModules(objects) {
    return objects.map(obj => {
        return {
            ...obj,
            module: obj.intake
        };
    });
}

// Fetch the JSON file from the link
axios.get('https://s3-ap-southeast-1.amazonaws.com/open-ws/weektimetable')
    .then(response => {
        const jsonData = response.data;

        // Map each object to a new object with a module
        const mappedData = mapObjectsToModules(jsonData);

        // Create an object with the key as "module" and the respective modules under the module ID in an array
        const moduleObject = mappedData.reduce((acc, obj) => {
            if (!acc[`${obj["INTAKE"]}_${obj["GROUPING"]}`]) {
                acc[`${obj["INTAKE"]}_${obj["GROUPING"]}`] = [];
            }
            acc[`${obj["INTAKE"]}_${obj["GROUPING"]}`].push(obj);
            return acc;
        }, {});

        // Write the module object to a new JSON file
        const timestamp = new Date().toISOString().replace(/:/g, '-');
        fs.writeFile(`./files/output_${timestamp}.json`, JSON.stringify(moduleObject), 'utf8', err => {
            if (err) {
                console.error('Error writing JSON file:', err);
                return;
            }

            console.log('Mapping and writing JSON file completed successfully!');
        });
    })
    .catch(error => {
        console.error('Error fetching JSON file:', error);
    });
