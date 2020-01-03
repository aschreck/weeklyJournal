// const Koa = require('koa');
// const Router = require('koa-router');
import * as Entry from './Entry'
import * as Koa from 'koa';
import * as Router from 'koa-router';

const app = new Koa()
const router = new Router

router.get('/journal',(ctx, next) => {
  return Entry.deliverEntryOrNull()
})


app.use(router.routes());
app.use(router.allowedMethods());

const address = 8080
console.log('Listening on port:', address);
app.listen(address);