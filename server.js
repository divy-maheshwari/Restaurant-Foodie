const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');
const fileUpload = require('express-fileupload')
require('dotenv').config();
const DB = require('./config/keys').MONGOURI
require('./config/passport')(passport);
mongoose.connect(DB,{ useNewUrlParser: true,useUnifiedTopology: true },() => {
    console.log('connected to DB');
});

const app = express();
app.use(cors());
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(fileUpload());


app.use(passport.initialize());


app.use('/api/user',require('./routes/userRoute'))
app.use('/api/products',require('./routes/productRoutes'));
app.use('/api/paytm',require('./routes/paymentRoutes'));


port = 5000;
app.listen(port,() => {
    console.log(`server running at ${port}`);
});

module.exports = app;