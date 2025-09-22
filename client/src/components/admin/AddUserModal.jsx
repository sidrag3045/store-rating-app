import React, { useState } from 'react';
import { createUser } from '../../services/adminService';

const AddUserModal = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'user', address: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await createUser(formData);
      onSuccess();
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to create user.');
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Create New User</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="name" onChange={handleChange} placeholder="Full Name" className="w-full p-2 border rounded" required />
          <input name="email" type="email" onChange={handleChange} placeholder="Email" className="w-full p-2 border rounded" required />
          <input name="password" type="password" onChange={handleChange} placeholder="Password" className="w-full p-2 border rounded" required />
          <textarea name="address" onChange={handleChange} placeholder="Address" className="w-full p-2 border rounded" />
          <select name="role" onChange={handleChange} value={formData.role} className="w-full p-2 border rounded">
            <option value="user">Normal User</option>
            <option value="owner">Store Owner</option>
            <option value="admin">Admin</option>
          </select>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <div className="flex justify-end space-x-4">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300">Cancel</button>
            <button type="submit" disabled={loading} className="px-4 py-2 rounded text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300">{loading ? 'Creating...' : 'Create User'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default AddUserModal;