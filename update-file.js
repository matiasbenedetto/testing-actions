const fs = require('fs');
const crypto = require('crypto');

const API_URL = "https://weathered-surf-2f67.meb.workers.dev";

function calculateHash (somestring){
    return crypto.createHash('md5').update(somestring).digest('hex').toString();
};

async function updateFiles () {
    const newApiData = await fetch(API_URL);
    const newData = await newApiData.json();
    const newDataString = JSON.stringify(newData, null, 2);

    const oldFileData = fs.readFileSync('./assets/google-fonts/fallback-fonts-list.json', 'utf8');
    const oldData = JSON.parse(oldFileData);
    const oldDataString = JSON.stringify(oldData, null, 2);

    if ( calculateHash(newDataString) !== calculateHash(oldDataString) ) {
        fs.writeFileSync('./assets/google-fonts/fallback-fonts-list.json', newDataString);
        console.log("File updated");
    }
}


updateFiles ();