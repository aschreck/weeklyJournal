// const Koa = require('koa');
// const Router = require('koa-router');
// const Entry = require('./Entry')
import * as Koa from 'koa';
import * as Router from 'koa-router';

const app = new Koa()
const router = new Router
const journalPath = "./entries"

router.get('/journal',(ctx, next) => {
  // need to feed it the appropriate date.

  console.log('this is working');
  // computePreviousSaturday()

})

app.use(router.routes());
app.use(router.allowedMethods());

const address = 8080
console.log('Listening on port:', address);
app.listen(address);