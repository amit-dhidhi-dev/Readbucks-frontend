import React, { useState, useEffect, useRef } from 'react';
import { Book, ChevronLeft, ChevronRight, Menu, X, Upload, Search, Settings, Bookmark, Moon, Sun, Type, ZoomIn, ZoomOut } from 'lucide-react';

export default function Read() {
  const [epubContent, setEpubContent] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [currentChapter, setCurrentChapter] = useState(0);
  const [showToc, setShowToc] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cssContent, setCssContent] = useState('');
  const [error, setError] = useState('');
  const [coverImage, setCoverImage] = useState(null);
  const [chapterMap, setChapterMap] = useState({});
  const [bookmarks, setBookmarks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  
  // Reading settings
  const [fontSize, setFontSize] = useState(18);
  const [darkMode, setDarkMode] = useState(false);
  const [fontFamily, setFontFamily] = useState('serif');
  const [lineHeight, setLineHeight] = useState(1.8);
  const [readingProgress, setReadingProgress] = useState(0);
  const [pageMode, setPageMode] = useState(true); // Pagination mode
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [slideDirection, setSlideDirection] = useState(''); // 'left', 'right', or ''
  const [showNavigation, setShowNavigation] = useState(true); // Auto-hide navigation
  const [lastMouseMove, setLastMouseMove] = useState(Date.now());
  
  const contentRef = useRef(null);

  // Auto-hide navigation after 3 seconds of inactivity
  useEffect(() => {
    const handleMouseMove = () => {
      setShowNavigation(true);
      setLastMouseMove(Date.now());
    };

    const handleTouch = () => {
      setShowNavigation(true);
      setLastMouseMove(Date.now());
    };

    const handleMouseLeave = () => {
      setShowNavigation(false);
    };

    const checkInactivity = setInterval(() => {
      if (Date.now() - lastMouseMove > 3000) { // 3 seconds
        setShowNavigation(false);
      }
    }, 1000);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchstart', handleTouch);
    window.addEventListener('touchmove', handleTouch);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchstart', handleTouch);
      window.removeEventListener('touchmove', handleTouch);
      window.removeEventListener('mouseleave', handleMouseLeave);
      clearInterval(checkInactivity);
    };
  }, [lastMouseMove]);

  // Calculate reading progress
  useEffect(() => {
    if (chapters.length > 0) {
      const progress = ((currentChapter + 1) / chapters.length) * 100;
      setReadingProgress(progress);
    }
  }, [currentChapter, chapters.length]);

  // Save reading position
  useEffect(() => {
    if (epubContent && currentChapter >= 0) {
      const position = { chapter: currentChapter, book: epubContent };
      localStorage.setItem('epub-reading-position', JSON.stringify(position));
    }
  }, [currentChapter, epubContent]);

  // Load saved position
  useEffect(() => {
    if (epubContent && chapters.length > 0) {
      const saved = localStorage.getItem('epub-reading-position');
      if (saved) {
        const position = JSON.parse(saved);
        if (position.book === epubContent && position.chapter < chapters.length) {
          setCurrentChapter(position.chapter);
        }
      }
    }
  }, [epubContent, chapters]);

  // Search functionality
  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    
    const results = [];
    chapters.forEach((chapter, index) => {
      const content = chapter.content.toLowerCase();
      const query = searchQuery.toLowerCase();
      
      if (content.includes(query)) {
        // Find context around match
        const position = content.indexOf(query);
        const start = Math.max(0, position - 50);
        const end = Math.min(content.length, position + query.length + 50);
        const context = chapter.content.substring(start, end).replace(/<[^>]*>/g, '');
        
        results.push({
          chapterIndex: index,
          chapterTitle: chapter.title,
          context: '...' + context + '...'
        });
      }
    });
    
    setSearchResults(results);
  };

  // Bookmark functions
  const toggleBookmark = () => {
    const bookmark = {
      chapter: currentChapter,
      title: chapters[currentChapter]?.title,
      timestamp: new Date().toLocaleString()
    };
    
    const exists = bookmarks.findIndex(b => b.chapter === currentChapter);
    if (exists >= 0) {
      setBookmarks(bookmarks.filter((_, i) => i !== exists));
    } else {
      setBookmarks([...bookmarks, bookmark]);
    }
  };

  const isBookmarked = bookmarks.some(b => b.chapter === currentChapter);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    if (!file.name.endsWith('.epub')) {
      setError('Kripya ek valid EPUB file select karein (.epub extension)');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      // JSZip load karein
      if (!window.JSZip) {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js';
        await new Promise((resolve, reject) => {
          script.onload = resolve;
          script.onerror = () => reject(new Error('JSZip load nahi ho saki'));
          document.head.appendChild(script);
        });
      }
      
      const arrayBuffer = await file.arrayBuffer();
      const zip = await window.JSZip.loadAsync(arrayBuffer);
      
      // Container.xml se root file ka path nikaalo
      let containerXml;
      try {
        containerXml = await zip.file('META-INF/container.xml').async('text');
      } catch (err) {
        throw new Error('META-INF/container.xml nahi mili - invalid EPUB file');
      }
      
      const rootfileMatch = containerXml.match(/full-path="([^"]+)"/);
      if (!rootfileMatch) {
        throw new Error('Container.xml mein rootfile path nahi mila');
      }
      
      const rootfilePath = rootfileMatch[1];
      
      // Content.opf file padhein
      let contentOpf;
      try {
        contentOpf = await zip.file(rootfilePath).async('text');
      } catch (err) {
        throw new Error(`Content file nahi mili: ${rootfilePath}`);
      }
      
      const basePath = rootfilePath.substring(0, rootfilePath.lastIndexOf('/') + 1);
      
      // Cover image nikalo
      const coverMatch = contentOpf.match(/<meta\s+name="cover"\s+content="([^"]+)"/i);
      if (coverMatch) {
        const coverId = coverMatch[1];
        const coverItemMatch = contentOpf.match(new RegExp(`<item[^>]+id="${coverId}"[^>]+href="([^"]+)"`, 'i'));
        if (coverItemMatch) {
          const coverPath = basePath + coverItemMatch[1];
          try {
            const coverFile = zip.file(coverPath);
            if (coverFile) {
              const coverData = await coverFile.async('base64');
              const ext = coverPath.split('.').pop().toLowerCase();
              const mimeType = ext === 'png' ? 'image/png' : ext === 'jpg' || ext === 'jpeg' ? 'image/jpeg' : 'image/png';
              setCoverImage(`data:${mimeType};base64,${coverData}`);
            }
          } catch (err) {
            console.log('Cover image load nahi ho saki');
          }
        }
      }
      
      // CSS files load karein
      const cssMatches = [...contentOpf.matchAll(/<item[^>]+href="([^"]+\.css)"[^>]*>/gi)];
      let allCss = '';
      for (const match of cssMatches) {
        const cssPath = basePath + match[1];
        try {
          const cssFile = zip.file(cssPath);
          if (cssFile) {
            const css = await cssFile.async('text');
            allCss += css + '\n';
          }
        } catch (err) {
          console.log('CSS skip:', cssPath);
        }
      }
      setCssContent(allCss);
      
      // Manifest banao
      const manifestMatches = [...contentOpf.matchAll(/<item[^>]+id="([^"]+)"[^>]+href="([^"]+)"[^>]*>/g)];
      const manifestMap = {};
      manifestMatches.forEach(match => {
        manifestMap[match[1]] = match[2];
      });
      
      // Spine se chapters ka order nikaalo
      const spineMatches = [...contentOpf.matchAll(/idref="([^"]+)"/g)];
      
      // Chapter mapping banao
      const hrefToIndex = {};
      
      // Chapters load karein
      const loadedChapters = [];
      
      for (const match of spineMatches) {
        const href = manifestMap[match[1]];
        if (!href || (!href.endsWith('.html') && !href.endsWith('.xhtml'))) continue;
        
        const fullPath = basePath + href;
        
        // Store mapping
        hrefToIndex[href] = loadedChapters.length;
        hrefToIndex[fullPath] = loadedChapters.length;
        hrefToIndex['../' + href] = loadedChapters.length;
        hrefToIndex[href.split('/').pop()] = loadedChapters.length;
        
        try {
          const chapterFile = zip.file(fullPath);
          if (!chapterFile) continue;
          
          const content = await chapterFile.async('text');
          const chapterBasePath = fullPath.substring(0, fullPath.lastIndexOf('/') + 1);
          
          // Images ko base64 mein convert karein
          let processedContent = content;
          const imgMatches = [...content.matchAll(/<img[^>]+src=["']([^"']+)["'][^>]*>/gi)];
          
          for (const imgMatch of imgMatches) {
            const originalSrc = imgMatch[1];
            
            const possiblePaths = [
              originalSrc.startsWith('/') ? originalSrc.substring(1) : originalSrc,
              chapterBasePath + originalSrc,
              chapterBasePath + originalSrc.replace(/\.\.\//g, ''),
              basePath + originalSrc,
              basePath + originalSrc.replace(/\.\.\//g, ''),
              basePath + 'Images/' + originalSrc.split('/').pop(),
              basePath + 'images/' + originalSrc.split('/').pop(),
              'OEBPS/Images/' + originalSrc.split('/').pop(),
              'OEBPS/images/' + originalSrc.split('/').pop(),
            ];
            
            for (const tryPath of possiblePaths) {
              try {
                const imgFile = zip.file(tryPath);
                if (imgFile) {
                  const imgData = await imgFile.async('base64');
                  const ext = tryPath.split('.').pop().toLowerCase();
                  const mimeTypes = {
                    'png': 'image/png',
                    'jpg': 'image/jpeg',
                    'jpeg': 'image/jpeg',
                    'gif': 'image/gif',
                    'svg': 'image/svg+xml',
                    'webp': 'image/webp'
                  };
                  const mimeType = mimeTypes[ext] || 'image/png';
                  
                  const base64Src = `data:${mimeType};base64,${imgData}`;
                  const escapedSrc = originalSrc.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                  processedContent = processedContent.replace(
                    new RegExp(`src=["']${escapedSrc}["']`, 'gi'),
                    `src="${base64Src}"`
                  );
                  break;
                }
              } catch (err) {}
            }
          }
          
          // Body content extract karein
          const bodyMatch = processedContent.match(/<body[^>]*>([\s\S]*)<\/body>/i);
          let bodyContent = bodyMatch ? bodyMatch[1] : processedContent;
          
          // Internal links ko data attribute dein
          bodyContent = bodyContent.replace(/<a\s+([^>]*)href=["']([^"']+)["']([^>]*)>/gi, (match, before, href, after) => {
            if (/^https?:\/\//i.test(href)) {
              return `<a ${before}href="${href}"${after} target="_blank" rel="noopener noreferrer">`;
            }
            return `<a ${before}href="#" data-epub-href="${href}"${after} class="epub-internal-link">`;
          });
          
          // Title extract karein - multiple methods try karein
          let title = '';
          
        //   console.log('Extracting title for chapter', loadedChapters.length + 1);
          
          // Method 1: <title> tag
          const titleMatch = content.match(/<title>([^<]+)<\/title>/i);
          if (titleMatch && titleMatch[1].trim() && 
              titleMatch[1].trim().toLowerCase() !== 'untitled' &&
              titleMatch[1].trim().toLowerCase() !== 'unknown') {
            title = titleMatch[1].trim();
            // console.log('Title from <title> tag:', title);
          }
          
          // Method 2: <h1>, <h2>, <h3> tags from body
          if (!title) {
            const h1Match = bodyContent.match(/<h1[^>]*>([^<]+)<\/h1>/i);
            if (h1Match && h1Match[1].trim()) {
              title = h1Match[1].trim();
            //   console.log('Title from <h1>:', title);
            }
          }
          
          if (!title) {
            const h2Match = bodyContent.match(/<h2[^>]*>([^<]+)<\/h2>/i);
            if (h2Match && h2Match[1].trim()) {
              title = h2Match[1].trim();
            //   console.log('Title from <h2>:', title);
            }
          }
          
          if (!title) {
            const h3Match = bodyContent.match(/<h3[^>]*>([^<]+)<\/h3>/i);
            if (h3Match && h3Match[1].trim()) {
              title = h3Match[1].trim();
            //   console.log('Title from <h3>:', title);
            }
          }
          
          // Method 3: First strong/bold text
          if (!title) {
            const strongMatch = bodyContent.match(/<(?:strong|b)[^>]*>([^<]+)<\/(?:strong|b)>/i);
            if (strongMatch && strongMatch[1].trim()) {
              title = strongMatch[1].trim();
            //   console.log('Title from <strong>:', title);
            }
          }
          
          // Method 4: First paragraph text (first 60 chars)
          if (!title) {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = bodyContent;
            const textContent = tempDiv.textContent || tempDiv.innerText || '';
            const cleanText = textContent.trim().replace(/\s+/g, ' ');
            
            if (cleanText.length > 5) {
              title = cleanText.substring(0, 60).trim();
              if (cleanText.length > 60) title += '...';
            }
          }
          
          // Method 5: Use filename
          if (!title) {
            const filename = href.split('/').pop().replace(/\.(html|xhtml)$/i, '');
            if (filename && filename !== 'index' && filename !== 'content') {
              title = filename.replace(/[-_]/g, ' ');
            //   console.log('Title from filename:', title);
            }
          }
          
          // Method 6: Fallback to chapter number
          if (!title || title.toLowerCase() === 'unknown') {
            title = `Chapter ${loadedChapters.length + 1}`;
            // console.log('Title fallback to chapter number:', title);
          }
          
          loadedChapters.push({
            title: title,
            content: bodyContent,
            href: href
          });
          
        } catch (err) {
          console.error('Chapter load error:', err);
        }
      }
      
      if (loadedChapters.length === 0) {
        throw new Error('Koi readable chapters nahi mile');
      }
      
      setChapters(loadedChapters);
      setChapterMap(hrefToIndex);
      setCurrentChapter(0);
      setEpubContent(file.name);
      
    } catch (error) {
      console.error('EPUB parse error:', error);
      setError(error.message || 'File load karne mein error aaya');
    } finally {
      setLoading(false);
    }
  };

  // Handle internal link clicks
  useEffect(() => {
    if (!contentRef.current) return;
    
    const handleLinkClick = (e) => {
      const link = e.target.closest('a');
      if (!link) return;
      
      const dataHref = link.getAttribute('data-epub-href');
      const regularHref = link.getAttribute('href');
      
      if (dataHref) {
        e.preventDefault();
        
        if (dataHref !== '#') {
          const [filePath, anchor] = dataHref.split('#');
          
          if (!filePath && anchor) {
            const targetElement = document.getElementById(anchor);
            if (targetElement) {
              targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
              return;
            }
          }
          
          const variations = [
            filePath || dataHref,
            '../' + (filePath || dataHref),
            (filePath || dataHref).replace(/\.\.\//g, ''),
            (filePath || dataHref).split('/').pop()
          ];
          
          for (const variant of variations) {
            if (chapterMap[variant] !== undefined) {
              setCurrentChapter(chapterMap[variant]);
              
              if (anchor) {
                setTimeout(() => {
                  const targetElement = document.getElementById(anchor);
                  if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  } else {
                    window.scrollTo(0, 0);
                  }
                }, 100);
              } else {
                window.scrollTo(0, 0);
              }
              return;
            }
          }
        }
      } else if (regularHref && regularHref !== '#' && !regularHref.startsWith('http')) {
        e.preventDefault();
        
        const [filePath, anchor] = regularHref.split('#');
        
        if (!filePath && anchor) {
          const targetElement = document.getElementById(anchor);
          if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      }
    };
    
    contentRef.current.addEventListener('click', handleLinkClick, true);
    
    return () => {
      if (contentRef.current) {
        contentRef.current.removeEventListener('click', handleLinkClick, true);
      }
    };
  }, [chapterMap, currentChapter]);

  const nextChapter = () => {
    if (currentChapter < chapters.length - 1) {
      setCurrentChapter(currentChapter + 1);
      setCurrentPage(0); // Reset to first page of new chapter
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (contentRef.current) {
        contentRef.current.focus();
      }
    }
  };

  const prevChapter = () => {
    if (currentChapter > 0) {
      setCurrentChapter(currentChapter - 1);
      setCurrentPage(0); // Reset to first page of new chapter
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (contentRef.current) {
        contentRef.current.focus();
      }
    }
  };

  const nextPage = () => {
    if (pageMode && contentRef.current) {
      setSlideDirection('left'); // Slide out to left
      
      setTimeout(() => {
        const pageHeight = contentRef.current.clientHeight;
        const currentScroll = contentRef.current.scrollTop;
        
        contentRef.current.scrollTo({ 
          top: currentScroll + pageHeight, 
          behavior: 'smooth' 
        });
        
        // Reset animation after scroll
        setTimeout(() => setSlideDirection(''), 300);
      }, 50);
    }
  };

  const prevPage = () => {
    if (pageMode && contentRef.current) {
      setSlideDirection('right'); // Slide out to right
      
      setTimeout(() => {
        const pageHeight = contentRef.current.clientHeight;
        const currentScroll = contentRef.current.scrollTop;
        
        contentRef.current.scrollTo({ 
          top: Math.max(0, currentScroll - pageHeight), 
          behavior: 'smooth' 
        });
        
        // Reset animation after scroll
        setTimeout(() => setSlideDirection(''), 300);
      }, 50);
    }
  };

  const resetViewer = () => {
    setEpubContent(null);
    setChapters([]);
    setCurrentChapter(0);
    setCssContent('');
    setError('');
    setCoverImage(null);
    setChapterMap({});
    setBookmarks([]);
    setSearchResults([]);
    setSearchQuery('');
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      // Don't interfere with typing in inputs
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        return;
      }

      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        if (pageMode) {
          const pageHeight = window.innerHeight * 0.7;
          const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
          window.scrollTo({ top: Math.max(0, currentScroll - pageHeight), behavior: 'smooth' });
        } else if (currentChapter > 0) {
          setCurrentChapter(prev => prev - 1);
          setCurrentPage(0);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        if (pageMode) {
          const pageHeight = window.innerHeight * 0.7;
          const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
          window.scrollTo({ top: currentScroll + pageHeight, behavior: 'smooth' });
        } else if (currentChapter < chapters.length - 1) {
          setCurrentChapter(prev => prev + 1);
          setCurrentPage(0);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      } else if (e.key === 'ArrowUp') {
        if (pageMode) {
          e.preventDefault();
          const pageHeight = window.innerHeight * 0.7;
          const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
          window.scrollTo({ top: Math.max(0, currentScroll - pageHeight), behavior: 'smooth' });
        }
      } else if (e.key === 'ArrowDown') {
        if (pageMode) {
          e.preventDefault();
          const pageHeight = window.innerHeight * 0.7;
          const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
          window.scrollTo({ top: currentScroll + pageHeight, behavior: 'smooth' });
        }
      } else if (e.key === 'b' && e.ctrlKey) {
        e.preventDefault();
        const bookmark = {
          chapter: currentChapter,
          title: chapters[currentChapter]?.title,
          timestamp: new Date().toLocaleString()
        };
        
        const exists = bookmarks.findIndex(b => b.chapter === currentChapter);
        if (exists >= 0) {
          setBookmarks(bookmarks.filter((_, i) => i !== exists));
        } else {
          setBookmarks([...bookmarks, bookmark]);
        }
      } else if (e.key === ' ') {
        if (pageMode) {
          e.preventDefault();
          const pageHeight = window.innerHeight * 0.7;
          const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
          
          if (e.shiftKey) {
            window.scrollTo({ top: Math.max(0, currentScroll - pageHeight), behavior: 'smooth' });
          } else {
            window.scrollTo({ top: currentScroll + pageHeight, behavior: 'smooth' });
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentChapter, chapters.length, pageMode, bookmarks]);

  const bgColor = darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-amber-50 to-orange-50';
  const cardBg = darkMode ? 'bg-gray-800' : 'bg-white';
  const textColor = darkMode ? 'text-gray-100' : 'text-gray-800';
  const secondaryText = darkMode ? 'text-gray-400' : 'text-gray-600';

  return (
    <div className={`min-h-screen ${bgColor} transition-colors duration-300`}>
      {cssContent && <style dangerouslySetInnerHTML={{ __html: cssContent }} />}
      
      {/* Header */}
      <div className={`${cardBg} shadow-md sticky top-0 z-10`}>
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <Book className="w-6 h-6 text-orange-600" />
              <h1 className={`text-xl font-bold ${textColor}`}>EPUB Viewer</h1>
            </div>
            
            {epubContent && (
              <div className="flex gap-2">
                <button
                  onClick={() => setShowSearch(!showSearch)}
                  className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  title="Search (Ctrl+F)"
                >
                  <Search className="w-5 h-5" />
                </button>
                <button
                  onClick={toggleBookmark}
                  className={`p-2 ${isBookmarked ? 'bg-yellow-500' : 'bg-gray-600'} text-white rounded-lg hover:opacity-80 transition-colors`}
                  title="Bookmark (Ctrl+B)"
                >
                  <Bookmark className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setShowSettings(!showSettings)}
                  className="p-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  title="Settings"
                >
                  <Settings className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setShowToc(!showToc)}
                  className="p-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                  title="Table of Contents"
                >
                  <Menu className="w-5 h-5" />
                </button>
                <button
                  onClick={resetViewer}
                  className="p-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  title="New Book"
                >
                  <Upload className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
          
          {/* Progress Bar */}
          {epubContent && (
            <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
              <div 
                className="bg-orange-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${readingProgress}%` }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Search Panel */}
      {showSearch && epubContent && (
        <div className={`${cardBg} shadow-lg mx-4 mt-4 p-4 rounded-lg max-w-4xl mx-auto`}>
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Search in book..."
              className={`flex-1 px-4 py-2 border rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
            />
            <button
              onClick={handleSearch}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Search
            </button>
          </div>
          
          {searchResults.length > 0 && (
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {searchResults.map((result, i) => (
                <div
                  key={i}
                  onClick={() => {
                    setCurrentChapter(result.chapterIndex);
                    setShowSearch(false);
                    window.scrollTo(0, 0);
                  }}
                  className={`p-3 rounded cursor-pointer ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                >
                  <p className="font-semibold text-sm text-orange-600">{result.chapterTitle}</p>
                  <p className={`text-sm ${secondaryText}`}>{result.context}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Settings Panel */}
      {showSettings && epubContent && (
        <div className={`${cardBg} shadow-lg mx-4 mt-4 p-6 rounded-lg max-w-4xl mx-auto`}>
          <h3 className={`text-lg font-bold ${textColor} mb-4`}>Reading Settings</h3>
          
          <div className="space-y-4">
            {/* Font Size */}
            <div>
              <label className={`block text-sm font-medium ${textColor} mb-2`}>
                Font Size: {fontSize}px
              </label>
              <div className="flex gap-2 items-center">
                <button onClick={() => setFontSize(Math.max(12, fontSize - 2))} className="p-2 bg-gray-300 rounded">
                  <ZoomOut className="w-4 h-4" />
                </button>
                <input
                  type="range"
                  min="12"
                  max="32"
                  value={fontSize}
                  onChange={(e) => setFontSize(Number(e.target.value))}
                  className="flex-1"
                />
                <button onClick={() => setFontSize(Math.min(32, fontSize + 2))} className="p-2 bg-gray-300 rounded">
                  <ZoomIn className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            {/* Line Height */}
            <div>
              <label className={`block text-sm font-medium ${textColor} mb-2`}>
                Line Height: {lineHeight}
              </label>
              <input
                type="range"
                min="1.2"
                max="2.5"
                step="0.1"
                value={lineHeight}
                onChange={(e) => setLineHeight(Number(e.target.value))}
                className="w-full"
              />
            </div>
            
            {/* Font Family */}
            <div>
              <label className={`block text-sm font-medium ${textColor} mb-2`}>Font Family</label>
              <select
                value={fontFamily}
                onChange={(e) => setFontFamily(e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
              >
                <option value="serif">Serif (Traditional)</option>
                <option value="sans-serif">Sans Serif (Modern)</option>
                <option value="monospace">Monospace (Code)</option>
              </select>
            </div>
            
            {/* Dark Mode */}
            <div className="flex items-center justify-between">
              <label className={`text-sm font-medium ${textColor}`}>Dark Mode</label>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-lg ${darkMode ? 'bg-yellow-500' : 'bg-gray-700'} text-white`}
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>
            
            {/* Page Mode Toggle */}
            <div className="flex items-center justify-between">
              <label className={`text-sm font-medium ${textColor}`}>Page View Mode</label>
              <button
                onClick={() => setPageMode(!pageMode)}
                className={`px-4 py-2 rounded-lg ${pageMode ? 'bg-green-600' : 'bg-gray-400'} text-white`}
              >
                {pageMode ? 'ON (Book-like)' : 'OFF (Continuous)'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4 text-red-700">
            <strong>Error:</strong> {error}
          </div>
        )}
        
        {!epubContent ? (
          <div className={`${cardBg} rounded-xl shadow-lg p-12 text-center`}>
            <Book className="w-16 h-16 text-orange-600 mx-auto mb-4" />
            <h2 className={`text-2xl font-bold ${textColor} mb-2`}>
              EPUB File Upload Karein
            </h2>
            <p className={`${secondaryText} mb-6`}>
              Apni EPUB file select karein aur padhna shuru karein
            </p>
            <label className="inline-block">
              <input
                type="file"
                accept=".epub"
                onChange={handleFileUpload}
                className="hidden"
              />
              <span className="px-6 py-3 bg-orange-600 text-white rounded-lg cursor-pointer hover:bg-orange-700 transition-colors inline-block">
                File Select Karein
              </span>
            </label>
          </div>
        ) : loading ? (
          <div className={`${cardBg} rounded-xl shadow-lg p-12 text-center`}>
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-600 mx-auto mb-4"></div>
            <p className={secondaryText}>EPUB load ho raha hai...</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Cover Image */}
            {coverImage && currentChapter === 0 && (
              <div className={`${cardBg} rounded-xl shadow-lg p-8 text-center`}>
                <img 
                  src={coverImage} 
                  alt="Book Cover" 
                  className="max-w-sm mx-auto rounded-lg shadow-md"
                />
              </div>
            )}
            
            {/* Chapter Info */}
            <div className={`${cardBg} rounded-lg shadow p-4 flex items-center justify-between`}>
              <div>
                <p className={`text-sm ${secondaryText}`}>Current Chapter</p>
                <p className={`font-semibold ${textColor}`}>
                  {chapters[currentChapter]?.title}
                </p>
              </div>
              <div className={`text-sm ${secondaryText}`}>
                {currentChapter + 1} / {chapters.length}
              </div>
            </div>

            {/* Chapter Content - Add tap zones for mobile */}
            <div 
              className={`${cardBg} rounded-xl shadow-lg p-8 md:p-12 transition-all duration-300 ${
                slideDirection === 'left' ? 'page-slide-left' : 
                slideDirection === 'right' ? 'page-slide-right' : ''
              }`}
              ref={contentRef}
              style={{
                minHeight: pageMode ? '70vh' : 'auto',
                maxHeight: pageMode ? '70vh' : 'none',
                overflow: pageMode ? 'auto' : 'visible',
                position: 'relative'
              }}
              onClick={(e) => {
                // Mobile tap zones - only in page mode
                if (!pageMode || window.innerWidth > 768) return;
                
                const rect = e.currentTarget.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const width = rect.width;
                
                // Left 1/3 = previous page
                if (clickX < width / 3) {
                  prevPage();
                }
                // Right 1/3 = next page
                else if (clickX > (width * 2) / 3) {
                  nextPage();
                }
                // Middle 1/3 = show/hide navigation
                else {
                  setShowNavigation(!showNavigation);
                  setLastMouseMove(Date.now());
                }
              }}
            >
              <div 
                className={`prose prose-lg max-w-none leading-relaxed epub-content ${textColor}`}
                dangerouslySetInnerHTML={{ __html: chapters[currentChapter]?.content }}
                style={{
                  fontSize: `${fontSize}px`,
                  lineHeight: lineHeight,
                  fontFamily: fontFamily
                }}
              />
              
              {/* Mobile tap zone indicators - only show briefly */}
              {pageMode && window.innerWidth <= 768 && showNavigation && (
                <div className="absolute inset-0 pointer-events-none md:hidden">
                  <div className="h-full w-1/3 float-left flex items-center justify-center">
                    <div className="bg-blue-600 bg-opacity-20 p-3 rounded-full animate-pulse">
                      <span className="text-2xl">←</span>
                    </div>
                  </div>
                  <div className="h-full w-1/3 float-left flex items-center justify-center">
                    <div className="bg-gray-600 bg-opacity-20 p-3 rounded-full animate-pulse">
                      <Menu className="w-6 h-6" />
                    </div>
                  </div>
                  <div className="h-full w-1/3 float-left flex items-center justify-center">
                    <div className="bg-blue-600 bg-opacity-20 p-3 rounded-full animate-pulse">
                      <span className="text-2xl">→</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Navigation - Auto-hide with smooth transition */}
            <div 
              className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 z-30 transition-all duration-500 ${
                showNavigation ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20 pointer-events-none'
              }`}
            >
              <div className="flex gap-2 items-center bg-white dark:bg-gray-800 p-3 rounded-2xl shadow-2xl border-2 border-orange-500">
                {/* Chapter Navigation */}
                <button
                  onClick={prevChapter}
                  disabled={currentChapter === 0}
                  className="flex items-center gap-1 px-3 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all hover:scale-105 text-sm font-medium"
                  title="Previous Chapter"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span className="hidden md:inline">Ch</span>
                </button>
                
                {/* Page Navigation (Only in Page Mode) */}
                {pageMode && (
                  <div className="flex gap-1 px-2 border-x-2 border-gray-300">
                    <button
                      onClick={prevPage}
                      className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all hover:scale-105"
                      title="Previous Page"
                    >
                      ↑
                    </button>
                    <button
                      onClick={nextPage}
                      className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all hover:scale-105"
                      title="Next Page"
                    >
                      ↓
                    </button>
                  </div>
                )}
                
                {/* Scroll to Top */}
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="p-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all hover:scale-105"
                  title="Scroll to Top"
                >
                  ⬆
                </button>
                
                {/* Chapter Navigation */}
                <button
                  onClick={nextChapter}
                  disabled={currentChapter === chapters.length - 1}
                  className="flex items-center gap-1 px-3 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all hover:scale-105 text-sm font-medium"
                  title="Next Chapter"
                >
                  <span className="hidden md:inline">Ch</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            {/* Side Navigation for Page Mode - Auto-hide */}
            {pageMode && (
              <>
                {/* Left Side Page Nav */}
                <button
                  onClick={prevPage}
                  className={`fixed left-4 top-1/2 transform -translate-y-1/2 p-4 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all hover:scale-110 shadow-2xl z-30 ${
                    showNavigation ? 'opacity-50 hover:opacity-100' : 'opacity-0 -translate-x-20 pointer-events-none'
                  }`}
                  title="Previous Page"
                >
                  ←
                </button>
                
                {/* Right Side Page Nav */}
                <button
                  onClick={nextPage}
                  className={`fixed right-4 top-1/2 transform -translate-y-1/2 p-4 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all hover:scale-110 shadow-2xl z-30 ${
                    showNavigation ? 'opacity-50 hover:opacity-100' : 'opacity-0 translate-x-20 pointer-events-none'
                  }`}
                  title="Next Page"
                >
                  →
                </button>
              </>
            )}
            
            {/* Show Navigation Hint - Different for mobile/desktop */}
            {!showNavigation && epubContent && (
              <div className="fixed bottom-2 left-1/2 transform -translate-x-1/2 z-30 animate-pulse">
                <div className="bg-gray-800 text-white px-4 py-1 rounded-full text-xs opacity-50 hover:opacity-100 transition-opacity">
                  <span className="hidden md:inline">Move mouse to show controls</span>
                  <span className="md:hidden">Tap center to show controls</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Table of Contents Sidebar */}
      {showToc && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-20" onClick={() => setShowToc(false)}>
          <div 
            className={`absolute right-0 top-0 h-full w-80 ${cardBg} shadow-2xl p-6 overflow-y-auto`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className={`text-xl font-bold ${textColor}`}>Contents</h3>
              <button onClick={() => setShowToc(false)}>
                <X className={`w-6 h-6 ${secondaryText}`} />
              </button>
            </div>
            
            {/* Bookmarks Section */}
            {bookmarks.length > 0 && (
              <div className="mb-6">
                <h4 className={`text-sm font-semibold ${textColor} mb-2 flex items-center gap-2`}>
                  <Bookmark className="w-4 h-4 text-yellow-500" />
                  Bookmarks
                </h4>
                <div className="space-y-1 mb-4 pb-4 border-b border-gray-300">
                  {bookmarks.map((bookmark, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setCurrentChapter(bookmark.chapter);
                        setShowToc(false);
                        window.scrollTo(0, 0);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors text-xs ${
                        currentChapter === bookmark.chapter
                          ? 'bg-yellow-500 text-white'
                          : darkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-yellow-50 text-gray-700'
                      }`}
                    >
                      <div className="font-medium">{bookmark.title}</div>
                      <div className={`text-xs ${currentChapter === bookmark.chapter ? 'text-yellow-100' : 'opacity-60'}`}>
                        {bookmark.timestamp}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Chapters List */}
            <h4 className={`text-sm font-semibold ${textColor} mb-2`}>Chapters</h4>
            <div className="space-y-2">
              {chapters.map((chapter, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentChapter(index);
                    setShowToc(false);
                    window.scrollTo(0, 0);
                  }}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors text-sm ${
                    currentChapter === index
                      ? 'bg-orange-600 text-white'
                      : darkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-orange-50 text-gray-700'
                  }`}
                >
                  {chapter.title}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {/* Additional CSS for EPUB content */}
      <style>{`
        .epub-content img {
          max-width: 100%;
          height: auto;
          display: block;
          margin: 20px auto;
          border-radius: 8px;
        }
        .epub-content p {
          margin-bottom: 1em;
          text-align: justify;
        }
        .epub-content h1, .epub-content h2, .epub-content h3 {
          margin-top: 1.5em;
          margin-bottom: 0.5em;
        }
        .epub-content a.epub-internal-link {
          color: #ea580c;
          text-decoration: none;
          cursor: pointer;
          transition: all 0.2s;
        }
        .epub-content a.epub-internal-link:hover {
          text-decoration: underline;
          color: #c2410c;
        }
        .epub-content a[target="_blank"] {
          color: #2563eb;
        }
        .epub-content a[target="_blank"]:hover {
          color: #1d4ed8;
        }
        
        /* Page Slide Animations */
        @keyframes slideOutLeft {
          0% {
            transform: translateX(0);
            opacity: 1;
          }
          100% {
            transform: translateX(-20px);
            opacity: 0.7;
          }
        }
        
        @keyframes slideInFromRight {
          0% {
            transform: translateX(20px);
            opacity: 0.7;
          }
          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        @keyframes slideOutRight {
          0% {
            transform: translateX(0);
            opacity: 1;
          }
          100% {
            transform: translateX(20px);
            opacity: 0.7;
          }
        }
        
        @keyframes slideInFromLeft {
          0% {
            transform: translateX(-20px);
            opacity: 0.7;
          }
          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        .page-slide-left {
          animation: slideOutLeft 0.2s ease-out, slideInFromRight 0.3s ease-in 0.2s;
        }
        
        .page-slide-right {
          animation: slideOutRight 0.2s ease-out, slideInFromLeft 0.3s ease-in 0.2s;
        }
      `}</style>
    </div>
  );
}