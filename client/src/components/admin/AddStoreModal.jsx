import React, { useState } from 'react';
import { createStore } from '../../services/adminService';

const AddStoreModal = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({ name: '', address: '', owner_id: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await createStore(formData);
      onSuccess();
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to create store. Ensure Owner ID is a valid UUID for a user with the owner role.');
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Create New Store</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="name" onChange={handleChange} placeholder="Store Name" className="w-full p-2 border rounded" required />
          <textarea name="address" onChange={handleChange} placeholder="Address" className="w-full p-2 border rounded" required />
          <input name="owner_id" onChange={handleChange} placeholder="Owner User ID (UUID)" className="w-full p-2 border rounded" required />
          {error && <p className="text-sm text-red-500">{error}</p>}
          <div className="flex justify-end space-x-4">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300">Cancel</button>
            <button type="submit" disabled={loading} className="px-4 py-2 rounded text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300">{loading ? 'Creating...' : 'Create Store'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default AddStoreModal;