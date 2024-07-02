const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const barbershopRoutes = require('./routes/barbershops');
const barberRoutes = require('./routes/barbers');
const reviewRoutes = require('./routes/reviews');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Database Connection
mongoose.connect('your-mongo-db-connection-string', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Routes
app.use('/api/barbershops', barbershopRoutes);
app.use('/api/barbers', barberRoutes);
app.use('/api/reviews', reviewRoutes);

// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
