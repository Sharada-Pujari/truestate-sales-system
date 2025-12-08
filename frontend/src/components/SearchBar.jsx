import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';

function SearchBar({ value, onChange }) {
  const [localValue, setLocalValue] = useState(value);

  const handleSubmit = (e) => {
    e.preventDefault();
    onChange(localValue);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative">
        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
        <input
          type="text"
          value={localValue}
          onChange={(e) => setLocalValue(e.target.value)}
          placeholder="Search by customer name or phone number..."
          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
    </form>
  );
}

export default SearchBar;