The following is a scratchpad for brainstorming the architecture of the application.

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

The backend will be in typescript.