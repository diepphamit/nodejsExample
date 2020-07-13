const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const ejs = require('ejs');

const productRoutes = require('./api/routes/products')
const userRoutes = require('./api/routes/user');

//connect mongoose 
// mongoose.connect("mongodb+srv://node-shop:"+
//     process.env.MONGO_ATLAS_PW
//     +"@node-rest-shop-bngra.mongodb.net/test?retryWrites=true&w=majority",
//     { 
//         promiseLibrary: global.Promise,
//         useNewUrlParser: true,
//         useUnifiedTopology: true 
//     }
// );
mongoose.connect("mongodb://localhost:27017/test",
    { 
        promiseLibrary: global.Promise,
        useNewUrlParser: true,
        useUnifiedTopology: true 
    }
);
//use static file
app.use('/uploads',express.static('uploads'))
//print req to console.log
app.use(morgan('dev'));
//parser request
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//View Engine
app.set('views', path.join(__dirname, 'api/views'));
app.set('view engine', 'ejs');
app.engine('html', ejs.renderFile);

//enable cors for all HTTP methods
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, PATCH, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested, Content-Type, Accept, Authorization");
    next();
});

app.use('/api/products', productRoutes);
app.use('/user', userRoutes);

module.exports = app;