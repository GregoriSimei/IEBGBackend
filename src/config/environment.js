// Configure environment
const env = process.env.NODE_ENV;
switch(env) {
    case 'production':
        require('dotenv').config({
            path: `${__dirname}/../../.env.prod`
        });
        break
    case 'development':
        require('dotenv').config({
            path: `${__dirname}/../../.env.dev`
        });
        break
    default: 
        require('dotenv').config({
            path: `${__dirname}/../../.env.dev`
        });
        break
}