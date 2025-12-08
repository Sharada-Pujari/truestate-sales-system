import { useState, useEffect, useCallback } from 'react';
import { fetchSales, fetchFilterOptions } from '../services/api';

export const useSales = () => {
  const [salesData, setSalesData] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [filterOptions, setFilterOptions] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [filters, setFilters] = useState({
    search: '',
    regions: [],
    genders: [],
    categories: [],
    paymentMethods: [],
    tags: [],
    minAge: '',
    maxAge: '',
    startDate: '',
    endDate: '',
    sortBy: 'date-desc',
    page: 1
  });

  const loadFilterOptions = async () => {
    try {
      const options = await fetchFilterOptions();
      setFilterOptions(options);
    } catch (err) {
      console.error('Failed to load filter options:', err);
    }
  };

  const loadSales = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = {};
      if (filters.search) params.search = filters.search;
      if (filters.regions.length) params.regions = filters.regions;
      if (filters.genders.length) params.genders = filters.genders;
      if (filters.categories.length) params.categories = filters.categories;
      if (filters.paymentMethods.length) params.paymentMethods = filters.paymentMethods;
      if (filters.tags.length) params.tags = filters.tags;
      if (filters.minAge) params.minAge = filters.minAge;
      if (filters.maxAge) params.maxAge = filters.maxAge;
      if (filters.startDate) params.startDate = filters.startDate;
      if (filters.endDate) params.endDate = filters.endDate;
      if (filters.sortBy) params.sortBy = filters.sortBy;
      params.page = filters.page;

      const result = await fetchSales(params);
      setSalesData(result.data);
      setPagination(result.pagination);
    } catch (err) {
      setError('Failed to load sales data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    loadFilterOptions();
  }, []);

  useEffect(() => {
    loadSales();
  }, [loadSales]);

  const updateFilter = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value, page: 1 }));
  };

  const resetFilters = () => {
    setFilters({
      search: '',
      regions: [],
      genders: [],
      categories: [],
      paymentMethods: [],
      tags: [],
      minAge: '',
      maxAge: '',
      startDate: '',
      endDate: '',
      sortBy: 'date-desc',
      page: 1
    });
  };

  return {
    salesData,
    pagination,
    filterOptions,
    loading,
    error,
    filters,
    updateFilter,
    resetFilters
  };
};