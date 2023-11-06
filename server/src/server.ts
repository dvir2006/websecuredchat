import express from 'express';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Noder neder secured!');
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});