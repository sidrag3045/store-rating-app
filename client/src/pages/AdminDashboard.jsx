import React, { useState, useEffect, useCallback } from 'react';
import { getAdminDashboardStats, getAllUsers, getAllStoresForAdmin } from '../services/adminService';
import AddUserModal from '../components/admin/AddUserModal';
import AddStoreModal from '../components/admin/AddStoreModal';

const AdminDashboard = () => {
  const [stats, setStats] = useState({ totalUsers: 0, totalStores: 0, totalRatings: 0 });
  const [users, setUsers] = useState([]);
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [userFilters, setUserFilters] = useState({ role: '' });
  const [storeFilters, setStoreFilters] = useState({ name: '' });

  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isStoreModalOpen, setIsStoreModalOpen] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const [statsData, usersData, storesData] = await Promise.all([
        getAdminDashboardStats(),
        getAllUsers(userFilters),
        getAllStoresForAdmin(storeFilters),
      ]);
      setStats(statsData);
      setUsers(usersData);
      setStores(storesData);
    } catch (err) {
      setError(err.message || 'Failed to fetch admin data.');
    } finally {
      setLoading(false);
    }
  }, [userFilters, storeFilters]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) return <div className="p-8 text-center">Loading Admin Dashboard...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

  return (
    <>
      <div className="container mx-auto p-4 md:p-8 space-y-8">
        <h1 className="text-3xl font-bold text-gray-800">Administrator Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard title="Total Users" value={stats.totalUsers} />
          <StatCard title="Total Stores" value={stats.totalStores} />
          <StatCard title="Total Ratings" value={stats.totalRatings} />
        </div>

        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">User Management</h2>
            <button onClick={() => setIsUserModalOpen(true)} className="px-4 py-2 text-sm font-semibold text-white bg-green-500 rounded-md hover:bg-green-600">Add User</button>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            {/* Add filtering inputs here if desired */}
            <table className="w-full text-left">
              {/* Table content as before... */}
              <thead><tr className="border-b"><th className="p-4">Name</th><th className="p-4">Email</th><th className="p-4">Role</th></tr></thead>
              <tbody>{users.map(user => (<tr key={user.id} className="border-b hover:bg-gray-50"><td className="p-4">{user.name}</td><td className="p-4">{user.email}</td><td className="p-4 capitalize">{user.role}</td></tr>))}</tbody>
            </table>
          </div>
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Store Management</h2>
            <button onClick={() => setIsStoreModalOpen(true)} className="px-4 py-2 text-sm font-semibold text-white bg-green-500 rounded-md hover:bg-green-600">Add Store</button>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            {/* Add filtering inputs here if desired */}
            <table className="w-full text-left">
              {/* Table content as before... */}
              <thead><tr className="border-b"><th className="p-4">Store Name</th><th className="p-4">Address</th><th className="p-4">Owner Email</th><th className="p-4">Rating</th></tr></thead>
              <tbody>{stores.map(store => (<tr key={store.id} className="border-b hover:bg-gray-50"><td className="p-4">{store.name}</td><td className="p-4">{store.address}</td><td className="p-4">{store.owner.email}</td><td className="p-4">{store.overallRating}</td></tr>))}</tbody>
            </table>
          </div>
        </div>
      </div>

      {isUserModalOpen && <AddUserModal onClose={() => setIsUserModalOpen(false)} onSuccess={fetchData} />}
      {isStoreModalOpen && <AddStoreModal onClose={() => setIsStoreModalOpen(false)} onSuccess={fetchData} />}
    </>
  );
};

const StatCard = ({ title, value }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <h3 className="text-lg font-semibold text-gray-600">{title}</h3>
    <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
  </div>
);

export default AdminDashboard;