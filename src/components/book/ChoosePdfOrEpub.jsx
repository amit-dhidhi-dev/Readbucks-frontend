// import React from 'react'
// import { X, FileText, FileType } from 'lucide-react'

// function ChoosePdfOrEpub({onClose, setFile}) {
//   return (
//     <>
//          <div className="fixed inset-0 bg-[#00000060]  flex items-center justify-center z-50 p-4">
//                 <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
//                     <div className="flex justify-between items-center p-6 border-b border-gray-200">
//                         <div>                            
//                             <p className="text-gray-600"></p>
//                         </div>
//                         <button
//                             onClick={onClose}
//                             className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
//                         >
//                             <X size={20} />
//                         </button>
//                     </div>

//                     <div className="p-6 space-y-6">
//                         {/* Shareable Link */}
//                         <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
//                             <h3 className="font-semibold text-blue-900 mb-2">Choose which file you want to read</h3>
//                             <div className="flex space-x-2">
                              
//                             </div>
//                         </div>

//                         {/* Quick Share Buttons */}
//                         <div>
                           
//                             <div className="flex grid-cols-2 md:grid-cols-4 gap-3">
//                                 <button
//                                     onClick={() => setFile('PDF')}
//                                     className="flex items-center justify-center space-x-2 p-3 bg-[#1DA1F2] text-white rounded-lg hover:bg-[#1a8cd8] transition-colors"
//                                 >
//                                     <FileText size={20} />
//                                     <span>PDF</span>
//                                 </button>
//                                 <button
//                                     onClick={() => setFile('EPUB')}
//                                     className="flex items-center justify-center space-x-2 p-3 bg-[#4267B2] text-white rounded-lg hover:bg-[#365899] transition-colors"
//                                 >
//                                     <FileType size={20} />
//                                     <span>EPUB</span>
//                                 </button>
                             
//                             </div>
//                         </div>

                      
                        




//                     </div>
//                 </div>
//             </div>
//     </>
//   )
// }

// export default ChoosePdfOrEpub


import React from 'react'
import { X, FileText, FileType, BookOpen, Sparkles, Download } from 'lucide-react'

function ChoosePdfOrEpub({ onClose, setFile }) {
  const handleFileSelect = (type) => {
    setFile(type);
    // Optional: Add a brief feedback animation before closing
    setTimeout(onClose, 300);
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-slideUp">
        {/* Header */}
        <div className="relative p-6 pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Choose Format</h2>
                <p className="text-gray-500 mt-1">Select your preferred reading format</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-all duration-200 hover:scale-105 active:scale-95"
              aria-label="Close"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
          
          {/* Decorative element */}
          <div className="absolute top-0 right-6">
            <Sparkles className="w-8 h-8 text-yellow-400 opacity-50" />
          </div>
        </div>

        {/* Content */}
        <div className="p-6 pt-2">
          {/* Info card */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 mb-6 border border-blue-100">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-white rounded-lg shadow-sm">
                <Download className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Choose Your Format</h3>
                <p className="text-sm text-gray-600">
                  Select PDF for precise layout preservation or EPUB for flexible, reflowable text.
                </p>
              </div>
            </div>
          </div>

          {/* Format selection */}
          <div className="space-y-3">
            <button
              onClick={() => handleFileSelect('pdf')}
              className="group w-full p-4 bg-white border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.99] flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-red-50 rounded-lg group-hover:bg-red-100 transition-colors">
                  <FileText className="w-6 h-6 text-red-600" />
                </div>
                <div className="text-left">
                  <h4 className="font-bold text-gray-900">PDF Format</h4>
                  <p className="text-sm text-gray-500">Fixed layout, print-friendly</p>
                </div>
              </div>
              <div className="text-right">
                <div className="px-3 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-600 group-hover:bg-red-100 group-hover:text-red-700 transition-colors">
                  Best for printing
                </div>
              </div>
            </button>

            <button
              onClick={() => handleFileSelect('epub')}
              className="group w-full p-4 bg-white border-2 border-gray-200 rounded-xl hover:border-purple-500 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.99] flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-50 rounded-lg group-hover:bg-purple-100 transition-colors">
                  <FileType className="w-6 h-6 text-purple-600" />
                </div>
                <div className="text-left">
                  <h4 className="font-bold text-gray-900">EPUB Format</h4>
                  <p className="text-sm text-gray-500">Flexible, reflowable text</p>
                </div>
              </div>
              <div className="text-right">
                <div className="px-3 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-600 group-hover:bg-purple-100 group-hover:text-purple-700 transition-colors">
                  Best for reading
                </div>
              </div>
            </button>
          </div>

          {/* Feature highlights */}
          <div className="mt-8 pt-6 border-t border-gray-100">
            <h4 className="font-semibold text-gray-900 mb-3">Key Features</h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-xs font-medium text-gray-700 mb-1">PDF</div>
                <div className="text-xs text-gray-500">Preserves original layout</div>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-xs font-medium text-gray-700 mb-1">EPUB</div>
                <div className="text-xs text-gray-500">Adjustable text size</div>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-xs font-medium text-gray-700 mb-1">PDF</div>
                <div className="text-xs text-gray-500">High-quality images</div>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-xs font-medium text-gray-700 mb-1">EPUB</div>
                <div className="text-xs text-gray-500">Dark mode support</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 pt-4 border-t border-gray-100 bg-gray-50">
          <p className="text-xs text-gray-500 text-center">
            You can change this selection later in settings
          </p>
        </div>
      </div>
    </div>
  )
}

export default ChoosePdfOrEpub

