const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const bodyParser = require('body-parser');
const Note = require('./models/Note');

const PORT = 3001;

const app = express();
app.use(cors());
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

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
