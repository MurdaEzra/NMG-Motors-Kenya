import React from 'react';
import { Link } from 'react-router-dom';
import { Car } from '../utils/carData';
interface SimilarCarsProps {
  cars: Car[];
  currentCarId: string;
}
const SimilarCars: React.FC<SimilarCarsProps> = ({
  cars,
  currentCarId
}) => {
  if (cars.length === 0) {
    return null;
  }
  return <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6">Similar Vehicles</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cars.map(car => <Link key={car.id} to={`/vehicles/${car.id}`} className="group bg-white rounded-lg shadow-md overflow-hidden hover:-translate-y-1 transition-transform duration-300">
            <div className="h-40 overflow-hidden">
              <img src={car.images[0]} alt={`${car.brand} ${car.model}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="p-4">
              <h3 className="font-bold">
                {car.brand} {car.model}
              </h3>
              <p className="text-[#A3320B] font-bold mt-1">
                KES {car.price.toLocaleString()}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                {car.year} • {car.mileage.toLocaleString()} km • {car.fuelType}
              </p>
            </div>
          </Link>)}
      </div>
    </div>;
};
export default SimilarCars;