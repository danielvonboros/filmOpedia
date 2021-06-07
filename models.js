import mongoose, { Schema as _Schema, model } from 'mongoose';
const {Schema} = mongoose;
import { hashSync, compareSync } from 'bcrypt';

let movieSchema = _Schema({
  title: {type: String, required: true},
  description: {type: String, required: true},
  genre: {
    name: String,
    description: String
  },
  director: {
    name: String,
    bio: String
  },
  actors: [String],
  imagePath: String,
  featured: Boolean
});

let userSchema = _Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
  email: {type: String, required: true},
  birthday: Date,
  favoritemovies: [{type: _Schema.Types.ObjectId, ref: 'Movie'}]
});

userSchema.statics.hashPassword = (password) => {
  return hashSync(password, 10);
};

userSchema.methods.validatePassword = function(password) {
  console.log(password);
  return compareSync(password, this.Password);
};

let Movie = model('Movie', movieSchema);
let User = model('User', userSchema);

const _Movie = Movie;
export { _Movie as Movie };
const _User = User;
export { _User as User };
