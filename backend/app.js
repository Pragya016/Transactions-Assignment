import express from 'express';
import transactionRouter from './routes/transactions.js';
import { connectToMongoDB } from './config/mongodb.config.js';
import cors from 'cors';

const app = express();

app.use(cors());

// default route
app.get('/', (req, res) => {
    res.send('hello world');
})

app.use('/api/url', transactionRouter);

app.listen('8080', () => {
    connectToMongoDB();
    console.log('Server is running on port 8080.');
})