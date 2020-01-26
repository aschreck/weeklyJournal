import * as passport from 'koa-passport';

module.exports = (router: any) => {
  router.get('/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  )

  router.get('/auth/google/callback', passport.authenticate('google'))

  router.get('/api/logout', (ctx: any) => {
    ctx.logout();
    ctx.body(ctx.state.user);
  })

  router.get('/api/currentUser',(ctx: any) => {
   ctx.body = ctx.state.user
  })
}