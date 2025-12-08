import { FiChevronDown } from 'react-icons/fi';

function SortDropdown({ value, onChange }) {
  return (
    <div className="relative inline-block">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
      >
        <option value="date-desc">Date (Newest First)</option>
        <option value="date-asc">Date (Oldest First)</option>
        <option value="quantity-desc">Quantity (High to Low)</option>
        <option value="quantity-asc">Quantity (Low to High)</option>
        <option value="name-asc">Customer Name (A-Z)</option>
        <option value="name-desc">Customer Name (Z-A)</option>
      </select>
      <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
    </div>
  );
}

export default SortDropdown;