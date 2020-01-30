import * as Entry from '../components/Entry'
import { IJournalPrompts } from '../interfaces';
import express = require('express');
module.exports = (router: any)  => {

  // router.get('/journal',(req: express.Request, res) => {
  //   ctx.body = Entry.deliverEntryOrNull()
  //   ctx.status = 200;
  // })

  // router.post('/journal', async (req: express.Request, res: express.Response)  => {
  //   const outcome = Entry.startNewJournalWeek()
  //   if (outcome === true) {
  //     ctx.status = 201;
  //   } else {
  //     ctx.status = 400;
  //     ctx.body = "Resource already exists!"
  //   }
  //   await next();
  // })

  // router.put('/journal', async (req: express.Request, res: express.Response) => {
  //   const entry = ctx.req: express.Requestuest.body;
  //   try {
  //     ctx.status = 200;
  //     Entry.writeJournalEntry(entry);
  //   } catch (e) {
  //     ctx.status = 500
  //   }
  //   await next();
  // })

  // router.put('/prompts', async (req: express.Request, res: express.Response) => {
  //   const prompts: IJournalPrompts = ctx.body
  //   console.log('user is:', ctx.isAuthenticated());
  //   const id: string = ctx.state.user
  //   if(!id) {
  //     ctx.throw= 400;
  //   }

  //   Entry.setPrompts(prompts, id)
  //   await next()
  // })
}