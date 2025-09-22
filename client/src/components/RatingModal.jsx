import React, { useState } from 'react';
import { submitRating } from '../services/ratingService';

const RatingModal = ({ store, onClose, onSuccess }) => {
  const [ratingValue, setRatingValue] = useState(5);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await submitRating(store.id, { rating_value: ratingValue });
      onSuccess();
      onClose();
    } catch (error) {
      alert('Failed to submit rating.');
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-sm">
        <h2 className="text-xl font-bold mb-4">Rate {store.name}</h2>
        <form onSubmit={handleSubmit}>
          <div className="flex justify-center space-x-2 my-4">
            {[1, 2, 3, 4, 5].map(star => (
              <label key={star} className="cursor-pointer">
                <input type="radio" name="rating" value={star} className="sr-only" onChange={() => setRatingValue(star)} />
                <svg className={`w-8 h-8 ${ratingValue >= star ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.366 2.445a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.366-2.445a1 1 0 00-1.175 0l-3.366 2.445c-.784.57-1.838-.197-1.54-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.064 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.049 2.927z" />
                </svg>
              </label>
            ))}
          </div>
          <div className="flex justify-end space-x-4 mt-6">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300">Cancel</button>
            <button type="submit" disabled={loading} className="px-4 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400">
              {loading ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default RatingModal;