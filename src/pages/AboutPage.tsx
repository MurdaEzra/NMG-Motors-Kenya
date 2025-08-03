import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheckIcon, UsersIcon, BadgeCheckIcon, CarIcon } from 'lucide-react';
const AboutPage = () => {
  return <div className="w-full bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-cover bg-center h-[40vh] flex items-center" style={{
      backgroundImage: "url('https://img.freepik.com/free-photo/new-black-car-showroom-car-dealership_146671-14964.jpg')",
      backgroundPosition: 'center 30%'
    }}>
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            About NMG Motors Kenya
          </h1>
          <p className="text-xl text-white max-w-2xl">
            Your trusted partner in finding the perfect vehicle since 2010
          </p>
        </div>
      </section>
      {/* Our Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-[#001514]">
                Our Story
              </h2>
              <p className="text-gray-700 mb-4">
                NMG Motors Kenya was established in 2010 with a vision to
                transform the automotive market in Kenya by providing
                high-quality vehicles at competitive prices. What started as a
                small dealership has grown into one of the most trusted names in
                the Kenyan automotive industry.
              </p>
              <p className="text-gray-700 mb-4">
                Our founder, Mr. James Mwangi, began with a simple mission: to
                create a car buying experience that prioritizes customer
                satisfaction, transparency, and quality. Today, that mission
                continues to drive every aspect of our business.
              </p>
              <p className="text-gray-700">
                With over a decade of experience, we've helped thousands of
                Kenyans find their perfect vehicle, from family cars to luxury
                models and commercial vehicles. Our commitment to excellence has
                earned us a reputation as a leader in the automotive market.
              </p>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img src="https://img.freepik.com/free-photo/car-dealership-center_23-2149346502.jpg" alt="NMG Motors Kenya showroom" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>
      {/* Our Values */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-[#001514]">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center p-4 bg-[#E6AF2E]/10 rounded-full mb-4">
                <ShieldCheckIcon className="h-8 w-8 text-[#E6AF2E]" />
              </div>
              <h3 className="text-xl font-bold mb-2">Integrity</h3>
              <p className="text-gray-600">
                We operate with honesty and transparency in all our dealings,
                providing accurate information about our vehicles.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center p-4 bg-[#A3320B]/10 rounded-full mb-4">
                <BadgeCheckIcon className="h-8 w-8 text-[#A3320B]" />
              </div>
              <h3 className="text-xl font-bold mb-2">Quality</h3>
              <p className="text-gray-600">
                We carefully select and inspect each vehicle to ensure it meets
                our high standards of quality and reliability.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center p-4 bg-[#6B0504]/10 rounded-full mb-4">
                <UsersIcon className="h-8 w-8 text-[#6B0504]" />
              </div>
              <h3 className="text-xl font-bold mb-2">Customer Focus</h3>
              <p className="text-gray-600">
                We put our customers first, striving to understand their needs
                and provide personalized service.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center p-4 bg-[#001514]/10 rounded-full mb-4">
                <CarIcon className="h-8 w-8 text-[#001514]" />
              </div>
              <h3 className="text-xl font-bold mb-2">Innovation</h3>
              <p className="text-gray-600">
                We continuously improve our processes and services to enhance
                the car buying experience.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-[#001514]">
            Why Choose NMG Motors
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4 text-[#A3320B]">
                Extensive Selection
              </h3>
              <p className="text-gray-700 mb-4">
                We offer a wide range of vehicles to suit different preferences
                and budgets. From compact cars to luxury SUVs, we have something
                for everyone.
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Diverse inventory of new and pre-owned vehicles</li>
                <li>Multiple brands and models to choose from</li>
                <li>Regular updates with the latest models</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4 text-[#A3320B]">
                Quality Assurance
              </h3>
              <p className="text-gray-700 mb-4">
                Every vehicle in our inventory undergoes a thorough inspection
                process to ensure it meets our standards of quality and safety.
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Comprehensive multi-point inspection</li>
                <li>Detailed vehicle history reports</li>
                <li>Warranty options for peace of mind</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4 text-[#A3320B]">
                Expert Team
              </h3>
              <p className="text-gray-700 mb-4">
                Our team of automotive experts is passionate about cars and
                committed to helping you find the perfect vehicle.
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Knowledgeable sales consultants</li>
                <li>Certified technicians</li>
                <li>Friendly customer service representatives</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4 text-[#A3320B]">
                Customer Satisfaction
              </h3>
              <p className="text-gray-700 mb-4">
                We prioritize customer satisfaction at every step of the car
                buying journey, from browsing to after-sales service.
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Transparent pricing with no hidden fees</li>
                <li>Flexible financing options</li>
                <li>Ongoing support after purchase</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-16 bg-[#001514] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Experience the NMG Difference?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Visit our showroom today or browse our online inventory to find the
            perfect vehicle for you.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/vehicles" className="bg-[#E6AF2E] hover:bg-[#A3320B] text-[#001514] font-bold py-3 px-6 rounded-lg transition-colors">
              Browse Vehicles
            </Link>
            <Link to="/contact" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#001514] font-bold py-3 px-6 rounded-lg transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>;
};
export default AboutPage;