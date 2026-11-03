const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/passes', require('./routes/passRoutes'));

app.get('/', (req, res) => {
    res.send('College Bus Pass Server Running');
});

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB Connected');

        app.listen(process.env.PORT || 5000, () => {
            console.log('Server running on port 5000');
        });
    })
    .catch(error => console.log('MongoDB Error:', error));