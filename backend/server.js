import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import { notFound, errHandler } from './middleware/errorMiddleware.js'
import connectDB from "./config/db.js";
import leagueRoutes from './routes/leagueRoutes.js'

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

//ROUTES
app.get('/', (req, res) => {
    res.send('API is running...')
} );

app.use('/api/leagues', leagueRoutes);

// 404 not found
app.use(notFound);

// MIDDLEWARE (error)
app.use(errHandler);


const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));

