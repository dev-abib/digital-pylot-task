import { Vehicle, Booking, Lead, DashboardStats, VehicleFilterParams, VehicleCategory } from './types';

export const MOCK_VEHICLES: Vehicle[] = [
  {
    id: 'veh-001',
    name: 'Tesla Model Y Performance',
    brand: 'Tesla',
    model: 'Model Y',
    year: 2025,
    category: 'Electric',
    pricePerDay: 145,
    transmission: 'Automatic',
    fuelType: 'Electric',
    seats: 5,
    doors: 4,
    luggageCapacity: 3,
    mileage: '303 mi range',
    rating: 4.9,
    reviewCount: 128,
    imageUrl: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=1000&q=80',
    featured: true,
    status: 'available',
    features: ['Autopilot', 'All-Wheel Drive', 'Premium Audio', 'Heated Seats', 'Glass Roof'],
    description: 'Experience instant acceleration and state-of-the-art electric mobility with the dual-motor Model Y Performance.',
    location: 'Downtown Hub & Airport'
  },
  {
    id: 'veh-002',
    name: 'Porsche 911 Carrera GTS',
    brand: 'Porsche',
    model: '911 Carrera GTS',
    year: 2024,
    category: 'Sports',
    pricePerDay: 320,
    transmission: 'Automatic',
    fuelType: 'Gasoline',
    seats: 4,
    doors: 2,
    luggageCapacity: 2,
    mileage: '18 MPG',
    rating: 5.0,
    reviewCount: 94,
    imageUrl: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1000&q=80',
    featured: true,
    status: 'available',
    features: ['Sport Chrono', 'PASM Sport Suspension', 'Bose Surround', 'Sport Exhaust'],
    description: 'Iconic sports car heritage combined with high-precision engineering for an unforgettable driving journey.',
    location: 'Luxury Fleet Lounge'
  },
  {
    id: 'veh-003',
    name: 'BMW X5 xDrive40i M-Sport',
    brand: 'BMW',
    model: 'X5',
    year: 2024,
    category: 'SUV',
    pricePerDay: 175,
    transmission: 'Automatic',
    fuelType: 'Hybrid',
    seats: 7,
    doors: 4,
    luggageCapacity: 4,
    mileage: '25 MPG',
    rating: 4.8,
    reviewCount: 210,
    imageUrl: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1000&q=80',
    featured: true,
    status: 'available',
    features: ['Panoramic Sky Lounge', 'Executive Package', 'Harman Kardon', 'Adaptive Cruise'],
    description: 'Spacious luxury SUV tailored for family excursions, high-end business travel, and weekend mountain escapes.',
    location: 'Downtown Hub'
  },
  {
    id: 'veh-004',
    name: 'Mercedes-Benz S-Class 580',
    brand: 'Mercedes-Benz',
    model: 'S-Class',
    year: 2025,
    category: 'Luxury',
    pricePerDay: 290,
    transmission: 'Automatic',
    fuelType: 'Hybrid',
    seats: 5,
    doors: 4,
    luggageCapacity: 3,
    mileage: '23 MPG',
    rating: 4.95,
    reviewCount: 88,
    imageUrl: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1000&q=80',
    featured: true,
    status: 'rented',
    features: ['Rear Executive Seating', 'Burmester 3D Sound', 'Massaging Seats', 'AIRMATIC Suspension'],
    description: 'The pinnacle of automotive luxury, offering whisper-quiet cabin comfort and first-class passenger amenities.',
    location: 'Executive VIP Terminal'
  },
  {
    id: 'veh-005',
    name: 'Audi e-tron GT RS',
    brand: 'Audi',
    model: 'e-tron GT',
    year: 2024,
    category: 'Electric',
    pricePerDay: 230,
    transmission: 'Automatic',
    fuelType: 'Electric',
    seats: 4,
    doors: 4,
    luggageCapacity: 2,
    mileage: '249 mi range',
    rating: 4.88,
    reviewCount: 67,
    imageUrl: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1000&q=80',
    featured: false,
    status: 'available',
    features: ['Quattro AWD', '800V Ultra-Fast Charging', 'Bang & Olufsen 3D', 'Matrix LED'],
    description: 'Stunning proportions with electric grand touring performance and instant torque delivery.',
    location: 'Westside Charging Hub'
  },
  {
    id: 'veh-006',
    name: 'Land Rover Defender 110 V8',
    brand: 'Land Rover',
    model: 'Defender 110',
    year: 2024,
    category: 'SUV',
    pricePerDay: 195,
    transmission: 'Automatic',
    fuelType: 'Gasoline',
    seats: 6,
    doors: 4,
    luggageCapacity: 5,
    mileage: '17 MPG',
    rating: 4.75,
    reviewCount: 142,
    imageUrl: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1000&q=80',
    featured: false,
    status: 'available',
    features: ['Terrain Response 2', 'Air Suspension', 'Tow Package', '360 3D Camera'],
    description: 'Unmatched rugged capability wrapped in sophisticated modern utility for off-road and city cruising.',
    location: 'Airport Hub'
  },
  {
    id: 'veh-007',
    name: 'Mercedes-Benz V-Class Luxury Shuttle',
    brand: 'Mercedes-Benz',
    model: 'V-Class',
    year: 2024,
    category: 'Van',
    pricePerDay: 210,
    transmission: 'Automatic',
    fuelType: 'Diesel',
    seats: 8,
    doors: 4,
    luggageCapacity: 8,
    mileage: '28 MPG',
    rating: 4.82,
    reviewCount: 115,
    imageUrl: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1000&q=80',
    featured: false,
    status: 'available',
    features: ['Captain Chairs', 'Conference Table', 'Dual Power Sliding Doors', 'Ambient Lighting'],
    description: 'Premium group transport delivering exceptional legroom, luggage volume, and VIP hospitality features.',
    location: 'Downtown Hub & Airport'
  },
  {
    id: 'veh-008',
    name: 'Genesis G90 Prestige Sedan',
    brand: 'Genesis',
    model: 'G90',
    year: 2025,
    category: 'Sedan',
    pricePerDay: 160,
    transmission: 'Automatic',
    fuelType: 'Hybrid',
    seats: 5,
    doors: 4,
    luggageCapacity: 3,
    mileage: '22 MPG',
    rating: 4.9,
    reviewCount: 52,
    imageUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1000&q=80',
    featured: false,
    status: 'maintenance',
    features: ['Bang & Olufsen 23-Speaker', 'Easy Close Doors', 'Multi-Chamber Air Suspension'],
    description: 'Elegantly refined executive sedan that matches serene quietness with dynamic twin-turbo power.',
    location: 'Downtown Hub'
  }
];

export const MOCK_BOOKINGS: Booking[] = [
  {
    id: 'bk-101',
    bookingNumber: 'BK-2026-8801',
    vehicleId: 'veh-001',
    vehicleName: 'Tesla Model Y Performance',
    vehicleCategory: 'Electric',
    customerName: 'Sarah Jenkins',
    customerEmail: 'sarah.j@example.com',
    customerPhone: '+1 (555) 234-5678',
    startDate: '2026-08-28',
    endDate: '2026-09-02',
    totalDays: 5,
    totalPrice: 725,
    status: 'active',
    createdAt: '2026-08-25T09:14:00Z',
    pickupLocation: 'Downtown Hub',
    dropoffLocation: 'Airport Terminal 2'
  },
  {
    id: 'bk-102',
    bookingNumber: 'BK-2026-8802',
    vehicleId: 'veh-002',
    vehicleName: 'Porsche 911 Carrera GTS',
    vehicleCategory: 'Sports',
    customerName: 'Marcus Sterling',
    customerEmail: 'm.sterling@investments.com',
    customerPhone: '+1 (555) 987-6543',
    startDate: '2026-08-30',
    endDate: '2026-09-01',
    totalDays: 2,
    totalPrice: 640,
    status: 'confirmed',
    createdAt: '2026-08-26T14:30:00Z',
    pickupLocation: 'Luxury Fleet Lounge',
    dropoffLocation: 'Luxury Fleet Lounge'
  },
  {
    id: 'bk-103',
    bookingNumber: 'BK-2026-8803',
    vehicleId: 'veh-004',
    vehicleName: 'Mercedes-Benz S-Class 580',
    vehicleCategory: 'Luxury',
    customerName: 'Elena Rostova',
    customerEmail: 'elena@rostovagroup.org',
    customerPhone: '+1 (555) 345-1290',
    startDate: '2026-08-24',
    endDate: '2026-08-29',
    totalDays: 5,
    totalPrice: 1450,
    status: 'active',
    createdAt: '2026-08-21T11:00:00Z',
    pickupLocation: 'Executive VIP Terminal',
    dropoffLocation: 'Executive VIP Terminal'
  },
  {
    id: 'bk-104',
    bookingNumber: 'BK-2026-8804',
    vehicleId: 'veh-003',
    vehicleName: 'BMW X5 xDrive40i M-Sport',
    vehicleCategory: 'SUV',
    customerName: 'David Chen',
    customerEmail: 'david.chen@techglobal.net',
    customerPhone: '+1 (555) 789-0123',
    startDate: '2026-08-15',
    endDate: '2026-08-20',
    totalDays: 5,
    totalPrice: 875,
    status: 'completed',
    createdAt: '2026-08-10T16:45:00Z',
    pickupLocation: 'Downtown Hub',
    dropoffLocation: 'Downtown Hub'
  },
  {
    id: 'bk-105',
    bookingNumber: 'BK-2026-8805',
    vehicleId: 'veh-007',
    vehicleName: 'Mercedes-Benz V-Class Luxury Shuttle',
    vehicleCategory: 'Van',
    customerName: 'Corporate Summit Logistics',
    customerEmail: 'events@summit2026.io',
    customerPhone: '+1 (555) 456-7890',
    startDate: '2026-09-05',
    endDate: '2026-09-10',
    totalDays: 5,
    totalPrice: 1050,
    status: 'pending',
    createdAt: '2026-08-27T08:00:00Z',
    pickupLocation: 'Airport Hub',
    dropoffLocation: 'Airport Hub'
  }
];

export const MOCK_LEADS: Lead[] = [
  {
    id: 'lead-01',
    name: 'Alexander Wright',
    email: 'alex.wright@venture.co',
    phone: '+1 (555) 112-9900',
    preferredCategory: 'Luxury',
    targetVehicleName: 'Mercedes-Benz S-Class 580',
    startDate: '2026-09-10',
    endDate: '2026-09-15',
    message: 'Looking for a chauffeur-ready luxury sedan for international client visits.',
    source: 'website_form',
    status: 'new',
    createdAt: '2026-08-27T10:15:00Z'
  },
  {
    id: 'lead-02',
    name: 'Jessica Vance',
    email: 'jess.vance@studio.design',
    phone: '+1 (555) 443-8821',
    preferredCategory: 'Electric',
    targetVehicleName: 'Tesla Model Y Performance',
    startDate: '2026-08-30',
    endDate: '2026-09-04',
    message: 'Need child car seat compatibility and airport drop-off.',
    source: 'chatbot',
    status: 'contacted',
    createdAt: '2026-08-26T18:40:00Z'
  },
  {
    id: 'lead-03',
    name: 'Robert Thorne',
    email: 'rthorne@alpine-trips.com',
    phone: '+1 (555) 776-5544',
    preferredCategory: 'SUV',
    targetVehicleName: 'Land Rover Defender 110 V8',
    message: 'Inquiring regarding multi-week rental discount and snow chains.',
    source: 'booking_inquiry',
    status: 'converted',
    createdAt: '2026-08-25T14:20:00Z'
  }
];

export function getMockDashboardStats(dateRange?: string, category?: string): DashboardStats {
  // Category multiplier and filtering
  const isCategoryFiltered = category && category !== 'All';
  const categoryMultiplier = isCategoryFiltered ? 0.38 : 1.0;

  // Filter recent bookings based on category
  const filteredBookings = isCategoryFiltered
    ? MOCK_BOOKINGS.filter(b => b.vehicleCategory.toLowerCase() === category.toLowerCase())
    : MOCK_BOOKINGS;

  // Dynamic chart generation based on dateRange (7d, 30d, 90d)
  let chartData: Array<{ date: string; revenue: number; bookings: number }> = [];
  let baseRevenue = 48250;
  let baseBookings = 124;

  if (dateRange === '30d') {
    baseRevenue = 184600;
    baseBookings = 480;
    chartData = [
      { date: 'Aug 01', revenue: Math.round(14200 * categoryMultiplier), bookings: 38 },
      { date: 'Aug 05', revenue: Math.round(16800 * categoryMultiplier), bookings: 44 },
      { date: 'Aug 09', revenue: Math.round(18500 * categoryMultiplier), bookings: 49 },
      { date: 'Aug 13', revenue: Math.round(17900 * categoryMultiplier), bookings: 46 },
      { date: 'Aug 17', revenue: Math.round(21400 * categoryMultiplier), bookings: 56 },
      { date: 'Aug 21', revenue: Math.round(23100 * categoryMultiplier), bookings: 61 },
      { date: 'Aug 24', revenue: Math.round(24800 * categoryMultiplier), bookings: 64 },
      { date: 'Aug 27', revenue: Math.round(27200 * categoryMultiplier), bookings: 72 }
    ];
  } else if (dateRange === '90d') {
    baseRevenue = 542000;
    baseBookings = 1420;
    chartData = [
      { date: 'Jun W1', revenue: Math.round(38000 * categoryMultiplier), bookings: 102 },
      { date: 'Jun W3', revenue: Math.round(41500 * categoryMultiplier), bookings: 110 },
      { date: 'Jul W1', revenue: Math.round(44200 * categoryMultiplier), bookings: 118 },
      { date: 'Jul W3', revenue: Math.round(48900 * categoryMultiplier), bookings: 129 },
      { date: 'Aug W1', revenue: Math.round(52100 * categoryMultiplier), bookings: 138 },
      { date: 'Aug W3', revenue: Math.round(58400 * categoryMultiplier), bookings: 154 }
    ];
  } else {
    // 7d default
    chartData = [
      { date: 'Aug 21', revenue: Math.round(5200 * categoryMultiplier), bookings: 14 },
      { date: 'Aug 22', revenue: Math.round(6100 * categoryMultiplier), bookings: 17 },
      { date: 'Aug 23', revenue: Math.round(7400 * categoryMultiplier), bookings: 21 },
      { date: 'Aug 24', revenue: Math.round(6800 * categoryMultiplier), bookings: 19 },
      { date: 'Aug 25', revenue: Math.round(8200 * categoryMultiplier), bookings: 24 },
      { date: 'Aug 26', revenue: Math.round(9100 * categoryMultiplier), bookings: 27 },
      { date: 'Aug 27', revenue: Math.round(9850 * categoryMultiplier), bookings: 29 }
    ];
  }

  const categoryDistribution = isCategoryFiltered
    ? [
        { category: category as VehicleCategory, count: 2, percentage: 100 }
      ]
    : [
        { category: 'SUV', count: 2, percentage: 25 },
        { category: 'Electric', count: 2, percentage: 25 },
        { category: 'Luxury', count: 1, percentage: 12.5 },
        { category: 'Sports', count: 1, percentage: 12.5 },
        { category: 'Van', count: 1, percentage: 12.5 },
        { category: 'Sedan', count: 1, percentage: 12.5 }
      ];

  return {
    totalRevenue: Math.round(baseRevenue * categoryMultiplier),
    revenueChangePercentage: +14.8,
    activeBookings: Math.round(baseBookings * categoryMultiplier),
    bookingsChangePercentage: +8.2,
    availableVehicles: MOCK_VEHICLES.filter(v => v.status === 'available').length,
    totalFleetCount: MOCK_VEHICLES.length,
    fleetUtilizationRate: 78.5,
    newLeadsCount: MOCK_LEADS.length,
    leadsChangePercentage: +22.0,
    revenueChart: chartData,
    categoryDistribution,
    recentBookings: filteredBookings
  };
}

export function filterVehicles(params: VehicleFilterParams): { vehicles: Vehicle[]; total: number } {
  let result = [...MOCK_VEHICLES];

  if (params.category && params.category !== 'All') {
    result = result.filter(v => v.category.toLowerCase() === params.category?.toLowerCase());
  }

  if (params.search) {
    const q = params.search.toLowerCase();
    result = result.filter(v =>
      v.name.toLowerCase().includes(q) ||
      v.brand.toLowerCase().includes(q) ||
      v.model.toLowerCase().includes(q) ||
      v.category.toLowerCase().includes(q)
    );
  }

  if (params.minPrice !== undefined) {
    result = result.filter(v => v.pricePerDay >= params.minPrice!);
  }

  if (params.maxPrice !== undefined) {
    result = result.filter(v => v.pricePerDay <= params.maxPrice!);
  }

  if (params.seats !== undefined) {
    result = result.filter(v => v.seats >= params.seats!);
  }

  if (params.transmission && params.transmission !== 'All') {
    result = result.filter(v => v.transmission.toLowerCase() === params.transmission?.toLowerCase());
  }

  if (params.fuelType && params.fuelType !== 'All') {
    result = result.filter(v => v.fuelType.toLowerCase() === params.fuelType?.toLowerCase());
  }

  return {
    vehicles: result,
    total: result.length
  };
}
