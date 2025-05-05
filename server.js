const mongoose = require('mongoose');
require('dotenv').config({ path: 'config.env' });

const app = require('./app');

async function startServer() {
    try {

        const { PORT, MONGODB_URI } = process.env;

        //Connect to the database
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to the database');

        // App listen
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.log('There is some internal error', error);
        process.exit(1);
    }
}

startServer();