import * as React from 'react';
import { Link } from 'react-router-dom';
import { Car, formatCurrency } from '../utils/carData';
import { CalendarIcon, GaugeIcon, FuelIcon, CheckIcon, XIcon, StarIcon } from 'lucide-react';
interface CarCardProps {
  car: Car;
}
const CarCard: React.FC<CarCardProps> = ({
  car
}) => {
  return <Link to={`/vehicles/${car.id}`} className="group">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 group-hover:-translate-y-1 h-full flex flex-col">
        <div className="relative h-48 overflow-hidden">
          <img src={car.images[0]} alt={`${car.brand} ${car.model}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          {car.featured && <span className="absolute top-2 left-2 bg-[#E6AF2E] text-[#001514] text-xs font-bold px-2 py-1 rounded">
              Featured
            </span>}
          <span className={`absolute top-2 right-2 ${car.available ? 'bg-green-500' : 'bg-[#6B0504]'} text-white text-xs font-bold px-2 py-1 rounded`}>
            {car.available ? 'Available' : 'Sold'}
          </span>
        </div>
        <div className="p-4 flex-grow flex flex-col">
          <h3 className="text-lg font-bold text-[#001514] font-montserrat">
            {car.brand} {car.model}
          </h3>
          <div className="mt-2 text-gray-700">
            <p className="text-xl font-bold text-[#A3320B] font-montserrat">
              {formatCurrency(car.price)}
            </p>
          </div>
          {/* Condition Score */}
          <div className="flex items-center mt-2">
            <span className="text-sm text-gray-600 mr-2 font-cambria">
              Condition:
            </span>
            <div className="flex">
              {[...Array(5)].map((_, i) => <StarIcon key={i} className={`h-4 w-4 ${i < car.additionalSpecs.conditionScore ? 'text-[#E6AF2E] fill-[#E6AF2E]' : 'text-gray-300'}`} />)}
            </div>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2 text-sm text-gray-600 font-cambria">
            <div className="flex items-center">
              <CalendarIcon className="h-4 w-4 mr-1" />
              <span>{car.year}</span>
            </div>
            <div className="flex items-center">
              <GaugeIcon className="h-4 w-4 mr-1" />
              <span>{car.mileage.toLocaleString()} km</span>
            </div>
            <div className="flex items-center">
              <FuelIcon className="h-4 w-4 mr-1" />
              <span>{car.fuelType}</span>
            </div>
            <div className="flex items-center">
              {car.available ? <CheckIcon className="h-4 w-4 mr-1 text-green-500" /> : <XIcon className="h-4 w-4 mr-1 text-red-500" />}
              <span>{car.available ? 'In Stock' : 'Sold Out'}</span>
            </div>
          </div>
          <div className="mt-4 pt-2 border-t border-gray-200">
            <button className="w-full bg-[#001514] hover:bg-[#A3320B] text-white py-2 rounded transition-colors font-cambria">
              View Details
            </button>
          </div>
        </div>
      </div>
    </Link>;
};
export default CarCard;