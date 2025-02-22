const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');

//load env vars
dotenv.config({ path: './config/config.env' });

connectDB();

const app = express();

//body parser
app.use(express.json());

//cookie parser
app.use(cookieParser());

/*app.get('/', (req, res) => {
  res.status(200).json({ success: true, data: {id:1} });
});*/

/*app.get('/api/v1/hospitals', (req, res) => {
    res.status(200).json({ success: true, msg: 'Show all hospitals' });
});

app.get('/api/v1/hospitals/:id', (req, res) => {
    res.status(200).json({ success: true, msg: `Show hospital ${req.params.id}` });
});

app.post('/api/v1/hospitals', (req, res) => {
    res.status(200).json({ success: true, msg: 'Create new hospitals' });
});

app.put('/api/v1/hospitals/:id', (req, res) => {
    res.status(200).json({ success: true, msg: `Update hospital ${req.params.id}` });
});

app.delete('/api/v1/hospitals/:id', (req, res) => {
    res.status(200).json({ success: true, msg: `Delete hospital ${req.params.id}` });
});*/

const hospitals = require('./routes/hospitals');
app.use('/api/v1/hospitals', hospitals);

const appointments = require('./routes/appointments');
app.use('/api/v1/appointments', appointments);

const auth = require('./routes/auth');
app.use('/api/v1/auth', auth);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));

process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`);
    //close server & exit process
    server.close(() => process.exit(1));
});

