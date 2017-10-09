'use strict';

const express = require('express');
const knex = require('../knex');
const router = express.Router();

router.get('/', (req, res, next) => {
  console.log("here");
  knex('spots')
  .orderBy('id')
  .then((spots)=> {
    res.send(spots)

    // iterate through spots (records), accumulate an array
    // of simple {lat, long} objects
    // var myArray
    // res.render('map', {
    //   title: 'Skate-Spotter',
    //   myArray: myArrayOfObjects
    // });
  })
  .catch((err)=> {
    next(err)
  })
});

router.get('/:id', (req, res, next) =>{
  const id = req.params.id;
  knex('spots')
  .where('id', id)
  .then((spots) => {
    res.json(spots[0])
  })
  .catch((err) => next(err))
});

router.post('/', (req, res, next) => {
  const { name, location, bust, difficulty, photo_url, description } = req.body
  knex('spots')
  .insert({
    name,
    location,
    bust,
    difficulty,
    photo_url,
    description
  })
  .returning('*')
  .then((spots)=>{
    let spot = {
      id: spots[0].id,
      name: spots[0].title,
      location: spots[0].location,
      bust: spots[0].bust,
      difficulty: spots[0].difficulty,
      photo_url: spots[0].photo_url,
      description: spots[0].description
    }
    res.json(spot)
  })
  .catch((err)=>next(err))
});
router.patch('/', (req, res, next) => {
  const id = req.params.id
  const { name, location, bust, difficulty, photo_url, description } = req.body

  let newSpot = {}

  if(name) {
    newSpot.name = name
  }
  if(location) {
    newSpot.location = location
  }
  if(bust) {
    newSpot.bust = bust
  }
  if(difficulty) {
    newSpot.difficulty = difficulty
  }
  if(photo_url) {
    newSpot.photo_url = photo_url
  }
  if(description) {
    newSpot.description = description
  }

  knex('spots')
  .where('id', id)

  .then((spots) => {
    knex('spots')
    .update(newSpot)
    .where('id', id)
    .returning('*')

    .then((spots)=>{
      let spot = {
        id: spots[0].id,
        name: spots[0].title,
        location: spots[0].location,
        bust: spots[0].bust,
        difficulty: spots[0].difficulty,
        photo_url: spots[0].photo_url,
        description: spots[0].description
      }
      res.json(spot)
    })
    .catch((err) => next(err))
  })
})

//fix migrations so that they include id- figure out how to use id to get patch responding

module.exports = router;
