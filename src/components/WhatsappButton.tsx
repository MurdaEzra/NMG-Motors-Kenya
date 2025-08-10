import React, { Component } from 'react';
import { Car } from '../utils/carData';
interface WhatsappButtonProps {
  car: Car;
}
const WhatsappButton: React.FC<WhatsappButtonProps> = ({
  car
}) => {
  const handleWhatsappInquiry = () => {
    const phoneNumber = '254700000000'; // Replace with actual WhatsApp number
    // Create message with car details
    const message = `Hello, I'm interested in the ${car.year} ${car.brand} ${car.model} (${car.engineSize} ${car.fuelType}) priced at KES ${car.price.toLocaleString()}. Please provide more information.`;
    // Create URL with car image - Note: This doesn't actually send the image through WhatsApp
    // WhatsApp API doesn't support direct image sending, but we can include the image URL in the message
    const imageUrl = encodeURIComponent(car.images[0]);
    const encodedMessage = encodeURIComponent(`${message}\n\nCar Image: ${car.images[0]}`);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };
  return <button onClick={handleWhatsappInquiry} className="flex items-center justify-center bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-lg shadow-md transition-colors w-full font-cambria">
      <div className="h-5 w-5 mr-2" />
      <span>Inquire via WhatsApp</span>
    </button>;
};
export default WhatsappButton;