import express from 'express';
import mongoose from 'mongoose';
require('dotenv').config()
import authRouter from './routes/authRoutes';
import cors from 'cors';



const app = express();
app.use(cors());
app.use(express.json())
const port = process.env.PORT || 3000;
const mongodbUri = process.env.MONGODB_URI || '';

app.use("/api/auth", authRouter);

app.get('/', (req, res) => {
  res.send('Noder neder secured server!');
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

mongoose.connect(mongodbUri).then(() => {
  console.log('Successfully connected to mongoDB');
}).catch(() => {
  console.log('Failed to connect to mongoDB');
});