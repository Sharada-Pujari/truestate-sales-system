import { FiFilter, FiX } from 'react-icons/fi';

function FilterPanel({ filters, filterOptions, onFilterChange, onReset }) {
  if (!filterOptions) return null;

  const handleMultiSelect = (key, value) => {
    const current = filters[key] || [];
    const updated = current.includes(value)
      ? current.filter(item => item !== value)
      : [...current, value];
    onFilterChange(key, updated);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <FiFilter /> Filters
        </h2>
        <button
          onClick={onReset}
          className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
        >
          <FiX /> Reset All
        </button>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Customer Region</label>
          <div className="space-y-1 max-h-40 overflow-y-auto">
            {filterOptions.regions && filterOptions.regions.map(region => (
              <label key={region} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.regions.includes(region)}
                  onChange={() => handleMultiSelect('regions', region)}
                  className="rounded text-blue-600"
                />
                <span className="text-sm">{region}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Gender</label>
          <div className="space-y-1">
            {filterOptions.genders && filterOptions.genders.map(gender => (
              <label key={gender} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.genders.includes(gender)}
                  onChange={() => handleMultiSelect('genders', gender)}
                  className="rounded text-blue-600"
                />
                <span className="text-sm">{gender}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Age Range</label>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Min"
              value={filters.minAge}
              onChange={(e) => onFilterChange('minAge', e.target.value)}
              className="w-1/2 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              placeholder="Max"
              value={filters.maxAge}
              onChange={(e) => onFilterChange('maxAge', e.target.value)}
              className="w-1/2 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Product Category</label>
          <div className="space-y-1 max-h-40 overflow-y-auto">
            {filterOptions.categories && filterOptions.categories.map(category => (
              <label key={category} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.categories.includes(category)}
                  onChange={() => handleMultiSelect('categories', category)}
                  className="rounded text-blue-600"
                />
                <span className="text-sm">{category}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Payment Method</label>
          <div className="space-y-1">
            {filterOptions.paymentMethods && filterOptions.paymentMethods.map(method => (
              <label key={method} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.paymentMethods.includes(method)}
                  onChange={() => handleMultiSelect('paymentMethods', method)}
                  className="rounded text-blue-600"
                />
                <span className="text-sm">{method}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Date Range</label>
          <div className="space-y-2">
            <input
              type="date"
              value={filters.startDate}
              onChange={(e) => onFilterChange('startDate', e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="date"
              value={filters.endDate}
              onChange={(e) => onFilterChange('endDate', e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilterPanel;