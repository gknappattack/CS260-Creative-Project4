const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/pokemon', {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

const pokemonSchema = new mongoose.Schema({
  name: String,
  nickname: String,
  ability: String,
  image: String
});

// create a virtual paramter that turns the default _id field into id
pokemonSchema.virtual('id')
  .get(function() {
    return this._id.toHexString();
  });

// Ensure virtual fields are serialised when we turn this into a JSON object
pokemonSchema.set('toJSON', {
  virtuals: true
});

// create a model for tickets
const Pokemon = mongoose.model('Pokemon', pokemonSchema);

app.get('/api/pokemon', async (req, res) => {
  try {
    let pokemon = await Pokemon.find();
    console.log(pokemon)
    
    res.send({
      pokemon: pokemon
    });
    
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.post('/api/pokemon', async (req, res) => {
  const pokemon = new Pokemon({
    name: req.body.name,
    nickname: req.body.nickname,
    ability: req.body.ability,
    image: req.body.image
  });
  try {
    await pokemon.save();
    res.send({
      pokemon: pokemon
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete('/api/pokemon/:id', async (req, res) => {
  try {
    await Pokemon.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.listen(3000, () => console.log('Server listening on port 3000!'));
