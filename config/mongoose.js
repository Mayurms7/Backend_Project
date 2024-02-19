//reuire library
const mongoose=require('mongoose');

//connect to DB
mongoose.connect('mongodb+srv://mayurms7:mayursutarms7@placementcelldb.2ytrkrl.mongodb.net/?retryWrites=true&w=majority');

//acquire the conection
const db=mongoose.connection;

db.on('error',console.error.bind(console,'error connecting db'));

db.once('open',function()
{
    console.log('Successfully Connected to DB');
});

