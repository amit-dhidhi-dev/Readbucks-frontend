// // import React, { useState, useRef, useEffect } from 'react';
// // import * as EPUB from 'epubjs';

// // const EpubReader = ({ fileInputRef }) => {
// //   const [epubFile, setEpubFile] = useState(null);
// //   const [book, setBook] = useState(null);
// //   const [rendition, setRendition] = useState(null);
// //   const [currentSection, setCurrentSection] = useState(null);
// //   const [metadata, setMetadata] = useState(null);
// //   const [isLoading, setIsLoading] = useState(false);
// //   const viewerRef = useRef(null);

// //   useEffect(() => {
// //     return () => {
// //       if (book) {
// //         book.destroy();
// //       }
// //     };
// //   }, [book]);

// //   // Handle file selection
// //   useEffect(() => {
// //     const handleFileChange = (event) => {
// //       const file = event.target.files[0];
// //       if (file && file.type === 'application/epub+zip') {
// //         loadEpubFile(file);
// //       } else if (file) {
// //         alert('Please select a valid EPUB file');
// //       }
// //     };

// //     if (fileInputRef.current) {
// //       fileInputRef.current.addEventListener('change', handleFileChange);
// //     }

// //     return () => {
// //       if (fileInputRef.current) {
// //         fileInputRef.current.removeEventListener('change', handleFileChange);
// //       }
// //     };
// //   }, [fileInputRef]);

// //   const loadEpubFile = (file) => {
// //     setIsLoading(true);
// //     setEpubFile(file);

// //     const fileURL = URL.createObjectURL(file);
// //     const newBook = EPUB(fileURL);

// //     setBook(newBook);

// //     newBook.loaded.metadata.then(meta => {
// //       setMetadata(meta);
// //     });

// //     newBook.ready.then(() => {
// //       if (viewerRef.current) {
// //         // Clear previous content
// //         viewerRef.current.innerHTML = '';

// //         const newRendition = newBook.renderTo(viewerRef.current, {
// //           width: '100%',
// //           height: '600px',
// //           spread: 'auto'
// //         });

// //         setRendition(newRendition);

// //         newRendition.display();

// //         newRendition.on('rendered', (section) => {
// //           setCurrentSection(section);
// //         });
// //       }
// //       setIsLoading(false);
// //     }).catch(error => {
// //       console.error('Error loading EPUB:', error);
// //       setIsLoading(false);
// //       alert('Error loading EPUB file. Please try another file.');
// //     });
// //   };

// //   const handleNext = () => {
// //     if (rendition) {
// //       rendition.next();
// //     }
// //   };

// //   const handlePrev = () => {
// //     if (rendition) {
// //       rendition.prev();
// //     }
// //   };

// //   const clearEpub = () => {
// //     if (book) {
// //       book.destroy();
// //     }
// //     setEpubFile(null);
// //     setBook(null);
// //     setRendition(null);
// //     setCurrentSection(null);
// //     setMetadata(null);
// //     if (fileInputRef.current) {
// //       fileInputRef.current.value = '';
// //     }
// //   };

// //   const triggerFileInput = () => {
// //     fileInputRef.current?.click();
// //   };

// //   return (
// //     <div className="p-8">
// //       <h2 className="text-2xl font-bold text-gray-800 mb-6">EPUB Viewer</h2>

// //       {!epubFile ? (
// //         <div className="border-3 border-dashed border-gray-300 rounded-2xl p-12 text-center bg-gradient-to-br from-purple-50 to-pink-50 transition-all duration-300 hover:border-purple-400">
// //           <div className="max-w-md mx-auto">
// //             <div className="w-20 h-20 mx-auto mb-6 bg-purple-100 rounded-full flex items-center justify-center">
// //               <svg className="w-10 h-10 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
// //               </svg>
// //             </div>
// //             <h3 className="text-xl font-semibold text-gray-900 mb-3">Upload EPUB Book</h3>
// //             <p className="text-gray-600 mb-6">
// //               Select an EPUB file to start reading. We support standard EPUB 2.0 and 3.0 formats.
// //             </p>
// //             <button
// //               onClick={triggerFileInput}
// //               className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
// //             >
// //               Choose EPUB File
// //             </button>
// //             <p className="mt-4 text-sm text-gray-500">EPUB format only (.epub)</p>
// //           </div>
// //         </div>
// //       ) : (
// //         <div className="space-y-6">
// //           {/* File Info */}
// //           <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-xl p-6 shadow-sm">
// //             <div className="flex items-center justify-between">
// //               <div className="flex items-center space-x-4">
// //                 <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
// //                   <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
// //                   </svg>
// //                 </div>
// //                 <div>
// //                   <p className="font-bold text-purple-900 text-lg">
// //                     {metadata?.title || epubFile.name}
// //                   </p>
// //                   <p className="text-purple-700">
// //                     {(epubFile.size / (1024 * 1024)).toFixed(2)} MB • 
// //                     {metadata?.creator ? ` By ${metadata.creator}` : ' EPUB Book'}
// //                   </p>
// //                 </div>
// //               </div>
// //               <button
// //                 onClick={clearEpub}
// //                 className="text-gray-400 hover:text-red-500 transition duration-200 p-2 hover:bg-red-50 rounded-lg"
// //               >
// //                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
// //                 </svg>
// //               </button>
// //             </div>
// //           </div>

// //           {/* EPUB Viewer */}
// //           <div className="border-2 border-gray-200 rounded-xl bg-white shadow-lg overflow-hidden">
// //             <div className="bg-gray-800 text-white px-6 py-3 flex items-center justify-between">
// //               <span className="font-semibold">
// //                 {metadata?.title || 'EPUB Reader'}
// //               </span>
// //               <div className="flex items-center space-x-4">
// //                 <span className="text-sm text-gray-300">
// //                   {metadata?.creator || 'Unknown Author'}
// //                 </span>
// //               </div>
// //             </div>

// //             {isLoading ? (
// //               <div className="p-12 text-center bg-white min-h-[400px] flex items-center justify-center">
// //                 <div className="text-center">
// //                   <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-4"></div>
// //                   <p className="text-gray-600 font-semibold">Loading EPUB Book...</p>
// //                 </div>
// //               </div>
// //             ) : (
// //               <>
// //                 <div 
// //                   ref={viewerRef}
// //                   className="epub-viewer bg-white min-h-[600px] overflow-auto"
// //                 />

// //                 {/* Navigation Controls */}
// //                 <div className="bg-gray-50 border-t border-gray-200 px-6 py-4 flex justify-between items-center">
// //                   <button
// //                     onClick={handlePrev}
// //                     disabled={!rendition}
// //                     className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-3 px-6 border border-gray-300 rounded-lg shadow-sm transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
// //                   >
// //                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
// //                     </svg>
// //                     <span>Previous</span>
// //                   </button>

// //                   <div className="flex items-center space-x-4">
// //                     <button
// //                       onClick={triggerFileInput}
// //                       className="text-purple-600 hover:text-purple-800 font-medium transition duration-200"
// //                     >
// //                       Load Another Book
// //                     </button>
// //                   </div>

// //                   <button
// //                     onClick={handleNext}
// //                     disabled={!rendition}
// //                     className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-3 px-6 border border-gray-300 rounded-lg shadow-sm transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
// //                   >
// //                     <span>Next</span>
// //                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
// //                     </svg>
// //                   </button>
// //                 </div>
// //               </>
// //             )}
// //           </div>

// //           {/* Book Information */}
// //           {metadata && (
// //             <div className="bg-gray-50 rounded-xl p-6">
// //               <h3 className="font-bold text-gray-800 mb-4">Book Information</h3>
// //               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
// //                 <div>
// //                   <span className="font-semibold text-gray-600">Title:</span>
// //                   <span className="ml-2 text-gray-800">{metadata.title}</span>
// //                 </div>
// //                 {metadata.creator && (
// //                   <div>
// //                     <span className="font-semibold text-gray-600">Author:</span>
// //                     <span className="ml-2 text-gray-800">{metadata.creator}</span>
// //                   </div>
// //                 )}
// //                 {metadata.publisher && (
// //                   <div>
// //                     <span className="font-semibold text-gray-600">Publisher:</span>
// //                     <span className="ml-2 text-gray-800">{metadata.publisher}</span>
// //                   </div>
// //                 )}
// //                 {metadata.description && (
// //                   <div className="md:col-span-2">
// //                     <span className="font-semibold text-gray-600">Description:</span>
// //                     <p className="ml-2 text-gray-800 mt-1">{metadata.description}</p>
// //                   </div>
// //                 )}
// //               </div>
// //             </div>
// //           )}
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default EpubReader;

// // ///////////////////////////////////////////////////////////////////
// import React, { useState, useRef, useEffect } from 'react';
// import Epub from 'epubjs';
// // Import epubjs correctly
// // const ePub = typeof window !== 'undefined' ? require('epubjs').default : null;


// let ePub;
// if (typeof window !== 'undefined') {
//     import('epubjs').then(module => {
//         ePub = module.default;
//     }).catch(error => {
//         console.error('Failed to load EPUB.js:', error);
//     });
// }


// const EpubReader = ({ fileInputRef }) => {
//     const [epubFile, setEpubFile] = useState(null);
//     const [book, setBook] = useState(null);
//     const [rendition, setRendition] = useState(null);
//     const [currentSection, setCurrentSection] = useState(null);
//     const [metadata, setMetadata] = useState(null);
//     const [isLoading, setIsLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const viewerRef = useRef(null);

//     // Cleanup on unmount
//     useEffect(() => {
//         return () => {
//             if (book) {
//                 book.destroy();
//             }
//             // Clean up object URLs
//             if (epubFile) {
//                 URL.revokeObjectURL(epubFile.url);
//             }
//         };
//     }, [book, epubFile]);

//     // Handle file selection
//     useEffect(() => {
//         const handleFileChange = (event) => {
//             const file = event.target.files[0];
//             if (file) {
//                 // Check if file is EPUB by extension or type
//                 const isEpub = file.name.toLowerCase().endsWith('.epub') ||
//                     file.type === 'application/epub+zip';

//                 if (isEpub) {
//                     loadEpubFile(file);
//                 } else {
//                     setError('Please select a valid EPUB file (.epub)');
//                 }
//             }
//         };

//         const currentInput = fileInputRef.current;
//         if (currentInput) {
//             currentInput.addEventListener('change', handleFileChange);
//         }

//         return () => {
//             if (currentInput) {
//                 currentInput.removeEventListener('change', handleFileChange);
//             }
//         };
//     }, [fileInputRef]);

//     const loadEpubFile = async (file) => {
//         if (!ePub) {
//             setError('EPUB library not loaded. Please refresh the page.');
//             return;
//         }

//         setIsLoading(true);
//         setError(null);

//         try {
//             // Clean up previous book
//             if (book) {
//                 book.destroy();
//             }

//             // Create object URL for the file
//             const fileURL = URL.createObjectURL(file);
//             setEpubFile({ file, url: fileURL });

//             // Initialize new book
//             //   const newBook = ePub(fileURL);
//             const newBook = Epub(fileURL)
//             setBook(newBook);

//             // Load metadata
//             await newBook.ready;

//             const meta = await newBook.loaded.metadata;
//             setMetadata(meta);

//             console.log('meta data ', meta)


//             // Render the book
//             if (viewerRef.current) {
//                 // Clear previous content
//                 viewerRef.current.innerHTML = '';

//                 const newRendition = newBook.renderTo(viewerRef.current, {
//                     width: '100%',
//                     height: '600px',
//                     spread: 'none', // Start with single page view
//                     manager: 'continuous' // or 'default' for single page
//                 });

//                 setRendition(newRendition);

//                 // Display first section
//                 newRendition.display();

//                 // Set up event listeners
//                 newRendition.on('rendered', (section) => {
//                     setCurrentSection(section);
//                 });

//                 newRendition.on('relocated', (location) => {
//                     console.log('Location changed:', location);
//                 });

//                 newRendition.on('displayError', (error) => {
//                     console.error('Display error:', error);
//                     setError('Error displaying EPUB content. The file might be corrupted.');
//                 });
//             }

//         } catch (error) {
//             console.error('Error loading EPUB:', error);
//             setError(`Failed to load EPUB file: ${error.message}`);
//         } finally {
//             setIsLoading(false);
//         }
//     };


//     // const loadEpubFile = async (file) => {
//     //     // Wait for EPUB.js to load if it's not available yet
//     //     if (!ePub) {
//     //         try {
//     //             const module = await import('epubjs');
//     //             ePub = module.default;
//     //         } catch (error) {
//     //             setError('Failed to load EPUB reader library');
//     //             setIsLoading(false);
//     //             return;
//     //         }
//     //     }
//     // }
//     const handleNext = () => {
//         if (rendition) {
//             try {
//                 rendition.next();
//             } catch (error) {
//                 console.error('Error going to next page:', error);
//             }
//         }
//     };

//     const handlePrev = () => {
//         if (rendition) {
//             try {
//                 rendition.prev();
//             } catch (error) {
//                 console.error('Error going to previous page:', error);
//             }
//         }
//     };

//     const clearEpub = () => {
//         if (book) {
//             book.destroy();
//             setBook(null);
//         }
//         if (rendition) {
//             setRendition(null);
//         }
//         if (epubFile) {
//             URL.revokeObjectURL(epubFile.url);
//         }
//         setEpubFile(null);
//         setCurrentSection(null);
//         setMetadata(null);
//         setError(null);

//         if (fileInputRef.current) {
//             fileInputRef.current.value = '';
//         }

//         // Clear viewer
//         if (viewerRef.current) {
//             viewerRef.current.innerHTML = '';
//         }
//     };

//     const triggerFileInput = () => {
//         fileInputRef.current?.click();
//     };

//     // If EPUB.js is not available, show error
//     if (!ePub) {
//         return (
//             <div className="p-8">
//                 <h2 className="text-2xl font-bold text-gray-800 mb-6">EPUB Viewer</h2>
//                 <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
//                     <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
//                         <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
//                         </svg>
//                     </div>
//                     <h3 className="text-lg font-semibold text-red-800 mb-2">EPUB Library Not Available</h3>
//                     <p className="text-red-600 mb-4">
//                         The EPUB reader library failed to load. Please refresh the page and try again.
//                     </p>
//                     <button
//                         onClick={() => window.location.reload()}
//                         className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-200"
//                     >
//                         Refresh Page
//                     </button>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div className="p-8">
//             <h2 className="text-2xl font-bold text-gray-800 mb-6">EPUB Viewer</h2>

//             {/* Error Display */}
//             {error && (
//                 <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
//                     <div className="flex items-center">
//                         <svg className="w-5 h-5 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
//                         </svg>
//                         <span className="text-red-800 font-medium">{error}</span>
//                     </div>
//                 </div>
//             )}

//             {!epubFile ? (
//                 <div className="border-3 border-dashed border-gray-300 rounded-2xl p-12 text-center bg-gradient-to-br from-purple-50 to-pink-50 transition-all duration-300 hover:border-purple-400">
//                     <div className="max-w-md mx-auto">
//                         <div className="w-20 h-20 mx-auto mb-6 bg-purple-100 rounded-full flex items-center justify-center">
//                             <svg className="w-10 h-10 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
//                             </svg>
//                         </div>
//                         <h3 className="text-xl font-semibold text-gray-900 mb-3">Upload EPUB Book</h3>
//                         <p className="text-gray-600 mb-6">
//                             Select an EPUB file to start reading. We support standard EPUB 2.0 and 3.0 formats.
//                         </p>
//                         <button
//                             onClick={triggerFileInput}
//                             className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
//                         >
//                             Choose EPUB File
//                         </button>
//                         <p className="mt-4 text-sm text-gray-500">EPUB format only (.epub)</p>
//                     </div>
//                 </div>
//             ) : (
//                 <div className="space-y-6">
//                     {/* File Info */}
//                     <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-xl p-6 shadow-sm">
//                         <div className="flex items-center justify-between">
//                             <div className="flex items-center space-x-4">
//                                 <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
//                                     <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
//                                     </svg>
//                                 </div>
//                                 <div>
//                                     <p className="font-bold text-purple-900 text-lg">
//                                         {metadata?.title || epubFile.file.name}
//                                     </p>
//                                     <p className="text-purple-700">
//                                         {(epubFile.file.size / (1024 * 1024)).toFixed(2)} MB •
//                                         {metadata?.creator ? ` By ${metadata.creator}` : ' EPUB Book'}
//                                     </p>
//                                 </div>
//                             </div>
//                             <button
//                                 onClick={clearEpub}
//                                 className="text-gray-400 hover:text-red-500 transition duration-200 p-2 hover:bg-red-50 rounded-lg"
//                             >
//                                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                                 </svg>
//                             </button>
//                         </div>
//                     </div>

//                     {/* EPUB Viewer */}
//                     <div className="border-2 border-gray-200 rounded-xl bg-white shadow-lg overflow-hidden">
//                         <div className="bg-gray-800 text-white px-6 py-3 flex items-center justify-between">
//                             <span className="font-semibold">
//                                 {metadata?.title || 'EPUB Reader'}
//                             </span>
//                             <div className="flex items-center space-x-4">
//                                 <span className="text-sm text-gray-300">
//                                     {metadata?.creator || 'Unknown Author'}
//                                 </span>
//                             </div>
//                         </div>

//                         {isLoading ? (
//                             <div className="p-12 text-center bg-white min-h-[400px] flex items-center justify-center">
//                                 <div className="text-center">
//                                     <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-4"></div>
//                                     <p className="text-gray-600 font-semibold">Loading EPUB Book...</p>
//                                     <p className="text-gray-500 text-sm mt-2">This may take a few moments</p>
//                                 </div>
//                             </div>
//                         ) : (
//                             <>
//                                 <div
//                                     ref={viewerRef}
//                                     className="epub-viewer bg-white min-h-[600px] flex items-center justify-center"
//                                 >
//                                     {!rendition && (
//                                         <div className="text-center text-gray-500">
//                                             <svg className="w-12 h-12 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
//                                             </svg>
//                                             <p>Ready to display EPUB content</p>
//                                         </div>
//                                     )}
//                                 </div>

//                                 {/* Navigation Controls */}
//                                 <div className="bg-gray-50 border-t border-gray-200 px-6 py-4 flex justify-between items-center">
//                                     <button
//                                         onClick={handlePrev}
//                                         disabled={!rendition}
//                                         className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-3 px-6 border border-gray-300 rounded-lg shadow-sm transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
//                                     >
//                                         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//                                         </svg>
//                                         <span>Previous</span>
//                                     </button>

//                                     <div className="flex items-center space-x-4">
//                                         <button
//                                             onClick={triggerFileInput}
//                                             className="text-purple-600 hover:text-purple-800 font-medium transition duration-200"
//                                         >
//                                             Load Another Book
//                                         </button>
//                                     </div>

//                                     <button
//                                         onClick={handleNext}
//                                         disabled={!rendition}
//                                         className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-3 px-6 border border-gray-300 rounded-lg shadow-sm transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
//                                     >
//                                         <span>Next</span>
//                                         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                                         </svg>
//                                     </button>
//                                 </div>
//                             </>
//                         )}
//                     </div>

//                     {/* Book Information */}
//                     {metadata && (
//                         <div className="bg-gray-50 rounded-xl p-6">
//                             <h3 className="font-bold text-gray-800 mb-4">Book Information</h3>
//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
//                                 <div>
//                                     <span className="font-semibold text-gray-600">Title:</span>
//                                     <span className="ml-2 text-gray-800">{metadata.title}</span>
//                                 </div>
//                                 {metadata.creator && (
//                                     <div>
//                                         <span className="font-semibold text-gray-600">Author:</span>
//                                         <span className="ml-2 text-gray-800">{metadata.creator}</span>
//                                     </div>
//                                 )}
//                                 {metadata.publisher && (
//                                     <div>
//                                         <span className="font-semibold text-gray-600">Publisher:</span>
//                                         <span className="ml-2 text-gray-800">{metadata.publisher}</span>
//                                     </div>
//                                 )}
//                                 {metadata.description && (
//                                     <div className="md:col-span-2">
//                                         <span className="font-semibold text-gray-600">Description:</span>
//                                         <p className="ml-2 text-gray-800 mt-1">{metadata.description}</p>
//                                     </div>
//                                 )}
//                             </div>
//                         </div>
//                     )}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default EpubReader;

"use client";
import React, { useState, useRef, useEffect } from "react";

const EpubReader = ({ fileInputRef }) => {
  const [EpubLib, setEpubLib] = useState(null);
  const [epubFile, setEpubFile] = useState(null);
  const [book, setBook] = useState(null);
  const [rendition, setRendition] = useState(null);
  const [metadata, setMetadata] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const viewerRef = useRef(null);

  // 🧩 Load epub.js dynamically (only in browser)
  useEffect(() => {
    const loadEpubLib = async () => {
      try {
        const module = await import("epubjs");
        setEpubLib(() => module.default);
      } catch (err) {
        console.error("EPUBJS load error:", err);
        setError("Failed to load EPUB library.");
      }
    };

    if (typeof window !== "undefined") loadEpubLib();
  }, []);

  // 🧩 Handle file input change
  useEffect(() => {
    if (!fileInputRef?.current) return;

    const handleFileChange = (e) => {
      const file = e.target.files?.[0];
      if (!file) return;
      if (!file.name.endsWith(".epub")) {
        setError("Please upload a valid .epub file");
        return;
      }
      loadEpubFile(file);
    };

    const input = fileInputRef.current;
    input.addEventListener("change", handleFileChange);
    return () => input.removeEventListener("change", handleFileChange);
  }, [fileInputRef, EpubLib]);

  // 🧩 Load EPUB File
  const loadEpubFile = async (file) => {
    if (!EpubLib) {
      setError("EPUB library not ready yet. Please wait a moment.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      if (book) book.destroy();

      const fileURL = URL.createObjectURL(file);
      setEpubFile({ file, url: fileURL });

      const newBook = EpubLib(fileURL);
      await newBook.ready;
      const meta = await newBook.loaded.metadata;
      setMetadata(meta);
      setBook(newBook);

      if (viewerRef.current) {
        viewerRef.current.innerHTML = ""; // clear previous render
        const newRendition = newBook.renderTo(viewerRef.current, {
          width: "100%",
          height: "600px",
          spread: "none",
        });
        newRendition.display();
        setRendition(newRendition);
      }
    } catch (err) {
      console.error("EPUB load error:", err);
      setError("Error loading EPUB: " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // 🧭 Navigation
  const handleNext = () => rendition?.next();
  const handlePrev = () => rendition?.prev();

  // 🧹 Clear book
  const clearEpub = () => {
    book?.destroy();
    if (epubFile) URL.revokeObjectURL(epubFile.url);
    setBook(null);
    setRendition(null);
    setEpubFile(null);
    setMetadata(null);
    setError(null);
    if (viewerRef.current) viewerRef.current.innerHTML = "";
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // 🧭 Trigger input manually
  const triggerFileInput = () => fileInputRef.current?.click();

  // 🕒 Loading or waiting for library
  if (!EpubLib) {
    return (
      <div className="p-8 text-center text-gray-500">
        <div className="animate-pulse">Loading EPUB library...</div>
      </div>
    );
  }
  // 🖥️ UI (simplified here — your original design works fine)
//   return (
//     <div className="p-8">
//       <h2 className="text-2xl font-bold mb-6">EPUB Viewer</h2>
//       {error && <div className="text-red-600 mb-4">{error}</div>}

//       {!epubFile ? (
//         <button
//           onClick={triggerFileInput}
//           className="bg-purple-600 text-white px-6 py-3 rounded-lg"
//         >
//           Choose EPUB File
//         </button>
//       ) : (
//         <>
//           <div className="mb-4 flex justify-between items-center">
//             <div>
//               <h3 className="font-bold">{metadata?.title || epubFile.file.name}</h3>
//               <p>{metadata?.creator || "Unknown Author"}</p>
//             </div>
//             <button onClick={clearEpub} className="text-red-600">×</button>
//           </div>

//           <div
//             ref={viewerRef}
//             className="border rounded-lg min-h-[600px] bg-white shadow-sm"
//           ></div>

//           <div className="flex justify-between mt-4">
//             <button onClick={handlePrev} className="px-4 py-2 border rounded">
//               Previous
//             </button>
//             <button onClick={handleNext} className="px-4 py-2 border rounded">
//               Next
//             </button>
//           </div>
//         </>
//       )}
//     </div>
//   );

    return (
        <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">EPUB Viewer</h2>

            {/* Error Display */}
            {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
                    <div className="flex items-center">
                        <svg className="w-5 h-5 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                        <span className="text-red-800 font-medium">{error}</span>
                    </div>
                </div>
            )}

            {!epubFile ? (
                <div className="border-3 border-dashed border-gray-300 rounded-2xl p-12 text-center bg-gradient-to-br from-purple-50 to-pink-50 transition-all duration-300 hover:border-purple-400">
                    <div className="max-w-md mx-auto">
                        <div className="w-20 h-20 mx-auto mb-6 bg-purple-100 rounded-full flex items-center justify-center">
                            <svg className="w-10 h-10 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">Upload EPUB Book</h3>
                        <p className="text-gray-600 mb-6">
                            Select an EPUB file to start reading. We support standard EPUB 2.0 and 3.0 formats.
                        </p>
                        <button
                            onClick={triggerFileInput}
                            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
                        >
                            Choose EPUB File
                        </button>
                        <p className="mt-4 text-sm text-gray-500">EPUB format only (.epub)</p>
                    </div>
                </div>
            ) : (
                <div className="space-y-6">
                    {/* File Info */}
                    <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-xl p-6 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="font-bold text-purple-900 text-lg">
                                        {metadata?.title || epubFile.file.name}
                                    </p>
                                    <p className="text-purple-700">
                                        {(epubFile.file.size / (1024 * 1024)).toFixed(2)} MB •
                                        {metadata?.creator ? ` By ${metadata.creator}` : ' EPUB Book'}
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={clearEpub}
                                className="text-gray-400 hover:text-red-500 transition duration-200 p-2 hover:bg-red-50 rounded-lg"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* EPUB Viewer */}
                    <div className="border-2 border-gray-200 rounded-xl bg-white shadow-lg overflow-hidden">
                        <div className="bg-gray-800 text-white px-6 py-3 flex items-center justify-between">
                            <span className="font-semibold">
                                {metadata?.title || 'EPUB Reader'}
                            </span>
                            <div className="flex items-center space-x-4">
                                <span className="text-sm text-gray-300">
                                    {metadata?.creator || 'Unknown Author'}
                                </span>
                            </div>
                        </div>

                        {isLoading ? (
                            <div className="p-12 text-center bg-white min-h-[400px] flex items-center justify-center">
                                <div className="text-center">
                                    <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-4"></div>
                                    <p className="text-gray-600 font-semibold">Loading EPUB Book...</p>
                                    <p className="text-gray-500 text-sm mt-2">This may take a few moments</p>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div
                                    ref={viewerRef}
                                    className="epub-viewer bg-white min-h-[600px] flex items-center justify-center"
                                >
                                    {!rendition && (
                                        <div className="text-center text-gray-500">
                                            <svg className="w-12 h-12 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                            </svg>
                                            <p>Ready to display EPUB content</p>
                                        </div>
                                    )}
                                </div>

                                {/* Navigation Controls */}
                                <div className="bg-gray-50 border-t border-gray-200 px-6 py-4 flex justify-between items-center">
                                    <button
                                        onClick={handlePrev}
                                        disabled={!rendition}
                                        className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-3 px-6 border border-gray-300 rounded-lg shadow-sm transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                        </svg>
                                        <span>Previous</span>
                                    </button>

                                    <div className="flex items-center space-x-4">
                                        <button
                                            onClick={triggerFileInput}
                                            className="text-purple-600 hover:text-purple-800 font-medium transition duration-200"
                                        >
                                            Load Another Book
                                        </button>
                                    </div>

                                    <button
                                        onClick={handleNext}
                                        disabled={!rendition}
                                        className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-3 px-6 border border-gray-300 rounded-lg shadow-sm transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                                    >
                                        <span>Next</span>
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </div>
                            </>
                        )}
                    </div>

                    {/* Book Information */}
                    {metadata && (
                        <div className="bg-gray-50 rounded-xl p-6">
                            <h3 className="font-bold text-gray-800 mb-4">Book Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                <div>
                                    <span className="font-semibold text-gray-600">Title:</span>
                                    <span className="ml-2 text-gray-800">{metadata.title}</span>
                                </div>
                                {metadata.creator && (
                                    <div>
                                        <span className="font-semibold text-gray-600">Author:</span>
                                        <span className="ml-2 text-gray-800">{metadata.creator}</span>
                                    </div>
                                )}
                                {metadata.publisher && (
                                    <div>
                                        <span className="font-semibold text-gray-600">Publisher:</span>
                                        <span className="ml-2 text-gray-800">{metadata.publisher}</span>
                                    </div>
                                )}
                                {metadata.description && (
                                    <div className="md:col-span-2">
                                        <span className="font-semibold text-gray-600">Description:</span>
                                        <p className="ml-2 text-gray-800 mt-1">{metadata.description}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );

};

export default EpubReader;

