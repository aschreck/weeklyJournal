import passport = require('passport');
import express = require('express')
module.exports = (app: any) => {
  app.get('/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  )

  app.get('/auth/google/callback',
    passport.authenticate('google'),
    (req: express.Request, res: express.Response) => {
      res.redirect('/api/currentUser')
    }
  )

  app.get('/api/logout', (req: express.Request, res: express.Response) => {
    req.logout();
    res.send(req.user);
  })

  app.get('/api/currentUser',(req: express.Request, res: express.Response) => {
    res.send(req.user)
  })
}