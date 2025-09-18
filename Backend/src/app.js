import express from 'express';
import authRoutes from './routes/authRoutes.js'
import cors from 'cors'


const app = express();

app.use(cors())
app.use(express.json());
app.use('/api', authRoutes);
//for testing that the server is running
app.get('/', (req, res) => {
    res.send('API is running...');
});


export { app };

