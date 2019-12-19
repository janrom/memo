const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const bodyParser = require('body-parser');
const Note = require('./models/Note');

const PORT = 3001;

const corsOptions = {
  origin: 'http://localhost:3000',
  optionSuccessStatus: 200,
};

const app = express();
app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(bodyParser.json());

mongoose.connect(process.env.MEMO_MONGODB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).catch((err) => { console.log(err); });

const db = mongoose.connection;
db.on('open', () => console.log('Connected to database'));
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.get('/notes', (req, res) => {
  Note.find()
    .exec((err, notes) => {
      if (err) {
        return res.json({ err });
      }
      res.append('Content-Type', 'application/json');
      return res.json({ notes });
    });
});

app.post('/add', (req, res) => {
  const promise = Note.create(req.body);
  promise
    .then((createdNote) => res.send(createdNote))
    .catch((err) => console.log(err));
});

app.put('/update', async (req, res) => {
  const id = req.body._id;

  try {
    const result = await Note.replaceOne({ _id: id }, req.body);

    if (result.ok) {
      return res.send(`Note id ${id} updated.`);
    }

    return res.send(`Failed to update note id ${id}`);
  } catch (err) {
    console.log(err);
    return err;
  }
});

app.delete('/delete', async (req, res) => {
  const id = req.body.deleteId;

  try {
    const query = await Note.deleteOne({ _id: id });

    if (query.ok) {
      return res.status(200).send(`Note id ${id} deleted.`);
    }

    return res.status(500).send(`Failed to delete note id ${id}.`);
  } catch (err) {
    console.log(err);
    return err;
  }
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
