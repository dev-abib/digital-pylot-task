export type VehicleCategory = 'SUV' | 'Sedan' | 'Luxury' | 'Electric' | 'Sports' | 'Van';
export type VehicleStatus = 'available' | 'rented' | 'maintenance' | 'reserved';
export type TransmissionType = 'Automatic' | 'Manual';
export type FuelType = 'Electric' | 'Hybrid' | 'Gasoline' | 'Diesel';

export interface Vehicle {
  id: string;
  name: string;
  brand: string;
  model: string;
  year: number;
  category: VehicleCategory;
  pricePerDay: number;
  transmission: TransmissionType;
  fuelType: FuelType;
  seats: number;
  doors: number;
  luggageCapacity: number;
  mileage: string;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  featured: boolean;
  status: VehicleStatus;
  features: string[];
  description: string;
  location: string;
}

export type BookingStatus = 'confirmed' | 'pending' | 'active' | 'completed' | 'cancelled';

export interface Booking {
  id: string;
  bookingNumber: string;
  vehicleId: string;
  vehicleName: string;
  vehicleCategory: VehicleCategory;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  startDate: string; // ISO date string YYYY-MM-DD
  endDate: string;   // ISO date string YYYY-MM-DD
  totalDays: number;
  totalPrice: number;
  status: BookingStatus;
  createdAt: string;
  pickupLocation: string;
  dropoffLocation: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  preferredCategory?: VehicleCategory;
  targetVehicleId?: string;
  targetVehicleName?: string;
  startDate?: string;
  endDate?: string;
  message?: string;
  source: 'website_form' | 'chatbot' | 'booking_inquiry';
  status: 'new' | 'contacted' | 'converted' | 'archived';
  createdAt: string;
}

export interface DashboardStats {
  totalRevenue: number;
  revenueChangePercentage: number;
  activeBookings: number;
  bookingsChangePercentage: number;
  availableVehicles: number;
  totalFleetCount: number;
  fleetUtilizationRate: number;
  newLeadsCount: number;
  leadsChangePercentage: number;
  revenueChart: {
    date: string;
    revenue: number;
    bookings: number;
  }[];
  categoryDistribution: {
    category: VehicleCategory | string;
    count: number;
    percentage: number;
  }[];
  recentBookings: Booking[];
}

export interface VehicleFilterParams {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  seats?: number;
  transmission?: string;
  fuelType?: string;
  search?: string;
  availableFrom?: string;
  availableTo?: string;
  page?: number;
  limit?: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  suggestedVehicles?: Vehicle[];
}
