//reuire library
const mongoose=require('mongoose');

//connect to DB
mongoose.connect('mongodb://localhost/placement_cell_db');

//acquire the conection
const db=mongoose.connection;

db.on('error',console.error.bind(console,'error connecting db'));

db.once('open',function()
{
    console.log('Successfully Connected to DB');
});

