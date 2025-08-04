import React, { useEffect, useState } from 'react';
import { cars, FilterOptions, filterCars } from '../utils/carData';
import CarCard from '../components/CarCard';
import FilterSection from '../components/FilterSection';
import { SearchIcon } from 'lucide-react';

const VehiclesPage = () => {
  const [filteredCars, setFilteredCars] = useState(cars);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [carsPerPage, setCarsPerPage] = useState(25); // Default for desktop

  // Adjust cars per page on screen resize
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setCarsPerPage(width < 768 ? 10 : 25);
    };
    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Pagination
  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = filteredCars.slice(indexOfFirstCar, indexOfLastCar);
  const totalPages = Math.ceil(filteredCars.length / carsPerPage);

  const handleFilterChange = (filters: FilterOptions) => {
    setIsLoading(true);
    setTimeout(() => {
      const filtered = filterCars(filters);
      const searchFiltered = searchTerm
        ? filtered.filter((car) =>
            `${car.brand} ${car.model}`.toLowerCase().includes(searchTerm.toLowerCase())
          )
        : filtered;
      setFilteredCars(searchFiltered);
      setCurrentPage(1);
      setIsLoading(false);
    }, 500);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    handleFilterChange({});
  };

  return (
    <div className="w-full bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#001514]">Our Vehicles</h1>
          <p className="text-gray-600 mt-2">Browse our extensive collection of quality vehicles</p>
        </div>

        {/* Search */}
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

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters */}
          <div className="lg:col-span-1">
            <FilterSection onFilterChange={handleFilterChange} />
          </div>

          {/* Car Cards */}
          <div className="lg:col-span-3">
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#A3320B]"></div>
              </div>
            ) : currentCars.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {currentCars.map((car) => (
                    <CarCard key={car.id} car={car} />
                  ))}
                </div>

                {/* Pagination */}
                <div className="flex justify-center mt-8 gap-4">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((prev) => prev - 1)}
                    className="px-4 py-2 rounded bg-[#A3320B] text-white disabled:bg-gray-300"
                  >
                    Prev
                  </button>
                  <span className="text-gray-700 self-center">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                    className="px-4 py-2 rounded bg-[#A3320B] text-white disabled:bg-gray-300"
                  >
                    Next
                  </button>
                </div>
              </>
            ) : (
              <div className="bg-white p-8 rounded-lg text-center">
                <h3 className="text-xl font-bold mb-2">No vehicles found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your filters or search criteria</p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    handleFilterChange({});
                  }}
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