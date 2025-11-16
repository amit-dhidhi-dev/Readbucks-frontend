// Read.jsx — Converted to use epub.js (full reader)
// Notes:
// - Uses epubjs (import ePub from 'epubjs') to manage rendering (rendition) internally.
// - Supports: file upload, TOC, pagination (paginated/continuous), themes (dark/light), font size, line height, font family,
//   bookmarks (CFI-based), save/restore location, keyboard nav, auto-hide controls, and basic search (uses book.search if available).
// - Keep in mind: some epub.js features depend on the version. If `book.search` isn't available you can add a text-index step.

import React, { useEffect, useRef, useState } from 'react';
import ePub from 'epubjs';
import { Book, ChevronLeft, ChevronRight, Menu, X, Upload, Search, Settings, Bookmark, Moon, Sun, ZoomIn, ZoomOut } from 'lucide-react';



export default function TestPage() {
  const viewerRef = useRef(null);
  const bookRef = useRef(null); // epub.js Book instance
  const renditionRef = useRef(null); // epub.js Rendition

  const [fileName, setFileName] = useState(null);
  const [toc, setToc] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(null); // cfi or location object
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [coverImage, setCoverImage] = useState(null);

  // reader settings
  const [fontSize, setFontSize] = useState(18);
  const [fontFamily, setFontFamily] = useState('serif');
  const [lineHeight, setLineHeight] = useState(1.8);
  const [darkMode, setDarkMode] = useState(false);
  const [pageMode, setPageMode] = useState(true); // paginated vs scrolled

  // UI state
  const [showToc, setShowToc] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [bookmarks, setBookmarks] = useState([]); // store CFIs
  const [showNavigation, setShowNavigation] = useState(true);
  const [lastMouseMove, setLastMouseMove] = useState(Date.now());
  const [readingProgress, setReadingProgress] = useState(0);

  // Auto-hide controls
  useEffect(() => {
    const handleMouseMove = () => {
      setShowNavigation(true);
      setLastMouseMove(Date.now());
    };

    const checkInactivity = setInterval(() => {
      if (Date.now() - lastMouseMove > 3000) setShowNavigation(false);
    }, 1000);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchstart', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchstart', handleMouseMove);
      clearInterval(checkInactivity);
    };
  }, [lastMouseMove]);

  // Apply rendition themes/styles
  const applyRenditionStyles = (rendition) => {
    if (!rendition) return;

    // themes
    try {
      rendition.themes.register('reader-dark', {
        body: { 'background': '#0b0b0b !important', 'color': '#e6e6e6 !important' }
      });
      rendition.themes.register('reader-light', {
        body: { 'background': '#ffffff !important', 'color': '#111827 !important' }
      });

      rendition.themes.select(darkMode ? 'reader-dark' : 'reader-light');

      // dynamic style injection for font size, family, line height
      rendition.themes.fontSize(`${fontSize}px`);
      rendition.themes.default({
        'p': { 'line-height': lineHeight }
      });
    } catch (e) {
      // some epub.js builds may not expose themes the same way; ignore silently
    }
  };

  // Load saved reading position and bookmarks from localStorage
  useEffect(() => {
    const savedBookmarks = localStorage.getItem('epub-bookmarks');
    if (savedBookmarks) setBookmarks(JSON.parse(savedBookmarks));
  }, []);

  useEffect(() => {
    localStorage.setItem('epub-bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  // Save current location
  useEffect(() => {
    if (!bookRef.current || !currentLocation) return;
    try {
      localStorage.setItem('epub-last-location-' + fileName, JSON.stringify(currentLocation));
    } catch (e) {
      console.warn('Could not save location', e);
    }
  }, [currentLocation, fileName]);

  // Progress calculation helper
  const updateProgress = (location) => {
    if (!bookRef.current || !location) return;
    try {
      const percentage = bookRef.current.locations && bookRef.current.locations.percentageFromCfi
        ? Math.round(bookRef.current.locations.percentageFromCfi(location.start.cfi) * 100)
        : 0;
      setReadingProgress(percentage);
    } catch (e) {
      // fallback
      setReadingProgress(0);
    }
  };

  // Handle file upload -> instantiate epub.js book & rendition
  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.name.toLowerCase().endsWith('.epub')) {
      setError('Kripya .epub file upload karein');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // cleanup previous
      if (renditionRef.current) {
        renditionRef.current.destroy();
        renditionRef.current = null;
      }
      if (bookRef.current) {
        try { bookRef.current.destroy(); } catch (e) {}
        bookRef.current = null;
      }

      const url = URL.createObjectURL(file);
      const book = ePub(url);
      bookRef.current = book;
      setFileName(file.name);

      // prepare locations (for progress) - build when book loads
      await book.loaded.metadata; // wait metadata

      // build locations (creates percentage mapping) — optional but helpful
      try {
        await book.locations.generate(1600);
      } catch (e) {
        // ignore if fails
      }

      // try to get cover
      try {
        const coverUrl = await book.coverUrl();
        if (coverUrl) setCoverImage(coverUrl);
      } catch (e) {
        // ignore
      }

      // load TOC
      try {
        const nav = await book.loaded.navigation;
        if (nav && nav.toc) setToc(nav.toc);
      } catch (e) {
        // fallback to empty TOC
        setToc([]);
      }

      // create rendition
      const rendition = book.renderTo(viewerRef.current, {
        width: '100%',
        height: '70vh',
        flow: pageMode ? 'paginated' : 'scrolled',
        spread: 'none'
      });
      renditionRef.current = rendition;

      // apply styles/themes
      applyRenditionStyles(rendition);

      // display saved location if exists
      const saved = localStorage.getItem('epub-last-location-' + file.name);
      if (saved) {
        try {
          const loc = JSON.parse(saved);
          await rendition.display(loc.start.cfi || loc);
        } catch (e) {
          await rendition.display();
        }
      } else {
        await rendition.display();
      }

      // events
      rendition.on('relocated', (location) => {
        setCurrentLocation(location); // location contains start/end cfi and displayed range
        updateProgress(location);
      });

      rendition.on('rendered', () => {
        // ensure injected styles (some epubs override css). reapply our dynamic styles
        applyRenditionStyles(rendition);
      });

      // handle links inside the rendition
      rendition.on('click', (e) => {
        // epub.js already handles internal links, but you can intercept if needed
      });

      setLoading(false);
      setError('');
    } catch (err) {
      console.error(err);
      setError('EPUB load me error: ' + (err.message || err));
      setLoading(false);
    }
  };

  // Navigation helpers
  const next = async () => {
    if (!renditionRef.current) return;
    try { await renditionRef.current.next(); } catch (e) {}
  };
  const prev = async () => {
    if (!renditionRef.current) return;
    try { await renditionRef.current.prev(); } catch (e) {}
  };

  const goToTocItem = async (href) => {
    if (!renditionRef.current || !bookRef.current) return;
    try {
      await renditionRef.current.display(href);
      setShowToc(false);
    } catch (e) {
      console.warn('TOC navigation failed', e);
    }
  };

  // Bookmark (save current CFI)
  const toggleBookmark = () => {
    if (!currentLocation) return;
    const cfi = currentLocation.start.cfi;
    const exists = bookmarks.find((b) => b.cfi === cfi);
    if (exists) {
      setBookmarks(bookmarks.filter(b => b.cfi !== cfi));
    } else {
      const title = bookRef.current && bookRef.current.package ? (bookRef.current.package.metadata.title || fileName) : fileName;
      const bookmark = { cfi, title, created: new Date().toISOString() };
      setBookmarks([...bookmarks, bookmark]);
    }
  };

  const isBookmarked = () => {
    if (!currentLocation) return false;
    return bookmarks.some(b => b.cfi === currentLocation.start.cfi);
  };

  // Search: try to use book.search if available, otherwise fallback to simple message
  const handleSearch = async () => {
    if (!searchQuery.trim() || !bookRef.current) return;
    setSearchResults([]);

    try {
      if (typeof bookRef.current.search === 'function') {
        // epub.js search API (if available)
        const results = await bookRef.current.search(searchQuery);
        // results usually contain {cfi, excerpt}
        setSearchResults(results.map(r => ({ cfi: r.cfi, excerpt: r.excerpt })));
      } else {
        // fallback: iterate through spine and find text (may be slower)
        const results = [];
        const spineItems = bookRef.current.spine && bookRef.current.spine.items ? bookRef.current.spine.items : [];
        for (const item of spineItems) {
          try {
            const text = await item.load(bookRef.current.load.bind(bookRef.current)).then(() => item.document ? (item.document.body.textContent || '') : item.contents || '');
            if (text && text.toLowerCase().includes(searchQuery.toLowerCase())) {
              // create a rough excerpt
              const idx = text.toLowerCase().indexOf(searchQuery.toLowerCase());
              const start = Math.max(0, idx - 60);
              const excerpt = (text.substring(start, start + 140)).replace(/\s+/g, ' ').trim();
              results.push({ cfi: item.cfiBase, excerpt });
            }
          } catch (e) { /* ignore */ }
        }
        setSearchResults(results);
      }
    } catch (err) {
      console.warn('Search failed', err);
    }
  };

  // Jump to search result
  const goToSearchResult = async (res) => {
    if (!renditionRef.current) return;
    const cfi = res.cfi || res;
    try {
      await renditionRef.current.display(cfi);
      setShowSearch(false);
    } catch (e) { console.warn(e); }
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e) => {
      if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) return;
      if (e.key === 'ArrowLeft') {
        e.preventDefault(); prev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault(); next();
      } else if (e.key === 'b' && e.ctrlKey) {
        e.preventDefault(); toggleBookmark();
      } else if (e.key === ' ' ) {
        // space for page down/up in paginated mode
        if (pageMode) {
          e.preventDefault(); next();
        }
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [pageMode, currentLocation, bookmarks]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (renditionRef.current) try { renditionRef.current.destroy(); } catch (e) {}
      if (bookRef.current) try { bookRef.current.destroy(); } catch (e) {}
    };
  }, []);

  // UI helpers
  const cardBg = darkMode ? 'bg-gray-800' : 'bg-white';
  const textColor = darkMode ? 'text-gray-100' : 'text-gray-800';
  const secondaryText = darkMode ? 'text-gray-400' : 'text-gray-600';

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-amber-50 to-orange-50'} transition-colors duration-300`}>
      {/* Header */}
      <div className={`${cardBg} shadow-md sticky top-0 z-10`}>
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <Book className="w-6 h-6 text-orange-600" />
              <h1 className={`text-xl font-bold ${textColor}`}>EPUB Viewer</h1>
            </div>

        

            {fileName && (
              <div className="flex gap-2">
                <button onClick={() => setShowSearch(s => !s)} className="p-2 bg-blue-600 text-white rounded-lg">
                  <Search className="w-5 h-5" />
                </button>
                <button onClick={toggleBookmark} className={`p-2 ${isBookmarked() ? 'bg-yellow-500' : 'bg-gray-600'} text-white rounded-lg`}>
                  <Bookmark className="w-5 h-5" />
                </button>
                <button onClick={() => setShowSettings(s => !s)} className="p-2 bg-purple-600 text-white rounded-lg">
                  <Settings className="w-5 h-5" />
                </button>
                <button onClick={() => setShowToc(s => !s)} className="p-2 bg-orange-600 text-white rounded-lg">
                  <Menu className="w-5 h-5" />
                </button>
                <label className="p-2 bg-gray-600 text-white rounded-lg cursor-pointer">
                  <input type="file" accept=".epub" onChange={handleFileUpload} className="hidden" />
                  <Upload className="w-5 h-5" />
                </label>
              </div>
            )}

            {!fileName && (
              <label className="px-4 py-2 bg-orange-600 text-white rounded-lg cursor-pointer">
                <input type="file" accept=".epub" onChange={handleFileUpload} className="hidden" />
                Select EPUB
              </label>
            )}
          </div>

          {/* progress */}
          {fileName && (
            <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
              <div className="bg-orange-600 h-2 rounded-full transition-all duration-300" style={{width: `${readingProgress}%`}} />
            </div>
          )}
        </div>
      </div>

      {/* Search Panel */}
      {showSearch && fileName && (
        <div className={`${cardBg} shadow-lg mx-4 mt-4 p-4 rounded-lg max-w-4xl mx-auto`}>
          <div className="flex gap-2 mb-4">
            <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSearch()} className={`flex-1 px-4 py-2 border rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`} placeholder="Search in book..." />
            <button onClick={handleSearch} className="px-6 py-2 bg-blue-600 text-white rounded-lg">Search</button>
          </div>

          {searchResults.length > 0 ? (
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {searchResults.map((res, i) => (
                <div key={i} onClick={() => goToSearchResult(res)} className={`p-3 rounded cursor-pointer ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
                  <p className="font-semibold text-sm text-orange-600">Result</p>
                  <p className={`text-sm ${secondaryText}`}>{res.excerpt || res.cfi}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className={`${secondaryText}`}>No results yet</div>
          )}
        </div>
      )}

      {/* Settings */}
      {showSettings && fileName && (
        <div className={`${cardBg} shadow-lg mx-4 mt-4 p-6 rounded-lg max-w-4xl mx-auto`}>
          <h3 className={`text-lg font-bold ${textColor} mb-4`}>Reading Settings</h3>
          <div className="space-y-4">
            <div>
              <label className={`block text-sm font-medium ${textColor} mb-2`}>Font Size: {fontSize}px</label>
              <div className="flex gap-2 items-center">
                <button onClick={() => setFontSize(s => Math.max(12, s - 2))} className="p-2 bg-gray-300 rounded"><ZoomOut className="w-4 h-4" /></button>
                <input type="range" min="12" max="40" value={fontSize} onChange={(e) => setFontSize(Number(e.target.value))} className="flex-1" />
                <button onClick={() => setFontSize(s => Math.min(40, s + 2))} className="p-2 bg-gray-300 rounded"><ZoomIn className="w-4 h-4" /></button>
              </div>
            </div>

            <div>
              <label className={`block text-sm font-medium ${textColor} mb-2`}>Line Height: {lineHeight}</label>
              <input type="range" min="1.2" max="2.5" step="0.1" value={lineHeight} onChange={(e) => setLineHeight(Number(e.target.value))} className="w-full" />
            </div>

            <div>
              <label className={`block text-sm font-medium ${textColor} mb-2`}>Font Family</label>
              <select value={fontFamily} onChange={(e) => setFontFamily(e.target.value)} className={`w-full px-4 py-2 border rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}>
                <option value="serif">Serif</option>
                <option value="sans-serif">Sans Serif</option>
                <option value="monospace">Monospace</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <label className={`text-sm font-medium ${textColor}`}>Dark Mode</label>
              <button onClick={() => setDarkMode(d => !d)} className={`p-2 rounded-lg ${darkMode ? 'bg-yellow-500' : 'bg-gray-700'} text-white`}>
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>

            <div className="flex items-center justify-between">
              <label className={`text-sm font-medium ${textColor}`}>Page View Mode</label>
              <button onClick={() => setPageMode(p => !p)} className={`px-4 py-2 rounded-lg ${pageMode ? 'bg-green-600' : 'bg-gray-400'} text-white`}>
                {pageMode ? 'ON (Book-like)' : 'OFF (Continuous)'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Viewer area */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {error && (<div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4 text-red-700"><strong>Error:</strong> {error}</div>)}

        {!fileName && (
          <div className={`${cardBg} rounded-xl shadow-lg p-12 text-center`}>
            <Book className="w-16 h-16 text-orange-600 mx-auto mb-4" />
            <h2 className={`text-2xl font-bold ${textColor} mb-2`}>EPUB File Upload Karein</h2>
            <p className={`${secondaryText} mb-6`}>Apni EPUB file select karein aur padhna shuru karein</p>
            <label className="inline-block">
              <input type="file" accept=".epub" onChange={handleFileUpload} className="hidden" />
              <span className="px-6 py-3 bg-orange-600 text-white rounded-lg cursor-pointer">File Select Karein</span>
            </label>
          </div>
        )}

        {loading && (
          <div className={`${cardBg} rounded-xl shadow-lg p-12 text-center`}>
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-600 mx-auto mb-4"></div>
            <p className={secondaryText}>EPUB load ho raha hai...</p>
          </div>
        )}

        {/* the actual epub.js viewer container */}
        {!loading && fileName && (
          <div className="space-y-6">
            {coverImage && (
              <div className={`${cardBg} rounded-xl shadow-lg p-8 text-center`}>
                <img src={coverImage} alt="Cover" className="max-w-sm mx-auto rounded-lg shadow-md" />
              </div>
            )}

            <div className={`${cardBg} rounded-lg shadow p-4 flex items-center justify-between`}>
              <div>
                <p className={`text-sm ${secondaryText}`}>Current Location</p>
                <p className={`font-semibold ${textColor}`}>{bookRef.current?.package?.metadata?.title || fileName}</p>
              </div>
              <div className={`text-sm ${secondaryText}`}>{readingProgress}%</div>
            </div>

            <div className={`${cardBg} rounded-xl shadow-lg p-4 md:p-6`}>
              <div ref={viewerRef} style={{ minHeight: '60vh' }} />

              {/* Navigation controls */}
              <div className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 z-30 transition-all duration-500 ${showNavigation ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20 pointer-events-none'}`}>
                <div className="flex gap-2 items-center bg-white dark:bg-gray-800 p-3 rounded-2xl shadow-2xl border-2 border-orange-500">
                  <button onClick={prev} className="flex items-center gap-1 px-3 py-2 bg-orange-600 text-white rounded-lg" title="Previous">
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  <div className="flex gap-1 px-2 border-x-2 border-gray-300">
                    <button onClick={() => renditionRef.current && renditionRef.current.prev()} className="p-2 bg-blue-600 text-white rounded-lg">↑</button>
                    <button onClick={() => renditionRef.current && renditionRef.current.next()} className="p-2 bg-blue-600 text-white rounded-lg">↓</button>
                  </div>

                  <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="p-2 bg-gray-600 text-white rounded-lg">⬆</button>

                  <button onClick={next} className="flex items-center gap-1 px-3 py-2 bg-orange-600 text-white rounded-lg" title="Next">
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* TOC sidebar */}
            {showToc && (
              <div className="fixed inset-0 bg-black bg-opacity-50 z-20" onClick={() => setShowToc(false)}>
                <div className={`absolute right-0 top-0 h-full w-80 ${cardBg} shadow-2xl p-6 overflow-y-auto`} onClick={(e) => e.stopPropagation()}>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className={`text-xl font-bold ${textColor}`}>Contents</h3>
                    <button onClick={() => setShowToc(false)}><X className={`w-6 h-6 ${secondaryText}`} /></button>
                  </div>

                  {bookmarks.length > 0 && (
                    <div className="mb-6">
                      <h4 className={`text-sm font-semibold ${textColor} mb-2 flex items-center gap-2`}><Bookmark className="w-4 h-4 text-yellow-500" /> Bookmarks</h4>
                      <div className="space-y-1 mb-4 pb-4 border-b border-gray-300">
                        {bookmarks.map((b, i) => (
                          <button key={i} onClick={() => renditionRef.current.display(b.cfi)} className={`w-full text-left px-3 py-2 rounded-lg transition-colors text-xs ${darkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-yellow-50 text-gray-700'}`}>
                            <div className="font-medium">{b.title}</div>
                            <div className="text-xs opacity-60">{new Date(b.created).toLocaleString()}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <h4 className={`text-sm font-semibold ${textColor} mb-2`}>Chapters</h4>
                  <div className="space-y-2">
                    {toc.length === 0 && (<div className={secondaryText}>No contents available</div>)}
                    {toc.map((item, i) => (
                      <button key={i} onClick={() => goToTocItem(item.href)} className={`w-full text-left px-4 py-3 rounded-lg transition-colors text-sm ${darkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-orange-50 text-gray-700'}`}>
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

          </div>
        )}
      </div>

      <style>{`
        /* basic content styling for epub.js iframe content when injected */
        .epub-content img { max-width: 100%; height: auto; display: block; margin: 20px auto; border-radius: 8px; }
        .epub-content p { margin-bottom: 1em; text-align: justify; }
        .epub-content h1, .epub-content h2, .epub-content h3 { margin-top: 1.5em; margin-bottom: 0.5em; }
      `}</style>
    </div>
  );
}
