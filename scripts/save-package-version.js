var path = require('path');
var replace = require('replace-in-file');

var buildVersion = process.env.npm_package_version;
console.log('buildVersion=' + buildVersion);

var envFilePath = path.join(__dirname, '../src/environments/environment.prod.ts'),
    envFilePathDev = path.join(__dirname, '../src/environments/environment.ts');
console.log('envFilePath=' + envFilePath);

const options = {
    files: [envFilePathDev, envFilePath],
    from: [/version: '(.*)'/g],
    to: ["version: '"+ buildVersion + "'"],
    allowEmptyPaths: false,
};
 
try {
    let changedFiles = replace.sync(options);
    if (changedFiles == 0) {
        //-throw "Please make sure that file '" + options.files + "' has \"version: ''\"";
    }
    console.log('Build version set: ' + buildVersion);
}
catch (error) {
    console.error('Error occurred:', error);
    throw error
}