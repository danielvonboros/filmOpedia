![alt filmOpediaApiLogo](https://github.com/danielvonboros/filmopedia/blob/main/public/filmopediaApiLogo.png?raw=true)
Not just another internet movie database

<p>API Backend for <a href="https://github.com/danielvonboros/filmOpedia-client">filmOpedia React</a> and <a href="https://github.com/danielvonboros/filmopedia-angular-client">filmOpedia Angular</a></p>
<p>This movie API can be used to access a list of movie details,
like:</p>

<ul>
<li>Movie Title</li>
<li>Movie Genre</li>
<li>Director</li>
<li>Movie Description</li>
</ul>

### Description

Movie Database based on two collections: movies and users.
movies collection contains data about the movie, cover, genre, director
user collection contains data about user, password birthday and favorite movies

### Tools used

| Property               | Tool          |
| ---------------------- | ------------- |
| Language               | JavaScript    |
| Database               | MongoDB       |
| Framework              | Express       |
| Server Environment     | Node.js       |
| HTTP request logger    | Morgan        |
| Authentication         | Passport      |
| Object Data Modeling   | Mongoose      |
| Request Authentication | JSON Webtoken |

### Dependencies

<ul>
<li>express-validator</li>
<li>jsonwebtoken</li>
<li>lodash</li>
<li>method-override</li>
<li>mongoose</li>
<li>passport</li>
<li>passport-jwt</li>
<li>passport-local</li>
<li>body-parser</li>
<li>cors</li>
</ul>

### User Stories

<ul>
<li>Return a list of ALL movies to the user</li>
<li>Return data (description, genre, director, image URL, whether it’s featured or not) about a single movie by title to the user</li>
<li>Return data about a genre (description) by name/title (e.g., “Thriller”)</li>
<li>Return data about a director (bio, birth year, death year) by name</li>
<li>Allow new users to register</li>
<li>Allow users to update their user info (username, password, email, date of birth)</li>
<li>Allow users to add a movie to their list of favorites</li>
<li>Allow users to remove a movie from their list of favorites</li>
<li>Allow existing users to deregister</li>
</ul>

### This project is built with the following tools

<ul>
          <li>The API is a Node.js and Express application</li>
          <li>The API uses the REST(ful) architecture</li>
          <li>The API contains of more than 3 middleware modules</li>
          <li>The API uses a 'package.json'-File</li>
          <li>The database is built using MongoDB</li>
          <li>The business logic was modeled with Mongoose</li>
          <li>The API provides movie information in JSON Format</li>
          <li>The API includes user authentication and authorization code</li>
          <li>The API includes data validation logic</li>
          <li>The API meets data security regulations</li>
          <li>The API source code is deployed to a publicly accessible platform</li>
          <li>The API is deployed with Heroku</li>
        </ul>

### API endpoints table

<table>
             <thead>
                 <tr>
                     <th>Request</th>
                     <th>URL</th>
                     <th>Method</th>
                     <th>Body data</th>
                     <th>Response</th>
                 </tr>
             </thead>
                <tr>
                    <td>Display Welcome Page to the user</td>
                    <td>/</td>
                    <td>GET</td>
                    <td>None</td>
                    <td>A text message welcoming the user</td>
                </tr>
                <tr>
                    <td>Get a list of all movies</td>
                    <td>/movies</td>
                    <td>GET</td>
                    <td>None</td>
                    <td>A JSON object containing data about all movies</td>
                </tr>
                <tr>
                    <td>Get a movie by title</td>
                    <td>/movies/:title</td>
                    <td>GET</td>
                    <td>None</td>
                    <td>A JSON object containing data(description, genres, director, image URL) about the selected movie</td>
                </tr>
                <tr>
                    <td>Get info about a genre</td>
                    <td>/movies/genre/:name</td>
                    <td>GET</td>
                    <td>None</td>
                    <td>A JSON object contain data about a genre</td>
                </tr>
                <tr>
                    <td>Get information about a movies director</td>
                    <td>movies/director/:name</td>
                    <td>GET</td>
                    <td>None</td>
                    <td>A JSON object containing data about the director (name, bio, birthyear and death year)</td>
                </tr>
                <tr>
                    <td>Register a new user</td>
                    <td>/users</td>
                    <td>POST</td>
                    <td>A JSON object holding data about the new user to register</td>
                    <td>A JSON object containing data about user that has been registered</td>
                </tr>
                <tr>
                    <td>Deregister an existing user</td>
                    <td>/users/:username</td>
                    <td>DELETE</td>
                    <td>None</td>
                    <td>A text message indicating user was successfully removed</td>
                </tr>
                <tr>
                    <td>Update the data (username, password, birthday) of an existing user</td>
                    <td>/users/:username</td>
                    <td>PUT</td>
                    <td>A JSON object containing the data that should be updated</td>
                    <td>A JSON object containing all the data about the updated user info</td>
                </tr>
                <tr>
                    <td>Add movie to the list of favorites</td>
                    <td>/users/:username/movieID</td>
                    <td>POST</td>
                    <td>None</td>
                    <td>A JSON object containing all the data about the user including the updated favoritemovies</td>
                </tr>
                <tr>
                    <td>Remove movie from the favorite list</td>
                    <td>/users/:username/favoritemovies/:movieID</td>
                    <td>DELETE</td>
                    <td>None</td>
                    <td>A text message indicating that a movie was successfully removed</td>
                </tr>
         </table>

### Data structure

the collections are structured the following way

##### movies

```
            /    _id: string,                       \
            |    rank: number,                      |
            |    title: string,                     |
            |    year: number,                      |
            |    description: string,               |
movies =  <      imageUrl: string                    >
            |    director:   .name: string,         |
            |                .bio: string,          |
            |                .birthYear: number,    |
            |                .deathYear: number,    |
            |    genre:      .name: string,         |
            \                 .description: string, /
```

##### users

```
            /    _id: ObjectId                      \
            |    username: string,                  |
users =    <     password: string,                   >
            |    email: string,                     |
            \    favoritemovies: array              /
```

### Contact me!

Get in touch! Contact me <a href="https://linkedin.com/in/daniel-von-boros-92878a186">here</a> to talk about collaborations.
