// import React, { useState, useEffect, useRef } from 'react';
// import { Upload, Bookmark, ChevronLeft, ChevronRight, Cloud, Search, Highlighter, Type, Sun, Moon, Library, Clock, Share2, Download, Menu, X, Settings, Eye, ZoomIn, ZoomOut, Maximize, BookOpen, MessageSquare } from 'lucide-react';

// const ProfessionalEPUBReader = () => {
//   const [book, setBook] = useState(null);
//   const [rendition, setRendition] = useState(null);
//   const [toc, setToc] = useState([]);
//   const [currentLocation, setCurrentLocation] = useState(null);
//   const [progress, setProgress] = useState(0);
//   const [pageInfo, setPageInfo] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [bookLoaded, setBookLoaded] = useState(false);
//   const [fontSize, setFontSize] = useState(16);
//   const [theme, setTheme] = useState('light');
//   const [loadingProgress, setLoadingProgress] = useState(0);
  
//   // Advanced features states
//   const [bookmarks, setBookmarks] = useState([]);
//   const [highlights, setHighlights] = useState([]);
//   const [notes, setNotes] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [searchResults, setSearchResults] = useState([]);
//   const [readingTime, setReadingTime] = useState(0);
//   const [readingHistory, setReadingHistory] = useState([]);
//   const [showSidebar, setShowSidebar] = useState(true);
//   const [sidebarTab, setSidebarTab] = useState('toc'); // toc, bookmarks, notes, search
//   const [fullscreen, setFullscreen] = useState(false);
//   const [lineHeight, setLineHeight] = useState(1.6);
//   const [textAlign, setTextAlign] = useState('left');
//   const [selectedText, setSelectedText] = useState('');
//   const [showNoteModal, setShowNoteModal] = useState(false);
//   const [currentNote, setCurrentNote] = useState('');
//   const [bookMetadata, setBookMetadata] = useState({});
//   const [readingSpeed, setReadingSpeed] = useState(0); // words per minute
//   const [nightMode, setNightMode] = useState(false);
  
//   const viewerRef = useRef(null);
//   const fileInputRef = useRef(null);
//   const r2UrlInputRef = useRef(null);
//   const readingTimerRef = useRef(null);

//   // Load scripts
//   useEffect(() => {
//     const loadScripts = async () => {
//       if (window.JSZip && window.ePub) return;
//       if (!window.JSZip) {
//         const jszipScript = document.createElement('script');
//         jszipScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js';
//         document.head.appendChild(jszipScript);
//         await new Promise((resolve) => { jszipScript.onload = resolve; });
//       }
//       if (!window.ePub) {
//         const epubjsScript = document.createElement('script');
//         epubjsScript.src = 'https://cdn.jsdelivr.net/npm/epubjs/dist/epub.min.js';
//         document.head.appendChild(epubjsScript);
//         await new Promise((resolve) => { epubjsScript.onload = resolve; });
//       }
//     };
//     loadScripts().catch(err => console.error('Script loading error:', err));
//   }, []);

//   // Load saved data from localStorage
//   useEffect(() => {
//     const savedBookmarks = localStorage.getItem('epub-bookmarks');
//     const savedHighlights = localStorage.getItem('epub-highlights');
//     const savedNotes = localStorage.getItem('epub-notes');
//     const savedHistory = localStorage.getItem('epub-history');
    
//     if (savedBookmarks) setBookmarks(JSON.parse(savedBookmarks));
//     if (savedHighlights) setHighlights(JSON.parse(savedHighlights));
//     if (savedNotes) setNotes(JSON.parse(savedNotes));
//     if (savedHistory) setReadingHistory(JSON.parse(savedHistory));
//   }, []);

//   // Reading time tracker
//   useEffect(() => {
//     if (bookLoaded) {
//       readingTimerRef.current = setInterval(() => {
//         setReadingTime(prev => prev + 1);
//       }, 1000);
//     }
//     return () => {
//       if (readingTimerRef.current) {
//         clearInterval(readingTimerRef.current);
//       }
//     };
//   }, [bookLoaded]);

//   // Save reading progress
//   useEffect(() => {
//     if (currentLocation && book) {
//       const historyEntry = {
//         cfi: currentLocation.start.cfi,
//         progress: progress,
//         timestamp: Date.now(),
//         page: pageInfo
//       };
//       const newHistory = [...readingHistory, historyEntry].slice(-50); // Keep last 50
//       setReadingHistory(newHistory);
//       localStorage.setItem('epub-history', JSON.stringify(newHistory));
//     }
//   }, [currentLocation]);

//   const handleFileUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) loadBookFromFile(file);
//   };

//   const handleR2URLLoad = async () => {
//     const url = r2UrlInputRef.current?.value;
//     if (!url) {
//       alert('Please enter R2 URL');
//       return;
//     }
//     await loadBookFromURL(url);
//   };

//   const loadBookFromURL = async (url) => {
//     if (!window.ePub) {
//       alert('EPUB library not loaded yet. Please wait.');
//       return;
//     }
//     setBookLoaded(true);
//     setLoading(true);
//     setLoadingProgress(0);

//     setTimeout(async () => {
//       try {
//         if (!viewerRef.current) {
//           alert('Viewer not ready');
//           setLoading(false);
//           setBookLoaded(false);
//           return;
//         }

//         const response = await fetch(url);
//         if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

//         const contentLength = response.headers.get('content-length');
//         const total = parseInt(contentLength, 10);
//         let loaded = 0;
//         const reader = response.body.getReader();
//         const chunks = [];

//         while (true) {
//           const { done, value } = await reader.read();
//           if (done) break;
//           chunks.push(value);
//           loaded += value.length;
//           if (total) {
//             const percentComplete = Math.round((loaded / total) * 100);
//             setLoadingProgress(percentComplete);
//           }
//         }

//         const chunksAll = new Uint8Array(loaded);
//         let position = 0;
//         for (const chunk of chunks) {
//           chunksAll.set(chunk, position);
//           position += chunk.length;
//         }

//         await initializeBook(chunksAll.buffer);
//       } catch (err) {
//         console.error('URL loading error:', err);
//         alert('Failed to load from URL: ' + err.message);
//         setLoading(false);
//         setBookLoaded(false);
//       }
//     }, 200);
//   };

//   const loadBookFromFile = (file) => {
//     if (!window.ePub) {
//       alert('EPUB library not loaded yet. Please wait.');
//       return;
//     }
//     setBookLoaded(true);
//     setLoading(true);
//     setLoadingProgress(0);
    
//     const reader = new FileReader();
//     reader.onprogress = (e) => {
//       if (e.lengthComputable) {
//         const percentComplete = Math.round((e.loaded / e.total) * 100);
//         setLoadingProgress(percentComplete);
//       }
//     };
    
//     reader.onload = function(e) {
//       setTimeout(async () => {
//         try {
//           await initializeBook(e.target.result);
//         } catch(err) {
//           console.error('File loading error:', err);
//           alert('Failed to load EPUB: ' + err.message);
//           setLoading(false);
//           setBookLoaded(false);
//         }
//       }, 200);
//     };
    
//     reader.onerror = () => {
//       alert('Failed to read file');
//       setLoading(false);
//       setBookLoaded(false);
//     };
    
//     reader.readAsArrayBuffer(file);
//   };

//   const initializeBook = async (arrayBuffer) => {
//     if (!viewerRef.current) throw new Error('Viewer ref not available');

//     const newBook = window.ePub(arrayBuffer);
//     setBook(newBook);
    
//     viewerRef.current.innerHTML = '';
    
//     const newRendition = newBook.renderTo(viewerRef.current, {
//       width: '100%',
//       height: 600,
//       spread: 'none',
//       allowScriptedContent: true,
//       allowPopups: false
//     });
    
//     setRendition(newRendition);
    
//     // Register themes
//     newRendition.themes.register('light', {
//       'body': { 'color': '#000 !important', 'background': '#fff !important', 'line-height': lineHeight + ' !important', 'text-align': textAlign + ' !important' },
//       'img': { 'max-width': '100% !important', 'height': 'auto !important', 'display': 'block !important' },
//       'p': { 'line-height': lineHeight + ' !important' }
//     });
    
//     newRendition.themes.register('sepia', {
//       'body': { 'color': '#5c4a37 !important', 'background': '#f4ecd8 !important', 'line-height': lineHeight + ' !important', 'text-align': textAlign + ' !important' },
//       'img': { 'max-width': '100% !important', 'height': 'auto !important', 'display': 'block !important' },
//       'p': { 'line-height': lineHeight + ' !important' }
//     });
    
//     newRendition.themes.register('dark', {
//       'body': { 'color': '#e0e0e0 !important', 'background': '#1a1a1a !important', 'line-height': lineHeight + ' !important', 'text-align': textAlign + ' !important' },
//       'img': { 'max-width': '100% !important', 'height': 'auto !important', 'display': 'block !important' },
//       'p': { 'line-height': lineHeight + ' !important' }
//     });
    
//     newRendition.themes.select(nightMode ? 'dark' : 'light');
    
//     await newRendition.display();
//     setLoading(false);
//     setLoadingProgress(100);
    
//     // Get metadata
//     newBook.loaded.metadata.then(meta => {
//       setBookMetadata({
//         title: meta.title || 'Unknown',
//         creator: meta.creator || 'Unknown',
//         publisher: meta.publisher || 'Unknown',
//         language: meta.language || 'Unknown'
//       });
//     });
    
//     // Load TOC
//     newBook.loaded.navigation.then(nav => {
//       if (nav.toc && nav.toc.length > 0) setToc(nav.toc);
//     });
    
//     // Generate locations
//     newBook.ready.then(() => newBook.locations.generate(1600)).then(() => {
//       console.log('Locations generated');
//     });
    
//     // Track location
//     newRendition.on('relocated', (location) => {
//       setCurrentLocation(location);
//       updateProgress(location, newBook);
//     });

//     // Text selection for highlights
//     newRendition.on('selected', (cfiRange, contents) => {
//       const text = contents.window.getSelection().toString();
//       setSelectedText(text);
//       setShowNoteModal(true);
//     });
//   };

//   const updateProgress = (location, currentBook) => {
//     try {
//       if (currentBook && currentBook.locations && currentBook.locations.total > 0) {
//         const prog = currentBook.locations.percentageFromCfi(location.start.cfi);
//         setProgress(prog * 100);
//       }
//       if (location && location.start && location.start.displayed) {
//         setPageInfo(`Page ${location.start.displayed.page} of ${location.start.displayed.total}`);
//       }
//     } catch(err) {
//       console.error('Progress update error:', err);
//     }
//   };

//   const goToPrevPage = () => rendition?.prev();
//   const goToNextPage = () => rendition?.next();
//   const goToChapter = (href) => rendition?.display(href);

//   const handleFontSizeChange = (e) => {
//     const size = parseInt(e.target.value);
//     setFontSize(size);
//     rendition?.themes.fontSize(size + 'px');
//   };

//   const handleThemeChange = (newTheme) => {
//     setTheme(newTheme);
//     rendition?.themes.select(newTheme);
//   };

//   const toggleNightMode = () => {
//     const newMode = !nightMode;
//     setNightMode(newMode);
//     if (rendition) {
//       rendition.themes.select(newMode ? 'dark' : theme);
//     }
//   };

//   const addBookmark = () => {
//     if (currentLocation) {
//       const bookmark = {
//         cfi: currentLocation.start.cfi,
//         page: pageInfo,
//         timestamp: Date.now(),
//         chapter: toc.find(t => currentLocation.start.href.includes(t.href))?.label || 'Unknown'
//       };
//       const newBookmarks = [...bookmarks, bookmark];
//       setBookmarks(newBookmarks);
//       localStorage.setItem('epub-bookmarks', JSON.stringify(newBookmarks));
//       alert('✅ Bookmark added!');
//     }
//   };

//   const addHighlight = (color = '#ffeb3b') => {
//     if (selectedText && currentLocation) {
//       const highlight = {
//         cfi: currentLocation.start.cfi,
//         text: selectedText,
//         color: color,
//         timestamp: Date.now()
//       };
//       const newHighlights = [...highlights, highlight];
//       setHighlights(newHighlights);
//       localStorage.setItem('epub-highlights', JSON.stringify(newHighlights));
      
//       // Add visual highlight
//       rendition?.annotations.highlight(currentLocation.start.cfi, {}, (e) => {
//         console.log('Highlight clicked', e);
//       }, 'highlight', { fill: color });
      
//       setShowNoteModal(false);
//       setSelectedText('');
//     }
//   };

//   const addNote = () => {
//     if (selectedText && currentNote && currentLocation) {
//       const note = {
//         cfi: currentLocation.start.cfi,
//         text: selectedText,
//         note: currentNote,
//         timestamp: Date.now(),
//         page: pageInfo
//       };
//       const newNotes = [...notes, note];
//       setNotes(newNotes);
//       localStorage.setItem('epub-notes', JSON.stringify(newNotes));
//       setShowNoteModal(false);
//       setSelectedText('');
//       setCurrentNote('');
//       alert('✅ Note added!');
//     }
//   };

//   const searchInBook = async () => {
//     if (!book || !searchQuery) return;
    
//     setLoading(true);
//     const results = [];
    
//     try {
//       const spine = await book.loaded.spine;
//       for (let item of spine.items) {
//         const doc = await item.load(book.load.bind(book));
//         const text = doc.body.textContent;
//         const regex = new RegExp(searchQuery, 'gi');
//         let match;
        
//         while ((match = regex.exec(text)) !== null) {
//           const start = Math.max(0, match.index - 50);
//           const end = Math.min(text.length, match.index + searchQuery.length + 50);
//           results.push({
//             excerpt: '...' + text.substring(start, end) + '...',
//             cfi: item.cfiFromElement(doc.body),
//             href: item.href
//           });
//         }
//       }
//       setSearchResults(results);
//       setSidebarTab('search');
//     } catch (err) {
//       console.error('Search error:', err);
//     }
//     setLoading(false);
//   };

//   const formatTime = (seconds) => {
//     const hrs = Math.floor(seconds / 3600);
//     const mins = Math.floor((seconds % 3600) / 60);
//     const secs = seconds % 60;
//     if (hrs > 0) return `${hrs}h ${mins}m`;
//     if (mins > 0) return `${mins}m ${secs}s`;
//     return `${secs}s`;
//   };

//   const shareProgress = () => {
//     const text = `I'm reading "${bookMetadata.title}" and I'm ${Math.round(progress)}% done! 📚`;
//     if (navigator.share) {
//       navigator.share({ title: bookMetadata.title, text: text });
//     } else {
//       navigator.clipboard.writeText(text);
//       alert('✅ Progress copied to clipboard!');
//     }
//   };

//   const toggleFullscreen = () => {
//     if (!document.fullscreenElement) {
//       document.documentElement.requestFullscreen();
//       setFullscreen(true);
//     } else {
//       document.exitFullscreen();
//       setFullscreen(false);
//     }
//   };

//   useEffect(() => {
//     const handleKeyPress = (e) => {
//       if (!rendition) return;
//       if (e.key === 'ArrowLeft') goToPrevPage();
//       else if (e.key === 'ArrowRight') goToNextPage();
//       else if (e.key === 'f' && e.ctrlKey) {
//         e.preventDefault();
//         setSidebarTab('search');
//       }
//     };
//     window.addEventListener('keydown', handleKeyPress);
//     return () => window.removeEventListener('keydown', handleKeyPress);
//   }, [rendition]);

//   return (
//     <div className={`min-h-screen ${nightMode ? 'bg-gray-900' : 'bg-gradient-to-br from-purple-500 to-purple-800'} flex flex-col`}>
//       {/* Header */}
//       <div className={`${nightMode ? 'bg-gray-800' : 'bg-white/95'} shadow-lg px-4 py-3`}>
//         <div className="max-w-7xl mx-auto flex justify-between items-center flex-wrap gap-3">
//           <div className="flex items-center gap-3">
//             <button onClick={() => setShowSidebar(!showSidebar)} className="p-2 hover:bg-gray-200 rounded-lg">
//               {showSidebar ? <X size={20} /> : <Menu size={20} />}
//             </button>
//             <span className="text-2xl">📚</span>
//             <div>
//               <h1 className={`text-xl font-bold ${nightMode ? 'text-white' : 'text-purple-600'}`}>
//                 {bookMetadata.title || 'Professional EPUB Reader'}
//               </h1>
//               {bookMetadata.creator && (
//                 <p className="text-xs text-gray-500">by {bookMetadata.creator}</p>
//               )}
//             </div>
//           </div>
          
//           <div className="flex gap-2 flex-wrap">
//             {bookLoaded && (
//               <>
//                 <button onClick={toggleNightMode} className="p-2 bg-gray-200 rounded-lg hover:bg-gray-300">
//                   {nightMode ? <Sun size={18} /> : <Moon size={18} />}
//                 </button>
//                 <button onClick={toggleFullscreen} className="p-2 bg-gray-200 rounded-lg hover:bg-gray-300">
//                   <Maximize size={18} />
//                 </button>
//                 <button onClick={shareProgress} className="p-2 bg-gray-200 rounded-lg hover:bg-gray-300">
//                   <Share2 size={18} />
//                 </button>
//                 <button onClick={addBookmark} className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
//                   <Bookmark size={18} />
//                   Bookmark
//                 </button>
//               </>
//             )}
//             {!bookLoaded && (
//               <>
//                 <input type="file" ref={fileInputRef} accept=".epub" onChange={handleFileUpload} className="hidden" />
//                 <button onClick={() => fileInputRef.current?.click()} className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
//                   <Upload size={18} />
//                   Upload
//                 </button>
//               </>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 flex p-3 gap-3 max-w-[1600px] mx-auto w-full">
//         {/* Sidebar */}
//         {showSidebar && (
//           <div className={`w-80 ${nightMode ? 'bg-gray-800 text-white' : 'bg-white'} rounded-xl shadow-xl flex flex-col overflow-hidden`}>
//             {/* Tabs */}
//             <div className="flex border-b">
//               <button onClick={() => setSidebarTab('toc')} className={`flex-1 py-3 text-sm font-semibold ${sidebarTab === 'toc' ? 'border-b-2 border-purple-600 text-purple-600' : 'text-gray-500'}`}>
//                 <BookOpen size={16} className="inline mr-1" />
//                 Contents
//               </button>
//               <button onClick={() => setSidebarTab('bookmarks')} className={`flex-1 py-3 text-sm font-semibold ${sidebarTab === 'bookmarks' ? 'border-b-2 border-purple-600 text-purple-600' : 'text-gray-500'}`}>
//                 <Bookmark size={16} className="inline mr-1" />
//                 Bookmarks
//               </button>
//               <button onClick={() => setSidebarTab('notes')} className={`flex-1 py-3 text-sm font-semibold ${sidebarTab === 'notes' ? 'border-b-2 border-purple-600 text-purple-600' : 'text-gray-500'}`}>
//                 <MessageSquare size={16} className="inline mr-1" />
//                 Notes
//               </button>
//               <button onClick={() => setSidebarTab('search')} className={`flex-1 py-3 text-sm font-semibold ${sidebarTab === 'search' ? 'border-b-2 border-purple-600 text-purple-600' : 'text-gray-500'}`}>
//                 <Search size={16} className="inline mr-1" />
//                 Search
//               </button>
//             </div>

//             {/* Tab Content */}
//             <div className="flex-1 overflow-y-auto p-4">
//               {sidebarTab === 'toc' && (
//                 <div className="space-y-2">
//                   {toc.length > 0 ? (
//                     toc.map((chapter, index) => (
//                       <div key={index} onClick={() => goToChapter(chapter.href)} className="p-3 rounded-lg cursor-pointer hover:bg-purple-50 hover:text-purple-600 transition-all text-sm">
//                         {chapter.label}
//                       </div>
//                     ))
//                   ) : (
//                     <p className="text-gray-400 text-sm">No table of contents</p>
//                   )}
//                 </div>
//               )}

//               {sidebarTab === 'bookmarks' && (
//                 <div className="space-y-2">
//                   {bookmarks.length > 0 ? (
//                     bookmarks.map((bm, index) => (
//                       <div key={index} onClick={() => rendition?.display(bm.cfi)} className="p-3 rounded-lg cursor-pointer hover:bg-purple-50 border border-gray-200">
//                         <div className="font-semibold text-sm">{bm.chapter}</div>
//                         <div className="text-xs text-gray-500 mt-1">{bm.page}</div>
//                         <div className="text-xs text-gray-400 mt-1">{new Date(bm.timestamp).toLocaleString()}</div>
//                       </div>
//                     ))
//                   ) : (
//                     <p className="text-gray-400 text-sm">No bookmarks yet</p>
//                   )}
//                 </div>
//               )}

//               {sidebarTab === 'notes' && (
//                 <div className="space-y-2">
//                   {notes.length > 0 ? (
//                     notes.map((note, index) => (
//                       <div key={index} className="p-3 rounded-lg border border-gray-200">
//                         <div className="text-sm italic mb-2">"{note.text.substring(0, 100)}..."</div>
//                         <div className="text-sm font-semibold text-purple-600">{note.note}</div>
//                         <div className="text-xs text-gray-400 mt-2">{note.page} • {new Date(note.timestamp).toLocaleString()}</div>
//                       </div>
//                     ))
//                   ) : (
//                     <p className="text-gray-400 text-sm">No notes yet. Select text to add notes.</p>
//                   )}
//                 </div>
//               )}

//               {sidebarTab === 'search' && (
//                 <div>
//                   <div className="flex gap-2 mb-4">
//                     <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && searchInBook()} placeholder="Search in book..." className="flex-1 px-3 py-2 border rounded-lg text-sm" />
//                     <button onClick={searchInBook} className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
//                       <Search size={16} />
//                     </button>
//                   </div>
//                   <div className="space-y-2">
//                     {searchResults.length > 0 ? (
//                       searchResults.map((result, index) => (
//                         <div key={index} onClick={() => rendition?.display(result.cfi)} className="p-3 rounded-lg cursor-pointer hover:bg-purple-50 border border-gray-200 text-sm">
//                           {result.excerpt}
//                         </div>
//                       ))
//                     ) : searchQuery ? (
//                       <p className="text-gray-400 text-sm">No results found</p>
//                     ) : (
//                       <p className="text-gray-400 text-sm">Enter search query</p>
//                     )}
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Settings Panel */}
//             {bookLoaded && (
//               <div className="border-t p-4 space-y-3">
//                 <div>
//                   <label className="block text-xs font-semibold mb-1">Font Size: {fontSize}px</label>
//                   <input type="range" min="12" max="28" value={fontSize} onChange={handleFontSizeChange} className="w-full" />
//                 </div>
//                 <div>
//                   <label className="block text-xs font-semibold mb-1">Line Height: {lineHeight}</label>
//                   <input type="range" min="1.2" max="2.5" step="0.1" value={lineHeight} onChange={(e) => setLineHeight(parseFloat(e.target.value))} className="w-full" />
//                 </div>
//                 <div className="flex gap-2">
//                   {['light', 'sepia', 'dark'].map(t => (
//                     <button key={t} onClick={() => handleThemeChange(t)} className={`flex-1 py-1 text-xs rounded ${theme === t ? 'bg-purple-600 text-white' : 'bg-gray-200'}`}>
//                       {t.charAt(0).toUpperCase() + t.slice(1)}
//                     </button>
//                   ))}
//                 </div>
//                 <div className="text-xs text-gray-500">
//                   <Clock size={14} className="inline mr-1" />
//                   Reading time: {formatTime(readingTime)}
//                 </div>
//               </div>
//             )}
//           </div>
//         )}

//         {/* Reader Container */}
//         <div className={`flex-1 ${nightMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-xl flex flex-col overflow-hidden`}>
//           {!bookLoaded ? (
//             <div className="flex-1 flex flex-col items-center justify-center p-10 text-center">
//               <div className="text-8xl mb-6">📖</div>
//               <h2 className={`text-2xl font-bold ${nightMode ? 'text-white' : 'text-gray-800'} mb-3`}>
//                 Professional EPUB Reader
//               </h2>
//               <p className={`${nightMode ? 'text-gray-300' : 'text-gray-600'} mb-6`}>
//                 Load EPUB from local file or Cloudflare R2
//               </p>
              
//               <div className="w-full max-w-2xl space-y-4">
//                 <div className="flex gap-2">
//                   <input ref={r2UrlInputRef} type="text" placeholder="https://your-r2-bucket.r2.cloudflarestorage.com/book.epub" className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-600 focus:outline-none" />
//                   <button onClick={handleR2URLLoad} className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700">
//                     <Cloud size={18} />
//                     Load from R2
//                   </button>
//                 </div>
                
//                 <div className="text-sm text-gray-500">Or upload a local file:</div>
                
//                 <button onClick={() => fileInputRef.current?.click()} className="w-full px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700">
//                   <Upload size={18} className="inline mr-2" />
//                   Choose Local File
//                 </button>
//               </div>
//             </div>
//           ) : (
//             <>
//               <div ref={viewerRef} className="flex-1 overflow-hidden relative" style={{ minHeight: '500px' }} />
              
//               {/* Navigation */}
//               <div className={`flex items-center justify-between p-4 ${nightMode ? 'bg-gray-700' : 'bg-gray-50'} border-t`}>
//                 <button onClick={goToPrevPage} className={`flex items-center gap-2 px-4 py-2 ${nightMode ? 'bg-gray-600 hover:bg-gray-500' : 'bg-gray-200 hover:bg-gray-300'} rounded-lg transition-all`}>
//                   <ChevronLeft size={18} />
//                   Previous
//                 </button>
                
//                 <div className="flex-1 mx-5">
//                   <div className={`h-2 ${nightMode ? 'bg-gray-600' : 'bg-gray-200'} rounded-full overflow-hidden`}>
//                     <div className="h-full bg-purple-600 rounded-full transition-all" style={{ width: `${progress}%` }} />
//                   </div>
//                   <div className={`text-center text-sm ${nightMode ? 'text-gray-300' : 'text-gray-600'} mt-2 flex items-center justify-center gap-4`}>
//                     <span>{pageInfo || 'Loading...'}</span>
//                     <span>•</span>
//                     <span>{Math.round(progress)}% complete</span>
//                   </div>
//                 </div>
                
//                 <button onClick={goToNextPage} className={`flex items-center gap-2 px-4 py-2 ${nightMode ? 'bg-gray-600 hover:bg-gray-500' : 'bg-gray-200 hover:bg-gray-300'} rounded-lg transition-all`}>
//                   Next
//                   <ChevronRight size={18} />
//                 </button>
//               </div>
//             </>
//           )}
//         </div>
//       </div>

//       {/* Note Modal */}
//       {showNoteModal && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//           <div className={`${nightMode ? 'bg-gray-800 text-white' : 'bg-white'} rounded-xl p-6 shadow-2xl max-w-lg w-full`}>
//             <h3 className="text-xl font-bold mb-4">Add Note or Highlight</h3>
            
//             <div className={`p-3 ${nightMode ? 'bg-gray-700' : 'bg-gray-100'} rounded-lg mb-4 text-sm italic`}>
//               "{selectedText.substring(0, 200)}{selectedText.length > 200 ? '...' : ''}"
//             </div>
            
//             <div className="mb-4">
//               <label className="block text-sm font-semibold mb-2">Highlight Color</label>
//               <div className="flex gap-2">
//                 <button onClick={() => addHighlight('#ffeb3b')} className="w-10 h-10 rounded-full bg-yellow-300 border-2 border-gray-300 hover:border-purple-600"></button>
//                 <button onClick={() => addHighlight('#4caf50')} className="w-10 h-10 rounded-full bg-green-400 border-2 border-gray-300 hover:border-purple-600"></button>
//                 <button onClick={() => addHighlight('#2196f3')} className="w-10 h-10 rounded-full bg-blue-400 border-2 border-gray-300 hover:border-purple-600"></button>
//                 <button onClick={() => addHighlight('#ff9800')} className="w-10 h-10 rounded-full bg-orange-400 border-2 border-gray-300 hover:border-purple-600"></button>
//                 <button onClick={() => addHighlight('#e91e63')} className="w-10 h-10 rounded-full bg-pink-400 border-2 border-gray-300 hover:border-purple-600"></button>
//               </div>
//             </div>
            
//             <div className="mb-4">
//               <label className="block text-sm font-semibold mb-2">Add Note (Optional)</label>
//               <textarea
//                 value={currentNote}
//                 onChange={(e) => setCurrentNote(e.target.value)}
//                 placeholder="Write your thoughts..."
//                 className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-purple-600 ${nightMode ? 'bg-gray-700 border-gray-600' : 'border-gray-300'}`}
//                 rows="3"
//               />
//             </div>
            
//             <div className="flex gap-3">
//               <button onClick={addNote} disabled={!currentNote} className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed">
//                 Save Note
//               </button>
//               <button onClick={() => { setShowNoteModal(false); setSelectedText(''); setCurrentNote(''); }} className={`flex-1 px-4 py-2 ${nightMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} rounded-lg`}>
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Loading Overlay */}
//       {loading && (
//         <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
//           <div className={`${nightMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-8 shadow-2xl max-w-md w-full mx-4`}>
//             <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-600 border-t-transparent mx-auto mb-4" />
//             <p className={`${nightMode ? 'text-white' : 'text-gray-700'} font-semibold text-center mb-4 text-lg`}>
//               Loading your book...
//             </p>
//             <div className={`w-full ${nightMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full h-4 overflow-hidden`}>
//               <div className="bg-gradient-to-r from-purple-600 to-blue-600 h-full rounded-full transition-all duration-300" style={{ width: `${loadingProgress}%` }} />
//             </div>
//             <p className={`text-center text-sm ${nightMode ? 'text-gray-400' : 'text-gray-600'} mt-3 font-medium`}>
//               {loadingProgress}% complete
//             </p>
//             {loadingProgress > 0 && loadingProgress < 100 && (
//               <p className={`text-center text-xs ${nightMode ? 'text-gray-500' : 'text-gray-500'} mt-2`}>
//                 Please wait while we prepare your reading experience...
//               </p>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProfessionalEPUBReader;


///////////////////////////////////////////////
// import React, { useState, useEffect, useRef } from 'react';
// import { Upload, Bookmark, ChevronLeft, ChevronRight, Cloud, Search, Menu, X, Sun, Moon, Maximize, BookOpen, MessageSquare, Clock, Share2, Settings } from 'lucide-react';

// const ProfessionalEPUBReader = () => {
//   const [book, setBook] = useState(null);
//   const [rendition, setRendition] = useState(null);
//   const [toc, setToc] = useState([]);
//   const [currentLocation, setCurrentLocation] = useState(null);
//   const [progress, setProgress] = useState(0);
//   const [pageInfo, setPageInfo] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [bookLoaded, setBookLoaded] = useState(false);
//   const [fontSize, setFontSize] = useState(16);
//   const [theme, setTheme] = useState('light');
//   const [loadingProgress, setLoadingProgress] = useState(0);
  
//   const [bookmarks, setBookmarks] = useState([]);
//   const [notes, setNotes] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [searchResults, setSearchResults] = useState([]);
//   const [searching, setSearching] = useState(false);
//   const [readingTime, setReadingTime] = useState(0);
//   const [showSidebar, setShowSidebar] = useState(true);
//   const [sidebarTab, setSidebarTab] = useState('toc');
//   const [fullscreen, setFullscreen] = useState(false);
//   const [lineHeight, setLineHeight] = useState(1.6);
//   const [selectedText, setSelectedText] = useState('');
//   const [showNoteModal, setShowNoteModal] = useState(false);
//   const [currentNote, setCurrentNote] = useState('');
//   const [bookMetadata, setBookMetadata] = useState({});
//   const [nightMode, setNightMode] = useState(false);
//   const [showSettings, setShowSettings] = useState(false);
  
//   const viewerRef = useRef(null);
//   const fileInputRef = useRef(null);
//   const r2UrlInputRef = useRef(null);
//   const readingTimerRef = useRef(null);

//   useEffect(() => {
//     const loadScripts = async () => {
//       if (window.JSZip && window.ePub) return;
//       if (!window.JSZip) {
//         const jszipScript = document.createElement('script');
//         jszipScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js';
//         document.head.appendChild(jszipScript);
//         await new Promise((resolve) => { jszipScript.onload = resolve; });
//       }
//       if (!window.ePub) {
//         const epubjsScript = document.createElement('script');
//         epubjsScript.src = 'https://cdn.jsdelivr.net/npm/epubjs/dist/epub.min.js';
//         document.head.appendChild(epubjsScript);
//         await new Promise((resolve) => { epubjsScript.onload = resolve; });
//       }
//     };
//     loadScripts().catch(err => console.error('Script loading error:', err));
//   }, []);

//   useEffect(() => {
//     const savedBookmarks = localStorage.getItem('epub-bookmarks');
//     const savedNotes = localStorage.getItem('epub-notes');
//     if (savedBookmarks) setBookmarks(JSON.parse(savedBookmarks));
//     if (savedNotes) setNotes(JSON.parse(savedNotes));
//   }, []);

//   useEffect(() => {
//     if (bookLoaded) {
//       readingTimerRef.current = setInterval(() => {
//         setReadingTime(prev => prev + 1);
//       }, 1000);
//     }
//     return () => {
//       if (readingTimerRef.current) clearInterval(readingTimerRef.current);
//     };
//   }, [bookLoaded]);

//   const handleFileUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) loadBookFromFile(file);
//   };

//   const handleR2URLLoad = async () => {
//     const url = r2UrlInputRef.current?.value;
//     if (!url) {
//       alert('Please enter R2 URL');
//       return;
//     }
//     await loadBookFromURL(url);
//   };

//   const loadBookFromURL = async (url) => {
//     if (!window.ePub) {
//       alert('EPUB library not loaded yet. Please wait.');
//       return;
//     }
//     setBookLoaded(true);
//     setLoading(true);
//     setLoadingProgress(0);

//     setTimeout(async () => {
//       try {
//         if (!viewerRef.current) {
//           alert('Viewer not ready');
//           setLoading(false);
//           setBookLoaded(false);
//           return;
//         }

//         const response = await fetch(url);
//         if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

//         const contentLength = response.headers.get('content-length');
//         const total = parseInt(contentLength, 10);
//         let loaded = 0;
//         const reader = response.body.getReader();
//         const chunks = [];

//         while (true) {
//           const { done, value } = await reader.read();
//           if (done) break;
//           chunks.push(value);
//           loaded += value.length;
//           if (total) {
//             setLoadingProgress(Math.round((loaded / total) * 100));
//           }
//         }

//         const chunksAll = new Uint8Array(loaded);
//         let position = 0;
//         for (const chunk of chunks) {
//           chunksAll.set(chunk, position);
//           position += chunk.length;
//         }

//         await initializeBook(chunksAll.buffer);
//       } catch (err) {
//         console.error('URL loading error:', err);
//         alert('Failed to load from URL: ' + err.message);
//         setLoading(false);
//         setBookLoaded(false);
//       }
//     }, 200);
//   };

//   const loadBookFromFile = (file) => {
//     if (!window.ePub) {
//       alert('EPUB library not loaded yet. Please wait.');
//       return;
//     }
//     setBookLoaded(true);
//     setLoading(true);
//     setLoadingProgress(0);
    
//     const reader = new FileReader();
//     reader.onprogress = (e) => {
//       if (e.lengthComputable) {
//         setLoadingProgress(Math.round((e.loaded / e.total) * 100));
//       }
//     };
    
//     reader.onload = function(e) {
//       setTimeout(async () => {
//         try {
//           await initializeBook(e.target.result);
//         } catch(err) {
//           console.error('File loading error:', err);
//           alert('Failed to load EPUB: ' + err.message);
//           setLoading(false);
//           setBookLoaded(false);
//         }
//       }, 200);
//     };
    
//     reader.onerror = () => {
//       alert('Failed to read file');
//       setLoading(false);
//       setBookLoaded(false);
//     };
    
//     reader.readAsArrayBuffer(file);
//   };

//   const initializeBook = async (arrayBuffer) => {
//     if (!viewerRef.current) throw new Error('Viewer ref not available');

//     const newBook = window.ePub(arrayBuffer);
//     setBook(newBook);
    
//     viewerRef.current.innerHTML = '';
    
//     const newRendition = newBook.renderTo(viewerRef.current, {
//       width: '100%',
//       height: '100%',
//       spread: 'none',
//       allowScriptedContent: true
//     });
    
//     setRendition(newRendition);
    
//     newRendition.themes.register('light', {
//       'body': { 'color': '#000 !important', 'background': '#fff !important', 'line-height': lineHeight + ' !important' },
//       'img': { 'max-width': '100% !important', 'height': 'auto !important' }
//     });
    
//     newRendition.themes.register('sepia', {
//       'body': { 'color': '#5c4a37 !important', 'background': '#f4ecd8 !important', 'line-height': lineHeight + ' !important' },
//       'img': { 'max-width': '100% !important', 'height': 'auto !important' }
//     });
    
//     newRendition.themes.register('dark', {
//       'body': { 'color': '#e0e0e0 !important', 'background': '#1a1a1a !important', 'line-height': lineHeight + ' !important' },
//       'img': { 'max-width': '100% !important', 'height': 'auto !important' }
//     });
    
//     newRendition.themes.select(nightMode ? 'dark' : 'light');
    
//     await newRendition.display();
//     setLoading(false);
//     setLoadingProgress(100);
    
//     newBook.loaded.metadata.then(meta => {
//       setBookMetadata({
//         title: meta.title || 'Unknown',
//         creator: meta.creator || 'Unknown',
//         publisher: meta.publisher || 'Unknown'
//       });
//     });
    
//     newBook.loaded.navigation.then(nav => {
//       if (nav.toc && nav.toc.length > 0) setToc(nav.toc);
//     });
    
//     newBook.ready.then(() => newBook.locations.generate(1600));
    
//     newRendition.on('relocated', (location) => {
//       setCurrentLocation(location);
//       updateProgress(location, newBook);
//     });

//     newRendition.on('selected', (cfiRange, contents) => {
//       const selection = contents.window.getSelection();
//       const text = selection.toString().trim();
//       if (text) {
//         setSelectedText(text);
//         setShowNoteModal(true);
//       }
//     });
//   };

//   const updateProgress = (location, currentBook) => {
//     try {
//       if (currentBook && currentBook.locations && currentBook.locations.total > 0) {
//         const prog = currentBook.locations.percentageFromCfi(location.start.cfi);
//         setProgress(prog * 100);
//       }
//       if (location && location.start && location.start.displayed) {
//         setPageInfo(`Page ${location.start.displayed.page} of ${location.start.displayed.total}`);
//       }
//     } catch(err) {
//       console.error('Progress update error:', err);
//     }
//   };

//   const goToPrevPage = () => rendition?.prev();
//   const goToNextPage = () => rendition?.next();
//   const goToChapter = (href) => {
//     rendition?.display(href);
//     if (window.innerWidth < 768) setShowSidebar(false);
//   };

//   const handleFontSizeChange = (size) => {
//     setFontSize(size);
//     if (rendition) {
//       rendition.themes.fontSize(size + 'px');
//     }
//   };

//   const handleLineHeightChange = (height) => {
//     setLineHeight(height);
//     if (rendition) {
//       rendition.themes.override('line-height', height);
//     }
//   };

//   const handleThemeChange = (newTheme) => {
//     setTheme(newTheme);
//     rendition?.themes.select(newTheme);
//   };

//   const toggleNightMode = () => {
//     const newMode = !nightMode;
//     setNightMode(newMode);
//     if (rendition) {
//       rendition.themes.select(newMode ? 'dark' : theme);
//     }
//   };

//   const addBookmark = () => {
//     if (currentLocation) {
//       const bookmark = {
//         cfi: currentLocation.start.cfi,
//         page: pageInfo,
//         timestamp: Date.now(),
//         chapter: toc.find(t => currentLocation.start.href?.includes(t.href))?.label || 'Current Page'
//       };
//       const newBookmarks = [...bookmarks, bookmark];
//       setBookmarks(newBookmarks);
//       localStorage.setItem('epub-bookmarks', JSON.stringify(newBookmarks));
//       alert('✅ Bookmark added!');
//     }
//   };

//   const deleteBookmark = (index) => {
//     const newBookmarks = bookmarks.filter((_, i) => i !== index);
//     setBookmarks(newBookmarks);
//     localStorage.setItem('epub-bookmarks', JSON.stringify(newBookmarks));
//   };

//   const addNote = () => {
//     if (selectedText && currentNote && currentLocation) {
//       const note = {
//         cfi: currentLocation.start.cfi,
//         text: selectedText,
//         note: currentNote,
//         timestamp: Date.now(),
//         page: pageInfo
//       };
//       const newNotes = [...notes, note];
//       setNotes(newNotes);
//       localStorage.setItem('epub-notes', JSON.stringify(newNotes));
//       setShowNoteModal(false);
//       setSelectedText('');
//       setCurrentNote('');
//       alert('✅ Note added!');
//     }
//   };

//   const deleteNote = (index) => {
//     const newNotes = notes.filter((_, i) => i !== index);
//     setNotes(newNotes);
//     localStorage.setItem('epub-notes', JSON.stringify(newNotes));
//   };

//   const searchInBook = async () => {
//     if (!book || !searchQuery.trim()) {
//       alert('Please enter search query');
//       return;
//     }
    
//     setSearching(true);
//     setSearchResults([]);
    
//     try {
//       await book.ready;
//       const results = await book.spine.each(async (item) => {
//         try {
//           const doc = await item.load(book.load.bind(book));
//           const content = doc.body.textContent || '';
//           const searchLower = searchQuery.toLowerCase();
          
//           let index = 0;
//           while ((index = content.toLowerCase().indexOf(searchLower, index)) !== -1) {
//             const start = Math.max(0, index - 50);
//             const end = Math.min(content.length, index + searchQuery.length + 50);
//             const excerpt = content.substring(start, end);
            
//             setSearchResults(prev => [...prev, {
//               excerpt: (start > 0 ? '...' : '') + excerpt + (end < content.length ? '...' : ''),
//               href: item.href,
//               cfi: item.cfiBase
//             }]);
            
//             index += searchQuery.length;
//           }
//         } catch (err) {
//           console.error('Error searching item:', err);
//         }
//       });
      
//       setSearching(false);
//       setSidebarTab('search');
//     } catch (err) {
//       console.error('Search error:', err);
//       alert('Search failed: ' + err.message);
//       setSearching(false);
//     }
//   };

//   const goToSearchResult = (href) => {
//     rendition?.display(href);
//     if (window.innerWidth < 768) setShowSidebar(false);
//   };

//   const formatTime = (seconds) => {
//     const hrs = Math.floor(seconds / 3600);
//     const mins = Math.floor((seconds % 3600) / 60);
//     const secs = seconds % 60;
//     if (hrs > 0) return `${hrs}h ${mins}m`;
//     if (mins > 0) return `${mins}m`;
//     return `${secs}s`;
//   };

//   const shareProgress = () => {
//     const text = `I'm reading "${bookMetadata.title}" and I'm ${Math.round(progress)}% done! 📚`;
//     if (navigator.share) {
//       navigator.share({ title: bookMetadata.title, text: text });
//     } else {
//       navigator.clipboard.writeText(text);
//       alert('✅ Progress copied to clipboard!');
//     }
//   };

//   const toggleFullscreen = () => {
//     if (!document.fullscreenElement) {
//       document.documentElement.requestFullscreen();
//       setFullscreen(true);
//     } else {
//       document.exitFullscreen();
//       setFullscreen(false);
//     }
//   };

//   useEffect(() => {
//     const handleKeyPress = (e) => {
//       if (!rendition) return;
//       if (e.key === 'ArrowLeft') goToPrevPage();
//       else if (e.key === 'ArrowRight') goToNextPage();
//     };
//     window.addEventListener('keydown', handleKeyPress);
//     return () => window.removeEventListener('keydown', handleKeyPress);
//   }, [rendition]);

//   // Responsive sidebar auto-hide
//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth < 768) {
//         setShowSidebar(false);
//       }
//     };
//     handleResize();
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   return (
//     <div className={`min-h-screen ${nightMode ? 'bg-gray-900' : 'bg-gradient-to-br from-purple-500 to-purple-800'} flex flex-col`}>
//       {/* Header */}
//       <div className={`${nightMode ? 'bg-gray-800' : 'bg-white/95'} shadow-lg px-3 py-2 sm:px-6 sm:py-4`}>
//         <div className="max-w-7xl mx-auto flex justify-between items-center gap-2 sm:gap-4">
//           <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
//             <button onClick={() => setShowSidebar(!showSidebar)} className={`p-2 hover:bg-gray-200 rounded-lg ${nightMode ? 'text-white hover:bg-gray-700' : ''}`}>
//               {showSidebar ? <X size={20} /> : <Menu size={20} />}
//             </button>
//             <div className="min-w-0 flex-1">
//               <h1 className={`text-sm sm:text-xl font-bold ${nightMode ? 'text-white' : 'text-purple-600'} truncate`}>
//                 {bookMetadata.title || 'EPUB Reader Pro'}
//               </h1>
//               {bookMetadata.creator && (
//                 <p className="text-xs text-gray-500 truncate hidden sm:block">by {bookMetadata.creator}</p>
//               )}
//             </div>
//           </div>
          
//           <div className="flex gap-1 sm:gap-2">
//             {bookLoaded && (
//               <>
//                 <button onClick={toggleNightMode} className={`p-2 rounded-lg ${nightMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}>
//                   {nightMode ? <Sun size={16} className="sm:w-5 sm:h-5" /> : <Moon size={16} className="sm:w-5 sm:h-5" />}
//                 </button>
//                 <button onClick={() => setShowSettings(!showSettings)} className={`p-2 rounded-lg ${nightMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} hidden sm:block`}>
//                   <Settings size={18} />
//                 </button>
//                 <button onClick={addBookmark} className="px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm">
//                   <Bookmark size={16} className="sm:hidden" />
//                   <span className="hidden sm:inline">Save</span>
//                 </button>
//               </>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 flex p-2 sm:p-3 gap-2 sm:gap-3 max-w-[1800px] mx-auto w-full overflow-hidden">
//         {/* Sidebar */}
//         {showSidebar && (
//           <div className={`${window.innerWidth < 768 ? 'absolute inset-y-0 left-0 z-40 w-72' : 'w-64 lg:w-80'} ${nightMode ? 'bg-gray-800 text-white' : 'bg-white'} rounded-xl shadow-xl flex flex-col overflow-hidden`}>
//             <div className="flex border-b overflow-x-auto">
//               {[
//                 { id: 'toc', icon: BookOpen, label: 'TOC' },
//                 { id: 'bookmarks', icon: Bookmark, label: 'Marks' },
//                 { id: 'notes', icon: MessageSquare, label: 'Notes' },
//                 { id: 'search', icon: Search, label: 'Search' }
//               ].map(tab => (
//                 <button
//                   key={tab.id}
//                   onClick={() => setSidebarTab(tab.id)}
//                   className={`flex-1 py-2 sm:py-3 text-xs sm:text-sm font-semibold whitespace-nowrap ${sidebarTab === tab.id ? 'border-b-2 border-purple-600 text-purple-600' : 'text-gray-500'}`}
//                 >
//                   <tab.icon size={14} className="inline mr-1" />
//                   {tab.label}
//                 </button>
//               ))}
//             </div>

//             <div className="flex-1 overflow-y-auto p-3 sm:p-4">
//               {sidebarTab === 'toc' && (
//                 <div className="space-y-1 sm:space-y-2">
//                   {toc.length > 0 ? (
//                     toc.map((chapter, index) => (
//                       <div key={index} onClick={() => goToChapter(chapter.href)} className="p-2 sm:p-3 rounded-lg cursor-pointer hover:bg-purple-50 hover:text-purple-600 transition-all text-xs sm:text-sm">
//                         {chapter.label}
//                       </div>
//                     ))
//                   ) : (
//                     <p className="text-gray-400 text-xs sm:text-sm">No table of contents</p>
//                   )}
//                 </div>
//               )}

//               {sidebarTab === 'bookmarks' && (
//                 <div className="space-y-2">
//                   {bookmarks.length > 0 ? (
//                     bookmarks.map((bm, index) => (
//                       <div key={index} className="p-2 sm:p-3 rounded-lg border border-gray-200 hover:bg-purple-50">
//                         <div onClick={() => rendition?.display(bm.cfi)} className="cursor-pointer">
//                           <div className="font-semibold text-xs sm:text-sm">{bm.chapter}</div>
//                           <div className="text-xs text-gray-500 mt-1">{bm.page}</div>
//                         </div>
//                         <button onClick={() => deleteBookmark(index)} className="text-xs text-red-500 mt-2 hover:underline">Delete</button>
//                       </div>
//                     ))
//                   ) : (
//                     <p className="text-gray-400 text-xs sm:text-sm">No bookmarks yet</p>
//                   )}
//                 </div>
//               )}

//               {sidebarTab === 'notes' && (
//                 <div className="space-y-2">
//                   {notes.length > 0 ? (
//                     notes.map((note, index) => (
//                       <div key={index} className="p-2 sm:p-3 rounded-lg border border-gray-200">
//                         <div className="text-xs sm:text-sm italic mb-2">"{note.text.substring(0, 80)}..."</div>
//                         <div className="text-xs sm:text-sm font-semibold text-purple-600">{note.note}</div>
//                         <div className="text-xs text-gray-400 mt-2">{note.page}</div>
//                         <button onClick={() => deleteNote(index)} className="text-xs text-red-500 mt-2 hover:underline">Delete</button>
//                       </div>
//                     ))
//                   ) : (
//                     <p className="text-gray-400 text-xs sm:text-sm">No notes yet. Select text to add notes.</p>
//                   )}
//                 </div>
//               )}

//               {sidebarTab === 'search' && (
//                 <div>
//                   <div className="flex gap-2 mb-3 sm:mb-4">
//                     <input
//                       type="text"
//                       value={searchQuery}
//                       onChange={(e) => setSearchQuery(e.target.value)}
//                       onKeyPress={(e) => e.key === 'Enter' && searchInBook()}
//                       placeholder="Search..."
//                       className="flex-1 px-2 sm:px-3 py-1.5 sm:py-2 border rounded-lg text-xs sm:text-sm"
//                     />
//                     <button
//                       onClick={searchInBook}
//                       disabled={searching}
//                       className="px-3 sm:px-4 py-1.5 sm:py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
//                     >
//                       {searching ? '...' : <Search size={14} />}
//                     </button>
//                   </div>
//                   <div className="space-y-2">
//                     {searchResults.length > 0 ? (
//                       <>
//                         <p className="text-xs text-gray-500 mb-2">{searchResults.length} results found</p>
//                         {searchResults.map((result, index) => (
//                           <div key={index} onClick={() => goToSearchResult(result.href)} className="p-2 sm:p-3 rounded-lg cursor-pointer hover:bg-purple-50 border border-gray-200 text-xs sm:text-sm">
//                             {result.excerpt}
//                           </div>
//                         ))}
//                       </>
//                     ) : searchQuery && !searching ? (
//                       <p className="text-gray-400 text-xs sm:text-sm">No results found</p>
//                     ) : (
//                       <p className="text-gray-400 text-xs sm:text-sm">Enter search query and press Enter</p>
//                     )}
//                   </div>
//                 </div>
//               )}
//             </div>

//             {bookLoaded && showSettings && (
//               <div className="border-t p-3 sm:p-4 space-y-3">
//                 <div>
//                   <label className="block text-xs font-semibold mb-1">Font: {fontSize}px</label>
//                   <input type="range" min="12" max="28" value={fontSize} onChange={(e) => handleFontSizeChange(parseInt(e.target.value))} className="w-full" />
//                 </div>
//                 <div>
//                   <label className="block text-xs font-semibold mb-1">Line: {lineHeight.toFixed(1)}</label>
//                   <input type="range" min="1.2" max="2.5" step="0.1" value={lineHeight} onChange={(e) => handleLineHeightChange(parseFloat(e.target.value))} className="w-full" />
//                 </div>
//                 <div className="flex gap-2">
//                   {['light', 'sepia', 'dark'].map(t => (
//                     <button key={t} onClick={() => handleThemeChange(t)} className={`flex-1 py-1 text-xs rounded ${theme === t ? 'bg-purple-600 text-white' : 'bg-gray-200'}`}>
//                       {t}
//                     </button>
//                   ))}
//                 </div>
//                 <div className="text-xs text-gray-500">
//                   <Clock size={12} className="inline mr-1" />
//                   {formatTime(readingTime)}
//                 </div>
//               </div>
//             )}
//           </div>
//         )}

//         {/* Reader */}
//         <div className={`flex-1 ${nightMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-xl flex flex-col overflow-hidden min-w-0`}>
//           {!bookLoaded ? (
//             <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-10 text-center">
//               <div className="text-6xl sm:text-8xl mb-4 sm:mb-6">📖</div>
//               <h2 className={`text-xl sm:text-2xl font-bold ${nightMode ? 'text-white' : 'text-gray-800'} mb-2 sm:mb-3`}>
//                 EPUB Reader Pro
//               </h2>
//               <p className={`${nightMode ? 'text-gray-300' : 'text-gray-600'} mb-4 sm:mb-6 text-sm sm:text-base`}>
//                 Load from R2 or local file
//               </p>
              
//               <div className="w-full max-w-2xl space-y-3 sm:space-y-4">
//                 <div className="flex flex-col sm:flex-row gap-2">
//                   <input ref={r2UrlInputRef} type="text" placeholder="R2 URL..." className="flex-1 px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-300 rounded-lg text-sm sm:text-base" />
//                   <button onClick={handleR2URLLoad} className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 text-sm sm:text-base">
//                     <Cloud size={16} />
//                     <span className="hidden sm:inline">Load from R2</span>
//                     <span className="sm:hidden">Load R2</span>
//                   </button>
//                 </div>
                
//                 <input type="file" ref={fileInputRef} accept=".epub" onChange={handleFileUpload} className="hidden" />
//                 <button onClick={() => fileInputRef.current?.click()} className="w-full px-4 sm:px-6 py-2 sm:py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 text-sm sm:text-base">
//                   <Upload size={16} className="inline mr-2" />
//                   Choose Local File
//                 </button>
//               </div>
//             </div>
//           ) : (
//             <>
//               <div ref={viewerRef} className="flex-1 overflow-hidden" style={{ minHeight: '400px' }} />
              
//               <div className={`flex items-center justify-between p-2 sm:p-4 ${nightMode ? 'bg-gray-700' : 'bg-gray-50'} border-t gap-2`}>
//                 <button onClick={goToPrevPage} className={`flex items-center gap-1 px-2 sm:px-4 py-1.5 sm:py-2 ${nightMode ? 'bg-gray-600 hover:bg-gray-500' : 'bg-gray-200 hover:bg-gray-300'} rounded-lg transition-all text-xs sm:text-sm`}>
//                   <ChevronLeft size={16} />
//                   <span className="hidden sm:inline">Previous</span>
//                 </button>
                
//                 <div className="flex-1 mx-2 sm:mx-5 min-w-0">
//                   <div className={`h-1.5 sm:h-2 ${nightMode ? 'bg-gray-600' : 'bg-gray-200'} rounded-full overflow-hidden`}>
//                     <div className="h-full bg-purple-600 rounded-full transition-all" style={{ width: `${progress}%` }} />
//                   </div>
//                   <div className={`text-center text-xs sm:text-sm ${nightMode ? 'text-gray-300' : 'text-gray-600'} mt-1 sm:mt-2 flex items-center justify-center gap-2 flex-wrap`}>
//                     <span className="truncate">{pageInfo || 'Loading...'}</span>
//                     <span className="hidden sm:inline">•</span>
//                     <span className="hidden sm:inline">{Math.round(progress)}%</span>
//                   </div>
//                 </div>
                
//                 <button onClick={goToNextPage} className={`flex items-center gap-1 px-2 sm:px-4 py-1.5 sm:py-2 ${nightMode ? 'bg-gray-600 hover:bg-gray-500' : 'bg-gray-200 hover:bg-gray-300'} rounded-lg transition-all text-xs sm:text-sm`}>
//                   <span className="hidden sm:inline">Next</span>
//                   <ChevronRight size={16} />
//                 </button>
//               </div>
//             </>
//           )}
//         </div>
//       </div>

//       {/* Note Modal */}
//       {showNoteModal && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//           <div className={`${nightMode ? 'bg-gray-800 text-white' : 'bg-white'} rounded-xl p-4 sm:p-6 shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto`}>
//             <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Add Note</h3>
            
//             <div className={`p-2 sm:p-3 ${nightMode ? 'bg-gray-700' : 'bg-gray-100'} rounded-lg mb-3 sm:mb-4 text-xs sm:text-sm italic max-h-32 overflow-y-auto`}>
//               "{selectedText.substring(0, 300)}{selectedText.length > 300 ? '...' : ''}"
//             </div>
            
//             <div className="mb-3 sm:mb-4">
//               <label className="block text-sm font-semibold mb-2">Your Note</label>
//               <textarea
//                 value={currentNote}
//                 onChange={(e) => setCurrentNote(e.target.value)}
//                 placeholder="Write your thoughts..."
//                 className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-purple-600 text-sm ${nightMode ? 'bg-gray-700 border-gray-600' : 'border-gray-300'}`}
//                 rows="4"
//               />
//             </div>
            
//             <div className="flex gap-2 sm:gap-3">
//               <button 
//                 onClick={addNote} 
//                 disabled={!currentNote.trim()} 
//                 className="flex-1 px-3 sm:px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
//               >
//                 Save Note
//               </button>
//               <button 
//                 onClick={() => { setShowNoteModal(false); setSelectedText(''); setCurrentNote(''); }} 
//                 className={`flex-1 px-3 sm:px-4 py-2 ${nightMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} rounded-lg text-sm sm:text-base`}
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Loading Overlay */}
//       {loading && (
//         <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
//           <div className={`${nightMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 sm:p-8 shadow-2xl max-w-md w-full`}>
//             <div className="animate-spin rounded-full h-12 sm:h-16 w-12 sm:w-16 border-4 border-purple-600 border-t-transparent mx-auto mb-4" />
//             <p className={`${nightMode ? 'text-white' : 'text-gray-700'} font-semibold text-center mb-3 sm:mb-4 text-base sm:text-lg`}>
//               Loading your book...
//             </p>
//             <div className={`w-full ${nightMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full h-3 sm:h-4 overflow-hidden`}>
//               <div className="bg-gradient-to-r from-purple-600 to-blue-600 h-full rounded-full transition-all duration-300" style={{ width: `${loadingProgress}%` }} />
//             </div>
//             <p className={`text-center text-sm ${nightMode ? 'text-gray-400' : 'text-gray-600'} mt-2 sm:mt-3 font-medium`}>
//               {loadingProgress}% complete
//             </p>
//           </div>
//         </div>
//       )}

//       {/* Mobile overlay when sidebar is open */}
//       {showSidebar && window.innerWidth < 768 && (
//         <div 
//           className="fixed inset-0 bg-black/30 z-30"
//           onClick={() => setShowSidebar(false)}
//         />
//       )}
//     </div>
//   );
// };

// export default ProfessionalEPUBReader;
////////////////////////////////////////


import React, { useState, useEffect, useRef } from 'react';
import { Upload, Bookmark, ChevronLeft, ChevronRight, Cloud, Search, Menu, X, Sun, Moon, Maximize, BookOpen, MessageSquare, Clock, Share2, Settings, User, Download, Eye, EyeOff } from 'lucide-react';

const ProfessionalEPUBReader = () => {
  const [book, setBook] = useState(null);
  const [rendition, setRendition] = useState(null);
  const [toc, setToc] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [progress, setProgress] = useState(0);
  const [pageInfo, setPageInfo] = useState('');
  const [loading, setLoading] = useState(false);
  const [bookLoaded, setBookLoaded] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [theme, setTheme] = useState('light');
  const [loadingProgress, setLoadingProgress] = useState(0);
  
  const [bookmarks, setBookmarks] = useState([]);
  const [notes, setNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [readingTime, setReadingTime] = useState(0);
  const [showSidebar, setShowSidebar] = useState(true);
  const [sidebarTab, setSidebarTab] = useState('toc');
  const [fullscreen, setFullscreen] = useState(false);
  const [lineHeight, setLineHeight] = useState(1.6);
  const [selectedText, setSelectedText] = useState('');
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [currentNote, setCurrentNote] = useState('');
  const [bookMetadata, setBookMetadata] = useState({});
  const [nightMode, setNightMode] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showReadingStats, setShowReadingStats] = useState(false);
  const [fontFamily, setFontFamily] = useState('serif');
  
  const viewerRef = useRef(null);
  const fileInputRef = useRef(null);
  const r2UrlInputRef = useRef(null);
  const readingTimerRef = useRef(null);

  useEffect(() => {
    const loadScripts = async () => {
      if (window.JSZip && window.ePub) return;
      if (!window.JSZip) {
        const jszipScript = document.createElement('script');
        jszipScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js';
        document.head.appendChild(jszipScript);
        await new Promise((resolve) => { jszipScript.onload = resolve; });
      }
      if (!window.ePub) {
        const epubjsScript = document.createElement('script');
        epubjsScript.src = 'https://cdn.jsdelivr.net/npm/epubjs/dist/epub.min.js';
        document.head.appendChild(epubjsScript);
        await new Promise((resolve) => { epubjsScript.onload = resolve; });
      }
    };
    loadScripts().catch(err => console.error('Script loading error:', err));
  }, []);

  useEffect(() => {
    const savedBookmarks = localStorage.getItem('epub-bookmarks');
    const savedNotes = localStorage.getItem('epub-notes');
    if (savedBookmarks) setBookmarks(JSON.parse(savedBookmarks));
    if (savedNotes) setNotes(JSON.parse(savedNotes));
  }, []);

  useEffect(() => {
    if (bookLoaded) {
      readingTimerRef.current = setInterval(() => {
        setReadingTime(prev => prev + 1);
      }, 1000);
    }
    return () => {
      if (readingTimerRef.current) clearInterval(readingTimerRef.current);
    };
  }, [bookLoaded]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) loadBookFromFile(file);
  };

  const handleR2URLLoad = async () => {
    const url = r2UrlInputRef.current?.value;
    if (!url) {
      alert('Please enter R2 URL');
      return;
    }
    await loadBookFromURL(url);
  };

  const loadBookFromURL = async (url) => {
    if (!window.ePub) {
      alert('EPUB library not loaded yet. Please wait.');
      return;
    }
    setBookLoaded(true);
    setLoading(true);
    setLoadingProgress(0);

    setTimeout(async () => {
      try {
        if (!viewerRef.current) {
          alert('Viewer not ready');
          setLoading(false);
          setBookLoaded(false);
          return;
        }

        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const contentLength = response.headers.get('content-length');
        const total = parseInt(contentLength, 10);
        let loaded = 0;
        const reader = response.body.getReader();
        const chunks = [];

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          chunks.push(value);
          loaded += value.length;
          if (total) {
            setLoadingProgress(Math.round((loaded / total) * 100));
          }
        }

        const chunksAll = new Uint8Array(loaded);
        let position = 0;
        for (const chunk of chunks) {
          chunksAll.set(chunk, position);
          position += chunk.length;
        }

        await initializeBook(chunksAll.buffer);
      } catch (err) {
        console.error('URL loading error:', err);
        alert('Failed to load from URL: ' + err.message);
        setLoading(false);
        setBookLoaded(false);
      }
    }, 200);
  };

  const loadBookFromFile = (file) => {
    if (!window.ePub) {
      alert('EPUB library not loaded yet. Please wait.');
      return;
    }
    setBookLoaded(true);
    setLoading(true);
    setLoadingProgress(0);
    
    const reader = new FileReader();
    reader.onprogress = (e) => {
      if (e.lengthComputable) {
        setLoadingProgress(Math.round((e.loaded / e.total) * 100));
      }
    };
    
    reader.onload = function(e) {
      setTimeout(async () => {
        try {
          await initializeBook(e.target.result);
        } catch(err) {
          console.error('File loading error:', err);
          alert('Failed to load EPUB: ' + err.message);
          setLoading(false);
          setBookLoaded(false);
        }
      }, 200);
    };
    
    reader.onerror = () => {
      alert('Failed to read file');
      setLoading(false);
      setBookLoaded(false);
    };
    
    reader.readAsArrayBuffer(file);
  };

  const initializeBook = async (arrayBuffer) => {
    if (!viewerRef.current) throw new Error('Viewer ref not available');

    const newBook = window.ePub(arrayBuffer);
    setBook(newBook);
    
    viewerRef.current.innerHTML = '';
    
    const newRendition = newBook.renderTo(viewerRef.current, {
      width: '100%',
      height: '100%',
      spread: 'none',
      allowScriptedContent: true
    });
    
    setRendition(newRendition);
    
    newRendition.themes.register('light', {
      'body': { 
        'color': '#000 !important', 
        'background': '#fff !important', 
        'line-height': lineHeight + ' !important',
        'font-family': fontFamily === 'serif' ? 'Georgia, serif !important' : 
                      fontFamily === 'sans-serif' ? 'Inter, system-ui, sans-serif !important' : 
                      '"Courier New", monospace !important'
      },
      'img': { 'max-width': '100% !important', 'height': 'auto !important' }
    });
    
    newRendition.themes.register('sepia', {
      'body': { 
        'color': '#5c4a37 !important', 
        'background': '#f4ecd8 !important', 
        'line-height': lineHeight + ' !important',
        'font-family': fontFamily === 'serif' ? 'Georgia, serif !important' : 
                      fontFamily === 'sans-serif' ? 'Inter, system-ui, sans-serif !important' : 
                      '"Courier New", monospace !important'
      },
      'img': { 'max-width': '100% !important', 'height': 'auto !important' }
    });
    
    newRendition.themes.register('dark', {
      'body': { 
        'color': '#e0e0e0 !important', 
        'background': '#1a1a1a !important', 
        'line-height': lineHeight + ' !important',
        'font-family': fontFamily === 'serif' ? 'Georgia, serif !important' : 
                      fontFamily === 'sans-serif' ? 'Inter, system-ui, sans-serif !important' : 
                      '"Courier New", monospace !important'
      },
      'img': { 'max-width': '100% !important', 'height': 'auto !important' }
    });
    
    newRendition.themes.select(nightMode ? 'dark' : theme);
    newRendition.themes.fontSize(fontSize + 'px');
    
    await newRendition.display();
    setLoading(false);
    setLoadingProgress(100);
    
    newBook.loaded.metadata.then(meta => {
      setBookMetadata({
        title: meta.title || 'Unknown',
        creator: meta.creator || 'Unknown',
        publisher: meta.publisher || 'Unknown'
      });
    });
    
    newBook.loaded.navigation.then(nav => {
      if (nav.toc && nav.toc.length > 0) setToc(nav.toc);
    });
    
    newBook.ready.then(() => newBook.locations.generate(1600));
    
    newRendition.on('relocated', (location) => {
      setCurrentLocation(location);
      updateProgress(location, newBook);
    });

    newRendition.on('selected', (cfiRange, contents) => {
      const selection = contents.window.getSelection();
      const text = selection.toString().trim();
      if (text) {
        setSelectedText(text);
        setShowNoteModal(true);
      }
    });
  };

  const updateProgress = (location, currentBook) => {
    try {
      if (currentBook && currentBook.locations && currentBook.locations.total > 0) {
        const prog = currentBook.locations.percentageFromCfi(location.start.cfi);
        setProgress(prog * 100);
      }
      if (location && location.start && location.start.displayed) {
        setPageInfo(`Page ${location.start.displayed.page} of ${location.start.displayed.total}`);
      }
    } catch(err) {
      console.error('Progress update error:', err);
    }
  };

  const goToPrevPage = () => rendition?.prev();
  const goToNextPage = () => rendition?.next();
  const goToChapter = (href) => {
    rendition?.display(href);
    if (window.innerWidth < 768) setShowSidebar(false);
  };

  const handleFontSizeChange = (size) => {
    setFontSize(size);
    if (rendition) {
      rendition.themes.fontSize(size + 'px');
    }
  };

  const handleLineHeightChange = (height) => {
    setLineHeight(height);
    if (rendition) {
      rendition.themes.override('line-height', height);
    }
  };

  const handleFontFamilyChange = (family) => {
    setFontFamily(family);
    if (rendition) {
      rendition.themes.override('font-family', 
        family === 'serif' ? 'Georgia, serif !important' : 
        family === 'sans-serif' ? 'Inter, system-ui, sans-serif !important' : 
        '"Courier New", monospace !important'
      );
    }
  };

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    rendition?.themes.select(newTheme);
  };

  const toggleNightMode = () => {
    const newMode = !nightMode;
    setNightMode(newMode);
    if (rendition) {
      rendition.themes.select(newMode ? 'dark' : theme);
    }
  };

  const addBookmark = () => {
    if (currentLocation) {
      const bookmark = {
        cfi: currentLocation.start.cfi,
        page: pageInfo,
        timestamp: Date.now(),
        chapter: toc.find(t => currentLocation.start.href?.includes(t.href))?.label || 'Current Page'
      };
      const newBookmarks = [...bookmarks, bookmark];
      setBookmarks(newBookmarks);
      localStorage.setItem('epub-bookmarks', JSON.stringify(newBookmarks));
      alert('✅ Bookmark added!');
    }
  };

  const deleteBookmark = (index) => {
    const newBookmarks = bookmarks.filter((_, i) => i !== index);
    setBookmarks(newBookmarks);
    localStorage.setItem('epub-bookmarks', JSON.stringify(newBookmarks));
  };

  const addNote = () => {
    if (selectedText && currentNote && currentLocation) {
      const note = {
        cfi: currentLocation.start.cfi,
        text: selectedText,
        note: currentNote,
        timestamp: Date.now(),
        page: pageInfo
      };
      const newNotes = [...notes, note];
      setNotes(newNotes);
      localStorage.setItem('epub-notes', JSON.stringify(newNotes));
      setShowNoteModal(false);
      setSelectedText('');
      setCurrentNote('');
      alert('✅ Note added!');
    }
  };

  const deleteNote = (index) => {
    const newNotes = notes.filter((_, i) => i !== index);
    setNotes(newNotes);
    localStorage.setItem('epub-notes', JSON.stringify(newNotes));
  };

  const searchInBook = async () => {
    if (!book || !searchQuery.trim()) {
      alert('Please enter search query');
      return;
    }
    
    setSearching(true);
    setSearchResults([]);
    
    try {
      await book.ready;
      const results = await book.spine.each(async (item) => {
        try {
          const doc = await item.load(book.load.bind(book));
          const content = doc.body.textContent || '';
          const searchLower = searchQuery.toLowerCase();
          
          let index = 0;
          while ((index = content.toLowerCase().indexOf(searchLower, index)) !== -1) {
            const start = Math.max(0, index - 50);
            const end = Math.min(content.length, index + searchQuery.length + 50);
            const excerpt = content.substring(start, end);
            
            setSearchResults(prev => [...prev, {
              excerpt: (start > 0 ? '...' : '') + excerpt + (end < content.length ? '...' : ''),
              href: item.href,
              cfi: item.cfiBase
            }]);
            
            index += searchQuery.length;
          }
        } catch (err) {
          console.error('Error searching item:', err);
        }
      });
      
      setSearching(false);
      setSidebarTab('search');
    } catch (err) {
      console.error('Search error:', err);
      alert('Search failed: ' + err.message);
      setSearching(false);
    }
  };

  const goToSearchResult = (href) => {
    rendition?.display(href);
    if (window.innerWidth < 768) setShowSidebar(false);
  };

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    if (hrs > 0) return `${hrs}h ${mins}m`;
    if (mins > 0) return `${mins}m`;
    return `${secs}s`;
  };

  const shareProgress = () => {
    const text = `I'm reading "${bookMetadata.title}" and I'm ${Math.round(progress)}% done! 📚`;
    if (navigator.share) {
      navigator.share({ title: bookMetadata.title, text: text });
    } else {
      navigator.clipboard.writeText(text);
      alert('✅ Progress copied to clipboard!');
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setFullscreen(true);
    } else {
      document.exitFullscreen();
      setFullscreen(false);
    }
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!rendition) return;
      if (e.key === 'ArrowLeft') goToPrevPage();
      else if (e.key === 'ArrowRight') goToNextPage();
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [rendition]);

  // Responsive sidebar auto-hide
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setShowSidebar(false);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={`min-h-screen ${nightMode ? 'bg-gray-900' : 'bg-gradient-to-br from-purple-500 to-indigo-700'} flex flex-col transition-colors duration-300`}>
      {/* Header */}
      <div className={`${nightMode ? 'bg-gray-800' : 'bg-white/95 backdrop-blur-sm'} shadow-lg px-3 py-2 sm:px-6 sm:py-4 transition-colors duration-300`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center gap-2 sm:gap-4">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
            <button 
              onClick={() => setShowSidebar(!showSidebar)} 
              className={`p-2 rounded-lg transition-all duration-200 ${nightMode ? 'text-white hover:bg-gray-700' : 'hover:bg-purple-100 text-purple-700'}`}
            >
              {showSidebar ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div className="min-w-0 flex-1">
              <h1 className={`text-sm sm:text-xl font-bold ${nightMode ? 'text-white' : 'text-purple-600'} truncate`}>
                {bookMetadata.title || 'EPUB Reader Pro'}
              </h1>
              {bookMetadata.creator && (
                <p className="text-xs text-gray-500 truncate hidden sm:block">by {bookMetadata.creator}</p>
              )}
            </div>
          </div>
          
          <div className="flex gap-1 sm:gap-2">
            {bookLoaded && (
              <>
                <button 
                  onClick={toggleNightMode} 
                  className={`p-2 rounded-lg transition-all duration-200 ${nightMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-purple-100 hover:bg-purple-200 text-purple-700'}`}
                >
                  {nightMode ? <Sun size={16} className="sm:w-5 sm:h-5" /> : <Moon size={16} className="sm:w-5 sm:h-5" />}
                </button>
                <button 
                  onClick={() => setShowSettings(!showSettings)} 
                  className={`p-2 rounded-lg transition-all duration-200 ${nightMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-purple-100 hover:bg-purple-200 text-purple-700'} hidden sm:block`}
                >
                  <Settings size={18} />
                </button>
                <button 
                  onClick={() => setShowReadingStats(!showReadingStats)} 
                  className={`p-2 rounded-lg transition-all duration-200 ${nightMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-purple-100 hover:bg-purple-200 text-purple-700'}`}
                >
                  <Eye size={18} />
                </button>
                <button 
                  onClick={addBookmark} 
                  className="px-3 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 text-sm shadow-md"
                >
                  <Bookmark size={16} className="sm:hidden" />
                  <span className="hidden sm:inline">Save</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex p-2 sm:p-3 gap-2 sm:gap-3 max-w-[1800px] mx-auto w-full overflow-hidden">
        {/* Sidebar */}
        {showSidebar && (
          <div className={`${window.innerWidth < 768 ? 'absolute inset-y-0 left-0 z-40 w-72' : 'w-64 lg:w-80'} ${nightMode ? 'bg-gray-800 text-white' : 'bg-white'} rounded-xl shadow-xl flex flex-col overflow-hidden transition-all duration-300`}>
            <div className="flex border-b overflow-x-auto">
              {[
                { id: 'toc', icon: BookOpen, label: 'Contents' },
                { id: 'bookmarks', icon: Bookmark, label: 'Bookmarks' },
                { id: 'notes', icon: MessageSquare, label: 'Notes' },
                { id: 'search', icon: Search, label: 'Search' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setSidebarTab(tab.id)}
                  className={`flex-1 py-2 sm:py-3 text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 ${sidebarTab === tab.id ? 
                    nightMode ? 'border-b-2 border-purple-400 text-purple-400' : 'border-b-2 border-purple-600 text-purple-600' : 
                    nightMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  <tab.icon size={14} className="inline mr-1" />
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="flex-1 overflow-y-auto p-3 sm:p-4">
              {sidebarTab === 'toc' && (
                <div className="space-y-1 sm:space-y-2">
                  {toc.length > 0 ? (
                    toc.map((chapter, index) => (
                      <div 
                        key={index} 
                        onClick={() => goToChapter(chapter.href)} 
                        className={`p-2 sm:p-3 rounded-lg cursor-pointer transition-all duration-200 text-xs sm:text-sm ${
                          nightMode ? 'hover:bg-gray-700 hover:text-purple-300' : 'hover:bg-purple-50 hover:text-purple-600'
                        }`}
                      >
                        {chapter.label}
                      </div>
                    ))
                  ) : (
                    <p className={`text-center py-4 ${nightMode ? 'text-gray-400' : 'text-gray-500'} text-xs sm:text-sm`}>No table of contents</p>
                  )}
                </div>
              )}

              {sidebarTab === 'bookmarks' && (
                <div className="space-y-2">
                  {bookmarks.length > 0 ? (
                    bookmarks.map((bm, index) => (
                      <div 
                        key={index} 
                        className={`p-2 sm:p-3 rounded-lg border transition-all duration-200 ${
                          nightMode ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-200 hover:bg-purple-50'
                        }`}
                      >
                        <div onClick={() => rendition?.display(bm.cfi)} className="cursor-pointer">
                          <div className="font-semibold text-xs sm:text-sm">{bm.chapter}</div>
                          <div className={`text-xs mt-1 ${nightMode ? 'text-gray-400' : 'text-gray-500'}`}>{bm.page}</div>
                        </div>
                        <button 
                          onClick={() => deleteBookmark(index)} 
                          className="text-xs text-red-500 mt-2 hover:underline transition-all duration-200"
                        >
                          Delete
                        </button>
                      </div>
                    ))
                  ) : (
                    <p className={`text-center py-4 ${nightMode ? 'text-gray-400' : 'text-gray-500'} text-xs sm:text-sm`}>No bookmarks yet</p>
                  )}
                </div>
              )}

              {sidebarTab === 'notes' && (
                <div className="space-y-2">
                  {notes.length > 0 ? (
                    notes.map((note, index) => (
                      <div 
                        key={index} 
                        className={`p-2 sm:p-3 rounded-lg border transition-all duration-200 ${
                          nightMode ? 'border-gray-700' : 'border-gray-200'
                        }`}
                      >
                        <div className="text-xs sm:text-sm italic mb-2">"{note.text.substring(0, 80)}..."</div>
                        <div className={`text-xs sm:text-sm font-semibold ${nightMode ? 'text-purple-400' : 'text-purple-600'}`}>{note.note}</div>
                        <div className={`text-xs mt-2 ${nightMode ? 'text-gray-400' : 'text-gray-500'}`}>{note.page}</div>
                        <button 
                          onClick={() => deleteNote(index)} 
                          className="text-xs text-red-500 mt-2 hover:underline transition-all duration-200"
                        >
                          Delete
                        </button>
                      </div>
                    ))
                  ) : (
                    <p className={`text-center py-4 ${nightMode ? 'text-gray-400' : 'text-gray-500'} text-xs sm:text-sm`}>No notes yet. Select text to add notes.</p>
                  )}
                </div>
              )}

              {sidebarTab === 'search' && (
                <div>
                  <div className="flex gap-2 mb-3 sm:mb-4">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && searchInBook()}
                      placeholder="Search..."
                      className={`flex-1 px-2 sm:px-3 py-1.5 sm:py-2 border rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200 ${
                        nightMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'
                      }`}
                    />
                    <button
                      onClick={searchInBook}
                      disabled={searching}
                      className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 disabled:opacity-50 transition-all duration-200 shadow-md"
                    >
                      {searching ? (
                        <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                      ) : (
                        <Search size={14} />
                      )}
                    </button>
                  </div>
                  <div className="space-y-2">
                    {searchResults.length > 0 ? (
                      <>
                        <p className={`text-xs mb-2 ${nightMode ? 'text-gray-400' : 'text-gray-500'}`}>{searchResults.length} results found</p>
                        {searchResults.map((result, index) => (
                          <div 
                            key={index} 
                            onClick={() => goToSearchResult(result.href)} 
                            className={`p-2 sm:p-3 rounded-lg cursor-pointer border transition-all duration-200 text-xs sm:text-sm ${
                              nightMode ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-200 hover:bg-purple-50'
                            }`}
                          >
                            {result.excerpt}
                          </div>
                        ))}
                      </>
                    ) : searchQuery && !searching ? (
                      <p className={`text-center py-4 ${nightMode ? 'text-gray-400' : 'text-gray-500'} text-xs sm:text-sm`}>No results found</p>
                    ) : (
                      <p className={`text-center py-4 ${nightMode ? 'text-gray-400' : 'text-gray-500'} text-xs sm:text-sm`}>Enter search query and press Enter</p>
                    )}
                  </div>
                </div>
              )}
            </div>

            {bookLoaded && showSettings && (
              <div className={`border-t p-3 sm:p-4 space-y-3 ${nightMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <div>
                  <label className={`block text-xs font-semibold mb-1 ${nightMode ? 'text-gray-300' : 'text-gray-700'}`}>Font Size: {fontSize}px</label>
                  <input 
                    type="range" 
                    min="12" 
                    max="28" 
                    value={fontSize} 
                    onChange={(e) => handleFontSizeChange(parseInt(e.target.value))} 
                    className="w-full accent-purple-600"
                  />
                </div>
                <div>
                  <label className={`block text-xs font-semibold mb-1 ${nightMode ? 'text-gray-300' : 'text-gray-700'}`}>Line Height: {lineHeight.toFixed(1)}</label>
                  <input 
                    type="range" 
                    min="1.2" 
                    max="2.5" 
                    step="0.1" 
                    value={lineHeight} 
                    onChange={(e) => handleLineHeightChange(parseFloat(e.target.value))} 
                    className="w-full accent-purple-600"
                  />
                </div>
                <div>
                  <label className={`block text-xs font-semibold mb-1 ${nightMode ? 'text-gray-300' : 'text-gray-700'}`}>Font Family</label>
                  <div className="flex gap-2">
                    {['serif', 'sans-serif', 'monospace'].map(font => (
                      <button 
                        key={font} 
                        onClick={() => handleFontFamilyChange(font)} 
                        className={`flex-1 py-1 text-xs rounded transition-all duration-200 ${
                          fontFamily === font ? 
                            nightMode ? 'bg-purple-600 text-white' : 'bg-purple-600 text-white' : 
                            nightMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'
                        }`}
                      >
                        {font}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  {['light', 'sepia', 'dark'].map(t => (
                    <button 
                      key={t} 
                      onClick={() => handleThemeChange(t)} 
                      className={`flex-1 py-1 text-xs rounded transition-all duration-200 ${
                        theme === t ? 
                          nightMode ? 'bg-purple-600 text-white' : 'bg-purple-600 text-white' : 
                          nightMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
                <div className={`text-xs ${nightMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  <Clock size={12} className="inline mr-1" />
                  {formatTime(readingTime)}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Reader */}
        <div className={`flex-1 ${nightMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-xl flex flex-col overflow-hidden min-w-0 transition-all duration-300`}>
          {!bookLoaded ? (
            <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-10 text-center">
              <div className="text-6xl sm:text-8xl mb-4 sm:mb-6 animate-pulse">📖</div>
              <h2 className={`text-xl sm:text-2xl font-bold ${nightMode ? 'text-white' : 'text-gray-800'} mb-2 sm:mb-3`}>
                EPUB Reader Pro
              </h2>
              <p className={`${nightMode ? 'text-gray-300' : 'text-gray-600'} mb-4 sm:mb-6 text-sm sm:text-base`}>
                Load from R2 or local file
              </p>
              
              <div className="w-full max-w-2xl space-y-3 sm:space-y-4">
                <div className="flex flex-col sm:flex-row gap-2">
                  <input 
                    ref={r2UrlInputRef} 
                    type="text" 
                    placeholder="R2 URL..." 
                    className={`flex-1 px-3 sm:px-4 py-2 sm:py-3 border-2 rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
                      nightMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'
                    }`} 
                  />
                  <button 
                    onClick={handleR2URLLoad} 
                    className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 text-sm sm:text-base shadow-md"
                  >
                    <Cloud size={16} />
                    <span className="hidden sm:inline">Load from R2</span>
                    <span className="sm:hidden">Load R2</span>
                  </button>
                </div>
                
                <input type="file" ref={fileInputRef} accept=".epub" onChange={handleFileUpload} className="hidden" />
                <button 
                  onClick={() => fileInputRef.current?.click()} 
                  className="w-full px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 text-sm sm:text-base shadow-md"
                >
                  <Upload size={16} className="inline mr-2" />
                  Choose Local File
                </button>
              </div>
            </div>
          ) : (
            <>
              <div ref={viewerRef} className="flex-1 overflow-hidden" style={{ minHeight: '400px' }} />
              
              <div className={`flex items-center justify-between p-2 sm:p-4 ${nightMode ? 'bg-gray-700' : 'bg-gray-50'} border-t gap-2 transition-all duration-300`}>
                <button 
                  onClick={goToPrevPage} 
                  className={`flex items-center gap-1 px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-all duration-200 text-xs sm:text-sm shadow-md ${
                    nightMode ? 'bg-gray-600 hover:bg-gray-500 text-white' : 'bg-white hover:bg-gray-100 text-gray-700 border border-gray-200'
                  }`}
                >
                  <ChevronLeft size={16} />
                  <span className="hidden sm:inline">Previous</span>
                </button>
                
                <div className="flex-1 mx-2 sm:mx-5 min-w-0">
                  <div className={`h-1.5 sm:h-2 ${nightMode ? 'bg-gray-600' : 'bg-gray-200'} rounded-full overflow-hidden`}>
                    <div className="h-full bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
                  </div>
                  <div className={`text-center text-xs sm:text-sm mt-1 sm:mt-2 flex items-center justify-center gap-2 flex-wrap ${
                    nightMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    <span className="truncate">{pageInfo || 'Loading...'}</span>
                    <span className="hidden sm:inline">•</span>
                    <span className="hidden sm:inline">{Math.round(progress)}%</span>
                  </div>
                </div>
                
                <button 
                  onClick={goToNextPage} 
                  className={`flex items-center gap-1 px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-all duration-200 text-xs sm:text-sm shadow-md ${
                    nightMode ? 'bg-gray-600 hover:bg-gray-500 text-white' : 'bg-white hover:bg-gray-100 text-gray-700 border border-gray-200'
                  }`}
                >
                  <span className="hidden sm:inline">Next</span>
                  <ChevronRight size={16} />
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Reading Stats Panel */}
      {showReadingStats && bookLoaded && (
        <div className={`fixed right-4 top-20 z-30 w-64 p-4 rounded-xl shadow-2xl transition-all duration-300 ${
          nightMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
        }`}>
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold text-sm">Reading Stats</h3>
            <button 
              onClick={() => setShowReadingStats(false)} 
              className={`p-1 rounded-full ${nightMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
            >
              <X size={16} />
            </button>
          </div>
          
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span>Reading Time:</span>
              <span className="font-semibold">{formatTime(readingTime)}</span>
            </div>
            <div className="flex justify-between">
              <span>Progress:</span>
              <span className="font-semibold">{Math.round(progress)}%</span>
            </div>
            <div className="flex justify-between">
              <span>Bookmarks:</span>
              <span className="font-semibold">{bookmarks.length}</span>
            </div>
            <div className="flex justify-between">
              <span>Notes:</span>
              <span className="font-semibold">{notes.length}</span>
            </div>
          </div>
          
          <button 
            onClick={shareProgress} 
            className="w-full mt-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 text-sm font-medium"
          >
            Share Progress
          </button>
        </div>
      )}

      {/* Note Modal */}
      {showNoteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className={`${nightMode ? 'bg-gray-800 text-white' : 'bg-white'} rounded-xl p-4 sm:p-6 shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto transition-all duration-300`}>
            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Add Note</h3>
            
            <div className={`p-2 sm:p-3 rounded-lg mb-3 sm:mb-4 text-xs sm:text-sm italic max-h-32 overflow-y-auto ${
              nightMode ? 'bg-gray-700' : 'bg-gray-100'
            }`}>
              "{selectedText.substring(0, 300)}{selectedText.length > 300 ? '...' : ''}"
            </div>
            
            <div className="mb-3 sm:mb-4">
              <label className="block text-sm font-semibold mb-2">Your Note</label>
              <textarea
                value={currentNote}
                onChange={(e) => setCurrentNote(e.target.value)}
                placeholder="Write your thoughts..."
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm transition-all duration-200 ${
                  nightMode ? 'bg-gray-700 border-gray-600' : 'border-gray-300'
                }`}
                rows="4"
              />
            </div>
            
            <div className="flex gap-2 sm:gap-3">
              <button 
                onClick={addNote} 
                disabled={!currentNote.trim()} 
                className="flex-1 px-3 sm:px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base transition-all duration-200 shadow-md"
              >
                Save Note
              </button>
              <button 
                onClick={() => { setShowNoteModal(false); setSelectedText(''); setCurrentNote(''); }} 
                className={`flex-1 px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base transition-all duration-200 ${
                  nightMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className={`${nightMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 sm:p-8 shadow-2xl max-w-md w-full transition-all duration-300`}>
            <div className="animate-spin rounded-full h-12 sm:h-16 w-12 sm:w-16 border-4 border-purple-600 border-t-transparent mx-auto mb-4"></div>
            <p className={`${nightMode ? 'text-white' : 'text-gray-700'} font-semibold text-center mb-3 sm:mb-4 text-base sm:text-lg`}>
              Loading your book...
            </p>
            <div className={`w-full ${nightMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full h-3 sm:h-4 overflow-hidden`}>
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 h-full rounded-full transition-all duration-300" style={{ width: `${loadingProgress}%` }} />
            </div>
            <p className={`text-center text-sm mt-2 sm:mt-3 font-medium ${nightMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {loadingProgress}% complete
            </p>
          </div>
        </div>
      )}

      {/* Mobile overlay when sidebar is open */}
      {showSidebar && window.innerWidth < 768 && (
        <div 
          className="fixed inset-0 bg-black/30 z-30 transition-all duration-300"
          onClick={() => setShowSidebar(false)}
        />
      )}
    </div>
  );
};

export default ProfessionalEPUBReader;




