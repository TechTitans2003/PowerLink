require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const ejs = require('ejs');
const path = require('path');

const connectDb = require('./db/db');

const authRouter = require('./routes/auth-route');
const deviceRouter = require('./routes/device-route');
const adminRouter = require('./routes/admin-route');
const contactRouter = require('./routes/contact-route');
const sensorRouter = require('./routes/sensor-route');
const errorMiddleware = require('./middlewares/error-middleware');

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.use('/', authRouter);
app.use('/api/device', deviceRouter);
app.use('/api/admin', adminRouter);
app.use('/api/contact', contactRouter);
app.use('/api/sensor', sensorRouter);

// Use the client app
app.use(express.static(path.join(__dirname, '/public/')));

app.use(errorMiddleware);


app.get('/', (req, res) => {
    res.cookie('mime', 'hello');
    res.render("index");
});

app.get("/api", (req, res) => {
    res.send("Hello, We Welcome You Here");
})

const port = 4000;

connectDb().then(() => {
    app.listen(port, () => {
        console.log(`Server is started at http://127.0.0.1:${port}`);
    })
});