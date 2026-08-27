import { Booking } from "@/lib/types";

export async function fetchBookings(): Promise<Booking[]> {
  const res = await fetch("/api/bookings");
  const data = await res.json();
  return data.data || [];
}

export async function createBooking(
  bookingData: Partial<Booking>,
): Promise<Booking> {
  const res = await fetch("/api/bookings", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bookingData),
  });
  const data = await res.json();
  return data.data;
}
