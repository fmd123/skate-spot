module.exports = {

  // test: {
  //   client: 'pg',
  //   connection: 'postgres://localhost/students_test'
  // },

  development: {
    client: 'pg',
    connection: 'postgres://localhost/skatespot_dev'
  },

  production: {
    client: 'pg',
    connection: process.env.skatespot_dev
  }

};
