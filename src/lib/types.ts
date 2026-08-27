export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Booking {
  id: string;
  userId?: string;
  vehicleId?: string;
  startDate?: string;
  endDate?: string;
  status?: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  totalPrice?: number;
  createdAt?: string;
  updatedAt?: string;
}

