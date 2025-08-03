import React, { useState } from 'react';
import { Car } from '../utils/carData';
import { ChevronDownIcon, ChevronUpIcon, CheckIcon, XIcon } from 'lucide-react';
interface VehicleSpecsDropdownProps {
  car: Car;
}
const VehicleSpecsDropdown: React.FC<VehicleSpecsDropdownProps> = ({
  car
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return <div className="mt-6 pt-6 border-t border-gray-200">
      <div className="flex justify-between items-center cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <h2 className="text-lg font-bold font-montserrat">
          Additional Specifications
        </h2>
        <button className="text-[#A3320B]">
          {isOpen ? <ChevronUpIcon className="h-5 w-5" /> : <ChevronDownIcon className="h-5 w-5" />}
        </button>
      </div>
      {isOpen && <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 font-cambria">
          <div className="flex items-start">
            <div className={`flex-shrink-0 mt-0.5 rounded-full p-1 ${car.additionalSpecs.sunroof ? 'bg-green-100' : 'bg-red-100'}`}>
              {car.additionalSpecs.sunroof ? <CheckIcon className="h-4 w-4 text-green-600" /> : <XIcon className="h-4 w-4 text-red-600" />}
            </div>
            <div className="ml-3">
              <p className="font-semibold">Sunroof</p>
              <p className="text-sm text-gray-600">
                {car.additionalSpecs.sunroof ? 'Available' : 'Not Available'}
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="flex-shrink-0 mt-0.5 rounded-full p-1 bg-green-100">
              <CheckIcon className="h-4 w-4 text-green-600" />
            </div>
            <div className="ml-3">
              <p className="font-semibold">Trimmings</p>
              <p className="text-sm text-gray-600">
                {car.additionalSpecs.trimmings}
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="flex-shrink-0 mt-0.5 rounded-full p-1 bg-green-100">
              <CheckIcon className="h-4 w-4 text-green-600" />
            </div>
            <div className="ml-3">
              <p className="font-semibold">Sound System</p>
              <p className="text-sm text-gray-600">
                {car.additionalSpecs.soundSystem}
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="flex-shrink-0 mt-0.5 rounded-full p-1 bg-green-100">
              <CheckIcon className="h-4 w-4 text-green-600" />
            </div>
            <div className="ml-3">
              <p className="font-semibold">Seat Material</p>
              <p className="text-sm text-gray-600">
                {car.additionalSpecs.seatMaterial}
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="flex-shrink-0 mt-0.5 rounded-full p-1 bg-green-100">
              <CheckIcon className="h-4 w-4 text-green-600" />
            </div>
            <div className="ml-3">
              <p className="font-semibold">Air Conditioning</p>
              <p className="text-sm text-gray-600">
                {car.additionalSpecs.airConditioning}
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <div className={`flex-shrink-0 mt-0.5 rounded-full p-1 ${car.additionalSpecs.phoneConnectivity ? 'bg-green-100' : 'bg-red-100'}`}>
              {car.additionalSpecs.phoneConnectivity ? <CheckIcon className="h-4 w-4 text-green-600" /> : <XIcon className="h-4 w-4 text-red-600" />}
            </div>
            <div className="ml-3">
              <p className="font-semibold">Phone Connectivity</p>
              <p className="text-sm text-gray-600">
                {car.additionalSpecs.phoneConnectivity ? 'Available' : 'Not Available'}
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="flex-shrink-0 mt-0.5 rounded-full p-1 bg-green-100">
              <CheckIcon className="h-4 w-4 text-green-600" />
            </div>
            <div className="ml-3">
              <p className="font-semibold">Infotainment System</p>
              <p className="text-sm text-gray-600">
                {car.additionalSpecs.infotainmentSystem}
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <div className={`flex-shrink-0 mt-0.5 rounded-full p-1 ${car.additionalSpecs.cigaretteLighterPort ? 'bg-green-100' : 'bg-red-100'}`}>
              {car.additionalSpecs.cigaretteLighterPort ? <CheckIcon className="h-4 w-4 text-green-600" /> : <XIcon className="h-4 w-4 text-red-600" />}
            </div>
            <div className="ml-3">
              <p className="font-semibold">Cigarette Lighter Port</p>
              <p className="text-sm text-gray-600">
                {car.additionalSpecs.cigaretteLighterPort ? 'Available' : 'Not Available'}
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <div className={`flex-shrink-0 mt-0.5 rounded-full p-1 ${car.additionalSpecs.isofixAnchors ? 'bg-green-100' : 'bg-red-100'}`}>
              {car.additionalSpecs.isofixAnchors ? <CheckIcon className="h-4 w-4 text-green-600" /> : <XIcon className="h-4 w-4 text-red-600" />}
            </div>
            <div className="ml-3">
              <p className="font-semibold">ISOFIX Child Seat Anchors</p>
              <p className="text-sm text-gray-600">
                {car.additionalSpecs.isofixAnchors ? 'Available' : 'Not Available'}
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="flex-shrink-0 mt-0.5 rounded-full p-1 bg-green-100">
              <CheckIcon className="h-4 w-4 text-green-600" />
            </div>
            <div className="ml-3">
              <p className="font-semibold">Radio System</p>
              <p className="text-sm text-gray-600">
                {car.additionalSpecs.radioSystem}
              </p>
            </div>
          </div>
        </div>}
    </div>;
};
export default VehicleSpecsDropdown;