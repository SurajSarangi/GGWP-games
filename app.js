const express = require('express');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3000;
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const { jwtCheck, checkUser } = require('./middlewares/jwtCheck');

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = 'mongodb+srv://greyKnight:1234@node-ninja.6awgg.gcp.mongodb.net/node-auth';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(PORT, () => console.log(`Listening on port ${PORT}`)))
  .catch((err) => console.log(err));

app.use((req,res,next) => {
  console.log(req.method, '\t', req.path);
  next();
})

// routes
app.get('*', checkUser);
app.get('/', (req, res) => res.render('home', { title: "Home "}));
app.get('/games', jwtCheck, (req, res) => res.render('games', { title: "Games" }));
app.use(authRoutes);