'use client';

import React from 'react';
import { FleetView } from '@/components/Dashboard/FleetView';
import { useDashboard } from '../layout';

export default function FleetPage() {
  const { vehicles, openAddVehicle, setVehicles, searchQuery, setSearchQuery } = useDashboard();
  return (
    <FleetView
      vehicles={vehicles}
      onOpenAddModal={openAddVehicle}
      onDeleteVehicle={(id) => setVehicles((prev) => prev.filter((v) => v.id !== id))}
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
    />
  );
}
