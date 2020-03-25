let childProcess = require('child_process');
let checkDockerInstalled = childProcess.execSync(
    'docker -v'
);
if(checkDockerInstalled.toString().includes('Docker version')) {
    let checkExistingDockerImages = childProcess.execSync(
        'docker images'
    );
    if(!checkExistingDockerImages.toString().includes('mcr.microsoft.com/mssql/server')) {
        let installDockerImage = childProcess.execSync(
            'docker pull mcr.microsoft.com/mssql/server:2019-CU3-ubuntu-18.04'
        );
        if(installDockerImage.toString().includes('Digest:')) {
            childProcess.execSync(
                'docker run -e \'ACCEPT_EULA=Y\' -e \'MSSQL_SA_PASSWORD=SecretP@ssw0rd\' --hostname sql2019 -p 1401:1433 --name sql2019ubuntu -d mcr.microsoft.com/mssql/server:2019-CU3-ubuntu-18.04'
            );
        }
    }
    let configuration = {
        'user': 'sa',
        'password': 'SecretP@ssw0rd',
        'server': 'localhost',
        'port': 1401,
        'databaseName': 'contactUs'
    };
    module.exports = configuration;
}
else {
    // eslint-disable-next-line no-console
    console.error('Docker not installed. Execute tests by enabling param "--databaseAvailable true", and by providing database details in "tests\\config\\databaseConfig.json"');
    // eslint-disable-next-line no-process-exit
    process.exit(1);
}

