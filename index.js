const express = require("express");
const morgan = require("morgan");
const app = express();
const mongoose = require("mongoose");
const Models = require("./models.js");
const Movies = Models.Movie;
const Users = Models.User;
const passport = require("passport");
const cors = require("cors");
const { check, validationResult } = require("express-validator");
app.use(express.json());
require("./passport");
app.use(cors());

let auth = require("./auth")(app);
mongoose.connect(process.env.CONNECTION_URI),
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false };
app.get("/", (request, response) => {
  response.send(
    "welcome to the filmopedia API. For additional information on requests, navigate to '/documentation'"
  );
});
/**
 * define allowedOrigins to be allowed by CORS
 */
let allowedOrigins = [
  "http://localhost:8080",
  "https://localhost:8080",
  "http://testsite.com",
  "http://localhost:1234",
  "https://localhost:1234",
  "http://localhost:4200",
  "http://localhost:4200/",
  "https://localhost:4200",
  "http://filmopedia-client.netlify.app",
  "https://filmopedia-client.netlify.app",
  "https://danielvonboros.github.io/filmopedia-angular-client",
  "https://danielvonboros.github.io/filmopedia-angular-client/",
  "https://danielvonboros.github.io",
  "https://danielvonboros.github.io/",
];

/**
 * CORS config
 */
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        let message =
          "The CORS policy for this application doesn't allow access from origin " +
          origin;
        return callback(new Error(message), false);
      }
      return callback(null, true);
    },
  })
);

// HTML Requests
app.use(morgan("common"));

// redirect to static folder ('public')
app.use("/", express.static("public"));

/**
 * Get all movies and movie details
 * @method GET
 * @param {string} endpoint
 * @returns {object} containing all movies and movie data
 * @requires authentication JWT
 */
app.get(
  "/movies",
  passport.authenticate("jwt", { session: false }),
  function (req, res) {
    Movies.find()
      .then(function (movies) {
        res.status(201).json(movies);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

/**
 * Return data (description, genre, director, image URL, whether it’s featured or not) about a single movie by title to the user
 * @method GET
 * @param {string} (title) endpoint
 * @returns {object} data about a single movie
 * @requires authentication JWT
 */
app.get(
  "/movies/:title",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Movies.findOne({
      title: req.params.title,
    })
      .then((movie) => {
        res.json(movie);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

/**
 * Return data (description, genre, director, image URL, whether it’s featured or not) about a single movie by title to the user
 * @method GET
 * @param {string} (id) endpoint
 * @returns {object} data about a single movie
 * @requires authentication JWT
 */
app.get(
  "/movies/id/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Movies.findOne({
      _id: req.params.id,
    })
      .then((movie) => {
        res.json(movie);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

/**
 * Return data about a genre
 * @method GET
 * @param {string} (name) endpoint
 * @returns {object} data about a genre
 * @requires authentication JWT
 */
app.get(
  "/movies/genres/:name",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Movies.findOne({
      "genre.name": req.params.name,
    })
      .then((movie) => {
        res.json(movie.genre);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

/**
 * Return data about a director by name
 * @method GET
 * @param {string} (name) endpoint
 * @returns {object} data about a director
 * @requires authenticate JWT
 */
app.get(
  "/movies/director/:name",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Movies.findOne({
      "director.name": req.params.name,
    })
      .then((movie) => {
        res.json(movie.director);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

/**
 * Allow new users to register
 * @method POST
 * @param {object} object containing user details
 * @returns {object} json-object added user
 * @requires properties username, password, email
 * @requires auth no authentication - public
 */
app.post(
  "/users",
  [
    check("username", "Username is required").isLength({ min: 5 }),
    check(
      "username",
      "Username contains non-alphanumeric characters - not allowed."
    ).isAlphanumeric(),
    check("password", "Password is required").not().isEmpty(),
    check("email", "E-Mail does not appear to be valid.").isEmail(),
  ],
  (req, res) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    let hashedPassword = Users.hashPassword(req.body.password);
    Users.findOne({ username: req.body.username })
      .then((user) => {
        if (user) {
          return res.status(400).send(req.body.username + "already exists");
        } else {
          Users.create({
            username: req.body.username,
            password: hashedPassword,
            email: req.body.email,
            birthday: req.body.birthday,
          })
            .then((user) => {
              res.status(201).json(user);
            })
            .catch((error) => {
              console.error(error);
              res.status(500).send("Error: " + error);
            });
        }
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send("Error: " + error);
      });
  }
);

/**
 * Allow users to update their username
 * @method PUT
 * @param {object} object containing user details
 * @returns {object} json-object added user
 * @requires properties username, password, email
 * @requires authentication JWT
 */
app.put(
  "/users/:username",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let hashedPassword = Users.hashPassword(req.body.password);
    Users.findOneAndUpdate(
      {
        username: req.params.username,
      },
      {
        $set: {
          username: req.body.username,
          password: hashedPassword,
          email: req.body.email,
          birthday: req.body.birthday,
        },
      },
      {
        new: true,
      },
      (err, updatedUser) => {
        if (err) {
          console.error(err);
          res.status(500).send("Error: " + err);
        } else {
          res.json(updatedUser);
        }
      }
    );
  }
);

/**
 * Get all users
 * @method GET
 * @param {string} endpoint
 * @returns {object} containing all users
 * @requires authentication JWT
 */
app.get(
  "/users",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Users.find()
      .then((users) => {
        res.status(201).json(users);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

/**
 * Get information on one user
 * @method GET
 * @param {string} (username) endpoint
 * @returns {object} containing details of one user
 * @requires authentication JWT
 */
app.get(
  "/users/:username",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Users.findOne({
      username: req.params.username,
    })
      .then((user) => {
        res.json(user);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

/**
 * Get the favoritemovies array of a user
 * @method GET
 * @param {string} (username) endpoint
 * @returns {object} containing favoritemovies array of user
 * @requires authentication JWT
 */
app.get(
  "/users/:username/favoritemovies",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Users.findOne({
      username: req.params.username,
    })
      .then((user) => {
        res.json(user.favoritemovies);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

/**
 * Allow users to add a movie to their list of favorites
 * @method POST
 * @param {string} (username, movieId) endpoint
 * @returns {statusMessage} success/error
 * @requires authentication JWT
 */
app.post(
  "/users/:username/favoritemovies/:movieId",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Users.findOneAndUpdate(
      {
        username: req.params.username,
      },
      {
        $push: { favoritemovies: req.params.movieId },
      },
      {
        new: true,
      },
      (err, updatedUser) => {
        if (err) {
          console.error(err);
          res.status(500).send("Error: " + err);
        } else {
          res.json(updatedUser);
        }
      }
    );
  }
);

/**
 * Allow users to remove a movie from their list of favorites
 * @method DELETE
 * @param {string} (username, movieId) endpoint
 * @returns {statusMessage} success/error
 * @requires authentication JWT
 */
app.delete(
  "/users/:username/favoritemovies/:movieId",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Users.findOneAndUpdate(
      { username: req.params.username },
      {
        $pull: { favoritemovies: req.params.movieId },
      },
      { new: true },
      (err, updatedUser) => {
        if (err) {
          console.error(err);
          res.status(500).send("Error: " + err);
        } else {
          res
            .status(200)
            .json({ message: `${req.params.movieId} was deleted` });
        }
      }
    );
  }
);

/**
 * Allow users to deregister
 * @method DELETE
 * @param {string} (username) endpoint
 * @returns {statusMessage} success/error
 * @requires authentication JWT
 */
app.delete(
  "/users/:username",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Users.findOneAndRemove({ username: req.params.username })
      .then((user) => {
        if (!user) {
          res.status(400).send(req.params.username + " was not found");
        } else {
          res.status(200).send(req.params.username + " was deleted.");
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

// Port
const port = process.env.PORT || 8080;
app.listen(port, "0.0.0.0", () => {
  console.log("Listening on Port " + port);
});
