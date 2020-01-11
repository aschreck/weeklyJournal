The following is a scratchpad for brainstorming the architecture of the application.

# TODO

- Make typescript refactor feature-comparable with the old Go backend.

- Formalize the morning journaling routine, and use questions from the 5 minute journal.

- implement functionality for starting a new journal week

- allow updates to weekly categories

- Set up a method of creating a CSV that will will track your numbers.

- It currently cannot handle a jump across years.

# Frontend Behavior

As a user, I want to be able to log into the app. Once logged in, I want to arrive at a customized account screen. From here I want to see all of the weeks that I have journaled. These should be read only. If a week is not already in progress, or there are no previously started weeks, I should see a button to start a new journal circuit.

# Journal Categories

- *Review from last week*: This section will be reserved for reflecting on the state of the previous week's goals. To facilitate this, a printout of the previous week's goal section should appear next to the in-progress text box for this week.

- *Wins/Gratitudes*: While reflecting on the previous week, spend time enumerating gratitudes.

- *Goals for the next week*: Declare focuses and points of emphasis for the coming weeks.

- *Projects*: Lay out any projects that you want to focus on.

- *Updates*: A place to jot down other notes throughout the week.

# Backend

The backend will be a nodeJS app the general purpose of which is to receive these journal entries and store them. Due to the ad hoc nature of this application, the current architecture is to receive the entries as JSON and write them as files to the filesystem. Some provision will also need to be made to sync them with dropbox or some other storage mechanism (google is a possibility but seems like a pain).

At this time it makes sense to make this a local-only application. This will get around the problem of having to do multi-tenancy and authentication/authorization.

The backend will, at a minimum, receive JSON, write it to the filesystem, and provide API routes to read and return certain components of this writing. Care should be paid to make it possible for this app to be moved to some external hosting provider and allow for multi-tenancy, but the first draft of this application will assume that this app will be run locally for one user. Multiple users will likely require a database, but a single user model can exist simply on the filesystem.

When the user initializes the app, I want to immediately run a function that checks to see whether there is already a file that has started for the week. This function should either return the current version of the JSON (the plan is to use a default template that has an empty string for the value of the JSON, so the frontend will just have whatever the user has filled out so far.)

So there should be one API endpoint called "getJournal" that either sends them back the info that they want or returns a 404. From there the frontend can use the status code to decide what to do.

The backend should be agnostic as to what the frontend wants to do with the JSON. The frontend will also be agnostic as to what has changed and send back the entire json package.

# CSV Tracking

Tasks to be complete:

1) An API route to set and update the categories you want to be tracked in the CSV. So this will need a GET route and a post/patch route. The user should be able to view the categories that they have set, and also to add or remove new categories. These user preferences will be placed inside a JSON file.