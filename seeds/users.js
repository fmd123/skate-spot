
exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return knex('users').insert([
        {id: 1, user_name: 'sled_god', first_name: 'JJ', last_name: 'Jensen', email: 'jjisverycool@gmail.com', hashed_password: 'jjiscool', bio: 'JJ is extra cool', admin: true, invite_code: 1, inviter_id: 1 }
      ])
      .then(()=>{
        return knex.raw("SELECT setval('users_id_seq', (SELECT MAX(id) FROM users))")
      })
    });
};
