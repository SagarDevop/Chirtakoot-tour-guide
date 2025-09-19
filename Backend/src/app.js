import express from 'express';
import authRoutes from './routes/authRoutes.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'


const app = express();

app.use(cors(
    {   origin: process.env.CLIENT_URL,
        credentials: true,
    }
))
app.use(express.json());
app.use(cookieParser())
app.use('/api', authRoutes);
//for testing that the server is running
app.get('/', (req, res) => {
    res.send('API is running...');
});


export { app };

