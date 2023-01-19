const express = require('express')
const cors = require("cors");
const ConnectDatabase = require("../config/connectDatabase.config");
const userRoutes = require("../routes/user.routes");

const app = express()

app.use(express.urlencoded({extended: true}))

app.use(express.json())
app.use(cors());

// app.get('/', (req, res) => res.send('Hello Himanshu'));

app.use(userRoutes);



const port = 8000;
app.listen(port, async () => {
  try {
    await ConnectDatabase();
    console.log(`http://localhost:${port}`);
  } catch (error) {
    console.log(error.message);
  }
});
