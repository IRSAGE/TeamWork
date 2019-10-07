import express from 'express';
import bodyParse from 'body-parser';
import dotenv from 'dotenv';
import allRoutes from './routes/allRoutes';


dotenv.config();

const app = express();
app.use(bodyParse.json());


app.use('/api/v2', allRoutes);

app.use('/', (req, res) => {
  res.status(404).send({
    status: 404,
    error: 'Incorrect route',
  });
});
const port = process.env.PORT || 3000;

app.listen(port, () => process.stdout.write(`Listening on port ${port}...`));
export default app;
