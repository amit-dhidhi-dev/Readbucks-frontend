import React, { useState, useEffect, useRef } from 'react';
import { Upload, Bookmark, ChevronLeft, ChevronRight, Cloud, Search, Menu, X, Sun, Moon, Maximize, BookOpen, MessageSquare, Clock, Share2, Settings, User, Download, Eye, EyeOff } from 'lucide-react';


const EpubViewer = ({ epubUrl = null }) => {
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

  // load library
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
    if (file) {
      loadBookFromFile(file)
    }
  };



  const loadScripts = async () => {
    try {
        // 1. load JSZip 
        if (!window.JSZip) {
            const jszipScript = document.createElement('script');
            jszipScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js';
            jszipScript.async = true;
            document.head.appendChild(jszipScript);
            
            await new Promise((resolve, reject) => {
                jszipScript.onload = resolve;
                jszipScript.onerror = () => reject(new Error(" failed to load JSZip "));
            });
        }

        // 2. load ePub.js 
        if (!window.ePub) {
            const epubjsScript = document.createElement('script');
            epubjsScript.src = 'https://cdn.jsdelivr.net/npm/epubjs/dist/epub.min.js';
            epubjsScript.async = true;
            document.head.appendChild(epubjsScript);

            await new Promise((resolve, reject) => {
                epubjsScript.onload = resolve;
                epubjsScript.onerror = () => reject(new Error("failed to load ePub.js "));
            });
        }

        // console.log("all scripts load successfully");
        return true;

    } catch (error) {
        console.error("Script Loading Error:", error.message);
        return false;
    }
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
    // if (!window.ePub) {
    //   alert('EPUB library not loaded yet. Please wait.');
    //   return;
    // }

    if (!window.ePub) {
      loadScripts()
      loadScripts.catch((err) => {
        console.error('error while loading epub script', err)
        return;
      })
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


  const loadUrlFile = async (url) => {
    await loadBookFromURL(url)
  }

  // url has than load file from url
  if (epubUrl) {
    loadScripts()
    loadScripts().then((success) => {
      if (success) {
        // console.log('script load success fully')
        loadUrlFile(epubUrl);
      }
    }).catch(err=> console.log('error while loading epub script', err));

  }





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

    reader.onload = function (e) {
      setTimeout(async () => {
        try {
          await initializeBook(e.target.result);
        } catch (err) {
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
    } catch (err) {
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
      // First try epub.js's built-in search
      if (typeof book.search === 'function') {
        const results = await book.search(searchQuery, {
          limit: 100 // Limit results
        });

        const formattedResults = results.map((result, idx) => {
          // Get chapter name
          let chapterName = 'Chapter';
          try {
            const spineItem = book.spine.get(result.cfi);
            if (spineItem) {
              chapterName = getChapterNameSimple(spineItem, idx, book);
            }
          } catch (e) {
            console.error('Error getting chapter name for search result:', e);
            chapterName = `Result ${idx + 1}`;
          }

          return {
            excerpt: result.excerpt || '...',
            href: result.cfi,
            cfi: result.cfi,
            chapter: chapterName,
            index: idx
          };
        });

        setSearchResults(formattedResults);
      } else {
        // Fallback to manual search
        await manualSearch();
      }

      setSearching(false);
      setSidebarTab('search');
    } catch (err) {
      console.error('Search error:', err);
      alert('Search failed: ' + err.message);
      setSearching(false);
    }
  };

  const manualSearch = async () => {
    await book.ready;
    const searchLower = searchQuery.toLowerCase();
    const allResults = [];

    for (let i = 0; i < book.spine.spineItems.length; i++) {
      const item = book.spine.spineItems[i];
      try {
        const content = await getTextContent(item, book);

        let index = 0;
        while ((index = content.toLowerCase().indexOf(searchLower, index)) !== -1) {
          const start = Math.max(0, index - 50);
          const end = Math.min(content.length, index + searchQuery.length + 50);
          const excerpt = content.substring(start, end);

          // Get chapter name
          const chapterName = getChapterNameSimple(item, i, book);

          allResults.push({
            excerpt: (start > 0 ? '...' : '') + excerpt + (end < content.length ? '...' : ''),
            href: item.href,
            cfi: item.cfiBase, // Use cfiBase directly
            chapter: chapterName,
            index: allResults.length
          });

          index += searchQuery.length;
        }
      } catch (err) {
        console.error('Error in item:', item.href, err);
      }
    }

    setSearchResults(allResults);
  };

  // Simple helper functions
  const getTextContent = async (item, book) => {
    try {
      await item.load(book.load.bind(book)); // Fixed: Added parameter
      const doc = await item.document; // Added await
      return doc.body.textContent || '';
    } catch (error) {
      console.error('Error getting text content:', error);
      return '';
    }
  };

  const getChapterNameSimple = (item, index, book) => {
    // Method 1: From TOC if available
    if (book && book.navigation && book.navigation.toc) {
      const tocItem = book.navigation.toc.find(t =>
        t.href && item.href && (item.href.includes(t.href) || t.href.includes(item.href))
      );
      if (tocItem && tocItem.label) {
        return tocItem.label;
      }
    }

    // Method 2: From filename
    if (item.href) {
      const parts = item.href.split('/');
      const filename = parts[parts.length - 1];
      const cleanName = filename
        .replace('.html', '')
        .replace('.xhtml', '')
        .replace('.htm', '')
        .replace(/_/g, ' ')
        .replace(/-/g, ' ')
        .replace(/^(\d+)/, 'Chapter $1')
        .replace(/\b\w/g, l => l.toUpperCase())
        .trim();

      if (cleanName && cleanName !== '') {
        return cleanName;
      }
    }

    // Method 3: Default
    return `Chapter ${index + 1}`;
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

    } else {
      document.exitFullscreen();

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






  //  if file is epub
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
                  onClick={toggleFullscreen}
                  className={`p-2 rounded-lg transition-all duration-200 ${nightMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-purple-100 hover:bg-purple-200 text-purple-700'}`}
                >
                  <Maximize size={18} />
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
          <div className={`${window.innerWidth < 768 ? 'absolute inset-y-0 left-0 z-40 w-72' : 'w-64 lg:w-80'} ${nightMode ? 'bg-gray-800 text-white' : 'bg-white'} rounded-xl shadow-xl flex flex-col overflow-hidden transition-all duration-300 h-[calc(100vh-2rem)] my-4`}>
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
                        className={`p-2 sm:p-3 rounded-lg cursor-pointer transition-all duration-200 text-xs sm:text-sm ${nightMode ? 'hover:bg-gray-700 hover:text-purple-300' : 'hover:bg-purple-50 hover:text-purple-600'
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
                        className={`p-2 sm:p-3 rounded-lg border transition-all duration-200 ${nightMode ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-200 hover:bg-purple-50'
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
                        className={`p-2 sm:p-3 rounded-lg border transition-all duration-200 ${nightMode ? 'border-gray-700' : 'border-gray-200'
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
                      className={`flex-1 px-2 sm:px-3 py-1.5 sm:py-2 border rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200 ${nightMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'
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
                            className={`p-2 sm:p-3 rounded-lg cursor-pointer border transition-all duration-200 text-xs sm:text-sm ${nightMode ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-200 hover:bg-purple-50'
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
                        className={`flex-1 py-1 text-xs rounded transition-all duration-200 ${fontFamily === font ?
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
                      className={`flex-1 py-1 text-xs rounded transition-all duration-200 ${theme === t ?
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
        <div className={`flex-1 ${nightMode ? 'bg-grey-800' : 'bg-white'} rounded-xl shadow-xl flex flex-col overflow-hidden min-w-0 transition-all duration-300`}>
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
                    className={`flex-1 px-3 sm:px-4 py-2 sm:py-3 border-2 rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${nightMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'
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
                  className={`flex items-center gap-1 px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-all duration-200 text-xs sm:text-sm shadow-md ${nightMode ? 'bg-gray-600 hover:bg-gray-500 text-white' : 'bg-white hover:bg-gray-100 text-gray-700 border border-gray-200'
                    }`}
                >
                  <ChevronLeft size={16} />
                  <span className="hidden sm:inline">Previous</span>
                </button>

                <div className="flex-1 mx-2 sm:mx-5 min-w-0">
                  <div className={`h-1.5 sm:h-2 ${nightMode ? 'bg-gray-600' : 'bg-gray-200'} rounded-full overflow-hidden`}>
                    <div className="h-full bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
                  </div>
                  <div className={`text-center text-xs sm:text-sm mt-1 sm:mt-2 flex items-center justify-center gap-2 flex-wrap ${nightMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                    <span className="truncate">{pageInfo || 'Loading...'}</span>
                    <span className="hidden sm:inline">•</span>
                    <span className="hidden sm:inline">{Math.round(progress)}%</span>
                  </div>
                </div>

                <button
                  onClick={goToNextPage}
                  className={`flex items-center gap-1 px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-all duration-200 text-xs sm:text-sm shadow-md ${nightMode ? 'bg-gray-600 hover:bg-gray-500 text-white' : 'bg-white hover:bg-gray-100 text-gray-700 border border-gray-200'
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
        <div className={`fixed right-4 top-20 z-30 w-64 p-4 rounded-xl shadow-2xl transition-all duration-300 ${nightMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
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

            <div className={`p-2 sm:p-3 rounded-lg mb-3 sm:mb-4 text-xs sm:text-sm italic max-h-32 overflow-y-auto ${nightMode ? 'bg-gray-700' : 'bg-gray-100'
              }`}>
              "{selectedText.substring(0, 300)}{selectedText.length > 300 ? '...' : ''}"
            </div>

            <div className="mb-3 sm:mb-4">
              <label className="block text-sm font-semibold mb-2">Your Note</label>
              <textarea
                value={currentNote}
                onChange={(e) => setCurrentNote(e.target.value)}
                placeholder="Write your thoughts..."
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm transition-all duration-200 ${nightMode ? 'bg-gray-700 border-gray-600' : 'border-gray-300'
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
                className={`flex-1 px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base transition-all duration-200 ${nightMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
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

export default EpubViewer;




