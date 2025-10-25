import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Package, Calendar, MapPin, Phone, CheckCircle, Clock, Truck, 
  XCircle, AlertCircle, TrendingUp, Recycle, Award, Loader
} from 'lucide-react';
import { pickupAPI, dashboardAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

interface Pickup {
  _id: string;
  category: string;
  items: string[];
  pickupType: string;
  contactInfo: {
    name: string;
    phone: string;
    email?: string;
  };
  address: {
    street: string;
    city: string;
    state: string;
    pincode: string;
  };
  status: string;
  trackingNumber: string;
  createdAt: string;
  scheduledDate?: string;
  scheduledTime?: string;
  price?: number;
  actualWeight?: number;
}

interface DashboardStats {
  totalPickups: number;
  pendingPickups: number;
  completedPickups: number;
  inProgressPickups: number;
  totalWeight: string;
  recentPickups: Pickup[];
}

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [pickups, setPickups] = useState<Pickup[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'completed'>('all');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setIsLoading(true);
    setError('');
    try {
      const [statsResponse, pickupsResponse] = await Promise.all([
        dashboardAPI.getStats(),
        pickupAPI.getAll()
      ]);
      
      setStats(statsResponse.stats);
      setPickups(pickupsResponse.pickups);
    } catch (err: any) {
      console.error('Dashboard fetch error:', err);
      setError(err.response?.data?.message || 'Failed to load dashboard data');
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'confirmed':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'in-progress':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'completed':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'cancelled':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-5 h-5" />;
      case 'confirmed':
        return <CheckCircle className="w-5 h-5" />;
      case 'in-progress':
        return <Truck className="w-5 h-5" />;
      case 'completed':
        return <CheckCircle className="w-5 h-5" />;
      case 'cancelled':
        return <XCircle className="w-5 h-5" />;
      default:
        return <AlertCircle className="w-5 h-5" />;
    }
  };

  const filteredPickups = pickups.filter(pickup => {
    if (activeTab === 'all') return true;
    if (activeTab === 'pending') return pickup.status === 'pending' || pickup.status === 'confirmed';
    if (activeTab === 'completed') return pickup.status === 'completed';
    return true;
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 text-emerald-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
            Welcome back, {user?.name}! 👋
          </h1>
          <p className="text-gray-600">Here's your recycling journey overview</p>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-red-700 font-medium">{error}</p>
              <button 
                onClick={fetchDashboardData}
                className="text-sm text-red-600 underline hover:text-red-700 mt-1"
              >
                Try again
              </button>
            </div>
          </div>
        )}

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Total Pickups */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-emerald-100 rounded-xl">
                  <Package className="w-6 h-6 text-emerald-600" />
                </div>
                <span className="text-2xl font-bold text-gray-900">{stats.totalPickups}</span>
              </div>
              <h3 className="text-sm font-medium text-gray-600">Total Pickups</h3>
            </div>

            {/* Pending Pickups */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-yellow-100 rounded-xl">
                  <Clock className="w-6 h-6 text-yellow-600" />
                </div>
                <span className="text-2xl font-bold text-gray-900">{stats.pendingPickups}</span>
              </div>
              <h3 className="text-sm font-medium text-gray-600">Pending Pickups</h3>
            </div>

            {/* Completed Pickups */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-green-100 rounded-xl">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <span className="text-2xl font-bold text-gray-900">{stats.completedPickups}</span>
              </div>
              <h3 className="text-sm font-medium text-gray-600">Completed</h3>
            </div>

            {/* Total Weight */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-teal-100 rounded-xl">
                  <TrendingUp className="w-6 h-6 text-teal-600" />
                </div>
                <span className="text-2xl font-bold text-gray-900">{stats.totalWeight} kg</span>
              </div>
              <h3 className="text-sm font-medium text-gray-600">E-Waste Recycled</h3>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Link
            to="/schedule-pickup"
            className="group bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-2xl p-6 shadow-lg transition-all transform hover:scale-105"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 rounded-xl">
                <Recycle className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Schedule New Pickup</h3>
                <p className="text-sm text-emerald-50">Book your free e-waste collection</p>
              </div>
            </div>
          </Link>

          <button
            onClick={fetchDashboardData}
            className="group bg-white hover:bg-gray-50 rounded-2xl p-6 shadow-lg border border-gray-100 transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-xl">
                <TrendingUp className="w-8 h-8 text-blue-600" />
              </div>
              <div className="text-left">
                <h3 className="font-bold text-lg text-gray-900">Refresh Data</h3>
                <p className="text-sm text-gray-600">Update your statistics</p>
              </div>
            </div>
          </button>

          <div className="group bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-xl">
                <Award className="w-8 h-8 text-purple-600" />
              </div>
              <div className="text-left">
                <h3 className="font-bold text-lg text-gray-900">Eco Points</h3>
                <p className="text-sm text-gray-600">Coming Soon!</p>
              </div>
            </div>
          </div>
        </div>

        {/* Pickups List */}
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Your Pickups</h2>
            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  activeTab === 'all'
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                All ({pickups.length})
              </button>
              <button
                onClick={() => setActiveTab('pending')}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  activeTab === 'pending'
                    ? 'bg-yellow-100 text-yellow-700'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Pending ({stats?.pendingPickups || 0})
              </button>
              <button
                onClick={() => setActiveTab('completed')}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  activeTab === 'completed'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Completed ({stats?.completedPickups || 0})
              </button>
            </div>
          </div>

          {filteredPickups.length === 0 ? (
            <div className="text-center py-12">
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">No pickups found</h3>
              <p className="text-gray-600 mb-6">
                {activeTab === 'all' 
                  ? "You haven't scheduled any pickups yet."
                  : `No ${activeTab} pickups at the moment.`}
              </p>
              {activeTab === 'all' && (
                <Link
                  to="/schedule-pickup"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-xl font-bold transition-all"
                >
                  <Recycle className="w-5 h-5" />
                  Schedule Your First Pickup
                </Link>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredPickups.map((pickup) => (
                <div
                  key={pickup._id}
                  className="border border-gray-200 rounded-xl p-6 hover:border-emerald-300 hover:shadow-md transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold text-gray-900">{pickup.category}</h3>
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(pickup.status)}`}>
                          {getStatusIcon(pickup.status)}
                          {pickup.status.charAt(0).toUpperCase() + pickup.status.slice(1)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 font-medium mb-1">
                        Tracking: <span className="text-emerald-600 font-mono">{pickup.trackingNumber}</span>
                      </p>
                      <p className="text-xs text-gray-500">
                        Booked on {new Date(pickup.createdAt).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-start gap-3">
                      <Package className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs text-gray-500 font-medium mb-1">Items</p>
                        <p className="text-sm text-gray-900">{pickup.items.join(', ')}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs text-gray-500 font-medium mb-1">Location</p>
                        <p className="text-sm text-gray-900">{pickup.address.city}, {pickup.address.state}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Calendar className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs text-gray-500 font-medium mb-1">Pickup Type</p>
                        <p className="text-sm text-gray-900 capitalize">
                          {pickup.pickupType === 'immediate' ? 'Within 24-48 hours' : 
                           `${new Date(pickup.scheduledDate!).toLocaleDateString()} - ${pickup.scheduledTime}`}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{pickup.contactInfo.phone}</span>
                    {pickup.contactInfo.email && (
                      <>
                        <span className="text-gray-300">•</span>
                        <span className="text-sm text-gray-600">{pickup.contactInfo.email}</span>
                      </>
                    )}
                    {pickup.price && pickup.price > 0 && (
                      <>
                        <span className="text-gray-300">•</span>
                        <div className="flex items-center gap-1 px-3 py-1 bg-green-50 rounded-full">
                          <span className="text-lg font-bold text-green-700">₹{pickup.price}</span>
                          <span className="text-sm text-green-600">deal</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
