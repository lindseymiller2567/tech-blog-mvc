const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars'); // require handlebars 
const helpers = require('./utils/helpers'); // require helper functions if any

const PORT = process.env.PORT || 3001;
const app = express();

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const hour = 3600000

const sess = {
    secret: 'Super secret secret',
    cookie: {
        expires: new Date(Date.now() + hour)
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(session(sess));

const hbs = exphbs.create({ helpers }) // pass the helpers to the existing exphbs.create() statement

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// turn on routes
const routes = require('./controllers/');
app.use(routes)

// turn on connection to db and server
// if changes to model def and associations, you will need to re-configure seqelize db by changing force: false to true
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Server now listening on PORT ${PORT}!`));
});