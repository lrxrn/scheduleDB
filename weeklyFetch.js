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

async function fetchAndProcessData() {
    try {
        // Fetch the JSON file from the link
        const response = await axios.get('https://s3-ap-southeast-1.amazonaws.com/open-ws/weektimetable');
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

        // Count the total number of records and unique modules
        const totalRecords = Object.values(moduleObject).reduce((sum, arr) => sum + arr.length, 0);
        const uniqueModules = Object.keys(moduleObject).length;
        
        // Write the data to output.json in the root directory
        fs.writeFileSync('./output.json', JSON.stringify(moduleObject), 'utf8');
        console.log(`Output.json file created successfully with ${totalRecords} total records across ${uniqueModules} unique modules!`);
        
        return true;
    } catch (error) {
        console.error('Error in fetchAndProcessData:', error);
        process.exit(1);
    }
}

// Execute the function when run directly
if (require.main === module) {
    fetchAndProcessData();
}

// Export for potential use in other scripts
module.exports = { fetchAndProcessData };