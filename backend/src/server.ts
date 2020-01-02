// const Koa = require('koa');
// const Router = require('koa-router');
import * as Entry from './Entry'
import * as Koa from 'koa';
import * as Router from 'koa-router';
import { dateObj } from './interfaces';

const app = new Koa()
const router = new Router
const journalPath = "./entries"

router.get('/journal',(ctx, next) => {
  const currentDate: dateObj = getDate();
  // This function tells me what filename I should be looking for
  const previousSaturdayDate = Entry.computePreviousSaturday(currentDate)

})

const getDate = (): dateObj => {
  const d = new Date()
  const date: dateObj = {
    weekDay: d.getDay(),
    day: d.getDate(),
    month: d.getMonth(),
    year: d.getFullYear(),
  }

  return date;
}

app.use(router.routes());
app.use(router.allowedMethods());

const address = 8080
console.log('Listening on port:', address);
app.listen(address);