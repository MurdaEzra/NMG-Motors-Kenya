import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
const ContactMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!mapRef.current) return;
    // Initialize map
    const map = L.map(mapRef.current).setView([-1.2027, 36.8172], 15);
    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    // Add marker for the dealership location
    const dealershipIcon = L.icon({
      iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
      shadowSize: [41, 41]
    });
    const marker = L.marker([-1.2027, 36.8172], {
      icon: dealershipIcon
    }).addTo(map);
    marker.bindPopup('<b>NMG Motors Kenya</b><br>47529, Kiambu Rd, Kenya').openPopup();
    // Clean up on unmount
    return () => {
      map.remove();
    };
  }, []);
  return <div ref={mapRef} className="h-[400px] w-full rounded-lg shadow-md z-0"></div>;
};
export default ContactMap;