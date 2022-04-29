const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const PORT = process.env.PORT || 3001;

const routes = require("./controllers");
const sequelize = require("./config/connection");

const app = express();

// Set up sessions with cookies
const sess = {
    secret: "Super secret secret",
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize,
    }),
  };
  
  app.use(session(sess));
  
  const hbs = exphbs.create({
    helpers: {
      format_date: date => {
          return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
      }
  }

  });

  // Inform Express.js 
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(express.static(path.join(__dirname, "public")));


app.use(routes);
app.use(require('./controllers/'));

app.listen(PORT, () => {
  sequelize.sync({ force: false });
  console.log(`App listening on port ${PORT}!`);
});