// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: {
      filename: 'postgres://localhost/skate_spot'
    }
  },
  test: {
    client: 'pg',
    connection: {
        filename: 'postgres://localhost/skate_spot_test'
    }
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }

};
