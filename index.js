const express = require('express');
const path = require('path');
const app = express();
const restaurants = require('./Restaurants')

//for public, static pages (about, news or who knows what)
app.use('/public', express.static(path.join(__dirname, 'public')));


// app.get('/', (req, res) => res.render('home'));

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/restaurants', require('./routes/api/restaurants'));
app.use('api/verify', require('./routes/api/verify'));



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port  ${PORT}`));


