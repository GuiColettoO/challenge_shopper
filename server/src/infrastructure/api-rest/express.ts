import express, { Express } from 'express';
import { rideRouter } from './routes/ride.route';
import cors from 'cors';

export const app: Express = express();

app.use(express.json());
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);
app.use('/api/ride', rideRouter);

export default app;
