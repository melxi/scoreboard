const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const cors = require('cors')
const config = require('./utils/config')
const usersRouter = require('./routes/users')
const app = express()

app.use(express.json())
app.use(cors())
app.use(morgan("common"))

mongoose
    .connect(config.MONGODB_URI, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(err))


app.use('/api/users', usersRouter)

app.listen(config.PORT, () => 
    console.log(`Server running on port ${config.PORT}`)
)