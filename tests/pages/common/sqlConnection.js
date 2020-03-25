const sql = require('mssql');
let wdioConfig = require('../../config/wdio.conf').config;
let config = wdioConfig.databaseProperty;

let pool;
let insertRowResponse;

sql.on('error', err => {
    // eslint-disable-next-line no-console
    console.log(`Error in SQL On. Complete Error is ${err}`);
});

class sqlConnection {
    async authenticate() {
        pool = await sql.connect(config);
        await this.checkTableExist();
    }

    async insertValue(param) {
        let insertQuery = `INSERT INTO contactUs (first_name, email, phone, needed_service, product_sell, random_message)
         VALUES ('${param.firstName}', '${param.email}', '${param.phoneNumber}', '${param.services}', '${param.productType}', '${param.message}');`;
        insertRowResponse = await pool.query(insertQuery);
        return insertRowResponse;
    }

    verifyRowAdded() {
        if(insertRowResponse === undefined) {
            throw new Error('Error in inserting row');
        }
        // eslint-disable-next-line no-console
        console.log('insert row response ---> ', insertRowResponse);
    }

    async closeConnection() {
        await sql.close();
    }

    async fetchLastAddedValue() {
        let fetchResponse = await pool.query('Select * from contactUs');
        fetchResponse = fetchResponse.recordset;
        fetchResponse = fetchResponse[fetchResponse.length - 1];
        return fetchResponse;
    }

    async checkTableExist() {
        let insertTableQuery = `CREATE TABLE contactUs (
            first_name NVARCHAR (50) NOT NULL,
            email NVARCHAR (50) NOT NULL,
            phone NVARCHAR(20),
            needed_service NVARCHAR (50) NOT NULL,
            product_sell NVARCHAR (50) NOT NULL,
            random_message NVARCHAR (4000) NOT NULL
            );`;
        try {
            await pool.query(insertTableQuery);
            let insertQuery = `INSERT INTO contactUs (first_name, email, phone, needed_service, product_sell, random_message)
         VALUES ('Default', 'Default@gmail.com', '9999999990', 'Online Services', 'Digital Products', 'Default Message');`;
            insertRowResponse = await pool.query(insertQuery);
        } catch (e) {
            let insertQuery = `INSERT INTO contactUs (first_name, email, phone, needed_service, product_sell, random_message)
         VALUES ('Default', 'Default@gmail.com', '9999999990', 'Online Services', 'Digital Products', 'Default Message');`;
            insertRowResponse = await pool.query(insertQuery);
        }
    }
}

module.exports = new sqlConnection();