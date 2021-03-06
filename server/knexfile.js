module.exports = {
  development: {
    client: 'pg',
    // connection:'postgres://localhost/weeklyJournal_dev',
    connection: {
      database: 'weeklyjournal_dev',
      user: 'postgres',
      password: 'password',
      host: 'localhost'
    },
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds/dev'
    },
    useNullAsDefault: true,
    debug: true
  },

  test: {
    client: 'pg',
    connection:'postgres://localhost/<examples_test>',
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds/test'
    },
    useNullAsDefault: true
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds/production'
    },
    useNullAsDefault: true
  }
}
