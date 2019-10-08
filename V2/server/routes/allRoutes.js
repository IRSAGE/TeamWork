import express from 'express';
import userRoute from './userRoutes';

const app = express();

app.use('/auth', userRoute);
export default app;
