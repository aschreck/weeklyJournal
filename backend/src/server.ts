import * as express from 'express';
import * as bodyParser from 'body-parser';
const cookieSession = require('cookie-session');
import * as passport from 'passport'
require('./services/passport')
require('dotenv').config()

const app = express()


const keys = ["asdfasdfwqerdfFFFKDKDeeasdfl"]

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: keys
  })
)

app.use(bodyParser());

app.use(passport.initialize())
app.use(passport.session())

require('./routes/authRoutes')(app);
require('./routes/appRoutes')(app)

const address = 8080
console.log('Listening on port:', address);
app.listen(address);