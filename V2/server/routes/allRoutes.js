import express from 'express';
import userRoute from './userRoutes';
import articleRoute from './articleRoutes';

const app = express();

app.use('/auth', userRoute);
app.use('/', articleRoute);
// app.use('/feeds', articleRoute);
// app.use('/authors', articleRoute);
export default app;
