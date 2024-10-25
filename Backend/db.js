const mongoose = require('mongoose');

// const mongoURI = "mongodb://localhost:27017/";

const connectToMongo = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/inotebook');
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB', error);
    }
};

module.exports = connectToMongo;

// const connectToMongo = () => {
//     mongoose.connect(mongoURI, () => {
//         console.log("Connected to Mongo Successfully");
//     })
// }

// module.export = connectToMongo;