require('dotenv').config();
//require('./cleanupJob');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')
const cors = require('cors')
const rateLimit = require('express-rate-limit');

// Routes Import


const app = express();
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 150, 
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);
app.use(cors({ credentials: true}))
app.use(bodyParser.json({limit:'10mb'}))
app.use(bodyParser.urlencoded({extended:true, limit:'10mb'}))
app.use(express.json());

app.use(express.static('public'));

app.use('/uploads', express.static('uploads', {
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.pdf')) {
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'inline'); // Not 'attachment'
    }
  }
}));



app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

app.use('/app/users', require('./routes/users/newUserRoute'));
app.use('/app/users', require('./routes/users/getUserRoute'));
app.use('/app/users', require('./routes/users/putUserNameRoute'));
app.use('/app/users', require('./routes/users/putUserProfileRoute'));
app.use('/app/users', require('./routes/users/deleteUserRoute'));

app.use('/app/posts', require('./routes/post/semqus/postNewSemqusRoute'));


app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});




const PORT = process.env.SERVER_PORT;

app.listen(PORT,'0.0.0.0', () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
