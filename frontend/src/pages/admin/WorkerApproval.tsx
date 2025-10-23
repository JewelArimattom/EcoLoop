import React, { useState, useEffect } from 'react';
import { 
  UserCheck, X, Check, Loader, AlertCircle, Phone, Mail, 
  Calendar, MapPin, RefreshCw
} from 'lucide-react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

interface PendingWorker {
  _id: string;
  name: string;
  email: string;
  phone: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    pincode?: string;
  };
  createdAt: string;
}

const WorkerApproval: React.FC = () => {
  const [pendingWorkers, setPendingWorkers] = useState<PendingWorker[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [processingId, setProcessingId] = useState<string | null>(null);

  useEffect(() => {
    fetchPendingWorkers();
  }, []);

  const fetchPendingWorkers = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/admin/workers/pending`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPendingWorkers(response.data.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load pending workers');
    } finally {
      setIsLoading(false);
    }
  };

  const approveWorker = async (workerId: string) => {
    setProcessingId(workerId);
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `${API_URL}/admin/workers/${workerId}/approve`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      await fetchPendingWorkers();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to approve worker');
    } finally {
      setProcessingId(null);
    }
  };

  const rejectWorker = async (workerId: string) => {
    if (!confirm('Are you sure you want to reject this worker application? This will delete their account.')) {
      return;
    }

    setProcessingId(workerId);
    try {
      const token = localStorage.getItem('token');
      await axios.delete(
        `${API_URL}/admin/workers/${workerId}/reject`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      await fetchPendingWorkers();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to reject worker');
    } finally {
      setProcessingId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 text-purple-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading pending approvals...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={fetchPendingWorkers}
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Worker Approvals</h1>
            <p className="text-gray-600">Review and approve worker account applications</p>
          </div>
          <button
            onClick={fetchPendingWorkers}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
        </div>

        {/* Stats Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Pending Approvals</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{pendingWorkers.length}</p>
            </div>
            <UserCheck className="w-12 h-12 text-purple-600 opacity-20" />
          </div>
        </div>

        {/* Pending Workers List */}
        {pendingWorkers.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <UserCheck className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">All Caught Up!</h3>
            <p className="text-gray-600">No pending worker approvals at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pendingWorkers.map((worker) => (
              <div key={worker._id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow border border-gray-100">
                {/* Worker Info */}
                <div className="mb-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{worker.name}</h3>
                      <p className="text-sm text-gray-500 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        Applied: {new Date(worker.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                    <div className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-semibold">
                      Pending
                    </div>
                  </div>

                  {/* Contact Details */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Mail className="w-4 h-4 text-purple-600" />
                      <a href={`mailto:${worker.email}`} className="hover:text-purple-600">
                        {worker.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone className="w-4 h-4 text-purple-600" />
                      <a href={`tel:${worker.phone}`} className="hover:text-purple-600">
                        {worker.phone}
                      </a>
                    </div>
                    {worker.address && (worker.address.city || worker.address.state) && (
                      <div className="flex items-start gap-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                        <span>
                          {worker.address.street && `${worker.address.street}, `}
                          {worker.address.city && `${worker.address.city}, `}
                          {worker.address.state} {worker.address.pincode}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-100">
                  <button
                    onClick={() => approveWorker(worker._id)}
                    disabled={processingId === worker._id}
                    className="flex items-center justify-center gap-2 px-4 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {processingId === worker._id ? (
                      <Loader className="w-4 h-4 animate-spin" />
                    ) : (
                      <Check className="w-4 h-4" />
                    )}
                    Approve
                  </button>
                  <button
                    onClick={() => rejectWorker(worker._id)}
                    disabled={processingId === worker._id}
                    className="flex items-center justify-center gap-2 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {processingId === worker._id ? (
                      <Loader className="w-4 h-4 animate-spin" />
                    ) : (
                      <X className="w-4 h-4" />
                    )}
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkerApproval;
