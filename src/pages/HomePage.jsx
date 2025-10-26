import React from 'react'
import HeroSection from '../components/HeroSection'
import BookCard from '../components/BookCard'
import QuizCard from '../components/QuizCard'
import { Book } from 'lucide-react'

function HomePage() {
    const featuredBooks = [
       { title: "The Great Gatsby", author: "F. Scott Fitzgerald", price: 299, originalPrice: 499, rating: 5 },
       { title: "To Kill a Mockingbird", author: "Harper Lee", price: 349, originalPrice: 599, rating: 5 },
       { title: "1984", author: "George Orwell", price: 399, originalPrice: 699, rating: 4 },
       { title: "Pride and Prejudice", author: "Jane Austen", price: 279, originalPrice: 449, rating: 5 },
     ];

  return (
       
       <div className="bg-[#F8F9FA]">
         <HeroSection />
   
         {/* Featured Books Section */}
         <section className="container mx-auto px-4 py-12">
           <div className="text-center mb-8">
             <h2 className="text-4xl font-bold text-[#1A2238] mb-2">Featured Books</h2>
             <p className="text-gray-600">Bestsellers & Editor's Choice</p>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
             {featuredBooks.map((book, index) => (
               <BookCard key={index} {...book} />
             ))}
           </div>
           <div className="text-center mt-8">
             <button className="bg-[#FF6A3D] text-white px-8 py-3 rounded-full font-bold hover:bg-[#1A2238] transition">
               View All Books
             </button>
           </div>
         </section>
   
         {/* Quiz Section */}
         <section className="bg-white py-12">
           <div className="container mx-auto px-4">
             <div className="text-center mb-8">
               <h2 className="text-4xl font-bold text-[#1A2238] mb-2">Today's Quiz Contests</h2>
               <p className="text-gray-600">Play, Learn & Earn Rewards!</p>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               <QuizCard
                 title="Daily Literature Quiz"
                 difficulty="Medium"
                 questions={10}
                 time="5 min"
                 prize="100 Points"
                 participants={234}
               />
               <QuizCard
                 title="General Knowledge"
                 difficulty="Easy"
                 questions={15}
                 time="7 min"
                 prize="150 Points"
                 participants={189}
               />
               <QuizCard
                 title="Weekly Mega Contest"
                 difficulty="Hard"
                 questions={20}
                 time="10 min"
                 prize="500 Points + Book"
                 participants={1520}
               />
             </div>
           </div>
         </section>
   
         {/* Categories Section */}
         <section className="container mx-auto px-4 py-12">
           <div className="text-center mb-8">
             <h2 className="text-4xl font-bold text-[#1A2238] mb-2">Shop by Category</h2>
             <p className="text-gray-600">Find your favorite genre</p>
           </div>
           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
             {['Fiction', 'Non-Fiction', 'Academic', 'Comics', 'Self-Help', 'Children'].map((category) => (
               <div key={category} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition text-center cursor-pointer group">
                 <Book className="w-12 h-12 mx-auto mb-3 text-[#FF6A3D] group-hover:text-[#F4B942] transition" />
                 <h3 className="font-bold text-[#1A2238]">{category}</h3>
               </div>
             ))}
           </div>
         </section>
   
         {/* How It Works */}
         <section className="bg-gradient-to-r from-[#1A2238] to-[#3D5A80] text-white py-12">
           <div className="container mx-auto px-4">
             <div className="text-center mb-12">
               <h2 className="text-4xl font-bold mb-2">How It Works</h2>
               <p className="text-gray-300">Simple steps to start earning</p>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               <div className="text-center">
                 <div className="bg-[#FF6A3D] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">1</div>
                 <h3 className="text-xl font-bold mb-2">Browse & Buy Books</h3>
                 <p className="text-gray-300">Explore thousands of books across all genres</p>
               </div>
               <div className="text-center">
                 <div className="bg-[#F4B942] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">2</div>
                 <h3 className="text-xl font-bold mb-2">Play Quiz & Earn Points</h3>
                 <p className="text-gray-300">Test your knowledge and win exciting rewards</p>
               </div>
               <div className="text-center">
                 <div className="bg-[#06D6A0] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">3</div>
                 <h3 className="text-xl font-bold mb-2">Redeem for Discounts</h3>
                 <p className="text-gray-300">Use earned points to get amazing discounts</p>
               </div>
             </div>
           </div>
         </section>
   
         {/* Newsletter */}
         <section className="bg-white py-12">
           <div className="container mx-auto px-4">
             <div className="max-w-2xl mx-auto text-center">
               <h2 className="text-3xl font-bold text-[#1A2238] mb-4">Subscribe to Our Newsletter</h2>
               <p className="text-gray-600 mb-6">Get updates on new books, quiz contests & exclusive offers!</p>
               <div className="flex flex-col md:flex-row gap-3">
                 <input
                   type="email"
                   placeholder="Enter your email address"
                   className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#FF6A3D]"
                 />
                 <button className="bg-[#FF6A3D] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#1A2238] transition">
                   Subscribe
                 </button>
               </div>
             </div>
           </div>
         </section>
       </div>
     
  
  )
}

export default HomePage
