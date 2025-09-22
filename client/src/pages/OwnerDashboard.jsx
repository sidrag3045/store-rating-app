import React, { useState, useEffect } from 'react';
import { getOwnerDashboard } from '../services/ownerService';

const OwnerDashboard = () => {
  const [storesData, setStoresData] = useState([]); // Initialize with an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const data = await getOwnerDashboard();
        setStoresData(data); // The data is already an array of stores
      } catch (err) {
        setError(err.message || 'Failed to fetch dashboard data.');
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  if (loading) {
    return <div className="p-8 text-center">Loading dashboard...</div>;
  }

  if (error) {
    return <div className="p-8 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">My Stores Dashboard</h1>
      
      {/* Map over the array of stores */}
      <div className="space-y-12">
        {storesData.map(store => (
          <div key={store.id} className="bg-white p-6 rounded-lg shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-600">Store Name</h2>
                <p className="text-2xl font-bold text-gray-900">{store.name}</p>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-600">Average Rating</h2>
                <p className="text-2xl font-bold text-yellow-500">{parseFloat(store.averageRating || 0).toFixed(2)}</p>
              </div>
            </div>

            <h3 className="text-xl font-bold mb-4 text-gray-800">Ratings for this Store</h3>
            <table className="w-full text-left">
              <thead>
                <tr className="border-b">
                  <th className="p-4 font-semibold">User</th>
                  <th className="p-4 font-semibold">Rating</th>
                </tr>
              </thead>
              <tbody>
                {store.ratings && store.ratings.map((rating) => (
                  <tr key={rating.id} className="border-b hover:bg-gray-50">
                    <td className="p-4">{rating.User.name}</td>
                    <td className="p-4 font-bold text-blue-600">{rating.rating_value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OwnerDashboard;