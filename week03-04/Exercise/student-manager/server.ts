require("dotenv").config();
import express from 'express';
import route from './routes';

const ConnectToDatabase = require("./configs/MongoDB");

ConnectToDatabase();

const app = express();
app.use(express.json());
route(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));