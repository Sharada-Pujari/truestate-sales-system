import { getDB } from '../config/database.js';

export const searchAndFilterSales = async (query) => {
  const db = getDB();
  const collection = db.collection('sales');
  
  const filter = {};
  
  if (query.search) {
    filter.$or = [
      { customerName: { $regex: query.search, $options: 'i' } },
      { phoneNumber: { $regex: query.search, $options: 'i' } }
    ];
  }
  
  if (query.regions?.length > 0) {
    const regions = Array.isArray(query.regions) ? query.regions : [query.regions];
    filter.customerRegion = { $in: regions };
  }
  
  if (query.genders?.length > 0) {
    const genders = Array.isArray(query.genders) ? query.genders : [query.genders];
    filter.gender = { $in: genders };
  }
  
  if (query.categories?.length > 0) {
    const categories = Array.isArray(query.categories) ? query.categories : [query.categories];
    filter.productCategory = { $in: categories };
  }
  
  if (query.paymentMethods?.length > 0) {
    const methods = Array.isArray(query.paymentMethods) ? query.paymentMethods : [query.paymentMethods];
    filter.paymentMethod = { $in: methods };
  }
  
  if (query.tags?.length > 0) {
    const tags = Array.isArray(query.tags) ? query.tags : [query.tags];
    filter.tags = { $in: tags };
  }
  
  if (query.minAge || query.maxAge) {
    filter.age = {};
    if (query.minAge) filter.age.$gte = parseInt(query.minAge);
    if (query.maxAge) filter.age.$lte = parseInt(query.maxAge);
  }
  
  if (query.startDate || query.endDate) {
    filter.date = {};
    if (query.startDate) filter.date.$gte = new Date(query.startDate);
    if (query.endDate) filter.date.$lte = new Date(query.endDate);
  }
  
  const sort = {};
  switch (query.sortBy) {
    case 'date-desc': sort.date = -1; break;
    case 'date-asc': sort.date = 1; break;
    case 'quantity-desc': sort.quantity = -1; break;
    case 'quantity-asc': sort.quantity = 1; break;
    case 'name-asc': sort.customerName = 1; break;
    case 'name-desc': sort.customerName = -1; break;
    default: sort.date = -1;
  }
  
  const page = parseInt(query.page) || 1;
  const limit = 10;
  const skip = (page - 1) * limit;
  
  const totalRecords = await collection.countDocuments(filter);
  const data = await collection.find(filter).sort(sort).skip(skip).limit(limit).toArray();
  
  return {
    data,
    pagination: {
      currentPage: page,
      totalPages: Math.ceil(totalRecords / limit),
      totalRecords,
      recordsPerPage: limit,
      hasNext: skip + limit < totalRecords,
      hasPrevious: page > 1
    }
  };
};

export const getFilterOptions = async () => {
  const db = getDB();
  const collection = db.collection('sales');
  
  const [regions, genders, categories, paymentMethods, tags, ageRange] = await Promise.all([
    collection.distinct('customerRegion'),
    collection.distinct('gender'),
    collection.distinct('productCategory'),
    collection.distinct('paymentMethod'),
    collection.distinct('tags'),
    collection.aggregate([
      { $group: { _id: null, minAge: { $min: '$age' }, maxAge: { $max: '$age' } } }
    ]).toArray()
  ]);
  
  return {
    regions: regions.filter(Boolean).sort(),
    genders: genders.filter(Boolean).sort(),
    categories: categories.filter(Boolean).sort(),
    paymentMethods: paymentMethods.filter(Boolean).sort(),
    tags: tags.flat().filter(Boolean).sort(),
    ageRange: {
      min: ageRange[0]?.minAge || 0,
      max: ageRange[0]?.maxAge || 100
    }
  };
};