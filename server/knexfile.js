  module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: 'wandering_mouse',
      username: 'tamara',
      password: 'tamara'
    },
    migrations: {
      directory: 'db/migrations',
    },
    seeds: {
      directory: 'db/seeds'
    },
  },

  production: {
    client: 'pg',
    connection: {
      database: 'wandering_mouse',
      user: 'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: 'db/migrations',
    },
  }

};
