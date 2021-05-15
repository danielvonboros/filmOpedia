const express = require('express');
const morgan = require('morgan');
const uuid = require('uuid');

const app = express();

//JSON list Movies
let topMovies = [
  {
    rank: 1,
    title: 'It happened one night',
    director: 'Frank Capra, Harry Cohn',
    year: 1934,
    genre: 'romance',
    description: 'In Frank Capra\'s acclaimed romantic comedy, spoiled heiress Ellie Andrews (Claudette Colbert) impetuously marries the scheming King Westley, leading her tycoon father (Walter Connolly) to spirit her away on his yacht. After jumping ship, Ellie falls in with cynical newspaper reporter Peter Warne (Clark Gable), who offers to help her reunite with her new husband in exchange for an exclusive story. But during their travels, the reporter finds himself falling for the feisty young heiress.',
    imageUrl: null
  },
  {
    rank: 2,
    title: 'Modern Times',
    director: 'Charlie Chaplin',
    year: 1936,
    genre: 'comedy',
    description: 'This comedic masterpiece finds the iconic Little Tramp (Charlie Chaplin) employed at a state-of-the-art factory where the inescapable machinery completely overwhelms him, and where various mishaps keep getting him sent to prison. In between his various jail stints, he meets and befriends an orphan girl (Paulette Goddard). Both together and apart, they try to contend with the difficulties of modern life, with the Tramp working as a waiter and eventually a performer.',
    imageUrl: null
  },
  {
    rank: 3,
    title: 'The Wizard of Oz',
    director: 'Victor Fleming',
    year: 1939,
    genre: 'Kids and family, fantasy, musical',
    description: 'When a tornado rips through Kansas, Dorothy (Judy Garland) and her dog, Toto, are whisked away in their house to the magical land of Oz. They follow the Yellow Brick Road toward the Emerald City to meet the Wizard, and en route they meet a Scarecrow (Ray Bolger) that needs a brain, a Tin Man (Jack Haley) missing a heart, and a Cowardly Lion (Bert Lahr) who wants courage. The wizard asks the group to bring him the broom of the Wicked Witch of the West (Margaret Hamilton) to earn his help.',
    imageUrl: null
  },
  {
    rank: 4,
    title:'Black Panther',
    director:'Ryan Coogler',
    year:2018,
    genre: 'action, fantasy, adventure',
    description:'After the death of his father, T\'Challa returns home to the African nation of Wakanda to take his rightful place as king. When a powerful enemy suddenly reappears, T\'Challa\'s mettle as king -- and as Black Panther -- gets tested when he\'s drawn into a conflict that puts the fate of Wakanda and the entire world at risk. Faced with treachery and danger, the young king must rally his allies and release the full power of Black Panther to defeat his foes and secure the safety of his people.',
    imageUrl: null
  },
  {
    rank: 5,
    title:'Citizen Kane',
    director:'Orson Welles',
    year:1941,
    genre: 'drama',
    description:'When a reporter is assigned to decipher newspaper magnate Charles Foster Kane\'s (Orson Welles) dying words, his investigation gradually reveals the fascinating portrait of a complex man who rose from obscurity to staggering heights. Though Kane\'s friend and colleague Jedediah Leland (Joseph Cotten), and his mistress, Susan Alexander (Dorothy Comingore), shed fragments of light on Kane\'s life, the reporter fears he may never penetrate the mystery of the elusive man\'s final word, "Rosebud."',
    imageUrl: null
  },
  {
    rank: 6,
    title:'Parasite (Gisaengchung)',
    director:'Bong Joon-ho',
    year:2019,
    genre:'comedy, drama, mystery, thriller',
    description:'Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.',
    imageUrl: null
  },
  {
    rank: 7,
    title:'Avengers: Endgame',
    director:'Anthony Russo, Joe Russo',
    year:2019,
    genre: 'action, sci-fi, fantasy, adventure',
    description:'Adrift in space with no food or water, Tony Stark sends a message to Pepper Potts as his oxygen supply starts to dwindle. Meanwhile, the remaining Avengers -- Thor, Black Widow, Captain America and Bruce Banner -- must figure out a way to bring back their vanquished allies for an epic showdown with Thanos -- the evil demigod who decimated the planet and the universe.',
    imageUrl: null
  },
  {
    rank: 8,
    title:'Casablanca',
    director:'Michael Curtiz',
    year:1942,
    genre:'drama',
    description:'Rick Blaine (Humphrey Bogart), who owns a nightclub in Casablanca, discovers his old flame Ilsa (Ingrid Bergman) is in town with her husband, Victor Laszlo (Paul Henreid). Laszlo is a famed rebel, and with Germans on his tail, Ilsa knows Rick can help them get out of the country.',
    imageUrl: null
  },
  {
    rank: 9,
    title:'Knives out',
    director:'Rian Johnson',
    year:2019,
    genre: 'comedy, drama, mystery and thriller, crime',
    description:'The circumstances surrounding the death of crime novelist Harlan Thrombey are mysterious, but there\'s one thing that renowned Detective Benoit Blanc knows for sure -- everyone in the wildly dysfunctional Thrombey family is a suspect. Now, Blanc must sift through a web of lies and red herrings to uncover the truth.',
    imageUrl: null
  },
  {
    rank: 10,
    title:'Us',
    director:'Jordan Peele',
    year:2019,
    genre: 'mystery and thriller, horror',
    description:'Accompanied by her husband, son and daughter, Adelaide Wilson returns to the beachfront home where she grew up as a child. Haunted by a traumatic experience from the past, Adelaide grows increasingly concerned that something bad is going to happen. Her worst fears soon become a reality when four masked strangers descend upon the house, forcing the Wilsons into a fight for survival. When the masks come off, the family is horrified to learn that each attacker takes the appearance of one of them.',
    imageUrl: null
  },
];

//JSON list directors
let directors = [
  {
    name:'Charlie Chaplin',
    bio:'Sir Charles Spencer Chaplin KBE was an English comic actor, filmmaker, and composer who rose to fame in the era of silent film. He became a worldwide icon through his screen persona, The Tramp, and is considered one of the most important figures in the history of the film industry. His career spanned more than 75 years, from childhood in the Victorian era until a year before his death, and encompassed both adulation and controversy.',
    birthYear:1889,
    deathYear:1977,
  },
  {
    name:'Ryan Coogler',
    bio:'Ryan Kyle Coogler is an American film director, producer, and screenwriter. His first feature film, Fruitvale Station (2013), won the top audience and grand jury awards in the U.S. dramatic competition at the 2013 Sundance Film Festival.[2] He has since co-written and directed the seventh film in the Rocky series, Creed (2015), and the Marvel film Black Panther (2018), the latter of which broke numerous box office records and became the highest-grossing film of all time by an African American director.',
    birthYear:1986,
    deathYear:null
  },
  {
    name: 'Bong Joon-ho',
    bio:'Bong Joon-ho is a South Korean film director, producer and screenwriter. His films are characterised by emphasis on social themes, genre-mixing, black humor, and sudden tone shifts.',
    birthYear:1969,
    deathYear:null
  }
];

//JSON list users
let users = [
  {
    id: 1,
    username: 'johndoe',
    name: 'John Doe',
    email: 'johndoe@gmail.com',
    favoritemovies: {}
  }
];

// HTML Requests
app.use(morgan('common'));

// Return a list of all movies to the user
app.get('/movies', (req, res) => {
  res.json(topMovies);
});

// Return data (description, genre, director, image URL, whether it’s featured or not) about a single movie by title to the user
app.get('/movies/:title', (req, res) => {
  res.send('Successful GET request returning data about a single movie')
});

// Return data about a genre
// app.get('/movies/:genre', (req, res) => {
//   res.json(topMovies.find((genre) =>
//     { return topMovies.genre === req.params.genre }));
// });

app.get('/movies/genres/:genre', (req, res) => {
  res.send('Successful GET request returning data about a genre')
});

app.get('/directors', (req, res) => {
  res.json(directors);
});

// Return data about a director by name
app.get('/directors/:name', (req, res) => {
  res.send('Successful GET request returning data about a director')
});

// Allow new users to register
app.post('/users', (req,res) => {
  res.send('Successful POST request confirming that a new user was registered')
});

// Allow users to update their username
app.put('/users/:username', (req, res) => {
  res.send('Successful PUT request confirming an updated username')
});

// Allow users to add a movie to their list of favorites
app.post('/users/:username/:favoritemovies', (req, res) => {
  res.send('Successful POST request confirming a list item added to the list of favorite movies')
});

// Allow users to remove a movie from their list of favorites
app.delete('/users/:username/:favoritemovies', (req, res) => {
  res.send('Successful REMOVE request confirming a list item removed from the list of favorite movies')
});

// Allow users to deregister
app.delete('/users/:username', (req, res) => {
  res.send('Successful REMOVE request confirming a user (by username) being Removed from the database')
});

app.get('/', (req, res) => {
  res.send('Welcome to my movie database "filmOpedia"');
});

// redirect to static folder ('public')
app.use('/', express.static('public'));

// Error handler
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).send('Something went wrong!');
});

// Port
app.listen(8080, () => {
  console.log('Your app is listening at port 8080.');
});
