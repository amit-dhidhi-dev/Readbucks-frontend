import React, { useState, useEffect, useRef } from 'react';
import { Book, ChevronLeft, ChevronRight, Upload, Link, ZoomIn, ZoomOut, Menu, X, Bookmark, Moon, Sun } from 'lucide-react';

const EpubViewer = () => {
  const [epubContent, setEpubContent] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [currentChapter, setCurrentChapter] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [inputUrl, setInputUrl] = useState('');
  const [fontSize, setFontSize] = useState(18);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [bookmarks, setBookmarks] = useState([]);
  const [jszipLoaded, setJszipLoaded] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    // Load JSZip
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js';
    script.onload = () => setJszipLoaded(true);
    script.onerror = () => setError('JSZip library load nahi hui. Please refresh karein.');
    document.head.appendChild(script);
    
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const parseEpub = async (arrayBuffer) => {
    try {
      if (!window.JSZip) {
        throw new Error('JSZip library abhi load ho rahi hai. Thoda wait karein.');
      }

      const zip = await window.JSZip.loadAsync(arrayBuffer);
      
      // Find content.opf
      let opfPath = '';
      const container = await zip.file('META-INF/container.xml').async('text');
      const parser = new DOMParser();
      const containerDoc = parser.parseFromString(container, 'text/xml');
      opfPath = containerDoc.querySelector('rootfile').getAttribute('full-path');
      
      // Parse OPF
      const opfContent = await zip.file(opfPath).async('text');
      const opfDoc = parser.parseFromString(opfContent, 'text/xml');
      const basePath = opfPath.substring(0, opfPath.lastIndexOf('/') + 1);
      
      // Get spine order
      const spine = Array.from(opfDoc.querySelectorAll('spine itemref'));
      const manifest = {};
      opfDoc.querySelectorAll('manifest item').forEach(item => {
        manifest[item.getAttribute('id')] = item.getAttribute('href');
      });
      
      // Load chapters
      const chapterPromises = spine.map(async (item, index) => {
        const idref = item.getAttribute('idref');
        const href = manifest[idref];
        const fullPath = basePath + href;
        
        try {
          const content = await zip.file(fullPath).async('text');
          const doc = parser.parseFromString(content, 'text/html');
          
          // Extract title
          const title = doc.querySelector('title')?.textContent || 
                       doc.querySelector('h1, h2, h3')?.textContent || 
                       `Chapter ${index + 1}`;
          
          return {
            title: title.trim(),
            content: doc.body?.innerHTML || content,
            index
          };
        } catch (err) {
          console.warn(`Chapter ${index} load nahi hui:`, err);
          return {
            title: `Chapter ${index + 1}`,
            content: '<p>Content load nahi hui</p>',
            index
          };
        }
      });
      
      const loadedChapters = await Promise.all(chapterPromises);
      setChapters(loadedChapters);
      setCurrentChapter(0);
      setError('');
    } catch (err) {
      setError('EPUB parse karne mein error: ' + err.message);
      console.error(err);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    if (!file.name.endsWith('.epub')) {
      setError('Please select a valid EPUB file');
      return;
    }

    if (!jszipLoaded) {
      setError('Library abhi load ho rahi hai. Kripya kuch seconds wait karein.');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const arrayBuffer = await file.arrayBuffer();
      await parseEpub(arrayBuffer);
    } catch (err) {
      setError('File load karne mein error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUrlLoad = async () => {
    if (!inputUrl.trim()) {
      setError('Please enter a URL');
      return;
    }

    if (!jszipLoaded) {
      setError('Library abhi load ho rahi hai. Kripya kuch seconds wait karein.');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(inputUrl);
      if (!response.ok) throw new Error('Failed to fetch EPUB from URL');
      
      const arrayBuffer = await response.arrayBuffer();
      await parseEpub(arrayBuffer);
      setInputUrl('');
    } catch (err) {
      setError('URL se load karne mein error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const nextChapter = () => {
    if (currentChapter < chapters.length - 1) {
      setCurrentChapter(currentChapter + 1);
      contentRef.current?.scrollTo(0, 0);
    }
  };

  const prevChapter = () => {
    if (currentChapter > 0) {
      setCurrentChapter(currentChapter - 1);
      contentRef.current?.scrollTo(0, 0);
    }
  };

  const toggleBookmark = () => {
    if (bookmarks.includes(currentChapter)) {
      setBookmarks(bookmarks.filter(b => b !== currentChapter));
    } else {
      setBookmarks([...bookmarks, currentChapter]);
    }
  };

  if (!chapters.length) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <div className="flex items-center justify-center mb-6">
              <Book className="w-12 h-12 text-indigo-600 mr-3" />
              <h1 className="text-3xl font-bold text-gray-800">EPUB Reader</h1>
            </div>

            {!jszipLoaded && (
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded">
                <p className="text-blue-700">Library load ho rahi hai... Kripya wait karein.</p>
              </div>
            )}
            
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded">
                <p className="text-red-700">{error}</p>
              </div>
            )}
            
            {loading && (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                <span className="ml-3 text-gray-600">Loading EPUB...</span>
              </div>
            )}
            
            {!loading && jszipLoaded && (
              <>
                <div className="mb-8">
                  <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-indigo-300 rounded-lg cursor-pointer bg-indigo-50 hover:bg-indigo-100 transition-colors">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-12 h-12 text-indigo-500 mb-3" />
                      <p className="mb-2 text-sm text-gray-700 font-semibold">
                        Click to upload EPUB file
                      </p>
                      <p className="text-xs text-gray-500">Local EPUB file select karein</p>
                    </div>
                    <input 
                      type="file" 
                      className="hidden" 
                      accept=".epub"
                      onChange={handleFileUpload}
                    />
                  </label>
                </div>
                
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-500">YA</span>
                  </div>
                </div>
                
                <div className="mt-8">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    EPUB URL se load karein
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="url"
                      value={inputUrl}
                      onChange={(e) => setInputUrl(e.target.value)}
                      placeholder="https://example.com/book.epub"
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      onKeyPress={(e) => e.key === 'Enter' && handleUrlLoad()}
                    />
                    <button
                      onClick={handleUrlLoad}
                      className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center"
                    >
                      <Link className="w-5 h-5 mr-2" />
                      Load
                    </button>
                  </div>
                  <p className="mt-2 text-xs text-gray-500">
                    Note: URL se load karne ke liye CORS enabled hona chahiye
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className={`sticky top-0 z-10 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b shadow-sm`}>
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
            >
              <Menu className="w-5 h-5" />
            </button>
            <Book className="w-6 h-6 text-indigo-600" />
            <span className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              {chapters[currentChapter]?.title}
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFontSize(Math.max(12, fontSize - 2))}
              className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
            >
              <ZoomOut className="w-5 h-5" />
            </button>
            <button
              onClick={() => setFontSize(Math.min(28, fontSize + 2))}
              className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
            >
              <ZoomIn className="w-5 h-5" />
            </button>
            <button
              onClick={toggleBookmark}
              className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
            >
              <Bookmark className={`w-5 h-5 ${bookmarks.includes(currentChapter) ? 'fill-yellow-500 text-yellow-500' : ''}`} />
            </button>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        {sidebarOpen && (
          <div className={`w-80 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-r h-screen sticky top-16 overflow-y-auto`}>
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-800'}`}>Contents</h2>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className={`p-1 rounded ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-1">
                {chapters.map((chapter, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentChapter(index);
                      contentRef.current?.scrollTo(0, 0);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      currentChapter === index
                        ? 'bg-indigo-600 text-white'
                        : darkMode
                        ? 'hover:bg-gray-700 text-gray-300'
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm truncate">{chapter.title}</span>
                      {bookmarks.includes(index) && (
                        <Bookmark className="w-4 h-4 fill-yellow-500 text-yellow-500 flex-shrink-0 ml-2" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="flex-1 flex flex-col">
          <div
            ref={contentRef}
            className={`flex-1 overflow-y-auto px-8 py-12`}
            style={{ fontSize: `${fontSize}px` }}
          >
            <div className="max-w-3xl mx-auto">
              <div
                className={`prose max-w-none ${darkMode ? 'prose-invert' : ''}`}
                dangerouslySetInnerHTML={{ __html: chapters[currentChapter]?.content }}
              />
            </div>
          </div>

          {/* Navigation */}
          <div className={`sticky bottom-0 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-t shadow-lg`}>
            <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
              <button
                onClick={prevChapter}
                disabled={currentChapter === 0}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  currentChapter === 0
                    ? 'opacity-50 cursor-not-allowed'
                    : darkMode
                    ? 'hover:bg-gray-700'
                    : 'hover:bg-gray-100'
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
                <span>Previous</span>
              </button>
              
              <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {currentChapter + 1} / {chapters.length}
              </div>
              
              <button
                onClick={nextChapter}
                disabled={currentChapter === chapters.length - 1}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  currentChapter === chapters.length - 1
                    ? 'opacity-50 cursor-not-allowed'
                    : darkMode
                    ? 'hover:bg-gray-700'
                    : 'hover:bg-gray-100'
                }`}
              >
                <span>Next</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EpubViewer;