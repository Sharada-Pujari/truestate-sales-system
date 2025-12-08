import { searchAndFilterSales, getFilterOptions } from '../services/salesService.js';

export const getSales = (req, res) => {
  try {
    const result = searchAndFilterSales(req.query);
    res.json(result);
  } catch (error) {
    console.error('Error fetching sales:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getFilters = (req, res) => {
  try {
    const options = getFilterOptions();
    res.json(options);
  } catch (error) {
    console.error('Error fetching filters:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};