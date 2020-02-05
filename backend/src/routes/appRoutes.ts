import * as Entry from '../components/Entry'
import { IJournalPrompts, IJournalEntry } from '../interfaces';
import express = require('express');
module.exports = (router: any)  => {

  router.get('/journal',async (req: any, res: express.Response) => {
    const id = req.user[0].id
    const result = await Entry.getJournalEntry(id)
    res.status(200)
    res.send(result)
  })

  router.post('/journal', async (req: any, res: express.Response)  => {
    const id = req.user[0].id
    const journalEntry: IJournalEntry = req.body
    console.log(journalEntry)
    const ok = Entry.updateJournalEntry(id, journalEntry)
    if (ok) {
      res.status(201)
      res.send({message: "Resource updated"})
    } else {
      res.send(500)
    }
  })

  router.put('/journal/create', async (req: any, res: express.Response) => {
    const id = req.user[0].id
    console.log('id is: ', id);
    const ok = await Entry.startNewJournalWeek(id)
    if (ok) {
      res.status(201)
      res.send({message: "Resource created"})
    } else {
      res.send(500)
    }
  })

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