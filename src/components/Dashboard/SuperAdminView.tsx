'use client';

import React, { useState } from 'react';
import {
  ShieldAlert,
  Users,
  Server,
  Activity,
  UserPlus,
  Trash2,
  Lock,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
} from 'lucide-react';

interface StaffUser {
  id: string;
  name: string;
  email: string;
  role: 'Super Admin' | 'Fleet Manager' | 'Operations Agent';
  lastActive: string;
  status: 'Active' | 'Suspended';
}

const INITIAL_STAFF: StaffUser[] = [
  {
    id: 'usr-1',
    name: 'Mike Witzel',
    email: 'mike.witzel@bestauto.com',
    role: 'Super Admin',
    lastActive: 'Just now',
    status: 'Active',
  },
  {
    id: 'usr-2',
    name: 'Elena Rostova',
    email: 'elena.r@bestauto.com',
    role: 'Fleet Manager',
    lastActive: '2 hours ago',
    status: 'Active',
  },
  {
    id: 'usr-3',
    name: 'James Henderson',
    email: 'james.h@bestauto.com',
    role: 'Operations Agent',
    lastActive: 'Yesterday',
    status: 'Active',
  },
];

export function SuperAdminView() {
  const [staff, setStaff] = useState<StaffUser[]>(INITIAL_STAFF);
  const [showAddStaff, setShowAddStaff] = useState(false);
  const [newStaffName, setNewStaffName] = useState('');
  const [newStaffEmail, setNewStaffEmail] = useState('');
  const [newStaffRole, setNewStaffRole] = useState<'Super Admin' | 'Fleet Manager' | 'Operations Agent'>('Operations Agent');

  const handleAddStaff = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStaffName || !newStaffEmail) return;

    setStaff((prev) => [
      ...prev,
      {
        id: `usr-${Date.now()}`,
        name: newStaffName,
        email: newStaffEmail,
        role: newStaffRole,
        lastActive: 'Never',
        status: 'Active',
      },
    ]);

    setNewStaffName('');
    setNewStaffEmail('');
    setShowAddStaff(false);
  };

  const handleRemoveStaff = (id: string) => {
    if (id === 'usr-1') return; // Cannot delete primary super admin
    setStaff((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <div className="space-y-6 font-jakarta">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#131825] to-[#2A3447] text-white flex items-center justify-center shadow-md">
            <ShieldAlert className="w-6 h-6 text-[#FF9F43]" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">Super Administrator Control Center</h2>
            <p className="text-xs text-gray-500">
              Manage system permissions, staff role assignments, and server telemetry
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setShowAddStaff(!showAddStaff)}
          className="flex items-center gap-2 bg-[#131825] hover:bg-black text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs active:scale-95 cursor-pointer w-fit"
        >
          <UserPlus className="w-4 h-4" />
          <span>Add Staff Member</span>
        </button>
      </div>

      {/* System Telemetry & Server Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-gray-400 text-xs">
            <span>API Telemetry</span>
            <Server className="w-4 h-4 text-[#28C76F]" />
          </div>
          <p className="text-xl font-extrabold text-gray-900">24 ms</p>
          <span className="text-[10px] text-[#28C76F] font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> System Operational
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-gray-400 text-xs">
            <span>AI Concierge Pipeline</span>
            <Activity className="w-4 h-4 text-[#FF9F43]" />
          </div>
          <p className="text-xl font-extrabold text-gray-900">100% Uptime</p>
          <span className="text-[10px] text-[#28C76F] font-semibold">99.8% Grounding Accuracy</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-gray-400 text-xs">
            <span>Active Staff Sessions</span>
            <Users className="w-4 h-4 text-[#0275FF]" />
          </div>
          <p className="text-xl font-extrabold text-gray-900">{staff.length} Admins</p>
          <span className="text-[10px] text-gray-400">Role-Based Access (RBAC)</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-gray-400 text-xs">
            <span>Telegram Webhook</span>
            <Lock className="w-4 h-4 text-[#28C76F]" />
          </div>
          <p className="text-xl font-extrabold text-gray-900">Active</p>
          <span className="text-[10px] text-[#28C76F] font-semibold">Instant Lead Forwarding</span>
        </div>
      </div>

      {/* Add Staff Modal Form if toggled */}
      {showAddStaff && (
        <form
          onSubmit={handleAddStaff}
          className="bg-white p-5 rounded-2xl border border-[#FF9F43]/30 shadow-md space-y-4 animate-in fade-in duration-150"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-gray-900">Register New Staff Account</h3>
            <button
              type="button"
              onClick={() => setShowAddStaff(false)}
              className="text-xs text-gray-400 hover:text-gray-700"
            >
              Cancel
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div>
              <label className="block text-gray-600 font-semibold mb-1">Full Name</label>
              <input
                type="text"
                required
                value={newStaffName}
                onChange={(e) => setNewStaffName(e.target.value)}
                placeholder="e.g. David Miller"
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#FF9F43]"
              />
            </div>

            <div>
              <label className="block text-gray-600 font-semibold mb-1">Email Address</label>
              <input
                type="email"
                required
                value={newStaffEmail}
                onChange={(e) => setNewStaffEmail(e.target.value)}
                placeholder="david.m@bestauto.com"
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#FF9F43]"
              />
            </div>

            <div>
              <label className="block text-gray-600 font-semibold mb-1">Role &amp; Permissions</label>
              <select
                value={newStaffRole}
                onChange={(e) => setNewStaffRole(e.target.value as any)}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#FF9F43]"
              >
                <option value="Operations Agent">Operations Agent</option>
                <option value="Fleet Manager">Fleet Manager</option>
                <option value="Super Admin">Super Admin</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="bg-[#FF9F43] hover:bg-[#FF8A00] text-white px-4 py-2 rounded-lg text-xs font-bold transition-all shadow-xs cursor-pointer"
          >
            Create Staff Profile
          </button>
        </form>
      )}

      {/* Staff Management Table */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-gray-900">Admin Staff &amp; Role-Based Access</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[550px]">
            <thead>
              <tr className="border-b border-gray-100 text-gray-400 font-semibold">
                <th className="py-2.5 px-3">Staff Member</th>
                <th className="py-2.5 px-3">Assigned Role</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3">Last Active</th>
                <th className="py-2.5 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {staff.map((s) => (
                <tr key={s.id} className="hover:bg-gray-50/70 transition-colors">
                  <td className="py-3 px-3">
                    <div>
                      <p className="font-bold text-gray-900">{s.name}</p>
                      <p className="text-[10px] text-gray-400">{s.email}</p>
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    <span
                      className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                        s.role === 'Super Admin'
                          ? 'bg-[#131825] text-white'
                          : s.role === 'Fleet Manager'
                          ? 'bg-[#FF9F43]/10 text-[#FF8A00]'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {s.role}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#28C76F]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#28C76F]" />
                      {s.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-gray-500">{s.lastActive}</td>
                  <td className="py-3 px-3 text-right">
                    {s.id !== 'usr-1' ? (
                      <button
                        type="button"
                        onClick={() => handleRemoveStaff(s.id)}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                        title="Remove Admin"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <span className="text-[10px] text-gray-400 italic">Owner</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
