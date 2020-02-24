import * as Entry from "../components/Entry";
import { IJournalPrompts, IJournalEntry } from "../interfaces";
import express = require("express");
const Ajv = require("ajv");
const ajv = new Ajv({ allErrors: true });

const weeklyPromptSchema = {
  required: ["prompts"],
  properties: {
    prompts: { type: "array" }
  },
  additionalProperties: false
};

const dailyPromptSchema = {
  required: ["prompts"],
  properties: {
    prompts: { type: "array" }
  },
  additionalProperties: false
};

module.exports = (router: any) => {
  router.get("/api/currentJournal", async (req: any, res: express.Response) => {
    const id = req.user[0].id;
    console.log("id is:", id);
    const result = await Entry.fetchCurrentJournal(id);
    if (result.length > 0) {
      res.send(result);
    } else {
      res.status(404).send("Entry not found");
    }
  });

  router.get("/api/journal", async (req: any, res: express.Response) => {
    const id = req.user[0].id;
    const result = await Entry.getJournalEntry(id);
    res.status(200);
    res.send(result);
  });

  router.put("/api/journal", async (req: any, res: express.Response) => {
    const id = req.user[0].id;
    const journalEntry: IJournalEntry = req.body;
    console.log(journalEntry);
    const ok = Entry.updateJournalEntry(id, journalEntry);
    if (ok) {
      res.status(201);
      res.send({ message: "Resource updated" });
    } else {
      res.send(500);
    }
  });

  router.post("/api/journal", async (req: any, res: express.Response) => {
    const id = req.user[0].id;
    console.log("id is: ", id);
    const ok = await Entry.startNewJournalWeek(id);
    if (ok) {
      res.status(201);
      res.send({ message: "Resource created" });
    } else {
      res.send(500);
    }
  });

  router.get("/api/weeklyPrompts", async (req: any, res: express.Response) => {
    const id = req.user[0].id;
    const prompts = await Entry.getWeeklyPrompts(id);

    res.send({ message: prompts });
  });

  router.post("/api/weeklyPrompts", async (req: any, res: express.Response) => {
    const prompts: IJournalPrompts = req.body;
    const id = req.user[0].id;

    const validate = ajv.compile(weeklyPromptSchema);
    const valid = validate(prompts);

    if (!valid) {
      res.status(400);
      res.send({ message: "Input does not match schema" });
    }

    const result = await Entry.setWeeklyPrompts(prompts, id);

    if (result) {
      res.status(201);
      res.send({ message: "Created" });
    } else {
      res.status(500);
      res.send({ message: "Something went wrong" });
    }
  });

  router.get("/api/dailyPrompts", async (req: any, res: express.Response) => {
    const id = req.user[0].id;

    const prompts = await Entry.getDailyPrompts(id);

    res.send({ message: prompts });
  });

  router.post("/api/dailyPrompts", async (req: any, res: express.Response) => {
    const prompts: IJournalPrompts = req.body;
    const id = req.user[0].id;

    const validate = ajv.compile(dailyPromptSchema);
    const valid = validate(prompts);

    if (!valid) {
      res.status(400);
      res.send({ message: "Input does not match schema" });
    }

    const result = await Entry.setDailyPrompts(prompts, id);

    if (result) {
      res.status(201);
      res.send({ message: "Created" });
    } else {
      res.status(500);
      res.send({ message: "Something went wrong" });
    }
  });
};
