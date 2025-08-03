import React from 'react';
import ContactMap from '../components/ContactMap';
import { PhoneIcon, MailIcon, MapPinIcon, ClockIcon } from 'lucide-react';
const ContactPage = () => {
  return <div className="w-full bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-[#001514] mb-2">Contact Us</h1>
        <p className="text-gray-600 mb-8">
          Get in touch with our team for any inquiries or to schedule a visit
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Send Us a Message</h2>
            <form>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name
                  </label>
                  <input type="text" id="name" className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A3320B] focus:border-transparent" placeholder="John Doe" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input type="email" id="email" className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A3320B] focus:border-transparent" placeholder="john@example.com" />
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input type="tel" id="phone" className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A3320B] focus:border-transparent" placeholder="+254 700 000 000" />
              </div>
              <div className="mb-4">
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <input type="text" id="subject" className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A3320B] focus:border-transparent" placeholder="Vehicle Inquiry" />
              </div>
              <div className="mb-4">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea id="message" rows={5} className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A3320B] focus:border-transparent" placeholder="I'm interested in..."></textarea>
              </div>
              <button type="submit" className="bg-[#A3320B] hover:bg-[#6B0504] text-white py-2 px-6 rounded-lg transition-colors">
                Send Message
              </button>
            </form>
          </div>
          {/* Contact Information */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-bold mb-4">Contact Information</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <MapPinIcon className="h-5 w-5 text-[#A3320B]" />
                  </div>
                  <div className="ml-3">
                    <p className="font-semibold">Address</p>
                    <p className="text-gray-600">47529, Kiambu Rd, Kenya</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <PhoneIcon className="h-5 w-5 text-[#A3320B]" />
                  </div>
                  <div className="ml-3">
                    <p className="font-semibold">Phone</p>
                    <p className="text-gray-600">+254 700 000 000</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <MailIcon className="h-5 w-5 text-[#A3320B]" />
                  </div>
                  <div className="ml-3">
                    <p className="font-semibold">Email</p>
                    <p className="text-gray-600">info@nmgmotors.co.ke</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <ClockIcon className="h-5 w-5 text-[#A3320B]" />
                  </div>
                  <div className="ml-3">
                    <p className="font-semibold">Business Hours</p>
                    <p className="text-gray-600">
                      Monday - Friday: 8:00 AM - 6:00 PM
                    </p>
                    <p className="text-gray-600">Saturday: 9:00 AM - 4:00 PM</p>
                    <p className="text-gray-600">Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Map */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-4">Find Us</h2>
              <ContactMap />
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default ContactPage;