// Configure environment
const dotenv = require('dotenv');

const env = process.env.NODE_ENV;
switch (env) {
case 'production':
    dotenv.config({
        path: `${__dirname}/../../.env.prod`,
    });
    break;
case 'development':
    dotenv.config({
        path: `${__dirname}/../../.env.dev`,
    });
    break;
default:
    dotenv.config({
        path: `${__dirname}/../../.env.dev`,
    });
    break;
}
