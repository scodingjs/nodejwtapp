const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080

const expressHandleBars = require("express-handlebars")
const session = require("express-session");
const dbSequelize = require("./config/config");
 const SeuqlizeStore = require('connect-session-sequelize')(session.Store)
// const helpers = require("./utils/helpers")
require('dotenv').config()
const sessionSettings = {
    secret: process.env.SESSION_SECRET,
    cookie: {
        maxAge: 300000,
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
    },
    resave: false,
    saveUninitialized: true,
    store: new SeuqlizeStore({
        db: dbSequelize
    })
};

app.use(session(sessionSettings))

const hbs = expressHandleBars.create({ helpers });

app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.use(require('./controllers'))

// dbSequelize.sync({ force: false }, () => {
    app.listen(PORT, () => {
        console.log(`App running on ${PORT}`)
    })
// })