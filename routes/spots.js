'use strict';

const express = require('express');
const knex = require('../knex');
const router = express.Router();

router.get('/spots', (req, res, next) => {
  console.log("here");
  knex('spots')
  .orderBy('id')
  .then((spots)=> {
    res.send(spots)
  })
  .catch((err)=> {
    next(err)
  })
});

router.get('/spots/:id', (req, res, next) =>{
  const id = req.params.id;
  knex('spots')
  .where('id', id)
  .then((spots) => {
    res.json(spots[0])
  })
  .catch((err) => next(err))
});

router.post('/spots', (req, res, next) => {

  const { lat, lon, name, location, bust, difficulty, photo_url, description } = req.body
  console.log(req.body)
  knex('spots')
  // console.log('here2');
  .insert({
    lat,
    lon,
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
      lat: spots[0].lat,
      lon: spots[0].lon,
      name: spots[0].name,
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

router.patch('/spots/:id', (req, res, next) => {

  const id = req.params.id
  const { lat, lon, name, location, bust, difficulty, photo_url, description } = req.body

  let newSpot = {}

  if(id){
    newSpot.id=id
  }
  if(lat){
    newSpot.lat=lat
  }
  if(lon){
    newSpot.lon=lon
  }
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
        lat: spots[0].lat,
        lon: spots[0].lon,
        name: spots[0].name,
        location: spots[0].location,
        bust: spots[0].bust,
        difficulty: spots[0].difficulty,
        photo_url: spots[0].photo_url,
        description: spots[0].description
      }
      res.send(spot)
    })
    .catch((err) => next(err))
  })
})

router.delete('/spots/:id', (req, res, next)=>{
  const id = req.params.id

  knex('spots')
    .then((spots)=>{
      knex('spots')
      .del()
      .where('id', id)
      .returning('*')

      .then((spots)=>{
        let spot = {
          id: spots[0].id,
          lat :spots[0].lat,
          lon: spots[0].lon,
          name: spots[0].name,
          location: spots[0].location,
          bust: spots[0].bust,
          difficulty: spots[0].difficulty,
          photo_url: spots[0].photo_url,
          description: spots[0].description
        }
        res.json(spot)
        console.log('Sure hope you wanted to delete that Spot!')
      })
      .catch((err)=>next(err))
    })
});

module.exports = router;
