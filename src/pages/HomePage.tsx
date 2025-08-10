import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchCars } from '../utils/carData';
import CarCard from '../components/CarCard';
import { SearchIcon, CarIcon, BadgeCheckIcon, PhoneIcon } from 'lucide-react';

const HomePage = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCars().then(data => {
      setCars(data);
      setLoading(false);
    });
  }, []);

  // Get featured cars
  const featuredCars = cars.filter(car => car.featured).slice(0, 3);

  if (loading) return <div>Loading...</div>;

  return <div className="w-full bg-[#FBFFFE]">
      {/* Hero Section */}
      <section className="relative bg-cover bg-center h-[70vh] flex items-center" style={{
      backgroundImage: "url('https://img.freepik.com/free-photo/elegant-white-car-stands-dealer-s-showroom_146671-16260.jpg')",
      backgroundPosition: 'center 30%'
    }}>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Find Your Perfect Car at NMG Motors Kenya
            </h1>
            <p className="text-xl text-white mb-8">
              Premium selection of quality vehicles at competitive prices
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/vehicles" className="bg-[#E6AF2E] hover:bg-[#A3320B] text-[#001514] font-bold py-3 px-6 rounded-lg transition-colors">
                Browse Vehicles
              </Link>
              <Link to="/contact" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#001514] font-bold py-3 px-6 rounded-lg transition-colors">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose NMG Motors
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg border border-gray-100 shadow-sm">
              <div className="inline-flex items-center justify-center p-4 bg-[#E6AF2E]/10 rounded-full mb-4">
                <CarIcon className="h-8 w-8 text-[#E6AF2E]" />
              </div>
              <h3 className="text-xl font-bold mb-2">Quality Vehicles</h3>
              <p className="text-gray-600">
                All our vehicles undergo rigorous inspection to ensure top
                quality and reliability.
              </p>
            </div>
            <div className="text-center p-6 rounded-lg border border-gray-100 shadow-sm">
              <div className="inline-flex items-center justify-center p-4 bg-[#A3320B]/10 rounded-full mb-4">
                <BadgeCheckIcon className="h-8 w-8 text-[#A3320B]" />
              </div>
              <h3 className="text-xl font-bold mb-2">Warranty Included</h3>
              <p className="text-gray-600">
                We provide warranty on all vehicles for your peace of mind and
                satisfaction.
              </p>
            </div>
            <div className="text-center p-6 rounded-lg border border-gray-100 shadow-sm">
              <div className="inline-flex items-center justify-center p-4 bg-[#6B0504]/10 rounded-full mb-4">
                <PhoneIcon className="h-8 w-8 text-[#6B0504]" />
              </div>
              <h3 className="text-xl font-bold mb-2">Expert Support</h3>
              <p className="text-gray-600">
                Our team of experts is always ready to assist you with any
                questions or concerns.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Featured Vehicles */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Vehicles</h2>
            <Link to="/vehicles" className="text-[#A3320B] hover:text-[#6B0504] font-semibold flex items-center">
              View All <SearchIcon className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCars.map(car => <CarCard key={car.id} car={car} />)}
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-16 bg-[#001514] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Find Your Dream Car?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Visit our showroom today or browse our online inventory to find the
            perfect vehicle for you.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/vehicles" className="bg-[#E6AF2E] hover:bg-[#A3320B] text-[#001514] font-bold py-3 px-6 rounded-lg transition-colors">
              Browse Inventory
            </Link>
            <Link to="/contact" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#001514] font-bold py-3 px-6 rounded-lg transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>;
};

export default HomePage;