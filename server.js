const express = require('express');

const bodyParser = require('body-parser');
const Note = require('./models/Note');
const config = require('./config');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = config.port;

app.get('/', (req, res) => Note.find({})
  .then(notes => res.send(notes))
  .catch(err => {
    console.error(err);
    return res.status(500).send('There was a problem finding the notes');
  })
);

app.get('/note/:id', (req, res) => {
  Note.findById(req.params.id)
    .then(note => {
      if (!note) {
        return res.status(404).send('Note was not found');
      }
      return res.send(note);
    })
    .catch(err => {
      console.error(err);
      return res.status(500).send('There was a problem finding the note');
    });
});

app.post('/note', (req, res) => {
  const title = req.body.title;
  const content = req.body.content;
  if (title && content) {
    return Note.create(req.body)
      .then(note => res.status(200).send(note))
      .catch(console.error);
  }
  return res.status(400).send('Bad request');
});

app.patch('/note/:id', (req, res) => {
  const id = req.params.id;
  if (req.body.title || req.body.content) {
    return Note.findByIdAndUpdate(id, { $set: req.body }, { new: true })
      .then(updatedNote => res.status(200).send(updatedNote))
      .catch(console.error);
  }
  return res.status(400).send('Bad request');
});

app.delete('/note/:id', (req, res) => Note.findByIdAndRemove(req.params.id)
  .then(res.status(200).send('Note removed'))
  .catch(console.error)
);


app.listen(port,
  () => console.log(`Listening on port ${port}`)
);

module.exports = app;