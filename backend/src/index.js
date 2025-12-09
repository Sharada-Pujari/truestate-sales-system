import dotenv from 'dotenv';
dotenv.config();

console.log('=== Environment Check ===');
console.log('MONGODB_URI exists:', !!process.env.MONGODB_URI);
console.log('MONGODB_URI:', process.env.MONGODB_URI);
console.log('PORT:', process.env.PORT);
console.log('========================');

import express from 'express';
import cors from 'cors';
import { connectDB } from './config/database.js';
import { importCSVToMongo } from './utils/csvToMongo.js';
import salesRoutes from './routes/salesRoutes.js';

const app = express();
const PORT = process.env.PORT || 5005;

app.use(cors());
app.use(express.json());

const initializeApp = async () => {
  try {
    console.log('🔄 Connecting to MongoDB...');
    await connectDB();
    
    console.log('🔄 Checking/Importing data...');
    await importCSVToMongo();
    
    app.use('/api/sales', salesRoutes);
    
    app.get('/health', (req, res) => {
      res.json({ status: 'OK', message: 'Server is running with MongoDB' });
    });
    
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Failed to initialize app:', error);
    process.exit(1);
  }
};

initializeApp();