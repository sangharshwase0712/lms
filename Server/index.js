const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./utils/db');
const userRoutes = require('./routes/user.route');
const courseRoutes = require('./routes/course.route')
const mediaRoute = require('./routes/media.route')

const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path')





connectDB();

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors({
  origin: 'http://localhost:5173', // Adjust based on your client URL
  credentials: true,
}));





app.use('/api/users', userRoutes);
app.use('/api/course', courseRoutes);
app.use('/api/media', mediaRoute);

app.use(express.static(path.join(__dirname, "../Client/dist")));

app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, "../Client/dist/index.html"));
});

app.get('/', (req, res) => {
  res.send('Hello, World!');
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});