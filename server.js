const express = require('express');

const Note = require('./models/Note');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  Note.find({})
    .then(notes => res.send(notes))
    .catch(err => {
      console.error(err);
      return res.send('There was a problem finding the notes').statusCode(500);
    });
});

app.get('/note/:id', (req, res) => {
  res.sendStatus(200);
});

app.post('/note/:id', (req, res) => {
  res.sendStatus(200);
});

app.patch('/note/:id', (req, res) => {
  res.sendStatus(200);
});

app.delete('/note/:id', (req, res) => {
  res.sendStatus(200);
});


app.listen(port,
  () => console.log(`Listening on port ${port}`)
);

module.exports = app;