// Mock car data for the dealership
export interface Car {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  engineSize: string;
  fuelType: string;
  horsePower: number;
  transmission: string;
  torque: string;
  available: boolean;
  featured: boolean;
  images: string[];
  description: string;
  // Additional specifications
  additionalSpecs: {
    sunroof: boolean;
    trimmings: string;
    soundSystem: string;
    seatMaterial: string;
    airConditioning: string;
    phoneConnectivity: boolean;
    infotainmentSystem: string;
    cigaretteLighterPort: boolean;
    isofixAnchors: boolean;
    radioSystem: string;
    conditionScore: number; // 1-5 stars
    condition: {
      exterior: boolean;
      interior: boolean;
      engine: boolean;
      transmission: boolean;
      electronics: boolean;
      suspension: boolean;
      brakes: boolean;
    };
  };
}
export const cars: Car[] = [{
  id: '1',
  brand: 'Toyota',
  model: 'Land Cruiser Prado',
  year: 2021,
  price: 8500000,
  mileage: 15000,
  engineSize: '2.8L',
  fuelType: 'Diesel',
  horsePower: 204,
  transmission: 'Automatic',
  torque: '500Nm',
  available: true,
  featured: true,
  images: ['https://img.freepik.com/free-photo/blue-jeep-parking-public-zone_114579-4042.jpg', 'angle 2', 'angle 3'],
  description: 'The Toyota Land Cruiser Prado is a full-size four-wheel drive vehicle in the Land Cruiser range. It is produced by the Japanese car maker Toyota. The Prado is one of the smaller vehicles in the Land Cruiser range.',
  additionalSpecs: {
    sunroof: true,
    trimmings: 'Wood and Chrome',
    soundSystem: 'JBL Premium Sound',
    seatMaterial: 'Leather',
    airConditioning: 'Dual Zone Climate Control',
    phoneConnectivity: true,
    infotainmentSystem: 'Toyota Touch 2 with Navigation',
    cigaretteLighterPort: true,
    isofixAnchors: true,
    radioSystem: 'AM/FM with Bluetooth, USB, AUX',
    conditionScore: 5,
    condition: {
      exterior: true,
      interior: true,
      engine: true,
      transmission: true,
      electronics: true,
      suspension: true,
      brakes: true
    }
  }
}, {
  id: '2',
  brand: 'Mercedes-Benz',
  model: 'E-Class',
  year: 2022,
  price: 9800000,
  mileage: 5000,
  engineSize: '3.0L',
  fuelType: 'Petrol',
  horsePower: 362,
  transmission: 'Automatic',
  torque: '520Nm',
  available: true,
  featured: true,
  images: ['https://images.unsplash.com/photo-1580273916550-e323be2ae537?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80', 'angle 2', 'angle 3'],
  description: 'The Mercedes-Benz E-Class is a range of executive cars manufactured by German automaker Mercedes-Benz in various engine and body configurations.',
  additionalSpecs: {
    sunroof: true,
    trimmings: 'Aluminum and Piano Black',
    soundSystem: 'Burmester 3D Surround Sound',
    seatMaterial: 'Nappa Leather',
    airConditioning: 'Dual Zone Climate Control with Air Purification',
    phoneConnectivity: true,
    infotainmentSystem: 'MBUX with Voice Control',
    cigaretteLighterPort: true,
    isofixAnchors: true,
    radioSystem: 'Digital Radio with Bluetooth, USB, AUX',
    conditionScore: 5,
    condition: {
      exterior: true,
      interior: true,
      engine: true,
      transmission: true,
      electronics: true,
      suspension: true,
      brakes: true
    }
  }
}, {
  id: '3',
  brand: 'BMW',
  model: 'X5',
  year: 2020,
  price: 7500000,
  mileage: 25000,
  engineSize: '3.0L',
  fuelType: 'Diesel',
  horsePower: 340,
  transmission: 'Automatic',
  torque: '450Nm',
  available: true,
  featured: false,
  images: ['https://img.freepik.com/free-photo/blue-luxury-sport-sedan-car-driveway_114579-5063.jpg', 'https://img.freepik.com/free-photo/luxury-car-interior-dashboard_1303-15538.jpg', 'https://img.freepik.com/free-photo/car-hood-with-modern-design_1303-15589.jpg'],
  description: 'The BMW X5 is a mid-size luxury SUV produced by BMW. The X5 made its debut in 1999 as the first SUV ever produced by BMW.',
  additionalSpecs: {
    sunroof: true,
    trimmings: 'Fine-wood trim with Pearl Chrome finisher',
    soundSystem: 'Harman Kardon Surround Sound',
    seatMaterial: 'Dakota Leather',
    airConditioning: 'Automatic 4-zone Climate Control',
    phoneConnectivity: true,
    infotainmentSystem: 'BMW Live Cockpit Professional',
    cigaretteLighterPort: true,
    isofixAnchors: true,
    radioSystem: 'BMW Professional Radio with Bluetooth, USB, AUX',
    conditionScore: 4,
    condition: {
      exterior: true,
      interior: true,
      engine: true,
      transmission: true,
      electronics: false,
      suspension: true,
      brakes: true
    }
  }
}, {
  id: '4',
  brand: 'Toyota',
  model: 'Fortuner',
  year: 2021,
  price: 6200000,
  mileage: 18000,
  engineSize: '2.8L',
  fuelType: 'Diesel',
  horsePower: 204,
  transmission: 'Automatic',
  torque: '500Nm',
  available: false,
  featured: false,
  images: ['https://img.freepik.com/free-photo/black-luxury-sport-utility-vehicle-suv-road_114579-5044.jpg', 'https://img.freepik.com/free-photo/car-interior-seats_1303-15496.jpg', 'https://img.freepik.com/free-photo/closeup-shot-headlights-modern-prestigious-car_181624-46701.jpg'],
  description: 'The Toyota Fortuner, also known as the Toyota SW4, is a mid-size SUV manufactured by the Japanese automaker Toyota since 2004.',
  additionalSpecs: {
    sunroof: false,
    trimmings: 'Dark Wood and Silver',
    soundSystem: 'Standard 6-speaker System',
    seatMaterial: 'Fabric',
    airConditioning: 'Single Zone Climate Control',
    phoneConnectivity: true,
    infotainmentSystem: 'Toyota Touch Screen Display',
    cigaretteLighterPort: true,
    isofixAnchors: true,
    radioSystem: 'AM/FM with Bluetooth, USB, AUX',
    conditionScore: 4,
    condition: {
      exterior: true,
      interior: true,
      engine: true,
      transmission: false,
      electronics: true,
      suspension: true,
      brakes: true
    }
  }
}, {
  id: '5',
  brand: 'Audi',
  model: 'Q7',
  year: 2019,
  price: 7200000,
  mileage: 35000,
  engineSize: '3.0L',
  fuelType: 'Diesel',
  horsePower: 282,
  transmission: 'Automatic',
  torque: '600Nm',
  available: true,
  featured: false,
  images: ['https://img.freepik.com/free-photo/silver-metallic-color-sport-sedan-road_114579-5035.jpg', 'https://img.freepik.com/free-photo/steering-wheel-car_1303-10553.jpg', 'https://img.freepik.com/free-photo/car-hood-with-modern-design_1303-15589.jpg'],
  description: 'The Audi Q7 is a mid-size luxury SUV made by the German manufacturer Audi. The Q7 shares a platform with the Volkswagen Touareg and the Porsche Cayenne.',
  additionalSpecs: {
    sunroof: true,
    trimmings: 'Brushed Aluminum',
    soundSystem: 'BOSE 3D Sound System',
    seatMaterial: 'Leather',
    airConditioning: 'Dual Zone Climate Control',
    phoneConnectivity: true,
    infotainmentSystem: 'Audi MMI Navigation Plus',
    cigaretteLighterPort: true,
    isofixAnchors: true,
    radioSystem: 'Digital Radio with Bluetooth, USB, AUX',
    conditionScore: 3,
    condition: {
      exterior: false,
      interior: true,
      engine: true,
      transmission: true,
      electronics: true,
      suspension: false,
      brakes: true
    }
  }
}, {
  id: '6',
  brand: 'Mercedes-Benz',
  model: 'GLE',
  year: 2022,
  price: 10500000,
  mileage: 8000,
  engineSize: '3.0L',
  fuelType: 'Petrol',
  horsePower: 362,
  transmission: 'Automatic',
  torque: '520Nm',
  available: true,
  featured: true,
  images: ['https://img.freepik.com/free-photo/luxury-car-speed-studio-blue-background_146671-19461.jpg', 'https://img.freepik.com/free-photo/luxury-car-interior-dashboard_1303-15538.jpg', 'https://img.freepik.com/free-photo/headlights-new-red-car_1359-323.jpg'],
  description: 'The Mercedes-Benz GLE is a mid-size luxury SUV produced by the German automaker Mercedes-Benz. The GLE was formerly known as the M-Class.',
  additionalSpecs: {
    sunroof: true,
    trimmings: 'Natural Grain Wood and Aluminum',
    soundSystem: 'Burmester Surround Sound System',
    seatMaterial: 'Leather',
    airConditioning: 'Dual Zone Climate Control',
    phoneConnectivity: true,
    infotainmentSystem: 'MBUX with Voice Control',
    cigaretteLighterPort: true,
    isofixAnchors: true,
    radioSystem: 'Digital Radio with Bluetooth, USB, AUX',
    conditionScore: 5,
    condition: {
      exterior: true,
      interior: true,
      engine: true,
      transmission: true,
      electronics: true,
      suspension: true,
      brakes: true
    }
  }
}];
// Helper function to get similar cars based on brand
export const getSimilarCars = (currentCarId: string, brand: string, limit: number = 3): Car[] => {
  return cars.filter(car => car.brand === brand && car.id !== currentCarId).slice(0, limit);
};
// Helper function to format currency
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};
// Helper function to filter cars
export interface FilterOptions {
  minPrice?: number;
  maxPrice?: number;
  brands?: string[];
  minYear?: number;
  maxYear?: number;
}
export const filterCars = (options: FilterOptions): Car[] => {
  return cars.filter(car => {
    // Filter by price range
    if (options.minPrice && car.price < options.minPrice) return false;
    if (options.maxPrice && car.price > options.maxPrice) return false;
    // Filter by brands
    if (options.brands && options.brands.length > 0 && !options.brands.includes(car.brand)) return false;
    // Filter by year range
    if (options.minYear && car.year < options.minYear) return false;
    if (options.maxYear && car.year > options.maxYear) return false;
    return true;
  });
};
// Get unique brands for filter
export const getUniqueBrands = (): string[] => {
  return [...new Set(cars.map(car => car.brand))];
};
// Get price range
export const getPriceRange = (): {
  min: number;
  max: number;
} => {
  const prices = cars.map(car => car.price);
  return {
    min: Math.min(...prices),
    max: Math.max(...prices)
  };
};
// Get year range
export const getYearRange = (): {
  min: number;
  max: number;
} => {
  const years = cars.map(car => car.year);
  return {
    min: Math.min(...years),
    max: Math.max(...years)
  };
};