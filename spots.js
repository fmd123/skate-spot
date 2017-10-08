
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('spots').del()
    .then(function () {
      // Inserts seed entries
      return knex('spots').insert(
    [
      {

        name: 'Wells Fargo',
        location: '1242 Pearl St, Boulder, CO 80302',
        bust: 'medium',
        difficulty: 'easy',
        photo_url: '',
        description: 'Small quarter pipes, hips and flatbars'

      },{

        name: 'Boulder Public Library',
        location: '1001 Arapahoe Ave, Boulder, CO 80302',
        bust: 'medium',
        difficulty: 'hard',
        photo_url: '',
        description: 'tall benches across flat gaps'

      },{

        name: 'The Tea House',
        location: '1770 13th St, Boulder, CO 80302',
        bust: 'low',
        difficulty: 'easy',
        photo_url: '',
        description: 'large flat ground area, small drop with wallride, ledges and six stair with wall-rail'

      },{

        name: 'Sacred Heart',
        location: '1318 Mapleton Ave, Boulder, CO 80304',
        bust: 'high',
        difficulty: 'high',
        photo_url: '',
        description: 'large and medium sized gaps, 10 stair over the rail gap'

      },{

        name: 'The Hill Ledges',
        location: '1111 Broadway, Boulder, CO 80302',
        bust: 'low',
        difficulty: 'low-medium',
        photo_url: '',
        description: 'ledges flowing downhill'

      }
    ])
    .then(()=>{
      return knex.raw("SELECT setval('spots_id_seq', (SELECT MAX(id) FROM spots))")
    })
  });
};
