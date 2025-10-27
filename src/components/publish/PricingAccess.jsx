// src/components/PricingAccess.jsx
import React from 'react';

const PricingAccess = ({ bookData, onChange }) => {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Pricing & Access</h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">
            Price (₹)
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={bookData.price}
            onChange={onChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="0.00"
            min="0"
            step="0.01"
          />
        </div>
        <div>
          <label htmlFor="accessType" className="block text-sm font-medium text-gray-700">
            Access Type
          </label>
          <select
            id="accessType"
            name="accessType"
            value={bookData.accessType}
            onChange={onChange}
            className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option>Free Preview Only</option>
            <option>Paid Members Only</option>
            <option>Free for All</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default PricingAccess;