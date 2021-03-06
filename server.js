// Import dependency
require('dotenv').config()
const express = require('express')
const cors = require('cors');
const { mongoose } = require('mongoose')
const authRoute = require('./routes/auth')
const blockRoute = require('./routes/block')
const roomRoute = require('./routes/room')
const studentRoute = require('./routes/student')
const allotmentRoute = require('./routes/allotment')
const staticRoute = require('./routes/static')
const feeRoute = require('./routes/fee')


//Variable
const app = express()
const port = process.env.PORT || 8000


//connect to db
mongoose.connect( process.env.DB_CONNECT, () => {
    console.log('Connected to DB')
})
  

// Body Parser middleware
app.use(express.json());
app.use(cors());
// app.use(logger)


//api-route
app.use('/api/user', authRoute)
app.use('/api/block', blockRoute)
app.use('/api/room', roomRoute)
app.use('/api/student', studentRoute)
app.use('/api/allotment', allotmentRoute)
app.use('/api/static', staticRoute)
app.use('/api/fee', feeRoute)


//listening port
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})


function logger(req, res, next){
    console.log(`${Date.now()} ${req.method}: http://localhost:${port}${req.originalUrl}`)
    next()
}