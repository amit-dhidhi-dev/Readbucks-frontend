// import React from 'react'
// import { Book, Star, Heart } from 'lucide-react'


// function BookCard({ title, author, price, originalPrice, rating }) {
//   return (
//     <>
      
//     <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-2">
//       <div className="relative">
//         <div className="h-64 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
//           <Book className="w-20 h-20 text-gray-400" />
//         </div>
//         <span className="absolute top-2 right-2 bg-[#FF6A3D] text-white px-3 py-1 rounded-full text-sm font-bold">SALE</span>
//       </div>
//       <div className="p-4">
//         <h3 className="font-bold text-lg mb-1 text-[#2D3142] line-clamp-1">{title}</h3>
//         <p className="text-gray-600 text-sm mb-2">{author}</p>
//         <div className="flex items-center mb-2">
//           {[...Array(5)].map((_, i) => (
//             <Star key={i} className={`w-4 h-4 ${i < rating ? 'text-[#F4B942] fill-current' : 'text-gray-300'}`} />
//           ))}
//           <span className="text-sm text-gray-600 ml-2">({rating}.0)</span>
//         </div>
//         <div className="flex items-center justify-between mb-3">
//           <div>
//             <span className="text-2xl font-bold text-[#FF6A3D]">₹{price}</span>
//             <span className="text-sm text-gray-500 line-through ml-2">₹{originalPrice}</span>
//           </div>
//         </div>
//         <div className="flex space-x-2">
//           <button className="flex-1 bg-[#FF6A3D] text-white py-2 rounded-lg hover:bg-[#1A2238] transition font-semibold">
//             Add to Cart
//           </button>
//           <button className="p-2 border-2 border-[#FF6A3D] text-[#FF6A3D] rounded-lg hover:bg-[#FF6A3D] hover:text-white transition">
//             <Heart className="w-5 h-5" />
//           </button>
//         </div>
//       </div>
//     </div>

//     </>
//   )
// }

// export default BookCard


import React, { useState } from 'react'
import { Book, Star, Heart, Clock, Users, Award, Zap, Shield, BookOpen } from 'lucide-react'

function BookCard({ title, author, price, originalPrice, rating, quizPrize = "₹10,000", readersCount = "1.2k", deliveryTime = "Instant" }) {
  const [isLiked, setIsLiked] = useState(false)
  const discount = Math.round(((originalPrice - price) / originalPrice) * 100)

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-3 border border-gray-100 group">
      {/* Header with Premium Badge */}
      <div className="relative">
        <div className="h-56 bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center group-hover:from-blue-100 group-hover:to-indigo-200 transition-all duration-300">
          <div className="relative">
            <Book className="w-16 h-16 text-indigo-500" />
            <BookOpen className="w-6 h-6 text-indigo-300 absolute -bottom-1 -right-1" />
          </div>
        </div>
        
        {/* Premium Access Badge */}
        <div className="absolute top-3 left-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center">
          <Shield className="w-3 h-3 mr-1" />
          PREMIUM
        </div>
        
        {/* Discount Badge */}
        <div className="absolute top-3 right-3 bg-gradient-to-r from-[#FF6A3D] to-[#FF8A65] text-white px-3 py-2 rounded-full text-sm font-bold shadow-lg">
          {discount}% OFF
        </div>

        {/* Quiz Prize Floating Badge */}
        <div className="absolute bottom-3 left-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 py-2 rounded-lg text-xs font-semibold shadow-lg flex items-center">
          <Award className="w-3 h-3 mr-1" />
          Quiz: {quizPrize}
        </div>
      </div>

      <div className="p-5">
        {/* Book Info */}
        <div className="mb-3">
          <h3 className="font-bold text-xl mb-2 text-gray-900 line-clamp-2 group-hover:text-indigo-600 transition-colors leading-tight">
            {title}
          </h3>
          <p className="text-gray-600 text-sm font-medium">{author}</p>
        </div>

        {/* Rating and Readers Count */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-lg">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-4 h-4 ${i < rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} />
              ))}
              <span className="text-sm font-semibold text-gray-700 ml-2">{rating}.0</span>
            </div>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Users className="w-4 h-4 mr-1" />
            {readersCount}
          </div>
        </div>

        {/* Features */}
        <div className="mb-4 space-y-2">
          <div className="flex items-center text-sm text-green-600 font-medium">
            <Zap className="w-4 h-4 mr-2" />
            Instant Digital Access
          </div>
          <div className="flex items-center text-sm text-blue-600 font-medium">
            <Award className="w-4 h-4 mr-2" />
            Win Prize Money
          </div>
        </div>

        {/* Pricing */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-2xl font-bold text-gray-900">₹{price}</span>
            <span className="text-sm text-gray-500 line-through ml-2">₹{originalPrice}</span>
            <div className="text-xs text-green-600 font-semibold mt-1">
              You save ₹{originalPrice - price}
            </div>
          </div>
          <div className="flex items-center text-sm text-gray-600 bg-gray-50 px-2 py-1 rounded-lg">
            <Clock className="w-3 h-3 mr-1" />
            {deliveryTime}
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex space-x-3">
          <button className="flex-1 bg-gradient-to-r from-[#FF6A3D] to-[#FF8A65] text-white py-3 rounded-xl hover:from-[#FF5A2D] hover:to-[#FF7A55] transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center group">
            <BookOpen className="w-4 h-4 mr-2" />
            Buy & Read Now
          </button>
          <button 
            onClick={() => setIsLiked(!isLiked)}
            className={`p-3 rounded-xl border-2 transition-all duration-300 ${
              isLiked 
                ? 'bg-red-50 border-red-200 text-red-500' 
                : 'border-gray-200 text-gray-400 hover:border-red-200 hover:text-red-400'
            }`}
          >
            <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Trust Badges */}
        <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center">
            <Shield className="w-3 h-3 mr-1" />
            Secure Payment
          </div>
          <div>30-Day Returns</div>
          <div>24/7 Support</div>
        </div>
      </div>

      {/* Hover Effect Glow */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none" />
    </div>
  )
}

export default BookCard