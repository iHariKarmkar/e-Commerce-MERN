import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDb from './config/db.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoutes.js';
import productRouter from './routes/productRoutes.js';
import cartRouter from './routes/cartRoutes.js';
import orderRouter from './routes/orderRoutes.js';


// App Config
const app = express();
const PORT = process.env.PORT || 4000
connectDb();
connectCloudinary();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => res.send('API Working'))

// Api endpoints
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter)


app.listen(PORT, () => {
    console.log('Server is running on PORT:' + PORT)
})