require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const passport = require('passport');

const { SERVER_STATUS } = require('./config.js');

const app = express();
app.disable('x-powered-by');

//This will create a middleware.
//When you navigate to the root page, it will use the built react-app
if (process.env.NODE_ENV !== 'development') {
    app.use(express.static(path.resolve(__dirname, '../../build')));
}

if (process.env.NODE_ENV === 'development') {
    const morgan = require('morgan');
    app.use(morgan('dev'));
}

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

//ROUTES
const userRouter = require('./routers/user');
app.use('/user', userRouter);

//ROUTES

app.get('/hello', (req, res) => {
    res.send(SERVER_STATUS.HELLO);
})

app.get('*', (req, res) => {
    res.json({ ok: true });
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`\n ${SERVER_STATUS.STARTED} ${port}\n`);
});
