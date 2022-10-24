const semver = require('semver');
const fs = require('fs');

const currentTag = process.env.CURRENT_TAG;
const releaseType = process.env.RELEASE_TYPE;

function updateVersion () {
    const newTag = semver.inc(currentTag, releaseType);

    if (!semver.valid(currentTag) && !semver.valid(newTag)) {
        console.error("❎  Error current tag is not a valid semver version");
        process.exit(1);
    }

    if (!fs.existsSync('./package.json')) {
        console.error("❎  Error package.json file not found");
        process.exit(1);
    }

    // update package.json version
    if (fs.existsSync('./package.json')) {
        var package = require('./package.json');
        package.version = newTag;
        fs.writeFileSync('./package.json', JSON.stringify(package, null, 2));
        console.info('✅ Version updated', currentTag, '=>', newTag);
    }

    // update readme.txt version
}

updateVersion();


