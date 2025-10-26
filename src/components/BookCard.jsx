import React from 'react'
import { Book, Star, Heart } from 'lucide-react'


function BookCard({ title, author, price, originalPrice, rating }) {
  return (
    <>
      
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-2">
      <div className="relative">
        <div className="h-64 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
          <Book className="w-20 h-20 text-gray-400" />
        </div>
        <span className="absolute top-2 right-2 bg-[#FF6A3D] text-white px-3 py-1 rounded-full text-sm font-bold">SALE</span>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg mb-1 text-[#2D3142] line-clamp-1">{title}</h3>
        <p className="text-gray-600 text-sm mb-2">{author}</p>
        <div className="flex items-center mb-2">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className={`w-4 h-4 ${i < rating ? 'text-[#F4B942] fill-current' : 'text-gray-300'}`} />
          ))}
          <span className="text-sm text-gray-600 ml-2">({rating}.0)</span>
        </div>
        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="text-2xl font-bold text-[#FF6A3D]">₹{price}</span>
            <span className="text-sm text-gray-500 line-through ml-2">₹{originalPrice}</span>
          </div>
        </div>
        <div className="flex space-x-2">
          <button className="flex-1 bg-[#FF6A3D] text-white py-2 rounded-lg hover:bg-[#1A2238] transition font-semibold">
            Add to Cart
          </button>
          <button className="p-2 border-2 border-[#FF6A3D] text-[#FF6A3D] rounded-lg hover:bg-[#FF6A3D] hover:text-white transition">
            <Heart className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>

    </>
  )
}

export default BookCard
