import React, { useState, useEffect } from 'react';
import { 
  Package, Weight, CheckCircle, Clock, Loader, 
  MapPin, Phone, Mail, Calendar, AlertCircle, RefreshCw,
  TrendingUp, Edit2, Save, X, Sparkles, IndianRupee
} from 'lucide-react';
import { workerAPI } from '../services/api';
import { toast } from 'react-toastify';

interface Pickup {
  _id: string;
  trackingNumber: string;
  category: string;
  items: string[];
  status: string;
  user: {
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

interface Stats {
  assignedPickups: number;
  pendingPickups: number;
  completedPickups: number;
  totalWeight: number;
}

const WorkerDashboard: React.FC = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [pickups, setPickups] = useState<Pickup[]>([]);
  const [availablePickups, setAvailablePickups] = useState<Pickup[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [editingWeight, setEditingWeight] = useState<string | null>(null);
  const [editingPrice, setEditingPrice] = useState<string | null>(null);
  const [weightValues, setWeightValues] = useState<Record<string, number>>({});
  const [priceValues, setPriceValues] = useState<Record<string, number>>({});
  const [activeTab, setActiveTab] = useState<'assigned' | 'available'>('available');
  const [claimingOrder, setClaimingOrder] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, [filterStatus, activeTab]);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      if (activeTab === 'assigned') {
        const [statsRes, pickupsRes] = await Promise.all([
          workerAPI.getStats(),
          workerAPI.getPickups(filterStatus !== 'all' ? filterStatus : undefined)
        ]);

        setStats(statsRes.data);
        setPickups(pickupsRes.data);
        
        // Initialize weight and price values
        const weights: Record<string, number> = {};
        const prices: Record<string, number> = {};
        pickupsRes.data.forEach((pickup: Pickup) => {
          weights[pickup._id] = pickup.actualWeight || 0;
          prices[pickup._id] = pickup.price || 0;
        });
        setWeightValues(weights);
        setPriceValues(prices);
      } else {
        const [statsRes, availableRes] = await Promise.all([
          workerAPI.getStats(),
          workerAPI.getAvailablePickups()
        ]);

        setStats(statsRes.data);
        setAvailablePickups(availableRes.data);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load worker data');
      console.error('Error fetching worker data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const updateStatus = async (pickupId: string, newStatus: string) => {
    try {
      await workerAPI.updateStatus(pickupId, newStatus);
      toast.success(`Status updated to ${newStatus}`);
      await fetchData();
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || 'Failed to update status';
      toast.error(errorMsg);
    }
  };

  const updateWeight = async (pickupId: string) => {
    try {
      const weight = weightValues[pickupId] || 0;
      const price = priceValues[pickupId] || 0;
      
      // Update both weight and price together
      await Promise.all([
        workerAPI.updateWeight(pickupId, weight),
        price > 0 ? workerAPI.updatePrice(pickupId, price) : Promise.resolve()
      ]);
      
      setEditingWeight(null);
      setEditingPrice(null);
      toast.success('Weight and price updated successfully');
      await fetchData();
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || 'Failed to update weight';
      toast.error(errorMsg);
    }
  };

  const updatePrice = async (pickupId: string) => {
    try {
      const weight = weightValues[pickupId] || 0;
      const price = priceValues[pickupId] || 0;
      
      // Update both weight and price together
      await Promise.all([
        weight > 0 ? workerAPI.updateWeight(pickupId, weight) : Promise.resolve(),
        workerAPI.updatePrice(pickupId, price)
      ]);
      
      setEditingWeight(null);
      setEditingPrice(null);
      toast.success('Weight and price updated successfully');
      await fetchData();
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || 'Failed to update price';
      toast.error(errorMsg);
    }
  };

  const claimOrder = async (pickupId: string) => {
    setClaimingOrder(pickupId);
    try {
      await workerAPI.pickOrder(pickupId);
      toast.success('Order successfully claimed!');
      await fetchData();
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || 'Failed to claim order';
      toast.error(errorMsg);
    } finally {
      setClaimingOrder(null);
    }
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      confirmed: 'bg-amber-100 text-amber-800 border-amber-300',
      'in-progress': 'bg-orange-100 text-orange-800 border-orange-300',
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
      completed: <CheckCircle className="w-4 h-4" />
    };
    return icons[status] || <Clock className="w-4 h-4" />;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 text-orange-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading worker dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Access Denied</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={fetchData}
            className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Worker Dashboard</h1>
          <p className="text-gray-600">Manage your assigned pickups and update collection status</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab('assigned')}
            className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all ${
              activeTab === 'assigned'
                ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-orange-50 shadow'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <Package className="w-5 h-5" />
              My Assigned Orders
            </div>
          </button>
          <button
            onClick={() => setActiveTab('available')}
            className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all ${
              activeTab === 'available'
                ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-orange-50 shadow'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <Sparkles className="w-5 h-5" />
              Available Orders
            </div>
          </button>
        </div>

        {/* Stats Grid */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-700 text-sm font-medium">Assigned Pickups</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stats.assignedPickups}</p>
                </div>
                <Package className="w-12 h-12 text-orange-600 opacity-20" />
              </div>
              <p className="text-sm text-gray-600 mt-4">Total assigned to you</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-amber-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-700 text-sm font-medium">Pending</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stats.pendingPickups}</p>
                </div>
                <Clock className="w-12 h-12 text-amber-600 opacity-20" />
              </div>
              <p className="text-sm text-gray-600 mt-4">Active collections</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-700 text-sm font-medium">Completed</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stats.completedPickups}</p>
                </div>
                <CheckCircle className="w-12 h-12 text-green-600 opacity-20" />
              </div>
              <p className="text-sm text-gray-600 mt-4">Successfully collected</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-yellow-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-700 text-sm font-medium">Total Weight</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalWeight.toFixed(1)}</p>
                </div>
                <Weight className="w-12 h-12 text-yellow-600 opacity-20" />
              </div>
              <p className="text-sm text-gray-600 mt-4">Kilograms collected</p>
            </div>
          </div>
        )}

        {/* Available Orders Tab */}
        {activeTab === 'available' && (
          <>
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Available Orders</h2>
                <button
                  onClick={fetchData}
                  className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 flex items-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  Refresh
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {availablePickups.length === 0 ? (
                <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                  <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No Available Orders</h3>
                  <p className="text-gray-600">All orders are currently assigned. Check back later!</p>
                </div>
              ) : (
                availablePickups.map((pickup) => (
                  <div key={pickup._id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow border-l-4 border-orange-500">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      {/* Left: Pickup Info */}
                      <div className="lg:col-span-2 space-y-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-lg font-bold text-gray-900">
                                {pickup.trackingNumber}
                              </h3>
                              <span className="px-3 py-1 rounded-full text-xs font-semibold border bg-yellow-100 text-yellow-800 border-yellow-300 flex items-center gap-1">
                                <Sparkles className="w-3 h-3" />
                                AVAILABLE
                              </span>
                            </div>
                            <p className="text-sm text-gray-700">
                              Posted: {new Date(pickup.createdAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </p>
                          </div>
                        </div>

                        {/* Pickup Address */}
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

                        {/* Items */}
                        <div>
                          <h4 className="text-sm font-semibold text-gray-700 mb-2">Category: {pickup.category}</h4>
                          <div className="flex flex-wrap gap-2">
                            {pickup.items.map((item, index) => (
                              <span key={index} className="px-3 py-1 bg-orange-50 text-orange-700 rounded-full text-xs">
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Schedule Info */}
                        {pickup.pickupType === 'scheduled' && pickup.scheduledDate && (
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="w-4 h-4 text-orange-600" />
                            <span className="font-medium text-gray-900">
                              Scheduled: {new Date(pickup.scheduledDate).toLocaleDateString()} at {pickup.scheduledTime}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Right: Claim Action */}
                      <div className="lg:border-l lg:pl-6 flex flex-col justify-center">
                        <button
                          onClick={() => claimOrder(pickup._id)}
                          disabled={claimingOrder === pickup._id}
                          className="w-full px-6 py-4 bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-xl hover:from-orange-700 hover:to-amber-700 flex items-center justify-center gap-2 font-semibold text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {claimingOrder === pickup._id ? (
                            <>
                              <Loader className="w-5 h-5 animate-spin" />
                              Claiming...
                            </>
                          ) : (
                            <>
                              <CheckCircle className="w-5 h-5" />
                              Pick This Order
                            </>
                          )}
                        </button>
                        <p className="text-xs text-center text-gray-700 mt-3">
                          This order will be assigned to you instantly
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </>
        )}

        {/* Assigned Orders Tab */}
        {activeTab === 'assigned' && (
          <>
        {/* Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <button
                onClick={() => setFilterStatus('all')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filterStatus === 'all'
                    ? 'bg-orange-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-orange-50'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilterStatus('confirmed')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filterStatus === 'confirmed'
                    ? 'bg-orange-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-orange-50'
                }`}
              >
                Confirmed
              </button>
              <button
                onClick={() => setFilterStatus('in-progress')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filterStatus === 'in-progress'
                    ? 'bg-orange-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-orange-50'
                }`}
              >
                In Progress
              </button>
              <button
                onClick={() => setFilterStatus('completed')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filterStatus === 'completed'
                    ? 'bg-orange-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-orange-50'
                }`}
              >
                Completed
              </button>
            </div>

            <button
              onClick={fetchData}
              className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
          </div>
        </div>

        {/* Pickups List */}
        <div className="space-y-4">
          {pickups.length === 0 ? (
            <div className="bg-white rounded-xl shadow-lg p-12 text-center">
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No pickups assigned</h3>
              <p className="text-gray-600">
                {filterStatus === 'all' 
                  ? 'You currently have no assigned pickups'
                  : `No ${filterStatus} pickups found`}
              </p>
            </div>
          ) : (
            pickups.map((pickup) => (
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
                          Assigned: {new Date(pickup.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                    </div>

                    {/* Customer Contact */}
                    <div>
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">Customer Contact</h4>
                      <div className="space-y-1 text-sm">
                        <p className="text-gray-900 font-medium">{pickup.user.name}</p>
                        <p className="text-gray-600 flex items-center gap-2">
                          <Phone className="w-3 h-3" />
                          <a href={`tel:${pickup.contactInfo.phone}`} className="text-blue-600 hover:underline">
                            {pickup.contactInfo.phone}
                          </a>
                        </p>
                        {pickup.contactInfo.email && (
                          <p className="text-gray-600 flex items-center gap-2">
                            <Mail className="w-3 h-3" />
                            <a href={`mailto:${pickup.contactInfo.email}`} className="text-blue-600 hover:underline">
                              {pickup.contactInfo.email}
                            </a>
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Pickup Address */}
                    <div>
                      <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        Pickup Address
                      </h4>
                      <p className="text-sm text-gray-600">
                        {pickup.address.street}<br />
                        {pickup.address.city}, {pickup.address.state} {pickup.address.pincode}
                      </p>
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                          `${pickup.address.street}, ${pickup.address.city}, ${pickup.address.state} ${pickup.address.pincode}`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline text-sm mt-1 inline-block"
                      >
                        Open in Google Maps →
                      </a>
                    </div>

                    {/* Items */}
                    <div>
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">Category: {pickup.category}</h4>
                      <div className="flex flex-wrap gap-2">
                        {pickup.items.map((item, index) => (
                          <span key={index} className="px-3 py-1 bg-orange-50 text-orange-700 rounded-full text-xs">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Schedule Info */}
                    {pickup.pickupType === 'scheduled' && pickup.scheduledDate && (
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-4 h-4 text-orange-600" />
                        <span className="font-medium text-gray-900">
                          Scheduled: {new Date(pickup.scheduledDate).toLocaleDateString()} at {pickup.scheduledTime}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Right: Actions */}
                  <div className="lg:border-l lg:pl-6 space-y-4">
                    {/* Status Update */}
                    <div>
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">Update Status</h4>
                      <div className="space-y-2">
                        {pickup.status === 'confirmed' && (
                          <button
                            onClick={() => updateStatus(pickup._id, 'in-progress')}
                            className="w-full px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 flex items-center justify-center gap-2"
                          >
                            <TrendingUp className="w-4 h-4" />
                            Start Collection
                          </button>
                        )}
                        {pickup.status === 'in-progress' && (
                          <>
                            <button
                              onClick={() => updateStatus(pickup._id, 'completed')}
                              disabled={!weightValues[pickup._id] || weightValues[pickup._id] <= 0 || !priceValues[pickup._id] || priceValues[pickup._id] <= 0}
                              className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <CheckCircle className="w-4 h-4" />
                              Mark Completed
                            </button>
                            {(!weightValues[pickup._id] || weightValues[pickup._id] <= 0 || !priceValues[pickup._id] || priceValues[pickup._id] <= 0) && (
                              <p className="text-xs text-red-600 text-center">
                                ⚠️ Add weight & price to complete
                              </p>
                            )}
                          </>
                        )}
                        {pickup.status === 'completed' && (
                          <div className="p-3 bg-green-50 rounded-lg text-center">
                            <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-1" />
                            <p className="text-sm font-medium text-green-900">Completed</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Weight Input */}
                    <div>
                      <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                        <Weight className="w-4 h-4" />
                        Actual Weight (kg)
                      </h4>
                      {editingWeight === pickup._id ? (
                        <div className="flex gap-2">
                          <input
                            type="number"
                            step="0.1"
                            min="0"
                            value={weightValues[pickup._id] === 0 ? '' : weightValues[pickup._id]}
                            onChange={(e) => setWeightValues({
                              ...weightValues,
                              [pickup._id]: parseFloat(e.target.value) || 0
                            })}
                            onFocus={(e) => {
                              if (weightValues[pickup._id] === 0) {
                                setWeightValues({ ...weightValues, [pickup._id]: 0 });
                                e.target.value = '';
                              }
                            }}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter weight"
                            autoFocus
                          />
                          <button
                            onClick={() => updateWeight(pickup._id)}
                            className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                            title="Save"
                          >
                            <Save className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              setEditingWeight(null);
                              setEditingPrice(null);
                            }}
                            className="px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                            title="Cancel"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between p-3 bg-teal-50 rounded-lg">
                          <span className="text-lg font-semibold text-teal-900">
                            {(weightValues[pickup._id] || 0).toFixed(1)} kg
                          </span>
                          <button
                            onClick={() => {
                              setEditingWeight(pickup._id);
                              setEditingPrice(pickup._id);
                            }}
                            className="p-2 text-teal-600 hover:bg-teal-100 rounded-lg"
                            title="Edit both weight and price"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Price Input */}
                    <div>
                      <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                        <IndianRupee className="w-4 h-4" />
                        Price (₹)
                      </h4>
                      {editingPrice === pickup._id ? (
                        <div className="flex gap-2">
                          <input
                            type="number"
                            step="1"
                            min="0"
                            value={priceValues[pickup._id] === 0 ? '' : priceValues[pickup._id]}
                            onChange={(e) => setPriceValues({
                              ...priceValues,
                              [pickup._id]: parseFloat(e.target.value) || 0
                            })}
                            onFocus={(e) => {
                              if (priceValues[pickup._id] === 0) {
                                setPriceValues({ ...priceValues, [pickup._id]: 0 });
                                e.target.value = '';
                              }
                            }}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                            placeholder="Enter price"
                          />
                          <button
                            onClick={() => updatePrice(pickup._id)}
                            className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                            title="Save"
                          >
                            <Save className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              setEditingWeight(null);
                              setEditingPrice(null);
                            }}
                            className="px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                            title="Cancel"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                          <span className="text-lg font-semibold text-green-900">
                            ₹{(priceValues[pickup._id] || 0).toFixed(0)}
                          </span>
                          <button
                            onClick={() => {
                              setEditingWeight(pickup._id);
                              setEditingPrice(pickup._id);
                            }}
                            className="p-2 text-green-600 hover:bg-green-100 rounded-lg"
                            title="Edit both weight and price"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Quick Info */}
                    <div className="p-3 bg-orange-50 rounded-lg space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Type:</span>
                        <span className="font-medium text-gray-900 capitalize">{pickup.pickupType}</span>
                      </div>
                      {pickup.scheduledDate && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Date:</span>
                          <span className="font-medium text-gray-900">
                            {new Date(pickup.scheduledDate).toLocaleDateString()}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
          </>
        )}
      </div>
    </div>
  );
};

export default WorkerDashboard;
