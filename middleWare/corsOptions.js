const allowedOrigins = require('./allowedOrigins')

const corsOptions = {

    origin: (origin, callback) => {
        if(allowedOrigins.indexOf(origin) !== -1 || !origin){
            callback(null, true)
        }
        else
        {
            const error = new Error('Not Allowed by CORS');
            error.status = 403; // Set the status code
            callback(error);        }
    },
    //credentials: true,
    optionsSuccessStatus: 200
}
module.exports = corsOptions