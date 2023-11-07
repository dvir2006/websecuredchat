import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRouter from './routes/authRoutes';

dotenv.config();
const app = express();
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