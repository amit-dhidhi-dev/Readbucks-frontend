import { BookOpen, User, Globe, IndianRupee } from 'lucide-react';
const BookSuggestionItem = ({
  book,
  onClick,
  showCategories = true,
  showPriceBadge = true,
}) => {
  const handleClick = () => {
    onClick(book);
  };

  // BookPriceBadge sub-component
  const BookPriceBadge = ({ isFree, price, size = 'md' }) => {
    const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs';

    if (isFree) {
      return (
        <span className={`bg-gradient-to-r from-green-50 to-green-50 text-green-700 font-semibold rounded-full border border-green-200 ${sizeClasses}`}>
          Free
        </span>
      );
    }

    return (
      <span className={`flex items-center gap-1 text-green-700 font-semibold ${sizeClasses}`}>
        <IndianRupee size={size === 'sm' ? 12 : 14} className="text-green-600" />
        <span>{price?.toFixed(2)}</span>
      </span>
    );
  };



  // Default variant
  return (
    <div
      onClick={handleClick}
      className="group px-4 py-3 hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-50/50 cursor-pointer transition-all duration-200 border-b border-gray-100 last:border-b-0 active:scale-[0.99] active:bg-blue-100"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
      aria-label={`Select book: ${book.title} by ${book.author}`}
    >
      <div className="flex items-start gap-3">
        {/* Book Cover with Animation */}
        <div className="flex-shrink-0 relative">
          {book.cover_image_url ? (
            <>
              <img
                src={book.cover_image_url}
                alt={book.title}
                className="w-12 h-16 object-cover rounded-md shadow-sm group-hover:shadow-md transition-shadow duration-200"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 rounded-md transition-opacity duration-200" />
               
            </>

          ) : (
            <div className="w-12 h-16 bg-gradient-to-br from-gray-50 to-gray-100 rounded-md flex items-center justify-center shadow-sm group-hover:shadow transition-shadow duration-200">
              <BookOpen size={20} className="text-gray-400" />
            </div>
          )}
        </div>

        {/* Book Details */}
        <div className="flex-1 min-w-0">
          {/* Title and Price Row */}
          <div className="flex items-start justify-between gap-3 mb-1">
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-gray-900 truncate group-hover:text-blue-700 transition-colors duration-150">
                {book.title}
              </h4>
              {book.subtitle && (
                <p className="text-sm text-gray-600 truncate mt-0.5">
                  {book.subtitle}
                </p>
              )}
            </div>

            {showPriceBadge && (
              <BookPriceBadge isFree={book.is_free} price={book.price} />
            )}
          </div>

          {/* Author and Language Row */}
          <div className="flex items-center flex-wrap gap-x-3 gap-y-1 text-sm text-gray-600 mb-2">
            <div className="flex items-center gap-1 min-w-0">
              <User size={14} className="flex-shrink-0" />
              <span className="truncate" title={book.author}>
                {book.author}
              </span>
            </div>

            {book.language && (
              <div className="flex items-center gap-1 flex-shrink-0">
                <Globe size={14} />
                <span>{book.language}</span>
              </div>
            )}
          </div>

          {/* Categories */}
          {showCategories && book.categories && book.categories.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {book.categories.slice(0, 2).map((category, index) => (
                <span
                  key={`${category}-${index}`}
                  className="px-2 py-1 text-xs bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 rounded-full border border-gray-200 group-hover:border-gray-300 transition-colors duration-150"
                >
                  {category}
                </span>
              ))}
              {book.categories.length > 2 && (
                <span className="text-xs text-gray-500 px-1">
                  +{book.categories.length - 2}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookSuggestionItem;