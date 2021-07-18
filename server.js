require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const authRoutes = require('./routes/authRoutes');
const { checkUser } = require('./middleware/authMiddleware');

const PORT = process.env.PORT || 8000;

const app = express();

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.static('public'));
app.use(cookieParser());

mongoose
	.connect(process.env.DB_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	})
	.then(() => console.log('Connected to database!'))
	.catch((err) => console.log('Error connecting to database!', err));

app.get('*', checkUser);

app.use('/auth', authRoutes);

app.get('/', (req, res) => {
	res.render('home', { title: 'Home' });
});

app.get('/posts', (req, res) => {
	const posts = [
		{ title: '10 Best Practices For LIGIER' },
		{ title: "Here's A Quick Way To Solve A Problem with LIGIER" },
		{ title: 'How To Improve At LIGIER In 60 Minutes' },
	];

	res.render('posts', { title: 'Posts', posts });
});

app.get('/u/profile', (req, res) => {
	res.render('profile', { title: 'User Profile' });
});

app.use((req, res) => {
	res.status(404).render('404', { title: '404 Not Found' });
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT} 🚀`);
});
