
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, user_name: 'sled_god', hashed_password: 'password', email: 'asdfadf@gmail.com', bio: 'blah blah blah', admin: 'true', my_invite_code: 'skate', inviter_code: 'none'},


      ]);
      .then(()=>)
    });
};
