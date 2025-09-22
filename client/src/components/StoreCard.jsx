import React, { useState } from 'react';
import RatingModal from './RatingModal';

const StoreCard = ({ store, onRatingSuccess }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-bold text-gray-800">{store.name}</h3>
          <p className="text-gray-600 mt-2">{store.address}</p>
          <div className="mt-4 flex justify-between items-center">
            <div className="text-sm">
              <span className="font-semibold">Overall Rating: </span>
              <span className="text-yellow-500 font-bold">{store.overallRating || 'N/A'}</span>
            </div>
            <div className="text-sm">
              <span className="font-semibold">Your Rating: </span>
              <span className="text-blue-600 font-bold">{store.userSubmittedRating || 'Not Rated'}</span>
            </div>
          </div>
        </div>
        <div className="mt-4 border-t pt-4">
          <button onClick={() => setIsModalOpen(true)} className="w-full px-4 py-2 font-semibold text-white bg-green-500 rounded-md hover:bg-green-600">
            Rate this Store
          </button>
        </div>
      </div>
      {isModalOpen && <RatingModal store={store} onClose={() => setIsModalOpen(false)} onSuccess={onRatingSuccess} />}
    </>
  );
};
export default StoreCard;