const mongoose = require('mongoose');
const pass = 'VRqrNDuwfsdiydy4';
const uri = "mongodb+srv://vietnt:" + pass + "@vnt-lab-imcek.mongodb.net/test?retryWrites=true";
const options = {
    useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
    // autoIndex: false, // Don't build indexes
    // reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
    // reconnectInterval: 500, // Reconnect every 500ms
    // poolSize: 10, // Maintain up to 10 socket connections
    // // If not connected, return errors immediately rather than waiting for reconnect
    // bufferMaxEntries: 0,
    // connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
    // socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    // family: 4 // Use IPv4, skip trying IPv6
};

// using promise
mongoose.connect(uri, options).then(
    () => {
        /** ready to use. The `mongoose.connect()` promise resolves to undefined. */
        console.log('Connected to database succesfully!');
    },
    err => {
        /** handle initial connection error */
        console.log('Error! Failed to connect to database!');
    }
);