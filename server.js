const express = require('express');
const connectDB = require('./config/mongoConnection');
var userRouter = require('./src/routes/users');
var eventRouter = require('./src/routes/EventRoute');
var departementRouter = require('./src/routes/DepartementRoute');
var postRouter = require('./src/routes/PostTitleRoute');
var teamRouter = require('./src/routes/TeamRoute');
var officeRouter = require('./src/routes/OfficeRoute');
var timeOffTypeRouter = require('./src/routes/TimeOffTypeRoute');
var folderTypeRouter = require('./src/routes/FolderTypeRoute');

const cors = require('cors');
const app = express();
// Connect Database
connectDB();
// Init Middleware
app.use(express.json());
app.use(cors());
// Define Routes
app.use('/users', userRouter);
app.use('/events', eventRouter);
app.use('/departements', departementRouter);
app.use('/posts', postRouter);
app.use('/teams', teamRouter);
app.use('/offices', officeRouter);
app.use('/timeOff', timeOffTypeRouter);
app.use('/folder', folderTypeRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started ${PORT}`));
