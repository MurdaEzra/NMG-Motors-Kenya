import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeftIcon, PlusIcon, TrashIcon, SaveIcon } from 'lucide-react';
import { Car, fetchCars } from '../../utils/carData';
import { supabase } from '../../contexts/supabaseClient'; 
import axios from 'axios';

const CarFormPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditing = Boolean(id);
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch cars and find existing car if editing
  const [cars, setCars] = useState<Car[]>([]);
  useEffect(() => {
    if (isEditing) {
      fetchCars().then(data => setCars(data));
    }
  }, [isEditing]);

  const existingCar = isEditing ? cars.find(car => car.id === id) : null;

  // Form state
  const [formData, setFormData] = useState<Partial<Car>>({
    brand: '',
    model: '',
    year: new Date().getFullYear(),
    price: 0,
    mileage: 0,
    engineSize: '',
    fuelType: '',
    horsePower: 0,
    transmission: '',
    torque: '',
    available: true,
    featured: false,
    images: [],
    description: '',
    additionalSpecs: {
      sunroof: false,
      trimmings: '',
      soundSystem: '',
      seatMaterial: '',
      airConditioning: '',
      phoneConnectivity: false,
      infotainmentSystem: '',
      cigaretteLighterPort: false,
      isofixAnchors: false,
      radioSystem: '',
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
  });

  // Populate form with existing car data if editing
  useEffect(() => {
    if (existingCar) {
      setFormData(existingCar);
      setImagePreviews(existingCar.images || []);
    }
  }, [existingCar]);

  // Track local previews for all images
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  // Replace Supabase upload section
const handleImagesChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const files = e.target.files;
  if (!files || files.length === 0) return;

  setUploading(true);

  // Show local previews immediately
  const localPreviews = Array.from(files).map(file => URL.createObjectURL(file));
  setImagePreviews(prev => [...prev, ...localPreviews]);

  const uploadedUrls: string[] = [];

  for (const file of files) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'car-uploads'); // your Cloudinary preset

    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/dgfmhyebp/image/upload`,
        formData
      );
      uploadedUrls.push(res.data.secure_url); 
      console.log('Cloudinary upload successful:', res.data.secure_url);
    } catch (err) {
      console.error('Cloudinary upload failed:', err);
      alert('Image upload failed. Please try again.');
    }
  }

    // Update formData images with all uploaded URLs
    setFormData(prev => ({
      ...prev,
      images: [...(prev.images || []), ...uploadedUrls]
    }));

    // Remove local previews after upload (optional, or keep for instant feedback)
    setTimeout(() => {
      setImagePreviews(prev => prev.slice(0, (prev.length - localPreviews.length)));
    }, 2000);

    setUploading(false);
  };

  // Remove image (from both previews and formData)
  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images?.filter((_, i) => i !== index) || []
    }));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const {
      name,
      value,
      type
    } = e.target;
    // Handle checkbox fields
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      setFormData(prev => ({
        ...prev,
        [name]: checkbox.checked
      }));
      return;
    }
    // Handle number fields
    if (type === 'number') {
      setFormData(prev => ({
        ...prev,
        [name]: parseFloat(value)
      }));
      return;
    }
    // Handle other fields
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  // Handle additional specs changes
  const handleSpecsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const {
      name,
      value,
      type
    } = e.target;
    // Handle checkbox fields
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      setFormData(prev => ({
        ...prev,
        additionalSpecs: {
          ...prev.additionalSpecs!,
          [name]: checkbox.checked
        }
      }));
      return;
    }
    // Handle number fields
    if (type === 'number') {
      setFormData(prev => ({
        ...prev,
        additionalSpecs: {
          ...prev.additionalSpecs!,
          [name]: parseFloat(value)
        }
    }));
      return;
    }
    // Handle other fields
    setFormData(prev => ({
      ...prev,
      additionalSpecs: {
        ...prev.additionalSpecs!,
        [name]: value
      }
    }));
  };
  // Handle condition changes
  const handleConditionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      name,
      checked
    } = e.target;
    setFormData(prev => ({
      ...prev,
      additionalSpecs: {
        ...prev.additionalSpecs!,
        condition: {
          ...prev.additionalSpecs!.condition,
          [name]: checked
        }
      }
    }));
  };
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.brand || !formData.model || !formData.year || !formData.price) {
      alert('Please fill in all required fields');
      return;
    }
    setSubmitting(true);

    try {
      let carId = id;

      // 1. Insert or update car (main table)
      if (isEditing) {
        const { error } = await supabase
          .from('cars')
          .update({
            brand: formData.brand,
            model: formData.model,
            year: formData.year,
            price: formData.price,
            mileage: formData.mileage,
            engine_size: formData.engineSize,
            fuel_type: formData.fuelType,
            horse_power: formData.horsePower,
            transmission: formData.transmission,
            torque: formData.torque,
            available: formData.available,
            featured: formData.featured,
            images: formData.images,
            description: formData.description,
          })
          .eq('id', id);
        if (error) throw error;
      } else {
        const { data, error } = await supabase
          .from('cars')
          .insert([{
            brand: formData.brand,
            model: formData.model,
            year: formData.year,
            price: formData.price,
            mileage: formData.mileage,
            engine_size: formData.engineSize,
            fuel_type: formData.fuelType,
            horse_power: formData.horsePower,
            transmission: formData.transmission,
            torque: formData.torque,
            available: formData.available,
            featured: formData.featured,
            images: formData.images,
            description: formData.description,
          }])
          .select('id')
          .single();
        if (error) throw error;
        carId = data.id;
      }

      // 2. Insert or update additional specs (car_additional_specs table)
      const specs = formData.additionalSpecs;
      if (specs) {
        if (isEditing) {
          const { error } = await supabase
            .from('additional_specs')
            .update({
              sunroof: specs.sunroof,
              trimmings: specs.trimmings,
              sound_system: specs.soundSystem,
              seat_material: specs.seatMaterial,
              air_conditioning: specs.airConditioning,
              phone_connectivity: specs.phoneConnectivity,
              infotainment_system: specs.infotainmentSystem,
              cigarette_lighter_port: specs.cigaretteLighterPort,
              isofix_anchors: specs.isofixAnchors,
              radio_system: specs.radioSystem,
              condition_score: specs.conditionScore,
              car_id: carId,
            })
            .eq('car_id', carId);
          if (error) throw error;
        } else {
          const { error } = await supabase
            .from('additional_specs')
            .insert([{
              sunroof: specs.sunroof,
              trimmings: specs.trimmings,
              sound_system: specs.soundSystem,
              seat_material: specs.seatMaterial,
              air_conditioning: specs.airConditioning,
              phone_connectivity: specs.phoneConnectivity,
              infotainment_system: specs.infotainmentSystem,
              cigarette_lighter_port: specs.cigaretteLighterPort,
              isofix_anchors: specs.isofixAnchors,
              radio_system: specs.radioSystem,
              condition_score: specs.conditionScore,
              car_id: carId,
            }]);
          if (error) throw error;
        }
      }

      // 3. Insert or update car conditions (car_conditions table)
      const cond = specs?.condition;
      if (cond) {
        if (isEditing) {
          const { error } = await supabase
            .from('car_conditions')
            .update({
              exterior: cond.exterior,
              interior: cond.interior,
              engine: cond.engine,
              transmission: cond.transmission,
              electronics: cond.electronics,
              suspension: cond.suspension,
              brakes: cond.brakes,
              car_id: carId,
            })
            .eq('car_id', carId);
          if (error) throw error;
        } else {
          const { error } = await supabase
            .from('car_conditions')
            .insert([{
              exterior: cond.exterior,
              interior: cond.interior,
              engine: cond.engine,
              transmission: cond.transmission,
              electronics: cond.electronics,
              suspension: cond.suspension,
              brakes: cond.brakes,
              car_id: carId,
            }]);
          if (error) throw error;
        }
      }

      alert(`Car ${isEditing ? 'updated' : 'added'} successfully!`);
      navigate('/admin/cars');
    } catch (error) {
      alert('Failed to save car info.');
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  if (submitting) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#A3320B] mb-4"></div>
        <p className="text-lg font-cambria text-[#A3320B]">
          {isEditing ? 'Updating' : 'Saving'} car, please wait...
        </p>
      </div>
    );
  }

  
  console.log("Rendering images:", formData.images);

  return (
    <div className="flex flex-col min-h-screen">
    <div className="space-y-6">
      <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold font-montserrat">
            {isEditing ? 'Edit Car' : 'Add New Car'}
          </h1>
        </div>
        <button type="submit" form="car-form" className="bg-[#A3320B] hover:bg-[#6B0504] text-white px-4 py-2 rounded-md flex items-center space-x-2 font-cambria">
          <SaveIcon className="h-5 w-5" />
          <span>{isEditing ? 'Update Car' : 'Save Car'}</span>
        </button>
      </div>
      <form id="car-form" onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-bold mb-4 font-montserrat">
            Basic Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="brand" className="block text-sm font-medium text-gray-700 mb-1 font-montserrat">
                Brand *
              </label>
              <input type="text" id="brand" name="brand" value={formData.brand} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#A3320B] focus:border-[#A3320B] font-cambria" />
            </div>
            <div>
              <label htmlFor="model" className="block text-sm font-medium text-gray-700 mb-1 font-montserrat">
                Model *
              </label>
              <input type="text" id="model" name="model" value={formData.model} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#A3320B] focus:border-[#A3320B] font-cambria" />
            </div>
            <div>
              <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-1 font-montserrat">
                Year *
              </label>
              <input type="number" id="year" name="year" value={formData.year} onChange={handleChange} required min="1900" max={new Date().getFullYear() + 1} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#A3320B] focus:border-[#A3320B] font-cambria" />
            </div>
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1 font-montserrat">
                Price (KES) *
              </label>
              <input type="number" id="price" name="price" value={formData.price} onChange={handleChange} required min="0" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#A3320B] focus:border-[#A3320B] font-cambria" />
            </div>
            <div>
              <label htmlFor="mileage" className="block text-sm font-medium text-gray-700 mb-1 font-montserrat">
                Mileage (km) *
              </label>
              <input type="number" id="mileage" name="mileage" value={formData.mileage} onChange={handleChange} required min="0" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#A3320B] focus:border-[#A3320B] font-cambria" />
            </div>
            <div>
              <label htmlFor="engineSize" className="block text-sm font-medium text-gray-700 mb-1 font-montserrat">
                Engine Size *
              </label>
              <input type="text" id="engineSize" name="engineSize" value={formData.engineSize} onChange={handleChange} required placeholder="e.g., 2.0L" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#A3320B] focus:border-[#A3320B] font-cambria" />
            </div>
            <div>
              <label htmlFor="fuelType" className="block text-sm font-medium text-gray-700 mb-1 font-montserrat">
                Fuel Type *
              </label>
              <select id="fuelType" name="fuelType" value={formData.fuelType} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#A3320B] focus:border-[#A3320B] font-cambria">
                <option value="">Select fuel type</option>
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Electric">Electric</option>
              </select>
            </div>
            <div>
              <label htmlFor="horsePower" className="block text-sm font-medium text-gray-700 mb-1 font-montserrat">
                Horsepower
              </label>
              <input type="number" id="horsePower" name="horsePower" value={formData.horsePower} onChange={handleChange} min="0" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#A3320B] focus:border-[#A3320B] font-cambria" />
            </div>
            <div>
              <label htmlFor="transmission" className="block text-sm font-medium text-gray-700 mb-1 font-montserrat">
                Transmission *
              </label>
              <select id="transmission" name="transmission" value={formData.transmission} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#A3320B] focus:border-[#A3320B] font-cambria">
                <option value="">Select transmission</option>
                <option value="Automatic">Automatic</option>
                <option value="Manual">Manual</option>
                <option value="Semi-Automatic">Semi-Automatic</option>
              </select>
            </div>
            <div>
              <label htmlFor="torque" className="block text-sm font-medium text-gray-700 mb-1 font-montserrat">
                Torque
              </label>
              <input type="text" id="torque" name="torque" value={formData.torque} onChange={handleChange} placeholder="e.g., 450Nm" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#A3320B] focus:border-[#A3320B] font-cambria" />
            </div>
          </div>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center">
              <input type="checkbox" id="available" name="available" checked={formData.available} onChange={handleChange} className="h-4 w-4 text-[#A3320B] focus:ring-[#A3320B] border-gray-300 rounded" />
              <label htmlFor="available" className="ml-2 block text-sm text-gray-700 font-cambria">
                Available for sale
              </label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="featured" name="featured" checked={formData.featured} onChange={handleChange} className="h-4 w-4 text-[#A3320B] focus:ring-[#A3320B] border-gray-300 rounded" />
              <label htmlFor="featured" className="ml-2 block text-sm text-gray-700 font-cambria">
                Featured car (shown prominently)
              </label>
            </div>
          </div>
          <div className="mt-6">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1 font-montserrat">
              Description *
            </label>
            <textarea id="description" name="description" value={formData.description} onChange={handleChange} required rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#A3320B] focus:border-[#A3320B] font-cambria"></textarea>
          </div>
        </div>
        {/* Car Images */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold font-montserrat">Car Images</h2>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
            >
              <PlusIcon className="h-4 w-4 mr-1" />
              Add Images
            </button>
            <input
              type="file"
              accept="image/*"
              multiple
              ref={fileInputRef}
              onChange={handleImagesChange}
              className="hidden"
            />
          </div>
          <div className="space-y-4">
            {formData.images?.map((image, index) => {
              console.log(`Rendering image at index ${index}:`, image);
              return (
                <div key={index} className="flex items-center space-x-4">
                  <div className="flex-grow">
                    <div className="flex items-center">
                      <div className="aspect-w-1 aspect-h-1 w-full max-w-[96px] mr-2">
                        <img
                          src={image}
                          alt={`Car ${index}`}
                          className="object-cover rounded w-full h-auto max-h-32"
                          style={{ aspectRatio: "1 / 1" }}
                        />
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="p-1 text-red-600 hover:bg-red-50 rounded"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              );
            })}
            {/* Show previews for images being uploaded */}
            {uploading && imagePreviews.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {imagePreviews.map((preview, idx) => (
                  <div key={idx} className="aspect-w-1 aspect-h-1 w-full max-w-[96px]">
                    <img
                      src={preview}
                      alt={`Preview ${idx}`}
                      className="object-cover rounded w-full h-auto max-h-32 border"
                      style={{ aspectRatio: "1 / 1" }}
                    />
                  </div>
                ))}
              </div>
            )}
            <div className="text-sm text-gray-500 italic mt-2 font-cambria">
              You can upload multiple images. First image will be used as the main display image.
            </div>
          </div>
        </div>
        {/* Additional Specifications */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-bold mb-4 font-montserrat">
            Additional Specifications
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center">
              <input type="checkbox" id="sunroof" name="sunroof" checked={formData.additionalSpecs?.sunroof} onChange={handleSpecsChange} className="h-4 w-4 text-[#A3320B] focus:ring-[#A3320B] border-gray-300 rounded" />
              <label htmlFor="sunroof" className="ml-2 block text-sm text-gray-700 font-cambria">
                Sunroof
              </label>
            </div>
            <div>
              <label htmlFor="trimmings" className="block text-sm font-medium text-gray-700 mb-1 font-montserrat">
                Trimmings
              </label>
              <input type="text" id="trimmings" name="trimmings" value={formData.additionalSpecs?.trimmings} onChange={handleSpecsChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#A3320B] focus:border-[#A3320B] font-cambria" placeholder="e.g., Wood and Chrome" />
            </div>
            <div>
              <label htmlFor="soundSystem" className="block text-sm font-medium text-gray-700 mb-1 font-montserrat">
                Sound System
              </label>
              <input type="text" id="soundSystem" name="soundSystem" value={formData.additionalSpecs?.soundSystem} onChange={handleSpecsChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#A3320B] focus:border-[#A3320B] font-cambria" placeholder="e.g., Bose Premium Sound" />
            </div>
            <div>
              <label htmlFor="seatMaterial" className="block text-sm font-medium text-gray-700 mb-1 font-montserrat">
                Seat Material
              </label>
              <input type="text" id="seatMaterial" name="seatMaterial" value={formData.additionalSpecs?.seatMaterial} onChange={handleSpecsChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#A3320B] focus:border-[#A3320B] font-cambria" placeholder="e.g., Leather" />
            </div>
            <div>
              <label htmlFor="airConditioning" className="block text-sm font-medium text-gray-700 mb-1 font-montserrat">
                Air Conditioning
              </label>
              <input type="text" id="airConditioning" name="airConditioning" value={formData.additionalSpecs?.airConditioning} onChange={handleSpecsChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#A3320B] focus:border-[#A3320B] font-cambria" placeholder="e.g., Dual Zone Climate Control" />
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="phoneConnectivity" name="phoneConnectivity" checked={formData.additionalSpecs?.phoneConnectivity} onChange={handleSpecsChange} className="h-4 w-4 text-[#A3320B] focus:ring-[#A3320B] border-gray-300 rounded" />
              <label htmlFor="phoneConnectivity" className="ml-2 block text-sm text-gray-700 font-cambria">
                Phone Connectivity
              </label>
            </div>
            <div>
              <label htmlFor="infotainmentSystem" className="block text-sm font-medium text-gray-700 mb-1 font-montserrat">
                Infotainment System
              </label>
              <input type="text" id="infotainmentSystem" name="infotainmentSystem" value={formData.additionalSpecs?.infotainmentSystem} onChange={handleSpecsChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#A3320B] focus:border-[#A3320B] font-cambria" placeholder="e.g., BMW iDrive" />
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="cigaretteLighterPort" name="cigaretteLighterPort" checked={formData.additionalSpecs?.cigaretteLighterPort} onChange={handleSpecsChange} className="h-4 w-4 text-[#A3320B] focus:ring-[#A3320B] border-gray-300 rounded" />
              <label htmlFor="cigaretteLighterPort" className="ml-2 block text-sm text-gray-700 font-cambria">
                Cigarette Lighter Port
              </label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="isofixAnchors" name="isofixAnchors" checked={formData.additionalSpecs?.isofixAnchors} onChange={handleSpecsChange} className="h-4 w-4 text-[#A3320B] focus:ring-[#A3320B] border-gray-300 rounded" />
              <label htmlFor="isofixAnchors" className="ml-2 block text-sm text-gray-700 font-cambria">
                ISOFIX Child Seat Anchors
              </label>
            </div>
            <div>
              <label htmlFor="radioSystem" className="block text-sm font-medium text-gray-700 mb-1 font-montserrat">
                Radio System
              </label>
              <input type="text" id="radioSystem" name="radioSystem" value={formData.additionalSpecs?.radioSystem} onChange={handleSpecsChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#A3320B] focus:border-[#A3320B] font-cambria" placeholder="e.g., AM/FM with Bluetooth" />
            </div>
          </div>
          {/* Condition Score */}
          <div className="mt-6">
            <label htmlFor="conditionScore" className="block text-sm font-medium text-gray-700 mb-1 font-montserrat">
              Condition Score (1-5)
            </label>
            <div className="flex items-center">
              <input type="range" id="conditionScore" name="conditionScore" min="1" max="5" value={formData.additionalSpecs?.conditionScore} onChange={handleSpecsChange} className="w-full max-w-xs" />
              <span className="ml-2 font-cambria">
                {formData.additionalSpecs?.conditionScore}/5
              </span>
            </div>
          </div>
          {/* Condition Checkboxes */}
          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-700 mb-3 font-montserrat">
              Vehicle Condition
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div className="flex items-center">
                <input type="checkbox" id="exterior" name="exterior" checked={formData.additionalSpecs?.condition.exterior} onChange={handleConditionChange} className="h-4 w-4 text-[#A3320B] focus:ring-[#A3320B] border-gray-300 rounded" />
                <label htmlFor="exterior" className="ml-2 block text-sm text-gray-700 font-cambria">
                  Exterior in good condition
                </label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="interior" name="interior" checked={formData.additionalSpecs?.condition.interior} onChange={handleConditionChange} className="h-4 w-4 text-[#A3320B] focus:ring-[#A3320B] border-gray-300 rounded" />
                <label htmlFor="interior" className="ml-2 block text-sm text-gray-700 font-cambria">
                  Interior in good condition
                </label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="engine" name="engine" checked={formData.additionalSpecs?.condition.engine} onChange={handleConditionChange} className="h-4 w-4 text-[#A3320B] focus:ring-[#A3320B] border-gray-300 rounded" />
                <label htmlFor="engine" className="ml-2 block text-sm text-gray-700 font-cambria">
                  Engine in good condition
                </label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="transmission" name="transmission" checked={formData.additionalSpecs?.condition.transmission} onChange={handleConditionChange} className="h-4 w-4 text-[#A3320B] focus:ring-[#A3320B] border-gray-300 rounded" />
                <label htmlFor="transmission" className="ml-2 block text-sm text-gray-700 font-cambria">
                  Transmission in good condition
                </label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="electronics" name="electronics" checked={formData.additionalSpecs?.condition.electronics} onChange={handleConditionChange} className="h-4 w-4 text-[#A3320B] focus:ring-[#A3320B] border-gray-300 rounded" />
                <label htmlFor="electronics" className="ml-2 block text-sm text-gray-700 font-cambria">
                  Electronics in good condition
                </label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="suspension" name="suspension" checked={formData.additionalSpecs?.condition.suspension} onChange={handleConditionChange} className="h-4 w-4 text-[#A3320B] focus:ring-[#A3320B] border-gray-300 rounded" />
                <label htmlFor="suspension" className="ml-2 block text-sm text-gray-700 font-cambria">
                  Suspension in good condition
                </label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="brakes" name="brakes" checked={formData.additionalSpecs?.condition.brakes} onChange={handleConditionChange} className="h-4 w-4 text-[#A3320B] focus:ring-[#A3320B] border-gray-300 rounded" />
                <label htmlFor="brakes" className="ml-2 block text-sm text-gray-700 font-cambria">
                  Brakes in good condition
                </label>
              </div>
            </div>
          </div>
        </div>
        {/* Form Actions */}
        <div className="flex justify-end space-x-4">
          <button type="button" onClick={() => navigate('/admin/cars')} className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 font-cambria">
            Cancel
          </button>
          <button type="submit" className="px-4 py-2 bg-[#A3320B] hover:bg-[#6B0504] text-white rounded-md font-cambria">
            {isEditing ? 'Update Car' : 'Add Car'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CarFormPage;