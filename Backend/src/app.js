import express from 'express';
import authRoutes from './routes/authRoutes.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import bookingRoutes from './routes/bookingRoutes.js'
import hotelRoutes from './routes/hotelRoutes.js'


const allowedOrigins = [
  process.env.CLIENT_URL,       
  "http://localhost:5173"      
];


const app = express();

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser())
app.use('/api', authRoutes);
app.use('/booker', bookingRoutes);
app.use('/hotel', hotelRoutes);
//for testing that the server is running
app.get('/', (req, res) => {
    res.send('API is running...');
});


export { app };

