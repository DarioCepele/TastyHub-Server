require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json())
app.use(cookieParser());

app.use(morgan('dev'))
app.use(cors({ origin: true, credentials: true}))

const usersRouter = require('./routes/users')
app.use('/users', usersRouter)


const port = process.env.PORT || 8080;

const server = app.listen(port, () => console.log('Server Started on ' + port))
