const passport = require('koa-passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
require('dotenv').config()
const pg = require('knex')(require('../../knexfile.js')["development"])

passport.serializeUser((user: any, done: any) => {
  console.log('inside serialize user, user: ', user);
  done(null, user[0].id)
})

passport.deserializeUser((id: any, done: any) => {
  pg('users').where({id})
    .then((user: any) => {
      done(null, user)
    })
})
passport.use(
  new GoogleStrategy({
    clientID: process.env.GOOGLECLIENTID,
    clientSecret: process.env.GOOGLECLIENTSECRET,
    callbackURL: "/auth/google/callback"
  },
  (accessToken: any, refreshToken: any, profile: any, done: any) => {
   pg('users').where({googleID: profile.id})
    .then((existingUser: any) => {
      try{
        if (existingUser.length > 0) {
          console.log('existing user is:', existingUser[0]);
          done(null, existingUser[0])
        } else {
          pg('users').insert(
            {
              googleID: profile.id,
              name: profile.name.givenName,
              surname: profile.name.familyName
            }
          )
          .returning('*')
          .then((user: any) => {
            done(null, user);
          })
        }
      } catch(err) {
        console.log(err)
      }
    })
  })
)