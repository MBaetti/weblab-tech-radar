import express from 'express';
import technologyRoutes from './routes/technology-routes';
import { errorHandler } from './middlewares/error-handler';

const app = express();

app.use(express.json());

// Routes
app.use('/api/technologies', technologyRoutes);

app.use(errorHandler);

export default app;