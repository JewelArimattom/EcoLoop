import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, Package, Weight, Search, Filter, 
  UserCheck, Clock, CheckCircle, XCircle, Loader, 
  MapPin, Phone, Mail, Calendar, AlertCircle, RefreshCw,
  Bell
} from 'lucide-react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

interface Pickup {
  _id: string;
  trackingNumber: string;
  category: string;
  items: string[];
  status: string;
  user: {
    _id: string;
    name: string;
    email: string;
    phone: string;
  };
  assignedWorker?: {
    _id: string;
    name: string;
    email: string;
    phone: string;
  };
  address: {
    street: string;
    city: string;
    state: string;
    pincode: string;
  };
  contactInfo: {
    name: string;
    phone: string;
    email?: string;
  };
  pickupType: string;
  scheduledDate?: string;
  scheduledTime?: string;
  actualWeight?: number;
  price?: number;
  priceAddedBy?: {
    _id: string;
    name: string;
  };
  createdAt: string;
}

interface Worker {
  _id: string;
  name: string;
  email: string;
  phone: string;
  assignedPickups: number;
  completedPickups: number;
  totalWeightCollected: number;
}

interface Stats {
  pickups: {
    total: number;
    pending: number;
    confirmed: number;
    inProgress: number;
    completed: number;
    cancelled: number;
  };
  users: {
    total: number;
    workers: number;
  };
  totalWeight: number;
}

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [pickups, setPickups] = useState<Pickup[]>([]);
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [assigningPickup, setAssigningPickup] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, [filterStatus]);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

      const [statsRes, pickupsRes, workersRes] = await Promise.all([
        axios.get(`${API_URL}/admin/stats`, config),
        axios.get(`${API_URL}/admin/pickups${filterStatus !== 'all' ? `?status=${filterStatus}` : ''}`, config),
        axios.get(`${API_URL}/admin/workers`, config)
      ]);

      setStats(statsRes.data.data);
      setPickups(pickupsRes.data.data);
      setWorkers(workersRes.data.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load admin data');
      console.error('Error fetching admin data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const assignWorker = async (pickupId: string, workerId: string) => {
    setAssigningPickup(pickupId);
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `${API_URL}/admin/pickups/${pickupId}/assign`,
        { workerId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      await fetchData();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to assign worker');
    } finally {
      setAssigningPickup(null);
    }
  };

  const updateStatus = async (pickupId: string, status: string) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `${API_URL}/admin/pickups/${pickupId}/status`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      await fetchData();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to update status');
    }
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      confirmed: 'bg-blue-100 text-blue-800 border-blue-300',
      'in-progress': 'bg-purple-100 text-purple-800 border-purple-300',
      completed: 'bg-green-100 text-green-800 border-green-300',
      cancelled: 'bg-red-100 text-red-800 border-red-300'
    };
    return colors[status] || 'bg-gray-100 text-gray-800 border-gray-300';
  };

  const getStatusIcon = (status: string) => {
    const icons: Record<string, React.ReactNode> = {
      pending: <Clock className="w-4 h-4" />,
      confirmed: <CheckCircle className="w-4 h-4" />,
      'in-progress': <Package className="w-4 h-4" />,
      completed: <CheckCircle className="w-4 h-4" />,
      cancelled: <XCircle className="w-4 h-4" />
    };
    return icons[status] || <Clock className="w-4 h-4" />;
  };

  const filteredPickups = pickups.filter(pickup => 
    pickup.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pickup.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pickup.contactInfo.phone.includes(searchTerm)
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 text-emerald-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Access Denied</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={fetchData}
            className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
            <p className="text-gray-600">Manage pickups, workers, and system operations</p>
          </div>
          <Link 
            to="/admin/approvals"
            className="px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 flex items-center gap-2 shadow-lg shadow-purple-500/30"
          >
            <Bell className="w-5 h-5" />
            <span className="font-semibold">Worker Approvals</span>
          </Link>
        </div>

        {/* Stats Grid */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-emerald-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-700 text-sm font-medium">Total Pickups</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stats.pickups.total}</p>
                </div>
                <Package className="w-12 h-12 text-emerald-600 opacity-20" />
              </div>
              <div className="mt-4 flex gap-2 text-xs">
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded">
                  {stats.pickups.pending} Pending
                </span>
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded">
                  {stats.pickups.completed} Done
                </span>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-700 text-sm font-medium">Active Users</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stats.users.total}</p>
                </div>
                <Users className="w-12 h-12 text-blue-600 opacity-20" />
              </div>
              <p className="text-sm text-gray-600 mt-4">Registered customers</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-700 text-sm font-medium">Active Workers</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stats.users.workers}</p>
                </div>
                <UserCheck className="w-12 h-12 text-purple-600 opacity-20" />
              </div>
              <p className="text-sm text-gray-600 mt-4">Available for assignment</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-teal-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-700 text-sm font-medium">Total Weight</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalWeight.toFixed(1)}</p>
                </div>
                <Weight className="w-12 h-12 text-teal-600 opacity-20" />
              </div>
              <p className="text-sm text-gray-600 mt-4">Kilograms recycled</p>
            </div>
          </div>
        )}

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by tracking number, customer name, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-600" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            {/* Refresh Button */}
            <button
              onClick={fetchData}
              className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
          </div>
        </div>

        {/* Pickups List */}
        <div className="space-y-4">
          {filteredPickups.length === 0 ? (
            <div className="bg-white rounded-xl shadow-lg p-12 text-center">
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No pickups found</h3>
              <p className="text-gray-600">
                {searchTerm ? 'Try adjusting your search criteria' : 'No pickups match the selected filter'}
              </p>
            </div>
          ) : (
            filteredPickups.map((pickup) => (
              <div key={pickup._id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Left: Pickup Info */}
                  <div className="lg:col-span-2 space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-bold text-gray-900">
                            {pickup.trackingNumber}
                          </h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold border flex items-center gap-1 ${getStatusColor(pickup.status)}`}>
                            {getStatusIcon(pickup.status)}
                            {pickup.status.toUpperCase()}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700">
                          {new Date(pickup.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Customer Info */}
                      <div>
                        <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          Customer Details
                        </h4>
                        <div className="space-y-1 text-sm">
                          <p className="text-gray-900 font-medium">{pickup.user.name}</p>
                          <p className="text-gray-600 flex items-center gap-2">
                            <Phone className="w-3 h-3" />
                            {pickup.contactInfo.phone}
                          </p>
                          {pickup.contactInfo.email && (
                            <p className="text-gray-600 flex items-center gap-2">
                              <Mail className="w-3 h-3" />
                              {pickup.contactInfo.email}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Address */}
                      <div>
                        <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          Pickup Address
                        </h4>
                        <p className="text-sm text-gray-600">
                          {pickup.address.street}<br />
                          {pickup.address.city}, {pickup.address.state} {pickup.address.pincode}
                        </p>
                      </div>
                    </div>

                    {/* Items */}
                    <div>
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">Category: {pickup.category}</h4>
                      <div className="flex flex-wrap gap-2">
                        {pickup.items.map((item, index) => (
                          <span key={index} className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Schedule */}
                    {pickup.pickupType === 'scheduled' && pickup.scheduledDate && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4" />
                        Scheduled: {new Date(pickup.scheduledDate).toLocaleDateString()} at {pickup.scheduledTime}
                      </div>
                    )}
                  </div>

                  {/* Right: Actions */}
                  <div className="lg:border-l lg:pl-6 space-y-4">
                    {/* Assigned Worker */}
                    <div>
                      <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                        <UserCheck className="w-4 h-4" />
                        Assigned Worker
                      </h4>
                      {pickup.assignedWorker ? (
                        <div className="p-3 bg-blue-50 rounded-lg">
                          <p className="font-medium text-blue-900">{pickup.assignedWorker.name}</p>
                          <p className="text-sm text-blue-700">{pickup.assignedWorker.phone}</p>
                        </div>
                      ) : (
                        <p className="text-sm text-gray-700 italic">Not assigned yet</p>
                      )}
                    </div>

                    {/* Assign Worker Dropdown */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        {pickup.assignedWorker ? 'Reassign Worker' : 'Assign Worker'}
                      </label>
                      <select
                        onChange={(e) => assignWorker(pickup._id, e.target.value)}
                        disabled={assigningPickup === pickup._id}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 disabled:opacity-50"
                        defaultValue=""
                      >
                        <option value="" disabled>Select worker...</option>
                        {workers.map((worker) => (
                          <option key={worker._id} value={worker._id}>
                            {worker.name} ({worker.assignedPickups} active)
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Update Status */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Update Status</label>
                      <select
                        value={pickup.status}
                        onChange={(e) => updateStatus(pickup._id, e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>

                    {/* Weight Info */}
                    {pickup.actualWeight && pickup.actualWeight > 0 && (
                      <div className="p-3 bg-teal-50 rounded-lg">
                        <div className="flex items-center gap-2 text-teal-900">
                          <Weight className="w-4 h-4" />
                          <span className="font-semibold">{pickup.actualWeight} kg</span>
                        </div>
                        <p className="text-xs text-teal-700 mt-1">Collected weight</p>
                      </div>
                    )}

                    {/* Price Info */}
                    {pickup.price && pickup.price > 0 && (
                      <div className="p-3 bg-green-50 rounded-lg">
                        <div className="flex items-center gap-2 text-green-900">
                          <span className="text-lg font-bold">₹{pickup.price}</span>
                        </div>
                        <p className="text-xs text-green-700 mt-1">
                          Deal price{pickup.priceAddedBy && ` (by ${pickup.priceAddedBy.name})`}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Workers Overview */}
        {workers.length > 0 && (
          <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <UserCheck className="w-6 h-6 text-emerald-600" />
              Active Workers
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {workers.map((worker) => (
                <div key={worker._id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900">{worker.name}</h3>
                      <p className="text-sm text-gray-600">{worker.phone}</p>
                    </div>
                    <UserCheck className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Active Pickups:</span>
                      <span className="font-semibold text-blue-600">{worker.assignedPickups}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Completed:</span>
                      <span className="font-semibold text-green-600">{worker.completedPickups}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Weight:</span>
                      <span className="font-semibold text-teal-600">{worker.totalWeightCollected.toFixed(1)} kg</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
