const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const authRouter = require('./routers/authrouter.js')
const productrouter = require('./routers/productrouter.js')
const app = express()
const dotenv = require('dotenv')
dotenv.config()
const port = process.env.PORT || 5000
const connectDB = require('./models/db');

//middlewares
app.use(express.json())
app.use(cors())
app.use(bodyParser.json())

// Routes
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/auth',authRouter )
app.use('/product',productrouter )
// Connect to the database and start the server
connectDB()
.then(() => {
    app.listen(port, () => {
      console.log(` Server running at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error(' Failed to connect to DB:', err);
  });