import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CarIcon, PlusCircleIcon, CheckCircleIcon, XCircleIcon, TrendingUpIcon, AlertTriangleIcon } from 'lucide-react';
import { fetchCars } from '../../utils/carData';
import type { Car } from '../../utils/carData';

const AdminDashboard: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCars().then(data => {
      setCars(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  const totalCars = cars.length;
  const availableCars = cars.filter(car => car.available).length;
  const soldCars = cars.filter(car => !car.available).length;
  const featuredCars = cars.filter(car => car.featured).length;
  const avgConditionScore = totalCars > 0 ? (cars.reduce((sum, car) => sum + car.additionalSpecs.conditionScore, 0) / totalCars).toFixed(2) : 0;
  const carsWithIssues = cars.filter(car => car.additionalSpecs.conditionScore < 4);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold font-montserrat">Admin Dashboard</h1>
        <Link to="/admin/cars/add" className="bg-[#A3320B] hover:bg-[#6B0504] text-white px-4 py-2 rounded-md flex items-center space-x-2 font-cambria">
          <PlusCircleIcon className="h-5 w-5" />
          <span>Add New Car</span>
        </Link>
      </div>
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-[#E6AF2E]">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500 font-cambria">
                Total Inventory
              </p>
              <p className="text-2xl font-bold font-montserrat">{totalCars}</p>
            </div>
            <div className="bg-[#E6AF2E] bg-opacity-20 p-3 rounded-full">
              <CarIcon className="h-6 w-6 text-[#E6AF2E]" />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-green-500">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500 font-cambria">
                Available Cars
              </p>
              <p className="text-2xl font-bold font-montserrat">
                {availableCars}
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <CheckCircleIcon className="h-6 w-6 text-green-500" />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-[#A3320B]">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500 font-cambria">Sold Cars</p>
              <p className="text-2xl font-bold font-montserrat">{soldCars}</p>
            </div>
            <div className="bg-red-100 p-3 rounded-full">
              <XCircleIcon className="h-6 w-6 text-[#A3320B]" />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-blue-500">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500 font-cambria">
                Featured Cars
              </p>
              <p className="text-2xl font-bold font-montserrat">
                {featuredCars}
              </p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <TrendingUpIcon className="h-6 w-6 text-blue-500" />
            </div>
          </div>
        </div>
      </div>
      {/* Cars with issues */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-bold mb-4 font-montserrat">
          Cars Requiring Attention
        </h2>
        {carsWithIssues.length === 0 ? (
          <p className="text-gray-500 font-cambria">
            No cars currently require attention.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-3 text-sm font-medium text-gray-600 font-montserrat">
                    Car
                  </th>
                  <th className="px-4 py-3 text-sm font-medium text-gray-600 font-montserrat">
                    Condition Score
                  </th>
                  <th className="px-4 py-3 text-sm font-medium text-gray-600 font-montserrat">
                    Issues
                  </th>
                  <th className="px-4 py-3 text-sm font-medium text-gray-600 font-montserrat">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 font-cambria">
                {carsWithIssues.map(car => {
                  const issues = Object.entries(car.additionalSpecs.condition)
                    .filter(([_, value]) => !value)
                    .map(([key]) => key);
                  // Defensive: get the first image or a placeholder
                  const imageUrl =
                    car.images && car.images[0]
                      ? car.images[0]
                      : "https://placehold.co/80x80?text=No+Image";
                  return (
                    <tr key={car.id}>
                      <td className="px-4 py-3">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            <img
                              src={imageUrl}
                              alt={car.brand}
                              className="h-10 w-10 rounded-full object-cover"
                              onError={e => {
                                (e.target as HTMLImageElement).src =
                                  "https://placehold.co/80x80?text=No+Image";
                              }}
                            />
                          </div>
                          <div className="ml-3">
                            <p className="font-medium text-gray-900">
                              {car.brand} {car.model}
                            </p>
                            <p className="text-sm text-gray-500">{car.year}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center">
                          <AlertTriangleIcon className="h-5 w-5 text-amber-500 mr-1" />
                          <span>{car.additionalSpecs.conditionScore}/5</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div>
                          {issues.map(issue => (
                            <span
                              key={issue}
                              className="inline-block bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full mr-1 mb-1 capitalize"
                            >
                              {issue}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <Link
                          to={`/admin/cars/edit/${car.id}`}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          Edit
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {/* Recent Activity - This would be dynamic in a real app */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-bold mb-4 font-montserrat">
          Recent Activity
        </h2>
        <ul className="space-y-4 font-cambria">
          <li className="flex items-start">
            <div className="bg-blue-100 p-2 rounded-full mr-3 flex-shrink-0">
              <PlusCircleIcon className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-gray-800">New car added to inventory</p>
              <p className="text-sm text-gray-500">Mercedes-Benz GLE - Today</p>
            </div>
          </li>
          <li className="flex items-start">
            <div className="bg-green-100 p-2 rounded-full mr-3 flex-shrink-0">
              <CheckCircleIcon className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-gray-800">Car marked as sold</p>
              <p className="text-sm text-gray-500">
                Toyota Fortuner - Yesterday
              </p>
            </div>
          </li>
          <li className="flex items-start">
            <div className="bg-amber-100 p-2 rounded-full mr-3 flex-shrink-0">
              <AlertTriangleIcon className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <p className="text-gray-800">Car condition updated</p>
              <p className="text-sm text-gray-500">Audi Q7 - 2 days ago</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;