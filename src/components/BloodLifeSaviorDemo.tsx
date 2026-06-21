import React, { useState, useEffect } from 'react';
import { Plus, Bell, RefreshCw, Layers, Database, ShieldAlert, Heart, Calendar, Check, Send } from 'lucide-react';
import { Donor, BloodRequest } from '../types';

interface ApiLog {
  timestamp: string;
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  endpoint: string;
  status: number;
  payload?: string;
}

export default function BloodLifeSaviorDemo() {
  const [notification, setNotification] = useState<string | null>(null);
  
  // Mock initial donors
  const [donors, setDonors] = useState<Donor[]>([
    { id: '1', name: 'Sourav Roy', bloodGroup: 'O+', status: 'Ready', lastDonationDaysAgo: 120 },
    { id: '2', name: 'Nisha Kumari', bloodGroup: 'A-', status: 'Ready', lastDonationDaysAgo: 95 },
    { id: '3', name: 'Amit Mahto', bloodGroup: 'AB+', status: 'Donated', lastDonationDaysAgo: 15 },
    { id: '4', name: 'Priya Sharma', bloodGroup: 'B+', status: 'Deferred', lastDonationDaysAgo: 45 },
    { id: '5', name: 'Ravi Belval', bloodGroup: 'O-', status: 'Ready', lastDonationDaysAgo: 150 },
  ]);

  // Mock initial requests
  const [requests, setRequests] = useState<BloodRequest[]>([
    { id: 'R1', hospital: 'Sadar Hospital, Ranchi', bloodGroup: 'O-', urgency: 'Critical', status: 'Pending', units: 3 },
    { id: 'R2', hospital: 'JSCA Apollo Clinic', bloodGroup: 'A-', urgency: 'Urgent', status: 'Approved', units: 2 },
    { id: 'R3', hospital: 'Orchid Medical Center', bloodGroup: 'B+', urgency: 'Standard', status: 'Delivered', units: 4 },
  ]);

  // Inventory logic
  const [inventory, setInventory] = useState<Record<string, number>>({
    'O+': 8,
    'A+': 12,
    'B+': 15,
    'AB+': 4,
    'O-': 2, // Low supply!
    'A-': 3, // Low supply!
    'B-': 6,
    'AB-': 5,
  });

  // API Network console logger state
  const [apiLogs, setApiLogs] = useState<ApiLog[]>([
    { timestamp: '11:04:12', method: 'GET', endpoint: '/api/donors', status: 200 },
    { timestamp: '11:04:13', method: 'GET', endpoint: '/api/requests', status: 200 },
  ]);

  // Form states for adding donor
  const [newDonorName, setNewDonorName] = useState('');
  const [newDonorGroup, setNewDonorGroup] = useState('O+');
  const [newDonorDays, setNewDonorDays] = useState(120);

  // Form states for creating a hospital request
  const [reqHospital, setReqHospital] = useState('');
  const [reqGroup, setReqGroup] = useState('O-');
  const [reqUrgency, setReqUrgency] = useState<'Critical' | 'Urgent' | 'Standard'>('Urgent');
  const [reqUnits, setReqUnits] = useState(2);

  const addLog = (method: 'GET' | 'POST' | 'PATCH' | 'DELETE', endpoint: string, status: number, payload?: string) => {
    const now = new Date();
    const timeStr = now.toTimeString().split(' ')[0];
    setApiLogs((prev) => [
      { timestamp: timeStr, method, endpoint, status, payload },
      ...prev.slice(0, 9), // Keep last 10 logs
    ]);
  };

  const handleAddDonor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDonorName.trim()) return;

    const newId = (donors.length + 1).toString();
    const newD: Donor = {
      id: newId,
      name: newDonorName,
      bloodGroup: newDonorGroup,
      status: newDonorDays >= 90 ? 'Ready' : 'Donated',
      lastDonationDaysAgo: Number(newDonorDays),
    };

    setDonors([...donors, newD]);
    
    // update inventory slightly
    setInventory(prev => ({
      ...prev,
      [newDonorGroup]: prev[newDonorGroup] + 1
    }));

    addLog('POST', '/api/donors', 201, JSON.stringify(newD));
    setNewDonorName('');
    
    // Scroll logs into view
  };

  const handleCreateRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reqHospital.trim()) return;

    const newId = 'R' + (requests.length + 1).toString();
    const newReq: BloodRequest = {
      id: newId,
      hospital: reqHospital,
      bloodGroup: reqGroup,
      urgency: reqUrgency,
      status: 'Pending',
      units: reqUnits,
    };

    setRequests([newReq, ...requests]);
    addLog('POST', '/api/requests', 201, JSON.stringify(newReq));
    setReqHospital('');
  };

  const handleApproveRequest = (id: string, group: string, units: number) => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status: 'Approved' } : r));
    
    // reduce inventory
    setInventory(prev => {
      const current = prev[group] || 0;
      const nextVal = Math.max(0, current - units);
      return { ...prev, [group]: nextVal };
    });

    addLog('PATCH', `/api/requests/${id}/status`, 200, JSON.stringify({ status: 'Approved' }));
  };

  const handleFulfillRequest = (id: string) => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status: 'Delivered' } : r));
    addLog('PATCH', `/api/requests/${id}/status`, 200, JSON.stringify({ status: 'Delivered' }));
  };

  // Eligibility reminder logic
  const eligibilityReminders = donors.filter(d => d.status === 'Ready' && d.lastDonationDaysAgo >= 120);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-1 md:p-4 text-black" id="blood-savior-root">
      
      {/* LEFT COLUMN: Inventory & System Overview */}
      <div className="lg:col-span-4 flex flex-col gap-6">
        
        {/* Blood Stock Counter */}
        <div className="bg-white border-3 border-black p-5 shadow-[4px_4px_0_0_rgba(0,0,0,1)] relative overflow-hidden" id="blood-stock-card">
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]" />
          <h3 className="font-display text-lg font-black uppercase text-black flex items-center gap-2 mb-4">
            <Heart className="w-5 h-5 text-red-650 fill-red-500" />
            Live Blood Inventory
          </h3>
          
          <div className="grid grid-cols-4 gap-2.5">
            {Object.keys(inventory).map((group) => {
              const count = inventory[group];
              const isLow = count <= 3;
              return (
                <div 
                  key={group} 
                  className={`relative p-2.5 border-2 flex flex-col items-center justify-between transition-all duration-200 select-none ${
                    isLow 
                      ? 'bg-rose-100 border-red-600 text-black font-black shadow-[2px_2px_0_0_rgba(185,28,28,1)]' 
                      : 'bg-[#fafaf6] border-black text-black'
                  }`}
                >
                  <span className="text-xs font-mono font-black">{group}</span>
                  <span className="text-xl font-display font-black my-0.5">{count}</span>
                  <span className="text-[8.5px] uppercase tracking-wider font-extrabold text-gray-500">Units</span>
                  {isLow && (
                    <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-600"></span>
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Low Supply Alerts Box */}
          <div className="mt-5 p-3.5 bg-yellow-50 border-2 border-black">
            <h4 className="text-[10px] font-mono font-black text-gray-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-red-650" />
              Critical Alerts (&le; 3 units)
            </h4>
            <div className="space-y-1.5">
              {Object.keys(inventory)
                .filter((group) => inventory[group] <= 3)
                .map((grp) => {
                  const qty = inventory[grp];
                  return (
                    <div key={grp} className="flex justify-between items-center text-xs text-red-700 bg-rose-50 px-2 py-1 border border-red-400">
                      <span className="flex items-center gap-1 font-bold">
                        <span className="h-1.5 w-1.5 rounded-full bg-red-600 animate-pulse" />
                        Group <strong>{grp}</strong> is low!
                      </span>
                      <span className="font-mono font-black">{qty} Units</span>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>

        {/* Eligibility Reminders */}
        <div className="bg-white border-3 border-black p-5 shadow-[4px_4px_0_0_rgba(0,0,0,1)] relative" id="eligibility-card">
          <h3 className="font-display text-lg font-black uppercase text-black flex items-center gap-2 mb-3">
            <Bell className="w-5 h-5 text-emerald-600" />
            Eligibility Reminders
          </h3>
          <p className="text-xs text-gray-750 font-semibold mb-4 leading-relaxed">
            Engine identifies donors whose last active donation was strictly &ge; 120 days ago.
          </p>

          {notification && (
            <div className="mb-3 p-2 bg-yellow-300 border-2 border-black text-xs font-black uppercase tracking-wide animate-fadeIn">
              {notification}
            </div>
          )}

          <div className="space-y-2 max-h-[190px] overflow-y-auto pr-1">
            {eligibilityReminders.map(donor => (
              <div key={donor.id} className="flex justify-between items-center bg-[#fafaf6] p-2.5 border-2 border-black hover:bg-yellow-50/50 transition-all">
                <div>
                  <h4 className="text-xs font-extrabold text-black">{donor.name}</h4>
                  <p className="text-[9px] text-gray-500 uppercase font-mono font-black mt-0.5">{donor.bloodGroup} • {donor.lastDonationDaysAgo} Days Ago</p>
                </div>
                <button
                  onClick={() => {
                    addLog('POST', `/api/notifications/notify/${donor.id}`, 200, JSON.stringify({ name: donor.name, method: 'SMS/Email' }));
                    setNotification(`SMS/Email dispatch triggered for ${donor.name}!`);
                    setTimeout(() => setNotification(null), 3000);
                  }}
                  className="text-[9px] font-black uppercase bg-emerald-250 bg-emerald-200 border-2 border-black px-2.5 py-1.5 shadow-[1px_1px_0_0_rgba(0,0,0,1)] hover:translate-y-[-1px] transition-all cursor-pointer"
                >
                  Send Alert
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* MongoDB Visualizer */}
        <div className="bg-white border-3 border-black p-5 shadow-[4px_4px_0_0_rgba(0,0,0,1)]" id="mongodb-visualizer-card">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-display text-xs font-black text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
              <Database className="w-4 h-4 text-black" />
              MongoDB Cluster Active
            </h3>
            <span className="text-[10px] font-mono text-emerald-600 flex items-center gap-1 font-black uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              db.donors
            </span>
          </div>
          <div className="bg-[#111318] rounded p-3 font-mono text-[10px] text-emerald-400 h-[100px] overflow-y-auto border-2 border-black">
            <span className="text-slate-500">// Realtime memory buffer JSON docs:</span>
            <pre className="mt-1 font-mono">
              {JSON.stringify(donors.slice(-2), null, 2)}
            </pre>
          </div>
        </div>

      </div>

      {/* MIDDLE & RIGHT: Donor Registration & Hospital Request Boards */}
      <div className="lg:col-span-8 flex flex-col gap-6">
        
        {/* Donor Management & Quick Registration */}
        <div className="bg-white border-3 border-black p-5 shadow-[4px_4px_0_0_rgba(0,0,0,1)] text-black" id="donor-portal-card">
          <h3 className="font-display text-lg font-black uppercase text-black flex items-center gap-2 mb-1">
            <Plus className="w-5 h-5 text-red-650" />
            MERN Donor Registration
          </h3>
          <p className="text-xs text-gray-750 font-semibold mb-4 leading-relaxed">
            Simulate REST API client submission which validates constraints, uploads records to the database and recalculates emergency buffers.
          </p>

          <form onSubmit={handleAddDonor} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-[#fafaf6] border-2 border-black mb-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] uppercase font-mono font-black tracking-wider text-gray-650">Donor Name</label>
              <input 
                type="text" 
                placeholder="Alfiya Parween"
                value={newDonorName}
                onChange={e => setNewDonorName(e.target.value)}
                className="bg-white border-2 border-black px-2.5 py-1.5 text-xs text-black font-semibold focus:outline-none focus:ring-2 focus:ring-yellow-300"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] uppercase font-mono font-black tracking-wider text-gray-650">Blood Group</label>
              <select 
                value={newDonorGroup}
                onChange={e => setNewDonorGroup(e.target.value)}
                className="bg-white border-2 border-black px-2 py-1.5 text-xs text-black font-semibold focus:outline-none focus:ring-2 focus:ring-yellow-300"
              >
                {['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'].map(bg => (
                  <option key={bg} value={bg}>{bg}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] uppercase font-mono font-black tracking-wider text-gray-650">Last Donation (Days)</label>
              <input 
                type="number" 
                value={newDonorDays}
                onChange={e => setNewDonorDays(Number(e.target.value))}
                min="0"
                className="bg-white border-2 border-black px-2.5 py-1.5 text-xs text-black font-semibold focus:outline-none focus:ring-2 focus:ring-yellow-300"
              />
            </div>

            <div className="flex items-end">
              <button 
                type="submit"
                className="w-full bg-rose-300 hover:bg-rose-400 text-black font-black uppercase text-xs px-4 py-2.5 border-2 border-black shadow-[2px_2px_0_0_rgba(0,0,0,1)] hover:translate-y-[-1px] transition-all cursor-pointer"
              >
                <Send className="w-3.5 h-3.5 inline-block shrink-0" />
                Register Donor
              </button>
            </div>
          </form>

          {/* Donors List */}
          <div className="overflow-x-auto select-none">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b-3 border-black text-[10px] uppercase font-mono font-black text-gray-500">
                  <th className="pb-2.5">ID</th>
                  <th className="pb-2.5">Donor</th>
                  <th className="pb-2.5">Blood Group</th>
                  <th className="pb-2.5">Eligibility Status</th>
                  <th className="pb-2.5">Last Donation</th>
                </tr>
              </thead>
              <tbody className="divide-y-2 divide-gray-150 text-xs">
                {donors.map(donor => (
                  <tr key={donor.id} className="hover:bg-[#fafaf6] transition-colors font-medium">
                    <td className="py-2.5 font-mono font-bold text-gray-400">#{donor.id}</td>
                    <td className="py-2.5 font-extrabold text-black">{donor.name}</td>
                    <td className="py-2.5">
                      <span className="px-2 py-0.5 border-2 border-black text-[9.5px] font-black bg-yellow-200 text-black">
                        {donor.bloodGroup}
                      </span>
                    </td>
                    <td className="py-2.5">
                      <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 border border-black text-[9px] font-black uppercase ${
                        donor.status === 'Ready' 
                          ? 'bg-emerald-250 bg-emerald-200 text-black' 
                          : donor.status === 'Donated'
                          ? 'bg-purple-250 bg-purple-200 text-black'
                          : 'bg-amber-250 bg-amber-200 text-black'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full border border-black ${
                          donor.status === 'Ready' ? 'bg-emerald-500' : donor.status === 'Donated' ? 'bg-purple-500' : 'bg-amber-500'
                        }`} />
                        {donor.status}
                      </span>
                    </td>
                    <td className="py-2.5 font-mono font-black text-gray-700">{donor.lastDonationDaysAgo} days ago</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Hospital Request Handling System */}
        <div className="bg-white border-3 border-black p-5 shadow-[4px_4px_0_0_rgba(0,0,0,1)] text-black mt-6" id="blood-request-card">
          <h3 className="font-display text-lg font-black uppercase text-black flex items-center gap-2 mb-1">
            <RefreshCw className="w-5 h-5 text-amber-500" />
            Hospital Requests Terminal
          </h3>
          <p className="text-xs text-gray-750 font-semibold mb-4 leading-relaxed">
            Mock real-time dispatch control desk facilitating cross-coordination between hospital requirements, supply margins and rapid routing.
          </p>

          <form onSubmit={handleCreateRequest} className="grid grid-cols-1 md:grid-cols-5 gap-3 p-4 bg-[#fafaf6] border-2 border-black mb-5">
            <div className="flex flex-col gap-1 md:col-span-2">
              <label className="text-[10px] uppercase font-mono font-black text-gray-650">Hospital Facility</label>
              <input 
                type="text" 
                placeholder="RIMS Hospital Ranchi"
                value={reqHospital}
                onChange={e => setReqHospital(e.target.value)}
                className="bg-white border-2 border-black px-2.5 py-1.5 text-xs text-black font-semibold focus:outline-none focus:ring-2 focus:ring-yellow-300"
              />
            </div>
            
            <div className="flex flex-col gap-1">
              <label className="text-[10px] uppercase font-mono font-black text-gray-650">Group</label>
              <select 
                value={reqGroup}
                onChange={e => setReqGroup(e.target.value)}
                className="bg-white border-2 border-black px-2 py-1.5 text-xs text-black font-semibold focus:outline-none focus:ring-2 focus:ring-yellow-300"
              >
                {['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'].map(bg => (
                  <option key={bg} value={bg}>{bg}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[10px] uppercase font-mono font-black text-gray-650">Urgency</label>
              <select 
                value={reqUrgency}
                onChange={e => setReqUrgency(e.target.value as any)}
                className="bg-white border-2 border-black px-2 py-1.5 text-xs text-black font-semibold focus:outline-none focus:ring-2 focus:ring-yellow-300"
              >
                <option value="Critical">Critical</option>
                <option value="Urgent">Urgent</option>
                <option value="Standard">Standard</option>
              </select>
            </div>

            <div className="flex items-end">
              <button 
                type="submit"
                className="w-full bg-amber-300 hover:bg-amber-400 text-black font-black uppercase text-xs px-4 py-2.5 border-2 border-black shadow-[2px_2px_0_0_rgba(0,0,0,1)] hover:translate-y-[-1px] transition-all cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5 inline-block shrink-0" />
                Submit
              </button>
            </div>
          </form>

          {/* Requests Queue */}
          <div className="space-y-3">
            {requests.map(req => {
              const matchesAvailable = (inventory[req.bloodGroup] || 0) >= req.units;
              return (
                <div key={req.id} className="bg-[#fafaf6] p-4 border-2 border-black flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
                  <div className="flex items-start gap-4">
                    <div className={`p-2.5 border-2 font-display font-black text-lg text-center min-w-[65px] ${
                      req.urgency === 'Critical' 
                        ? 'bg-rose-100 border-red-650 text-black' 
                        : req.urgency === 'Urgent'
                        ? 'bg-amber-100 border-amber-600 text-black'
                        : 'bg-gray-100 border-black text-gray-700'
                    }`}>
                      {req.bloodGroup}
                      <span className="block text-[8px] uppercase tracking-wider font-mono font-black mt-0.5">{req.units} Units</span>
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="text-xs font-extrabold text-black">{req.hospital}</h4>
                        <span className={`text-[8px] font-mono font-black uppercase px-1.5 py-0.5 border border-black leading-none ${
                          req.urgency === 'Critical' 
                            ? 'bg-rose-300 text-black' 
                            : req.urgency === 'Urgent'
                            ? 'bg-amber-300 text-black'
                            : 'bg-gray-200 text-black'
                        }`}>
                          {req.urgency}
                        </span>
                      </div>
                      <p className="text-[10px] text-gray-500 font-mono font-bold mt-1">Request ID: {req.id} • Fulfill status tracked actively</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className={`text-[9px] font-mono font-black uppercase px-2 py-0.5 border border-black ${
                          req.status === 'Pending' 
                            ? 'bg-gray-100 text-black' 
                            : req.status === 'Approved'
                            ? 'bg-amber-200 text-black'
                            : 'bg-emerald-200 text-black'
                        }`}>
                          {req.status}
                        </span>

                        {!matchesAvailable && req.status === 'Pending' && (
                          <span className="text-[10.5px] text-red-650 font-black flex items-center gap-1 uppercase tracking-wide">
                            <ShieldAlert className="w-3.5 h-3.5" /> Insufficient Stock
                          </span>
                        )}
                        {matchesAvailable && req.status === 'Pending' && (
                          <span className="text-[10.5px] text-emerald-700 font-black flex items-center gap-1 uppercase tracking-wide">
                            <Check className="w-3.5 h-3.5" /> Ready for dispatch
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 md:self-center">
                    {req.status === 'Pending' && (
                      <button
                        onClick={() => handleApproveRequest(req.id, req.bloodGroup, req.units)}
                        disabled={!matchesAvailable}
                        className={`text-xs px-3.5 py-2 border-2 text-black font-black uppercase transition-all ${
                          matchesAvailable 
                            ? 'bg-amber-300 border-black hover:bg-amber-400 shadow-[2px_2px_0_0_#000] hover:translate-y-[-1px] cursor-pointer font-black' 
                            : 'bg-gray-100 border-gray-300 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        Approve Supply
                      </button>
                    )}
                    {req.status === 'Approved' && (
                      <button
                        onClick={() => handleFulfillRequest(req.id)}
                        className="text-xs bg-emerald-300 hover:bg-emerald-400 text-black border-2 border-black px-3.5 py-2 font-black uppercase shadow-[2px_2px_0_0_rgba(0,0,0,1)] hover:translate-y-[-1px] transition-all cursor-pointer"
                      >
                        Confirm Delivery
                      </button>
                    )}
                    {req.status === 'Delivered' && (
                      <span className="text-xs text-emerald-800 font-black uppercase flex items-center gap-1.5 bg-emerald-100 border-2 border-black px-3 py-1.5 select-none">
                        <Check className="w-4 h-4" /> Delivered & Closed
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Console / REST API Log */}
        <div className="bg-white border-3 border-black p-4 shadow-[4px_4px_0_0_rgba(0,0,0,1)] text-black mt-6" id="api-console-terminal">
          <div className="flex justify-between items-center mb-2.5 select-none">
            <h4 className="text-[10px] font-mono font-black text-gray-500 uppercase tracking-widest flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-black" />
              REST API logs (Express Router)
            </h4>
            <span className="text-[9px] text-gray-500 font-mono font-black bg-yellow-250 border border-black px-1.5">NODE_ENV: DEVELOPMENT</span>
          </div>

          <div className="bg-[#111318] p-3 font-mono text-[11px] h-[115px] overflow-y-auto space-y-1 border-2 border-black select-text">
            {apiLogs.map((log, index) => {
              const statusColor = log.status >= 300 ? 'text-red-400' : log.status >= 201 ? 'text-emerald-400' : 'text-blue-400';
              const methodColor = log.method === 'POST' ? 'text-green-400' : log.method === 'PATCH' ? 'text-yellow-400' : 'text-cyan-400';
              return (
                <div key={index} className="flex flex-col md:flex-row md:items-center justify-between text-slate-400 border-b border-gray-800 pb-0.5 font-mono">
                  <div className="font-mono">
                    <span className="text-slate-600">[{log.timestamp}]</span>{' '}
                    <span className={`font-semibold ${methodColor}`}>{log.method}</span>{' '}
                    <span className="text-slate-300 font-medium">{log.endpoint}</span>
                  </div>
                  <div className="font-mono">
                    <span className={`font-bold ${statusColor}`}>{log.status}</span>
                    {log.payload && <span className="text-[9px] text-slate-500 ml-2 overflow-hidden truncate max-w-[150px] inline-block font-mono">{log.payload}</span>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
}
