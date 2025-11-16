
// enhance
import React from 'react'
import HeroSection from '../components/HeroSection'
import BookCard from '../components/BookCard'
import QuizCard from '../components/QuizCard'
import { Book, Trophy, Crown, Star, Zap, Users } from 'lucide-react'


function HomePage() {
    const featuredBooks = [
       { 
         title: "The Great Gatsby", 
         author: "F. Scott Fitzgerald", 
         price: 299, 
         originalPrice: 499, 
         rating: 5,
         quizPrize: "₹500",
         members: 1200
       },
       { 
         title: "To Kill a Mockingbird", 
         author: "Harper Lee", 
         price: 349, 
         originalPrice: 599, 
         rating: 5,
         quizPrize: "₹750",
         members: 890
       },
       { 
         title: "1984", 
         author: "George Orwell", 
         price: 399, 
         originalPrice: 699, 
         rating: 4,
         quizPrize: "₹1000",
         members: 1560
       },
       { 
         title: "Pride and Prejudice", 
         author: "Jane Austen", 
         price: 279, 
         originalPrice: 449, 
         rating: 5,
         quizPrize: "₹600",
         members: 950
       },
     ];

     const membershipPlans = [
       {
         name: "Basic Reader",
         price: "₹299/month",
         features: [
           "Access to 100+ books",
           "Basic quiz participation",
           "Earn up to ₹500 per quiz",
           "Ad-free reading"
         ]
       },
       {
         name: "Pro Member",
         price: "₹599/month",
         popular: true,
         features: [
           "Unlimited book access",
           "Premium quiz contests",
           "Earn up to ₹2000 per quiz",
           "Early access to new books",
           "Priority support"
         ]
       },
       {
         name: "Elite Reader",
         price: "₹999/month",
         features: [
           "All Pro features",
           "Exclusive masterclasses",
           "Higher prize pools",
           "Personalized recommendations",
           "Dedicated account manager"
         ]
       }
     ];

  return (
       <div className="bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
         <HeroSection />
   
         {/* Stats Bar */}
         <section className="bg-white border-b border-gray-200">
           <div className="container mx-auto px-4 py-6">
             <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
               <div>
                 <div className="flex items-center justify-center gap-2">
                   <Book className="w-5 h-5 text-[#FF6A3D]" />
                   <span className="text-2xl font-bold text-[#1A2238]">5000+</span>
                 </div>
                 <p className="text-sm text-gray-600">Books Available</p>
               </div>
               <div>
                 <div className="flex items-center justify-center gap-2">
                   <Trophy className="w-5 h-5 text-[#F4B942]" />
                   <span className="text-2xl font-bold text-[#1A2238]">₹2L+</span>
                 </div>
                 <p className="text-sm text-gray-600">Prize Money Distributed</p>
               </div>
               <div>
                 <div className="flex items-center justify-center gap-2">
                   <Users className="w-5 h-5 text-[#06D6A0]" />
                   <span className="text-2xl font-bold text-[#1A2238]">10K+</span>
                 </div>
                 <p className="text-sm text-gray-600">Active Readers</p>
               </div>
               <div>
                 <div className="flex items-center justify-center gap-2">
                   <Star className="w-5 h-5 text-[#3D5A80]" />
                   <span className="text-2xl font-bold text-[#1A2238]">4.8/5</span>
                 </div>
                 <p className="text-sm text-gray-600">Reader Rating</p>
               </div>
             </div>
           </div>
         </section>
   
         {/* Featured Books with Quiz Integration */}
         <section className="container mx-auto px-4 py-16">
           <div className="text-center mb-12">
             <div className="inline-flex items-center gap-2 bg-[#FF6A3D]/10 px-4 py-2 rounded-full mb-4">
               <Zap className="w-4 h-4 text-[#FF6A3D]" />
               <span className="text-sm font-bold text-[#FF6A3D]">READ & EARN</span>
             </div>
             <h2 className="text-5xl font-bold text-[#1A2238] mb-4">Featured Books with Quiz Rewards</h2>
             <p className="text-xl text-gray-600 max-w-2xl mx-auto">
               Buy books, participate in exclusive quizzes, and win real cash prizes!
             </p>
           </div>
           
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
             {featuredBooks.map((book, index) => (
               <div key={index} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6">
                 <div className="flex gap-6">
                   <div className="flex-1">
                     <BookCard {...book} />
                   </div>
                   {/* <div className="w-px bg-gray-200"></div>
                   <div className="flex-1">
                     <div className="bg-gradient-to-br from-[#F4B942] to-[#FF6A3D] p-4 rounded-xl text-white">
                       <div className="flex items-center gap-2 mb-2">
                         <Trophy className="w-5 h-5" />
                         <h3 className="font-bold text-lg">Quiz Prize Pool</h3>
                       </div>
                       <p className="text-2xl font-bold mb-2">{book.quizPrize}</p>
                       <div className="flex items-center gap-2 text-sm">
                         <Users className="w-4 h-4" />
                         <span>{book.members} participants</span>
                       </div>
                     </div>
                     <button className="w-full mt-4 bg-[#1A2238] text-white py-3 rounded-lg font-bold hover:bg-[#FF6A3D] transition">
                       Buy & Play Quiz
                     </button>
                   </div> */}
                 </div>
               </div>
             ))}
           </div>
         </section>
   
         {/* Membership Plans */}
         <section className="bg-gradient-to-br from-[#1A2238] to-[#3D5A80] py-16">
           <div className="container mx-auto px-4">
             <div className="text-center mb-12">
               <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full mb-4">
                 <Crown className="w-4 h-4 text-[#F4B942]" />
                 <span className="text-sm font-bold text-white">PREMIUM ACCESS</span>
               </div>
               <h2 className="text-5xl font-bold text-white mb-4">Become a Paid Member</h2>
               <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                 Unlimited reading access + Higher quiz prize money
               </p>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
               {membershipPlans.map((plan, index) => (
                 <div key={index} className={`bg-white rounded-2xl p-8 relative ${
                   plan.popular ? 'ring-2 ring-[#F4B942] transform scale-105' : ''
                 }`}>
                   {plan.popular && (
                     <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                       <span className="bg-[#F4B942] text-white px-4 py-1 rounded-full text-sm font-bold">
                         MOST POPULAR
                       </span>
                     </div>
                   )}
                   <h3 className="text-2xl font-bold text-[#1A2238] mb-2">{plan.name}</h3>
                   <div className="text-3xl font-bold text-[#FF6A3D] mb-6">{plan.price}</div>
                   <ul className="space-y-4 mb-8">
                     {plan.features.map((feature, idx) => (
                       <li key={idx} className="flex items-center gap-3">
                         <div className="w-2 h-2 bg-[#06D6A0] rounded-full"></div>
                         <span className="text-gray-700">{feature}</span>
                       </li>
                     ))}
                   </ul>
                   <button className={`w-full py-4 rounded-xl font-bold transition ${
                     plan.popular 
                       ? 'bg-[#FF6A3D] text-white hover:bg-[#1A2238]' 
                       : 'bg-[#1A2238] text-white hover:bg-[#FF6A3D]'
                   }`}>
                     Get Started
                   </button>
                 </div>
               ))}
             </div>
           </div>
         </section>
   
         {/* Quiz Section */}
         <section className="container mx-auto px-4 py-16">
           <div className="text-center mb-12">
             <div className="inline-flex items-center gap-2 bg-[#06D6A0]/10 px-4 py-2 rounded-full mb-4">
               <Trophy className="w-4 h-4 text-[#06D6A0]" />
               <span className="text-sm font-bold text-[#06D6A0]">WIN REAL MONEY</span>
             </div>
             <h2 className="text-5xl font-bold text-[#1A2238] mb-4">Live Quiz Contests</h2>
             <p className="text-xl text-gray-600">Test your knowledge and earn cash rewards</p>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             <QuizCard
               title="Daily Literature Quiz"
               difficulty="Medium"
               questions={10}
               time="5 min"
               prize="₹1000"
               participants={234}
               entryFee="Free"
               bookCover="The Great Gatsby"
             />
             <QuizCard
               title="Weekly Mega Contest"
               difficulty="Hard"
               questions={20}
               time="10 min"
               prize="₹5000 + Book"
               participants={1520}
               entryFee="₹99"
               bookCover="1984"
               featured={true}
             />
             <QuizCard
               title="General Knowledge"
               difficulty="Easy"
               questions={15}
               time="7 min"
               prize="₹500"
               participants={189}
               entryFee="Free"
               bookCover="To Kill a Mockingbird"
             />
           </div>
         </section>
   
         {/* CTA Section */}
         <section className="bg-gradient-to-r from-[#FF6A3D] to-[#F4B942] py-16">
           <div className="container mx-auto px-4 text-center">
             <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
               Start Your Reading & Earning Journey Today!
             </h2>
             <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
               Join thousands of readers who are already earning while enjoying their favorite books.
             </p>
             <div className="flex flex-col sm:flex-row gap-4 justify-center">
               <button className="bg-white text-[#FF6A3D] px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition">
                 Explore Books
               </button>
               <button className="bg-[#1A2238] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#3D5A80] transition">
                 View Quiz Contests
               </button>
             </div>
           </div>
         </section>
         
       </div>
  )
}

export default HomePage