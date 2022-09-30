const fs = require('fs');
const crypto = require('crypto');

const API_URL = "https://www.googleapis.com/webfonts/v1/webfonts?key=";
const API_KEY = process.env.GOOGLE_FONTS_API_KEY;

function calculateHash (somestring){
    return crypto.createHash('md5').update(somestring).digest('hex').toString();
};

async function updateFiles () {
    const newApiData = await fetch(`${API_URL}${API_KEY}`);
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