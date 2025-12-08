import { useSales } from './hooks/useSales';
import SearchBar from './components/SearchBar';
import FilterPanel from './components/FilterPanel';
import SortDropdown from './components/SortDropdown';
import SalesTable from './components/SalesTable';
import Pagination from './components/Pagination';

function App() {
  const {
    salesData,
    pagination,
    filterOptions,
    loading,
    error,
    filters,
    updateFilter,
    resetFilters
  } = useSales();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Retail Sales Management</h1>
          <p className="text-gray-600 mt-1">TruEstate Sales Dashboard</p>
        </div>

        <div className="mb-6">
          <SearchBar
            value={filters.search}
            onChange={(value) => updateFilter('search', value)}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <FilterPanel
              filters={filters}
              filterOptions={filterOptions}
              onFilterChange={updateFilter}
              onReset={resetFilters}
            />
          </div>

          <div className="lg:col-span-3 space-y-4">
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-600">
                {pagination && `${pagination.totalRecords} results found`}
              </div>
              <SortDropdown
                value={filters.sortBy}
                onChange={(value) => updateFilter('sortBy', value)}
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}

            <SalesTable data={salesData} loading={loading} />

            {pagination && (
              <Pagination
                pagination={pagination}
                onPageChange={(page) => updateFilter('page', page)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;