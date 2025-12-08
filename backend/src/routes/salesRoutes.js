import express from 'express';
import { getSales, getFilters } from '../controllers/salesController.js';
import { loadSalesData } from '../utils/dataLoader.js';

const router = express.Router();

loadSalesData().catch(console.error);

router.get('/', getSales);
router.get('/filters', getFilters);

export default router;