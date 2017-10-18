var express = require('express');
var router = express.Router();
var knex = require('../knex');
var bcrypt = require('bcrypt');
var salt = bcrypt.genSaltSync(10);

router.get('/users', (req, res, next)=>{
  knex('users')
  .orderBy('id')
  .then((users)=>{
    res.json(users)
  })
  .catch((err)=> {
    next(err)
  })
});

router.get('/users/:id', (req, res, next)=>{
  const id = req.params.id;
  knex('users')
  .where('id', id)
  .then((users)=>{
    res.json(users)
  })
  .catch((err)=>next(err))
});

router.post('/users', (req, res, next) => {
  const { user_name, first_name, last_name, email, password, bio, admin, invite_code, inviter_id } = req.body
  knex('users')
  .insert({
    user_name: user_name,
    first_name: first_name,
    last_name: last_name,
    email: email,
    hashed_password: bcrypt.hashSync(password, salt),
    bio: bio
    // admin: admin,
    // invite_code: invite_code,
    // inviter_id: inviter_id
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

router.patch('/users/:id', (req, res, next)=>{
  const id = req.params.id
  const {user_name, first_name, last_name, email, password, bio, admin, invite_code, inviter_id } = req.body

  let editUser = {}

  if(user_name){
    editUser.user_name = user_name
  }
  if(first_name){
    editUser.first_name = first_name
  }
  if(last_name){
    editUser.last_name = last_name
  }
  if(email){
    editUser.email = email
  }
  if(password){
    editUser.password = password
  }
  if(bio){
    editUser.bio = bio
  }
  // if(admin){
  //   editUser.admin = admin
  // }
  // if(invite_code){
  //   editUser.invite_code = invite_code
  // }
  // if(inviter_id){
  //   editUser.inviter_id = inviter_id
  // }

  knex('users')
  .where('id', id)

  .then((user)=>{
    knex('users')
    .update(editUser)
    .where('id', id)
    .returning('*')

    .then((users)=>{
      let user = {
        id: users[0].id,
        user_name: users[0].user_name,
        first_name: users[0].first_name,
        last_name: users[0].last_name,
        email: users[0].email,
        bio: users[0].bio
        // admin: users[0].admin,
        // invite_code: users[0].invite_code,
        // inviter_id: users[0].inviter_id
      }
      res.json(user)
    })
    .catch((err)=>next(err))
  })
})

router.delete('/users/:id', (req, res, next)=>{
  console.log("in DELETE YO");
  const id = req.params.id
  console.log(id)
  knex('users')

  .then((users)=>{
    knex('users')
    .del()
    .where('id', id)
    .returning('*')

    .then((users)=> {
      console.log('users:',users)
      let user = {
        id: users[0].id,
        user_name: users[0].user_name,
        first_name: users[0].first_name,
        last_name: users[0].last_name,
        email: users[0].email,
        bio: users[0].bio
        // admin: users[0].admin,
        // invite_code: users[0].invite_code,
        // inviter_id: users[0].inviter_id
      }
      res.json(user)
    })
    .catch((err)=>next(err))
  })
});

module.exports = router;
