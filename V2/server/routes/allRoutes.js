import express from 'express';
import userRoute from './userRoutes';
import articleRoute from './articleRoutes';

const app = express();

app.use('/auth', userRoute);
app.use('/articles', articleRoute);
app.use('/feeds', articleRoute);
app.use('/author', articleRoute);

export default app;
