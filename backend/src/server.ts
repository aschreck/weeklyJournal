import * as Entry from './Entry'
import * as Koa from 'koa';
import * as bodyParser from 'koa-bodyparser';
import * as session from 'koa-session';
import * as passport from 'koa-passport'
import * as json from 'koa-json';
import * as Router from 'koa-router';
require('./services/passport')
require('dotenv').config()

const app = new Koa()
const router = new Router

router.get('/journal',(ctx, next) => {
  ctx.body = Entry.deliverEntryOrNull()
  ctx.status = 200;
})

router.post('/journal', async (ctx, next) => {
  const outcome = Entry.startNewJournalWeek()
  if (outcome === true) {
    ctx.status = 201;
  } else {
    ctx.status = 400;
    ctx.body = "Resource already exists!"
  }
  await next();
})

router.put('/journal', async (ctx, next) => {
  const entry = ctx.request.body;
  try {
    ctx.status = 200;
    Entry.writeJournalEntry(entry);
  } catch (e) {
    ctx.status = 500
  }
  await next();
})

app.keys = ["asdfasdfwqerdfFFFKDKDeeasdfl"]
app.use(session({}, app));

app.use(bodyParser());

app.use(passport.initialize())
app.use(passport.session())
app.use(json());
app.use(router.routes());
app.use(router.allowedMethods());

require('./routes/authRoutes')(router)
const address = 8080
console.log('Listening on port:', address);
app.listen(address);