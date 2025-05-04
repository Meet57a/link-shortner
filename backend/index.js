require('dotenv').config({});
const app = require('./src/app');
const DB = require('./src/db/db.config');

DB();



app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});