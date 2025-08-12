const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { connectDB } = require('./config/db');


const app = express();

// middlewares 
app.use(express.json());
app.use(cors());

app.get('/test', () => {
    return 'Test successfull.'
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, async () => {
    try {
        await connectDB();
        console.log(`server running on port:${PORT}`)
    } catch (error) {
        console.log('Server connection failed.')
        console.log(error);
    }
})