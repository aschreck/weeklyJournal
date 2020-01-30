import * as passport from 'passport';

module.exports = (app: any) => {
  app.get('/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  )

  app.get('/auth/google/callback', passport.authenticate('google'))

  app.get('/api/logout', (ctx: any) => {
    ctx.logout();
    ctx.body(ctx.state.user);
  })

  app.get('/api/currentUser',(ctx: any) => {
   ctx.body = ctx.state.user[0]
  })
}