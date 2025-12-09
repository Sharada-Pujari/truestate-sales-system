import { searchAndFilterSales, getFilterOptions } from '../services/salesService.js';

export const getSales = async (req, res) => {
  try {
    const result = await searchAndFilterSales(req.query);
    res.json(result);
  } catch (error) {
    console.error('Error fetching sales:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getFilters = async (req, res) => {
  try {
    const options = await getFilterOptions();
    res.json(options);
  } catch (error) {
    console.error('Error fetching filters:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};