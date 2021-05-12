const express = require('express');
const morgan = require('morgan');

const app = express();

//JSON list
let topMovies = [
  {
    title: 'Netflix top 10 most popular list',
    source: 'collider.com/top-10-netflix-movies-list-most-popular/'
  },
  {
    rank: 1,
    title: 'The Mitchells vs. the Machines',
    director: 'Mike Rianda'
  },
  {
    rank: 2,
    title: 'Madagascar 3: Europe\'s most wanted',
    director: 'Eric Darnell, Conrad Vernon, Tom McGrath'
  },
  {
    rank: 3,
    title: 'Green Zone',
    director: 'Paul Greengrass'
  },
  {
    rank: 4,
    title:'Love Happens',
    director:'Brandon Camp'
  },
  {
    rank: 5,
    title:'Scarface',
    director:'Brian de Palma'
  },
  {
    rank: 6,
    title:'G.I. Joe: The Rise of Cobra',
    director:'Stephen Sommers'
  },
  {
    rank: 7,
    title:'Things heard and seen',
    director:'Shari Springer Berman, Robert Pulcini'
  },
  {
    rank: 8,
    title:'State of Play',
    director:'Kevin Macdonald'
  },
  {
    rank: 9,
    title:'Zombieland',
    director:'Ruben Fleischer'
  },
  {
    rank: 10,
    title:'The whole truth',
    director:'Courtney Hunt'
  },
];

// HTML Requests
app.use(morgan('common'));

app.get('/movies', (req, res) => {
  res.json(topMovies);
});

app.get('/', (req, res) => {
  res.send('Welcome to my movie database "filmOpedia"');
});

app.use('/', express.static('public'));

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).send('Something went wrong!');
});

app.listen(8080, () => {
  console.log('Your app is listening at port 8080.');
});
