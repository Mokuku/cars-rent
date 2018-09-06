const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const fileUpload = require('express-fileupload');
const cors = require('cors');

const users = require('./routes/api/users');
const cookieParser = require('cookie-parser');

const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

const app = express();

app.use(cors());

app.use(cookieParser());
app.use(fileUpload());

app.use('/public', express.static(__dirname + '/public'));

app.post('/upload', (req, res, next) => {
  console.log(req);
  let imageFile = req.files.file;

  imageFile.mv(`${__dirname}/public/${req.body.filename}.jpg`, function(err) {
    if (err) {
      return res.status(500).send(err);
    }

    res.json({file: `public/${req.body.filename}.jpg`});
  });

})

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport Config
require('./config/passport')(passport);

// Use Routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
