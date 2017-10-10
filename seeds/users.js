
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, user_name: 'sled_god', hashed_password: 'password', email: 'asdfadf@gmail.com', bio: 'blah blah blah', admin: 'true', my_invite_code: 'skate', inviter_code: 'none'},
        {id: 2, user_name: 'zephyum', hashed_password: 'carebear', email: 'sdfjjjjjdja@gmail.com', bio: 'etc. etc. etc.', admin: 'true', my_invite_code: 'idk', inviter_code: 'none'},
        {id: 3, user_name: 'nonskater', hashed_password: 'drowssap', email: 'asd123231df@gmail.com', bio: 'halb halb halb', admin: 'true', my_invite_code: 'walk', inviter_code: 'none'}

      ]);
    });
};
