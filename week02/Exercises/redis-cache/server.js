require("dotenv").config();
const express = require('express');
const route = require('./routes/route');

const ConnectToDatabase = require("./configs/connect.config");

ConnectToDatabase();

const app = express();
app.use(express.json());
route(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));