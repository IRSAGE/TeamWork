import express from 'express';
import bodyParse from 'body-parser';
import dotenv from 'dotenv';
import userRoute from './routes/userRoutes';
import articleRoute from './routes/articleRoutes';

dotenv.config();

const app = express();
app.use(bodyParse.json());


app.use('/api/v1/auth', userRoute);
app.use('/api/v1/articles', articleRoute);

app.use('/', (req, res) => {
  res.status(404).send({
    status: 404,
    error: 'Incorrect route',
  });
});
const port = process.env.PORT || 6000;

app.listen(port, () => console.log(`Listening on port ${port}...`));
export default app;
