import { supabase } from '../contexts/supabaseClient';
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
    conditionScore: number;
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

// Fetch cars with all relations in one query
export const fetchCars = async (): Promise<Car[]> => {
  const { data, error } = await supabase
    .from('cars')
    .select(`
      id,
      brand,
      model,
      year,
      price,
      mileage,
      engine_size,
      fuel_type,
      horse_power,
      transmission,
      torque,
      available,
      featured,
      description,
      images,
      additional_specs (
        sunroof,
        trimmings,
        sound_system,
        seat_material,
        air_conditioning,
        phone_connectivity,
        infotainment_system,
        cigarette_lighter_port,
        isofix_anchors,
        radio_system
      ),
      car_conditions (
        condition_score,
        exterior,
        interior,
        engine,
        transmission,
        electronics,
        suspension,
        brakes
      )
     
    `);

  if (error) {
    console.error('Error fetching cars:', error);
    return [];
  }

  return (data || []).map((car: any) => ({
    id: car.id,
    brand: car.brand,
    model: car.model,
    year: car.year,
    price: car.price,
    mileage: car.mileage,
    engineSize: car.engine_size,
    fuelType: car.fuel_type,
    horsePower: car.horse_power,
    transmission: car.transmission,
    torque: car.torque,
    available: car.available,
    featured: car.featured,
    images: Array.isArray(car.images) ? car.images : [],
    description: car.description,
    additionalSpecs: {
      sunroof: car.additional_specs?.sunroof ?? false,
      trimmings: car.additional_specs?.trimmings ?? '',
      soundSystem: car.additional_specs?.sound_system ?? '',
      seatMaterial: car.additional_specs?.seat_material ?? '',
      airConditioning: car.additional_specs?.air_conditioning ?? '',
      phoneConnectivity: car.additional_specs?.phone_connectivity ?? false,
      infotainmentSystem: car.additional_specs?.infotainment_system ?? '',
      cigaretteLighterPort: car.additional_specs?.cigarette_lighter_port ?? false,
      isofixAnchors: car.additional_specs?.isofix_anchors ?? false,
      radioSystem: car.additional_specs?.radio_system ?? '',
      conditionScore: car.car_conditions?.condition_score ?? 0,
      condition: {
        exterior: car.car_conditions?.exterior ?? false,
        interior: car.car_conditions?.interior ?? false,
        engine: car.car_conditions?.engine ?? false,
        transmission: car.car_conditions?.transmission ?? false,
        electronics: car.car_conditions?.electronics ?? false,
        suspension: car.car_conditions?.suspension ?? false,
        brakes: car.car_conditions?.brakes ?? false
      }
    }
  }));
};


// Helper: Get similar cars
export const getSimilarCars = (cars: Car[], currentCarId: string, brand: string, limit: number = 3): Car[] => {
  return cars.filter(car => car.brand === brand && car.id !== currentCarId).slice(0, limit);
};

// Helper: Format currency
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

// Filter options
export interface FilterOptions {
  minPrice?: number;
  maxPrice?: number;
  brands?: string[];
  minYear?: number;
  maxYear?: number;
}

// Filter cars
export const filterCars = (cars: Car[], options: FilterOptions): Car[] => {
  return cars.filter(car => {
    if (options.minPrice && car.price < options.minPrice) return false;
    if (options.maxPrice && car.price > options.maxPrice) return false;
    if (options.brands && options.brands.length > 0 && !options.brands.includes(car.brand)) return false;
    if (options.minYear && car.year < options.minYear) return false;
    if (options.maxYear && car.year > options.maxYear) return false;
    return true;
  });
};

// Get unique brands
export const getUniqueBrands = (cars: Car[]): string[] => {
  return [...new Set(cars.map(car => car.brand))];
};

// Get price range
export const getPriceRange = (cars: Car[]): { min: number; max: number } => {
  const prices = cars.map(car => car.price);
  return {
    min: Math.min(...prices),
    max: Math.max(...prices)
  };
};

// Get year range
export const getYearRange = (cars: Car[]): { min: number; max: number } => {
  const years = cars.map(car => car.year);
  return {
    min: Math.min(...years),
    max: Math.max(...years)
  };
};
