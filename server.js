require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 8000;

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

mongoose
	.connect(process.env.DB_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log('Connected to database!'))
	.catch((err) => console.log('Error connecting to database!', err));

app.get('/', (req, res) => {
	res.send('Hello');
});

app.get('/monke', (req, res) => {
	res.send('Monke');
});

app.get('*', (req, res) => {
	res.redirect('/');
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT} 🚀`);
});
