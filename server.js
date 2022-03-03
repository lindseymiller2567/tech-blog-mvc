const express = require('express');
const session = require('express-session');
// const exphbs = require('express-handlebars'); // require handlebars 
// const helpers = require('./utils/helpers'); // require helper functions 

const app = express();
const PORT = process.env.PORT || 3001;

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
    secret: 'Super secret secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(session(sess));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// for when you have routes
// app.use(routes)

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Server now listening on PORT ${PORT}!`));
});