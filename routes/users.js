var express = require('express');
var router = express.Router();
var knex = require('../knex');
var bcrypt = require('bcrypt');
var salt = bcrypt.genSaltSync(10);
/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.post('/users', (req, res, next) => {
  const { user_name, first_name, last_name, email, password, bio, admin, invite_code, inviter_id } = req.body
  knex('users')
  .insert({
    user_name: user_name,
    first_name: first_name,
    last_name: last_name,
    email: email,
    hashed_password: bcrypt.hashSync(password, salt),
    bio: bio,
    admin: admin,
    invite_code: invite_code,
    inviter_id: inviter_id
  })
  .returning('*')
  .then((users)=>{
    let user = {
      user_name: users[0].user_name,
      first_name: users[0].first_name,
      last_name: users[0].last_name,
      email: users[0].email,
      bio: users[0].bio
    }
    res.json(user)
  })
  .catch((err)=>{
    next(err)
  })
});

module.exports = router;
