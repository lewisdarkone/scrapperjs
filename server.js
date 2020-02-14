const mongoose = require('mongoose');
const dotEnv = require('dotenv')



//get uncaught exceptions occurs in any place of application
process.on('uncaughtException', err =>{
    //console.log(err.name. err.message);
    console.log(err);
    process.exit(1);
});


const app = require('./app');


console.log(`${process.env.NODE_ENV}`);
dotEnv.config();
console.log(`${process.env.NODE_ENV}`);

//DB hosted
//const DB = process.env.DATABASE.replace('<PASSWORD>',process.env.DATABASE_PASSWORD);

//DB LOCAL/HOSTED CONNECT
mongoose.connect(process.env.DATABASE_LOCAL,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:false,
    useUnifiedTopology: true
})
.then(() =>console.log('DB connected success!'))
.catch(err => console.log(err));



const port = process.env.PORT || 3000;



const server = app.listen(port,() =>{

    console.log(`Listen app in port ${port}...`);
    });


process.on('unhandledRejection', err =>{
    console.log(err);
    //console.log(err.name. err.message);
    server.close(() =>{
        process.exit(1);
    });
});

