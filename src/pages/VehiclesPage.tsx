import React, { useEffect, useState } from 'react';
import { fetchCars, FilterOptions, filterCars, Car } from '../utils/carData';
import CarCard from '../components/CarCard';
import FilterSection from '../components/FilterSection';
import { SearchIcon } from 'lucide-react';

const VehiclesPage = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<FilterOptions>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCars().then(data => {
      setCars(data);
      setFilteredCars(data);
      setIsLoading(false);
    });
  }, []);

  // Handle filter changes
  const handleFilterChange = (newFilters: FilterOptions) => {
    setIsLoading(true);
    setFilters(newFilters);
    setTimeout(() => {
      const filtered = filterCars(cars, newFilters);
      const searchFiltered = searchTerm
        ? filtered.filter(car =>
            `${car.brand} ${car.model}`.toLowerCase().includes(searchTerm.toLowerCase())
          )
        : filtered;
      setFilteredCars(searchFiltered);
      setIsLoading(false);
    }, 500);
  };

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setIsLoading(true);
    setTimeout(() => {
      const filtered = filterCars(cars, filters);
      const searchFiltered = value
        ? filtered.filter(car =>
            `${car.brand} ${car.model}`.toLowerCase().includes(value.toLowerCase())
          )
        : filtered;
      setFilteredCars(searchFiltered);
      setIsLoading(false);
    }, 500);
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setFilters({});
    setIsLoading(true);
    setTimeout(() => {
      setFilteredCars(cars);
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="w-full bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#001514]">Our Vehicles</h1>
          <p className="text-gray-600 mt-2">
            Browse our extensive collection of quality vehicles
          </p>
        </div>
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by brand or model..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full p-3 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#A3320B] focus:border-transparent"
            />
            <SearchIcon className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filter Column */}
          <div className="lg:col-span-1">
            <FilterSection onFilterChange={handleFilterChange} filters={filters} cars={cars} />
          </div>
          {/* Vehicles Grid */}
          <div className="lg:col-span-3">
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#A3320B]"></div>
              </div>
            ) : filteredCars.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCars.map(car => (
                  <CarCard key={car.id} car={car} />
                ))}
              </div>
            ) : (
              <div className="bg-white p-8 rounded-lg text-center">
                <h3 className="text-xl font-bold mb-2">No vehicles found</h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your filters or search criteria
                </p>
                <button
                  onClick={handleResetFilters}
                  className="text-[#A3320B] font-medium hover:text-[#6B0504]"
                >
                  Reset all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehiclesPage;