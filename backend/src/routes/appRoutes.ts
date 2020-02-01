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

  // getting req.user wrapped in an array. Need to figure out how to deal with typing for this.
  router.get('/weeklyPrompts', async (req: any, res: express.Response) => {
    const id = req.user[0].id
    const prompts = await Entry.getWeeklyPrompts(id)

    res.send({message: prompts})
  })

  router.put('/weeklyPrompts', async (req: any, res: express.Response) => {
    const prompts: IJournalPrompts = req.body
    const id = req.user[0].id
    const result = await Entry.setWeeklyPrompts(prompts, id)

    if (result) {
      res.status(201)
      res.send({message: "Created"})
    } else {
      res.status(500)
      res.send({message: "Something went wrong"})
    }
  })

  router.get('/dailyPrompts', async (req: any, res: express.Response) => {
    const id = req.user[0].id

    const prompts = await Entry.getDailyPrompts(id)

    res.send({message: prompts})
  })

  router.put('/dailyPrompts', async (req: any, res: express.Response) => {
    const prompts: IJournalPrompts = req.body
    const id = req.user[0].id

    const result = await Entry.setDailyPrompts(prompts, id)

    if (result) {
      res.status(201)
      res.send({message: "Created"})
    } else {
      res.status(500)
      res.send({message: "Something went wrong"})
    }
  })
}