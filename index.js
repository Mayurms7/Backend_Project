const express = require('express');
const mongoose = require('mongoose');


const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost/employeeReviewSystem');

const db =mongoose.connection;

db.on('error',console.error.bind(console,'error connecting db'));

db.once('open',function()
{
    console.log('Successfully Connected to DB');
});

app.use('/auth',require('./Routes/authRoutes'));
app.listen(8000, ()=> console.log(`Server Running on PORT 8000`));