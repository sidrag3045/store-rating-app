import React, { useState, useEffect } from 'react';
import { getStores } from '../services/storeService';
import StoreCard from '../components/StoreCard';

const UserDashboard = () => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchStores();
  }, []); // The empty array means this runs once when the component mounts

  const fetchStores = async (search = {}) => {
    setLoading(true);
    setError('');
    try {
      const storeData = await getStores(search);
      console.log('API Response:', storeData);
      setStores(storeData.stores || []);
    } catch (err) {
      setError('Failed to fetch stores.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchStores({ name: searchTerm });
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Explore Stores</h1>
      
      <form onSubmit={handleSearch} className="mb-6 flex gap-2">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for a store by name..."
          className="flex-grow px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button type="submit" className="px-6 py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700">
          Search
        </button>
      </form>

      {loading && <p>Loading stores...</p>}
      {error && <p className="text-red-500">{error}</p>}
      
      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stores.map(store => (
            <StoreCard key={store.id} store={store} onRatingSuccess={() => fetchStores({ name: searchTerm })} />
          ))}
        </div>
      )}
    </div>
  );
};

export default UserDashboard;