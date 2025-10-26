import React, {useState} from 'react'

function HeroSection() {
  
     const [currentSlide, setCurrentSlide] = useState(0);
        const slides = [
          {
            title: "Biggest Book Sale of the Year!",
            subtitle: "Up to 60% OFF on all categories",
            cta: "Shop Now",
            bg: "bg-gradient-to-r from-[#1A2238] to-[#3D5A80]"
          },
          {
            title: "Play Quiz & Win Amazing Prizes!",
            subtitle: "Earn points with every quiz and get discounts",
            cta: "Play Quiz",
            bg: "bg-gradient-to-r from-[#FF6A3D] to-[#F4B942]"
          },
          {
            title: "New Arrivals - Latest Books",
            subtitle: "Explore trending books this month",
            cta: "Explore",
            bg: "bg-gradient-to-r from-[#06D6A0] to-[#118AB2]"
          }
        ];
 
    return (
    <>
    
          <div className="relative h-96 overflow-hidden">
            <div className={`${slides[currentSlide].bg} h-full flex items-center justify-center text-white transition-all duration-500`}>
              <div className="text-center px-4">
                <h2 className="text-4xl md:text-6xl font-bold mb-4">{slides[currentSlide].title}</h2>
                <p className="text-xl md:text-2xl mb-8">{slides[currentSlide].subtitle}</p>
                <button className="bg-white text-[#1A2238] px-8 py-3 rounded-full font-bold hover:bg-[#F4B942] hover:text-white transition transform hover:scale-105">
                  {slides[currentSlide].cta}
                </button>
              </div>
            </div>
            
            {/* Slide Indicators */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition ${currentSlide === index ? 'bg-white' : 'bg-white/50'}`}
                />
              ))}
            </div>
          </div>
     
      
    </>
  )
}

export default HeroSection
