import React, { useState } from 'react';
import { Car } from '../utils/carData';
import { ChevronDownIcon, ChevronUpIcon, CheckIcon, XIcon, StarIcon } from 'lucide-react';
interface VehicleConditionProps {
  car: Car;
}
const VehicleCondition: React.FC<VehicleConditionProps> = ({
  car
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    condition
  } = car.additionalSpecs;
  return <div className="mt-6 pt-6 border-t border-gray-200">
      <div className="flex justify-between items-center cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <div>
          <h2 className="text-lg font-bold font-montserrat">
            Vehicle Condition
          </h2>
          <div className="flex items-center mt-1">
            {[...Array(5)].map((_, i) => <StarIcon key={i} className={`h-5 w-5 ${i < car.additionalSpecs.conditionScore ? 'text-[#E6AF2E] fill-[#E6AF2E]' : 'text-gray-300'}`} />)}
            <span className="ml-2 text-sm text-gray-600 font-cambria">
              {car.additionalSpecs.conditionScore}/5
            </span>
          </div>
        </div>
        <button className="text-[#A3320B]">
          {isOpen ? <ChevronUpIcon className="h-5 w-5" /> : <ChevronDownIcon className="h-5 w-5" />}
        </button>
      </div>
      {isOpen && <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 font-cambria">
          <div className="flex items-center">
            <div className={`rounded-full p-1 ${condition.exterior ? 'bg-green-100' : 'bg-red-100'}`}>
              {condition.exterior ? <CheckIcon className="h-4 w-4 text-green-600" /> : <XIcon className="h-4 w-4 text-red-600" />}
            </div>
            <p className="ml-3">Exterior</p>
          </div>
          <div className="flex items-center">
            <div className={`rounded-full p-1 ${condition.interior ? 'bg-green-100' : 'bg-red-100'}`}>
              {condition.interior ? <CheckIcon className="h-4 w-4 text-green-600" /> : <XIcon className="h-4 w-4 text-red-600" />}
            </div>
            <p className="ml-3">Interior</p>
          </div>
          <div className="flex items-center">
            <div className={`rounded-full p-1 ${condition.engine ? 'bg-green-100' : 'bg-red-100'}`}>
              {condition.engine ? <CheckIcon className="h-4 w-4 text-green-600" /> : <XIcon className="h-4 w-4 text-red-600" />}
            </div>
            <p className="ml-3">Engine</p>
          </div>
          <div className="flex items-center">
            <div className={`rounded-full p-1 ${condition.transmission ? 'bg-green-100' : 'bg-red-100'}`}>
              {condition.transmission ? <CheckIcon className="h-4 w-4 text-green-600" /> : <XIcon className="h-4 w-4 text-red-600" />}
            </div>
            <p className="ml-3">Transmission</p>
          </div>
          <div className="flex items-center">
            <div className={`rounded-full p-1 ${condition.electronics ? 'bg-green-100' : 'bg-red-100'}`}>
              {condition.electronics ? <CheckIcon className="h-4 w-4 text-green-600" /> : <XIcon className="h-4 w-4 text-red-600" />}
            </div>
            <p className="ml-3">Electronics</p>
          </div>
          <div className="flex items-center">
            <div className={`rounded-full p-1 ${condition.suspension ? 'bg-green-100' : 'bg-red-100'}`}>
              {condition.suspension ? <CheckIcon className="h-4 w-4 text-green-600" /> : <XIcon className="h-4 w-4 text-red-600" />}
            </div>
            <p className="ml-3">Suspension</p>
          </div>
          <div className="flex items-center">
            <div className={`rounded-full p-1 ${condition.brakes ? 'bg-green-100' : 'bg-red-100'}`}>
              {condition.brakes ? <CheckIcon className="h-4 w-4 text-green-600" /> : <XIcon className="h-4 w-4 text-red-600" />}
            </div>
            <p className="ml-3">Brakes</p>
          </div>
        </div>}
    </div>;
};
export default VehicleCondition;