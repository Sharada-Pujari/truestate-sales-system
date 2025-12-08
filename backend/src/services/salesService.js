import { getSalesData } from '../utils/dataLoader.js';

export const searchAndFilterSales = (query) => {
  let data = [...getSalesData()];

  if (query.search) {
    const searchTerm = query.search.toLowerCase().trim();
    data = data.filter(item => 
      item.customerName?.toLowerCase().includes(searchTerm) ||
      item.phoneNumber?.toLowerCase().includes(searchTerm)
    );
  }

  if (query.regions && query.regions.length > 0) {
    const regions = Array.isArray(query.regions) ? query.regions : [query.regions];
    data = data.filter(item => regions.includes(item.customerRegion));
  }

  if (query.genders && query.genders.length > 0) {
    const genders = Array.isArray(query.genders) ? query.genders : [query.genders];
    data = data.filter(item => genders.includes(item.gender));
  }

  if (query.categories && query.categories.length > 0) {
    const categories = Array.isArray(query.categories) ? query.categories : [query.categories];
    data = data.filter(item => categories.includes(item.productCategory));
  }

  if (query.paymentMethods && query.paymentMethods.length > 0) {
    const methods = Array.isArray(query.paymentMethods) ? query.paymentMethods : [query.paymentMethods];
    data = data.filter(item => methods.includes(item.paymentMethod));
  }

  if (query.tags && query.tags.length > 0) {
    const tags = Array.isArray(query.tags) ? query.tags : [query.tags];
    data = data.filter(item => {
      const itemTags = item.tags?.split(',').map(t => t.trim()) || [];
      return tags.some(tag => itemTags.includes(tag));
    });
  }

  // Age Range Filter
  if (query.minAge || query.maxAge) {
    const minAge = parseInt(query.minAge) || 0;
    const maxAge = parseInt(query.maxAge) || 999;
    data = data.filter(item => item.age >= minAge && item.age <= maxAge);
  }

  // Date Range Filter
  if (query.startDate || query.endDate) {
    data = data.filter(item => {
      const itemDate = new Date(item.date);
      const start = query.startDate ? new Date(query.startDate) : new Date('1900-01-01');
      const end = query.endDate ? new Date(query.endDate) : new Date('2100-12-31');
      return itemDate >= start && itemDate <= end;
    });
  }

  // SORTING Implementation
  if (query.sortBy) {
    data = data.sort((a, b) => {
      switch (query.sortBy) {
        case 'date-desc':
          return new Date(b.date) - new Date(a.date);
        case 'date-asc':
          return new Date(a.date) - new Date(b.date);
        case 'quantity-desc':
          return b.quantity - a.quantity;
        case 'quantity-asc':
          return a.quantity - b.quantity;
        case 'name-asc':
          return (a.customerName || '').localeCompare(b.customerName || '');
        case 'name-desc':
          return (b.customerName || '').localeCompare(a.customerName || '');
        default:
          return 0;
      }
    });
  }

  // PAGINATION Implementation
  const page = parseInt(query.page) || 1;
  const limit = 10;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  const paginatedData = data.slice(startIndex, endIndex);

  return {
    data: paginatedData,
    pagination: {
      currentPage: page,
      totalPages: Math.ceil(data.length / limit),
      totalRecords: data.length,
      recordsPerPage: limit,
      hasNext: endIndex < data.length,
      hasPrevious: page > 1
    }
  };
};

export const getFilterOptions = () => {
  const data = getSalesData();
  
  const regions = new Set();
  const genders = new Set();
  const categories = new Set();
  const paymentMethods = new Set();
  const tags = new Set();
  let minAge = Infinity;
  let maxAge = -Infinity;

  for (const item of data) {
    if (item.customerRegion) regions.add(item.customerRegion);
    if (item.gender) genders.add(item.gender);
    if (item.productCategory) categories.add(item.productCategory);
    if (item.paymentMethod) paymentMethods.add(item.paymentMethod);
    
    if (item.tags) {
      const itemTags = item.tags.split(',').map(t => t.trim());
      itemTags.forEach(tag => tags.add(tag));
    }
    
    
    if (item.age && item.age > 0) {
      if (item.age < minAge) minAge = item.age;
      if (item.age > maxAge) maxAge = item.age;
    }
  }

  return {
    regions: Array.from(regions).sort(),
    genders: Array.from(genders).sort(),
    categories: Array.from(categories).sort(),
    paymentMethods: Array.from(paymentMethods).sort(),
    tags: Array.from(tags).sort(),
    ageRange: {
      min: minAge === Infinity ? 0 : minAge,
      max: maxAge === -Infinity ? 100 : maxAge
    }
  };
};