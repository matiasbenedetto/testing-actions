const semver = require('semver');
const fs = require('fs');
const core = require('@actions/core');

const releaseType = process.env.RELEASE_TYPE;
const VALID_RELEASE_TYPES = ['major', 'minor', 'patch'];

function updateVersion () {
    if ( !VALID_RELEASE_TYPES.includes(releaseType) ) {
        console.error("❎  Error release type is not valid. Valid release types are: major, minor, patch");
        process.exit(1);
    }

    if (!fs.existsSync('./package.json')) {
        console.error("❎  Error package.json file not found");
        process.exit(1);
    }

    const package = require('./package.json');
    const currentTag = package.version;
    const newTag = semver.inc(currentTag, releaseType);

    if (!semver.valid(currentTag)) {
        console.error(`❎  Error: current tag ( ${ currentTag } ) is not a valid semver version"`);
        process.exit(1);
    }

    // update package.json version
    package.version = newTag;
    fs.writeFileSync('./package.json', JSON.stringify(package, null, 2));
    console.info('✅ Version updated', currentTag, '=>', newTag);

    // update readme.txt version
    core.setOutput('NEW_TAG', newTag);
}

updateVersion();


