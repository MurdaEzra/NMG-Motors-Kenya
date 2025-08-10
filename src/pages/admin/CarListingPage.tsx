import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircleIcon, SearchIcon, EditIcon, TrashIcon, CheckCircleIcon, XCircleIcon, StarIcon } from 'lucide-react';
import { Car, fetchCars, formatCurrency } from '../../utils/carData';

const CarListingPage: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAvailability, setFilterAvailability] = useState<string>('all');
  const [filterBrand, setFilterBrand] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('newest');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCars().then(data => {
      setCars(data);
      setLoading(false);
    });
  }, []);

  // Get unique brands for filter
  const uniqueBrands = Array.from(new Set(cars.map(car => car.brand)));

  // Filter and sort cars
  const filteredCars = cars.filter(car => {
    // Search term filter
    const searchMatch =
      car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.year.toString().includes(searchTerm);
    // Availability filter
    const availabilityMatch =
      filterAvailability === 'all' ||
      (filterAvailability === 'available' && car.available) ||
      (filterAvailability === 'sold' && !car.available);
    // Brand filter
    const brandMatch = filterBrand === 'all' || car.brand === filterBrand;
    return searchMatch && availabilityMatch && brandMatch;
  });

  // Sort cars
  const sortedCars = [...filteredCars].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return b.year - a.year;
      case 'oldest':
        return a.year - b.year;
      case 'price-high':
        return b.price - a.price;
      case 'price-low':
        return a.price - b.price;
      case 'condition':
        return b.additionalSpecs.conditionScore - a.additionalSpecs.conditionScore;
      default:
        return 0;
    }
  });

  // Delete car handler - in a real app, this would call an API
  const handleDeleteCar = (carId: string) => {
    if (window.confirm('Are you sure you want to delete this car?')) {
      // In a real app, we'd delete the car from the database
      alert(`Car ${carId} would be deleted in a real application`);
    }
  };

  if (loading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold font-montserrat">Car Listings</h1>
        <Link to="/admin/cars/add" className="bg-[#A3320B] hover:bg-[#6B0504] text-white px-4 py-2 rounded-md flex items-center space-x-2 font-cambria">
          <PlusCircleIcon className="h-5 w-5" />
          <span>Add New Car</span>
        </Link>
      </div>
      {/* Filters and Search */}
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search cars..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#A3320B] focus:border-[#A3320B] font-cambria"
            />
          </div>
          {/* Filter by availability */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 font-montserrat">
              Availability
            </label>
            <select
              value={filterAvailability}
              onChange={e => setFilterAvailability(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#A3320B] focus:border-[#A3320B] font-cambria"
            >
              <option value="all">All Cars</option>
              <option value="available">Available Only</option>
              <option value="sold">Sold Only</option>
            </select>
          </div>
          {/* Filter by brand */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 font-montserrat">
              Brand
            </label>
            <select
              value={filterBrand}
              onChange={e => setFilterBrand(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#A3320B] focus:border-[#A3320B] font-cambria"
            >
              <option value="all">All Brands</option>
              {uniqueBrands.map(brand => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
          </div>
          {/* Sort by */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 font-montserrat">
              Sort By
            </label>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#A3320B] focus:border-[#A3320B] font-cambria"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="price-high">Price (High to Low)</option>
              <option value="price-low">Price (Low to High)</option>
              <option value="condition">Condition Score</option>
            </select>
          </div>
        </div>
      </div>
      {/* Car Listings Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-sm font-medium text-gray-600 font-montserrat">
                  Image
                </th>
                <th className="px-4 py-3 text-sm font-medium text-gray-600 font-montserrat">
                  Car Details
                </th>
                <th className="px-4 py-3 text-sm font-medium text-gray-600 font-montserrat">
                  Price
                </th>
                <th className="px-4 py-3 text-sm font-medium text-gray-600 font-montserrat">
                  Status
                </th>
                <th className="px-4 py-3 text-sm font-medium text-gray-600 font-montserrat">
                  Condition
                </th>
                <th className="px-4 py-3 text-sm font-medium text-gray-600 font-montserrat">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 font-cambria">
              {sortedCars.map(car => (
                <tr key={car.id}>
                  <td className="px-4 py-3">
                    <img src={car.images[0]} alt={`${car.brand} ${car.model}`} className="h-16 w-24 object-cover rounded" />
                  </td>
                  <td className="px-4 py-3">
                    <div>
                      <p className="font-medium text-gray-900">
                        {car.brand} {car.model}
                      </p>
                      <p className="text-sm text-gray-500">
                        {car.year} • {car.mileage.toLocaleString()} km • {car.fuelType}
                      </p>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-medium">
                    {formatCurrency(car.price)}
                  </td>
                  <td className="px-4 py-3">
                    {car.available ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <CheckCircleIcon className="h-4 w-4 mr-1" />
                        Available
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        <XCircleIcon className="h-4 w-4 mr-1" />
                        Sold
                      </span>
                    )}
                    {car.featured && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 ml-2">
                        Featured
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon key={i} className={`h-4 w-4 ${i < car.additionalSpecs.conditionScore ? 'text-[#E6AF2E] fill-[#E6AF2E]' : 'text-gray-300'}`} />
                      ))}
                      <span className="ml-2 text-sm text-gray-600">
                        {car.additionalSpecs.conditionScore}/5
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex space-x-2">
                      <Link to={`/admin/cars/edit/${car.id}`} className="p-2 text-blue-600 hover:bg-blue-50 rounded" title="Edit">
                        <EditIcon className="h-5 w-5" />
                      </Link>
                      <button onClick={() => handleDeleteCar(car.id)} className="p-2 text-red-600 hover:bg-red-50 rounded" title="Delete">
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {sortedCars.length === 0 && (
          <div className="py-8 text-center">
            <p className="text-gray-500 font-cambria">
              No cars found matching your filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CarListingPage;