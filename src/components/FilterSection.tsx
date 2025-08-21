import React, { useEffect, useState } from 'react';
import { FilterIcon } from 'lucide-react';
import { FilterOptions, getUniqueBrands, getPriceRange, getYearRange } from '../utils/carData';
import type { Car } from '../utils/carData';

interface FilterSectionProps {
  onFilterChange: (filters: FilterOptions) => void;
  filters?: FilterOptions;
  cars: Car[]; // Add this line
}
const FilterSection: React.FC<FilterSectionProps> = ({
  onFilterChange,
  filters,
  cars // Add this line
}) => {
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 15000000]);
  const [yearRange, setYearRange] = useState<[number, number]>([2010, 2023]);
  const brands = getUniqueBrands(cars); // Pass cars here
  const defaultPriceRange = getPriceRange(cars);
  const defaultYearRange = getYearRange(cars);
  useEffect(() => {
    // Set initial ranges
    setPriceRange([defaultPriceRange.min, defaultPriceRange.max]);
    setYearRange([defaultYearRange.min, defaultYearRange.max]);
  }, []);
  useEffect(() => {
    // Apply filters
    onFilterChange({
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
      brands: selectedBrands.length > 0 ? selectedBrands : undefined,
      minYear: yearRange[0],
      maxYear: yearRange[1]
    });
  }, [selectedBrands, priceRange, yearRange, onFilterChange]);
  useEffect(() => {
    const priceRange = getPriceRange(cars);
    const yearRange = getYearRange(cars);
    setPriceRange([priceRange.min, priceRange.max]);
    setYearRange([yearRange.min, yearRange.max]);
    setSelectedBrands([]);
  }, [cars]);
  const toggleBrand = (brand: string) => {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(selectedBrands.filter(b => b !== brand));
    } else {
      setSelectedBrands([...selectedBrands, brand]);
    }
  };
  const handlePriceMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setPriceRange([value, priceRange[1]]);
  };
  const handlePriceMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setPriceRange([priceRange[0], value]);
  };
  const handleYearMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setYearRange([value, yearRange[1]]);
  };
  const handleYearMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setYearRange([yearRange[0], value]);
  };
  const resetFilters = () => {
    setSelectedBrands([]);
    setPriceRange([defaultPriceRange.min, defaultPriceRange.max]);
    setYearRange([defaultYearRange.min, defaultYearRange.max]);
  };
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };
  return <div className="bg-white shadow-md rounded-lg p-4 mb-6">
      <div className="flex justify-between items-center cursor-pointer" onClick={() => setIsFilterVisible(!isFilterVisible)}>
        <h2 className="text-lg font-bold flex items-center">
          <FilterIcon className="h-5 w-5 mr-2" />
          Filter Vehicles
        </h2>
        <span className="text-sm text-[#A3320B]">
          {isFilterVisible ? 'Hide Filters' : 'Show Filters'}
        </span>
      </div>
      {isFilterVisible && <div className="mt-4 space-y-6">
          {/* Brand Filter */}
          <div>
            <h3 className="font-semibold mb-2">Brand</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {brands.map(brand => <label key={brand} className="flex items-center space-x-2">
                  <input type="checkbox" checked={selectedBrands.includes(brand)} onChange={() => toggleBrand(brand)} className="rounded text-[#A3320B] focus:ring-[#A3320B]" />
                  <span>{brand}</span>
                </label>)}
            </div>
          </div>
          {/* Price Range */}
          <div>
            <h3 className="font-semibold mb-2">Price Range</h3>
            <div className="flex justify-between text-sm mb-2">
              <span>{formatPrice(priceRange[0])}</span>
              <span>{formatPrice(priceRange[1])}</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1">Min Price</label>
                <input type="range" min={defaultPriceRange.min} max={defaultPriceRange.max} step={100000} value={priceRange[0]} onChange={handlePriceMinChange} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
              </div>
              <div>
                <label className="block text-sm mb-1">Max Price</label>
                <input type="range" min={defaultPriceRange.min} max={defaultPriceRange.max} step={100000} value={priceRange[1]} onChange={handlePriceMaxChange} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
              </div>
            </div>
          </div>
          {/* Year Range */}
          <div>
            <h3 className="font-semibold mb-2">Year of Manufacture</h3>
            <div className="flex justify-between text-sm mb-2">
              <span>{yearRange[0]}</span>
              <span>{yearRange[1]}</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1">From Year</label>
                <input type="range" min={defaultYearRange.min} max={defaultYearRange.max} step={1} value={yearRange[0]} onChange={handleYearMinChange} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
              </div>
              <div>
                <label className="block text-sm mb-1">To Year</label>
                <input type="range" min={defaultYearRange.min} max={defaultYearRange.max} step={1} value={yearRange[1]} onChange={handleYearMaxChange} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
              </div>
            </div>
          </div>
          {/* Reset Button */}
          <div className="pt-2 border-t border-gray-200">
            <button onClick={resetFilters} className="text-[#6B0504] hover:text-[#A3320B] font-medium">
              Reset All Filters
            </button>
          </div>
        </div>}
    </div>;
};
export default FilterSection;