import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchCars, getSimilarCars, formatCurrency } from '../utils/carData';
import WhatsappButton from '../components/WhatsappButton';
import SimilarCars from '../components/SimilarCars';
import VehicleSpecsDropdown from '../components/VehicleSpecsDropdown';
import VehicleCondition from '../components/VehicleCondition';
import { CalendarIcon, GaugeIcon, FuelIcon, ZapIcon, ActivityIcon, CheckIcon, XIcon, ChevronLeftIcon, ChevronRightIcon, StarIcon } from 'lucide-react';

const VehicleDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [cars, setCars] = useState([]);
  const [car, setCar] = useState(null);
  const [similarCars, setSimilarCars] = useState([]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    fetchCars().then(data => {
      setCars(data);
      const foundCar = data.find(car => car.id === id);
      setCar(foundCar);
      if (foundCar) {
        setSimilarCars(getSimilarCars(data, foundCar.id, foundCar.brand));
      }
    });
  }, [id]);

  // Reset image index and animation when car changes
  useEffect(() => {
    setActiveImageIndex(0);
    setIsLoaded(false);
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, [id, car]);

  // Handle image navigation
  const nextImage = () => {
    if (!car) return;
    setActiveImageIndex(prevIndex => prevIndex === car.images.length - 1 ? 0 : prevIndex + 1);
  };
  const prevImage = () => {
    if (!car) return;
    setActiveImageIndex(prevIndex => prevIndex === 0 ? car.images.length - 1 : prevIndex - 1);
  };

  if (!car) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4 font-montserrat">
          Vehicle Not Found
        </h1>
        <p className="mb-8 font-cambria">
          The vehicle you are looking for does not exist or has been removed.
        </p>
        <button onClick={() => navigate('/vehicles')} className="bg-[#A3320B] hover:bg-[#6B0504] text-white py-2 px-6 rounded-lg font-cambria">
          Browse All Vehicles
        </button>
      </div>
    );
  }

  return (
    <div className="w-full bg-gray-50">
      <div className={`container mx-auto px-4 py-8 transition-all duration-500 transform ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
        {/* Back button */}
        <button onClick={() => navigate('/vehicles')} className="flex items-center text-[#A3320B] hover:text-[#6B0504] mb-6 font-cambria">
          <ChevronLeftIcon className="h-5 w-5 mr-1" />
          Back to all vehicles
        </button>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative h-[300px] md:h-[400px]">
              <img src={car.images[activeImageIndex]} alt={`${car.brand} ${car.model}`} className="w-full h-full object-cover" />
              {/* Image navigation buttons */}
              <button onClick={prevImage} className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-opacity">
                <ChevronLeftIcon className="h-6 w-6" />
              </button>
              <button onClick={nextImage} className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-opacity">
                <ChevronRightIcon className="h-6 w-6" />
              </button>
              {/* Image counter */}
              <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
                {activeImageIndex + 1} / {car.images.length}
              </div>
            </div>
            {/* Thumbnail images */}
            <div className="flex p-2 overflow-x-auto">
              {car.images.map((image, index) => (
                <div key={index} className={`h-16 w-24 flex-shrink-0 mx-1 cursor-pointer border-2 ${activeImageIndex === index ? 'border-[#A3320B]' : 'border-transparent'}`} onClick={() => setActiveImageIndex(index)}>
                  <img src={image} alt={`${car.brand} ${car.model} thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
          {/* Car Details */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start">
              <h1 className="text-2xl md:text-3xl font-bold text-[#001514] font-montserrat">
                {car.brand} {car.model}
              </h1>
              <span className={`${car.available ? 'bg-green-500' : 'bg-[#6B0504]'} text-white text-sm font-bold px-3 py-1 rounded-full`}>
                {car.available ? 'Available' : 'Sold'}
              </span>
            </div>
            {/* Condition Score */}
            <div className="flex items-center mt-2">
              <span className="text-sm text-gray-600 mr-2 font-cambria">
                Condition Score:
              </span>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className={`h-5 w-5 ${i < car.additionalSpecs.conditionScore ? 'text-[#E6AF2E] fill-[#E6AF2E]' : 'text-gray-300'}`} />
                ))}
              </div>
              <span className="ml-2 text-sm text-gray-600 font-cambria">
                {car.additionalSpecs.conditionScore}/5
              </span>
            </div>
            <div className="mt-4">
              <p className="text-3xl font-bold text-[#A3320B] font-montserrat">
                {formatCurrency(car.price)}
              </p>
            </div>
            <div className="mt-6">
              <h2 className="text-lg font-bold mb-4 font-montserrat">
                Vehicle Specifications
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <CalendarIcon className="h-5 w-5 mr-2 text-[#A3320B]" />
                  <div>
                    <p className="text-sm text-gray-600 font-cambria">Year</p>
                    <p className="font-semibold font-cambria">{car.year}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <GaugeIcon className="h-5 w-5 mr-2 text-[#A3320B]" />
                  <div>
                    <p className="text-sm text-gray-600 font-cambria">
                      Mileage
                    </p>
                    <p className="font-semibold font-cambria">
                      {car.mileage.toLocaleString()} km
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <FuelIcon className="h-5 w-5 mr-2 text-[#A3320B]" />
                  <div>
                    <p className="text-sm text-gray-600 font-cambria">
                      Fuel Type
                    </p>
                    <p className="font-semibold font-cambria">{car.fuelType}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <ZapIcon className="h-5 w-5 mr-2 text-[#A3320B]" />
                  <div>
                    <p className="text-sm text-gray-600 font-cambria">
                      Engine Size
                    </p>
                    <p className="font-semibold font-cambria">
                      {car.engineSize}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <ActivityIcon className="h-5 w-5 mr-2 text-[#A3320B]" />
                  <div>
                    <p className="text-sm text-gray-600 font-cambria">
                      Horsepower
                    </p>
                    <p className="font-semibold font-cambria">
                      {car.horsePower} HP
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <ActivityIcon className="h-5 w-5 mr-2 text-[#A3320B]" />
                  <div>
                    <p className="text-sm text-gray-600 font-cambria">Torque</p>
                    <p className="font-semibold font-cambria">{car.torque}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <ActivityIcon className="h-5 w-5 mr-2 text-[#A3320B]" />
                  <div>
                    <p className="text-sm text-gray-600 font-cambria">
                      Transmission
                    </p>
                    <p className="font-semibold font-cambria">
                      {car.transmission}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  {car.available ? <CheckIcon className="h-5 w-5 mr-2 text-green-500" /> : <XIcon className="h-5 w-5 mr-2 text-red-500" />}
                  <div>
                    <p className="text-sm text-gray-600 font-cambria">
                      Availability
                    </p>
                    <p className="font-semibold font-cambria">
                      {car.available ? 'In Stock' : 'Sold Out'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h2 className="text-lg font-bold mb-2 font-montserrat">
                Description
              </h2>
              <p className="text-gray-700 font-cambria">{car.description}</p>
            </div>
            {/* Additional Specs Dropdown */}
            <VehicleSpecsDropdown car={car} />
            {/* Vehicle Condition Dropdown */}
            <VehicleCondition car={car} />
            <div className="mt-8">
              <WhatsappButton car={car} />
            </div>
          </div>
        </div>
        {/* Similar Cars Section */}
        <SimilarCars cars={similarCars} currentCarId={car.id} />
      </div>
    </div>
  );
};

export default VehicleDetailPage;