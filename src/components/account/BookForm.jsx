 import React from 'react'
 import { Trash2 } from 'lucide-react'
import BookPublishPage from '../../pages/BookPublishPage';


 function BookForm({book,  onClose}) {

    
  return (
      <div className="fixed inset-0 bg-[#00000060] flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              {book ? 'Edit Book' : 'Add New Book'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Trash2 size={20} />
            </button>
          </div>          
           <BookPublishPage />
        </div>
      
      </div>
    );
 }
 
 export default BookForm

