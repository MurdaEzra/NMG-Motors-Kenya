import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchCars } from '../utils/carData';
import CarCard from '../components/CarCard';
import { SearchIcon, CarIcon, BadgeCheckIcon, PhoneIcon } from 'lucide-react';

const HomePage = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  // Slideshow images
  const slides = [
    {
      image: "/src/images/premium.jpg",
      title: "Premium Vehicles",
      desc: "Experience unmatched comfort, style, and performance.",
    },
    {
      image: "/src/images/luxury.jpg",
      title: "Luxury Vehicles",
      desc: "Indulge in world-class craftsmanship and cutting-edge technology.",
    },
    {
      image: "/src/images/family.jpg",
      title: "Family Vehicles",
      desc: "Spacious, safe, and designed for every family adventure.",
    },
  ];
  const [currentSlide, setCurrentSlide] = useState(0);
  const [fade, setFade] = useState(true);

  // Auto-slide with fade animation
  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false); // start fade out
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        setFade(true); // fade in new image
      }, 500); // matches fade duration
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetchCars().then(data => {
      setCars(data);
      setLoading(false);
    });
  }, []);

  const featuredCars = cars.filter(car => car.featured).slice(0, 3);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="w-full bg-[#FBFFFE]">
      {/* Hero Section with Fade Slideshow */}
      <section className="relative h-[70vh] flex items-center overflow-hidden">
        {/* Background Image with Fade */}
        <div
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-500 ease-in-out ${
            fade ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            backgroundImage: `url(${slides[currentSlide].image})`,
            backgroundPosition: 'center 50%',
          }}
        ></div>
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        {/* Text Content */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {slides[currentSlide].title} at NMG Motors Kenya
            </h1>
            <p className="text-xl text-white mb-4">{slides[currentSlide].desc}</p>
            <p className="text-lg text-gray-200 mb-8">
              Premium selection of quality vehicles at competitive prices
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/vehicles"
                className="bg-[#E6AF2E] hover:bg-[#A3320B] text-[#001514] font-bold py-3 px-6 rounded-lg transition-colors"
              >
                Browse Vehicles
              </Link>
              <Link
                to="/contact"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#001514] font-bold py-3 px-6 rounded-lg transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setFade(false);
                setTimeout(() => {
                  setCurrentSlide(index);
                  setFade(true);
                }, 300);
              }}
              className={`w-3 h-3 rounded-full ${
                currentSlide === index ? 'bg-[#E6AF2E]' : 'bg-gray-300'
              }`}
            ></button>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose NMG Motors</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg border border-gray-100 shadow-sm">
              <div className="inline-flex items-center justify-center p-4 bg-[#E6AF2E]/10 rounded-full mb-4">
                <CarIcon className="h-8 w-8 text-[#E6AF2E]" />
              </div>
              <h3 className="text-xl font-bold mb-2">Quality Vehicles</h3>
              <p className="text-gray-600">
                All our vehicles undergo rigorous inspection to ensure top quality and reliability.
              </p>
            </div>
            <div className="text-center p-6 rounded-lg border border-gray-100 shadow-sm">
              <div className="inline-flex items-center justify-center p-4 bg-[#A3320B]/10 rounded-full mb-4">
                <BadgeCheckIcon className="h-8 w-8 text-[#A3320B]" />
              </div>
              <h3 className="text-xl font-bold mb-2">Warranty Included</h3>
              <p className="text-gray-600">
                We provide warranty on all vehicles for your peace of mind and satisfaction.
              </p>
            </div>
            <div className="text-center p-6 rounded-lg border border-gray-100 shadow-sm">
              <div className="inline-flex items-center justify-center p-4 bg-[#6B0504]/10 rounded-full mb-4">
                <PhoneIcon className="h-8 w-8 text-[#6B0504]" />
              </div>
              <h3 className="text-xl font-bold mb-2">Expert Support</h3>
              <p className="text-gray-600">
                Our team of experts is always ready to assist you with any questions or concerns.
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
            <Link
              to="/vehicles"
              className="text-[#A3320B] hover:text-[#6B0504] font-semibold flex items-center"
            >
              View All <SearchIcon className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#001514] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Find Your Dream Car?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Visit our showroom today or browse our online inventory to find the perfect vehicle for you.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/vehicles"
              className="bg-[#E6AF2E] hover:bg-[#A3320B] text-[#001514] font-bold py-3 px-6 rounded-lg transition-colors"
            >
              Browse Inventory
            </Link>
            <Link
              to="/contact"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#001514] font-bold py-3 px-6 rounded-lg transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
