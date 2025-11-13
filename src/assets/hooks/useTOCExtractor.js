// // // // // hooks/useTOCExtractor.js
// // // // import { useState, useEffect } from 'react';
// // // // import { pdfjs } from 'react-pdf';

// // // // const useTOCExtractor = (pdfDoc) => {
// // // //     const [toc, setToc] = useState([]);
// // // //     const [loading, setLoading] = useState(false);
// // // //     const [error, setError] = useState('');

// // // //     useEffect(() => {
// // // //         const extractTOC = async () => {
// // // //             console.log('inside toc hook')
// // // //             if (!pdfDoc) return;
// // // //             console.log('this is pdfDoc', pdfDoc)
// // // //             setLoading(true);
// // // //             setError('');

// // // //             try {
// // // //                 // Method 1: PDF outline se TOC extract karein
// // // //                 const outline = await pdfDoc.getOutline();
// // // //                 console.log('outline', outline)
// // // //                 if (outline && outline.length > 0) {
// // // //                     const tocItems = [];

// // // //                     const processOutlineItems = (items, level = 0) => {
// // // //                         items.forEach((item) => {
// // // //                             if (item.title) {
// // // //                                 tocItems.push({
// // // //                                     title: item.title,
// // // //                                     pageNumber: item.dest ? extractPageNumber(item.dest) : 1,
// // // //                                     level: level
// // // //                                 });
// // // //                             }

// // // //                             if (item.items && item.items.length > 0) {
// // // //                                 processOutlineItems(item.items, level + 1);
// // // //                             }
// // // //                         });
// // // //                     };

// // // //                     processOutlineItems(outline);
// // // //                     setToc(tocItems);
// // // //                 } else {
// // // //                     // Method 2: Fallback - first few pages se TOC dhoondein
// // // //                     const fallbackToc = await extractTOCFromPages(pdfDoc);
// // // //                     setToc(fallbackToc);
// // // //                 }
// // // //             } catch (err) {
// // // //                 console.warn('TOC extraction failed:', err);
// // // //                 setToc([]);
// // // //             } finally {
// // // //                 setLoading(false);
// // // //             }
// // // //         };

// // // //         extractTOC();
// // // //     }, [pdfDoc]);

// // // //     return { toc, loading, error };
// // // // };

// // // // // Page number extract karne ka helper function
// // // // const extractPageNumber = (dest) => {
// // // //     if (!dest) return 1;

// // // //     if (typeof dest === 'string') {
// // // //         return 1;
// // // //     }

// // // //     if (Array.isArray(dest)) {
// // // //         // PDF.js destination array format
// // // //         const pageRef = dest[0];
// // // //         if (pageRef && pageRef.num !== undefined) {
// // // //             return pageRef.num + 1; // Zero-based to one-based
// // // //         }
// // // //     }

// // // //     return 1;
// // // // };

// // // // // Pages se TOC extract karne ka fallback method
// // // // const extractTOCFromPages = async (pdfDoc) => {
// // // //     const tocItems = [];
// // // //     const maxPagesToCheck = Math.min(5, pdfDoc.numPages);

// // // //     try {
// // // //         for (let i = 1; i <= maxPagesToCheck; i++) {
// // // //             const page = await pdfDoc.getPage(i);
// // // //             const textContent = await page.getTextContent();

// // // //             // Text content ko process karein
// // // //             const text = textContent.items.map(item => item.str).join('\n');

// // // //             // TOC pattern check karein
// // // //             if (text.toLowerCase().includes('table of contents') ||
// // // //                 text.toLowerCase().includes('contents')) {

// // // //                 const lines = text.split('\n');
// // // //                 let foundTOCSection = false;

// // // //                 for (const line of lines) {
// // // //                     const cleanLine = line.trim();

// // // //                     if (cleanLine.toLowerCase().includes('table of contents')) {
// // // //                         foundTOCSection = true;
// // // //                         continue;
// // // //                     }

// // // //                     if (foundTOCSection && cleanLine.length > 2) {
// // // //                         // Simple TOC line detection (customize as needed)
// // // //                         const pageMatch = cleanLine.match(/(\d+)\s*$/);
// // // //                         if (pageMatch) {
// // // //                             const title = cleanLine.replace(pageMatch[0], '').trim();
// // // //                             if (title && !title.toLowerCase().includes('chapter') && title.length > 1) {
// // // //                                 tocItems.push({
// // // //                                     title: title,
// // // //                                     pageNumber: parseInt(pageMatch[1]),
// // // //                                     level: 0
// // // //                                 });
// // // //                             }
// // // //                         }
// // // //                     }
// // // //                 }
// // // //                 break;
// // // //             }
// // // //         }
// // // //     } catch (err) {
// // // //         console.error('Fallback TOC extraction error:', err);
// // // //     }

// // // //     return tocItems;
// // // // };

// // // // export default useTOCExtractor;

// // // // import { useState, useEffect } from 'react';
// // // // import { pdfjs } from 'react-pdf';

// // // // /**
// // // //  * Custom React hook to extract a Table of Contents (TOC)
// // // //  * from a loaded PDFDocumentProxy object (react-pdf or pdfjs).
// // // //  *
// // // //  * - Step 1: Try to extract PDF Outline (bookmarks)
// // // //  * - Step 2: If unavailable, fallback to scanning first few pages for TOC-like text
// // // //  */

// // // // const useTOCExtractor = (pdfDoc) => {
// // // //   const [toc, setToc] = useState([]);
// // // //   const [loading, setLoading] = useState(false);
// // // //   const [error, setError] = useState('');

// // // //   useEffect(() => {
// // // //     if (!pdfDoc) return;

// // // //     const extractTOC = async () => {
// // // //       setLoading(true);
// // // //       setError('');

// // // //       try {
// // // //         console.log('Extracting TOC from PDF:', pdfDoc);

// // // //         // --- STEP 1: Try using built-in PDF outline ---
// // // //         const outline = await pdfDoc.getOutline();
// // // //         console.log('PDF Outline:', outline);

// // // //         if (outline && outline.length > 0) {
// // // //           const tocItems = [];

// // // //           const processOutline = (items, level = 0) => {
// // // //             for (const item of items) {
// // // //               if (item.title) {
// // // //                 tocItems.push({
// // // //                   title: cleanTitle(item.title),
// // // //                   pageNumber: item.dest ? extractPageNumber(pdfDoc, item.dest) : 1,
// // // //                   level,
// // // //                 });
// // // //               }

// // // //               if (item.items && item.items.length > 0) {
// // // //                 processOutline(item.items, level + 1);
// // // //               }
// // // //             }
// // // //           };

// // // //           processOutline(outline);
// // // //           setToc(tocItems);
// // // //           setLoading(false);
// // // //           return;
// // // //         }

// // // //         // --- STEP 2: Fallback method: text-based TOC extraction ---
// // // //         const fallbackToc = await extractTOCFromPages(pdfDoc);

// // // //         console.log('fallbacktoc ',fallbackToc)
// // // //         setToc(fallbackToc);
// // // //       } catch (err) {
// // // //         console.error('TOC extraction error:', err);
// // // //         setError('Failed to extract TOC');
// // // //         setToc([]);
// // // //       } finally {
// // // //         setLoading(false);
// // // //       }
// // // //     };

// // // //     extractTOC();
// // // //   }, [pdfDoc]);

// // // //   return { toc, loading, error };
// // // // };

// // // // export default useTOCExtractor;

// // // // /* -----------------------------------------------
// // // //  * Helper Functions
// // // //  * ---------------------------------------------*/

// // // // // ✅ Clean extra dots/spaces in TOC titles
// // // // const cleanTitle = (title) => title.replace(/\.+$/g, '').trim();

// // // // // ✅ Extract page number (handles both ref-based and named destinations)
// // // // const extractPageNumber = (pdfDoc, dest) => {
// // // //   if (!dest) return 1;

// // // //   try {
// // // //     if (Array.isArray(dest)) {
// // // //       const [pageRef] = dest;
// // // //       if (pageRef && typeof pageRef === 'object' && 'num' in pageRef) {
// // // //         return pageRef.num + 1;
// // // //       }
// // // //     }

// // // //     // Handle named destinations
// // // //     if (typeof dest === 'string') {
// // // //       return pdfDoc.getDestination(dest).then((resolvedDest) => {
// // // //         const [pageRef] = resolvedDest;
// // // //         if (pageRef && typeof pageRef === 'object' && 'num' in pageRef) {
// // // //           return pageRef.num + 1;
// // // //         }
// // // //         return 1;
// // // //       });
// // // //     }
// // // //   } catch (e) {
// // // //     console.warn('extractPageNumber failed for dest:', dest);
// // // //   }

// // // //   return 1;
// // // // };

// // // // // ✅ Fallback: extract TOC-like structure from text pages
// // // // const extractTOCFromPages = async (pdfDoc) => {
// // // //   const tocItems = [];
// // // //   const maxPagesToCheck = Math.min(5, pdfDoc.numPages);
// // // //   const tocRegex = /(table\s+of\s+contents|contents|index)/i;

// // // //   try {
// // // //     for (let i = 1; i <= maxPagesToCheck; i++) {
// // // //       const page = await pdfDoc.getPage(i);
// // // //       const textContent = await page.getTextContent();
// // // //       const text = textContent.items.map((t) => t.str).join('\n');

// // // //       // Find "Contents" section
// // // //       if (tocRegex.test(text)) {
// // // //         console.log(`TOC-like section found on page ${i}`);

// // // //         const lines = text.split('\n');
// // // //         let foundTOC = false;

// // // //         for (const line of lines) {
// // // //           const cleanLine = line.trim();

// // // //           console.log(tocRegex.test(cleanLine),lines.length)

// // // //           if (tocRegex.test(cleanLine)) {
// // // //             foundTOC = true;
// // // //             continue;
// // // //           }

// // // //           // Simple TOC entry detector: "Chapter title .... 12"
// // // //           if (foundTOC && cleanLine.length > 3) {
// // // //             const pageMatch = cleanLine.match(/(\d+)\s*$/);
// // // //             console.log((pageMatch))
// // // //             if (pageMatch) {
// // // //               const title = cleanLine.replace(pageMatch[0], '').trim();
// // // //               if (title && title.length > 2) {
// // // //                 tocItems.push({
// // // //                   title: cleanTitle(title),
// // // //                   pageNumber: parseInt(pageMatch[1]),
// // // //                   level: 0,
// // // //                 });
// // // //               }
// // // //             }
// // // //           }

// // // //           // Stop if TOC ends or next section starts
// // // //           if (foundTOC && cleanLine.toLowerCase().startsWith('chapter 1')) break;
// // // //         }

// // // //         // Stop after first TOC found
// // // //         if (tocItems.length > 0) break;
// // // //       }
// // // //     }
// // // //   } catch (err) {
// // // //     console.error('Fallback TOC extraction error:', err);
// // // //   }

// // // //   return tocItems;
// // // // };


// // // import { useState, useEffect } from 'react';
// // // import { pdfjs } from 'react-pdf';

// // // /**
// // //  * Custom React hook for extracting a Table of Contents (TOC)
// // //  * from a loaded PDFDocumentProxy object (react-pdf/pdfjs).
// // //  *
// // //  * 1️⃣ First tries pdfDoc.getOutline() for built-in bookmarks.
// // //  * 2️⃣ Falls back to scanning the first few pages for TOC text.
// // //  */

// // // const useTOCExtractor = (pdfDoc) => {
// // //   const [toc, setToc] = useState([]);
// // //   const [loading, setLoading] = useState(false);
// // //   const [error, setError] = useState('');

// // //   useEffect(() => {
// // //     if (!pdfDoc) return;

// // //     const extractTOC = async () => {
// // //       setLoading(true);
// // //       setError('');
// // //       setToc([]);

// // //       try {
// // //         console.log('🧠 Starting TOC extraction...');

// // //         // --- Step 1: Try PDF Outline ---
// // //         const outline = await pdfDoc.getOutline();
// // //         if (outline && outline.length > 0) {
// // //           console.log('✅ Outline found with', outline.length, 'items');
// // //           const tocItems = [];
// // //           processOutlineItems(outline, tocItems);
// // //           setToc(tocItems);
// // //           setLoading(false);
// // //           return;
// // //         }

// // //         // --- Step 2: Fallback to Text-Based TOC Detection ---
// // //         console.log('⚙️ No outline found. Using fallback TOC extraction...');
// // //         const fallbackToc = await extractTOCFromPages(pdfDoc);
// // //         setToc(fallbackToc);
// // //       } catch (err) {
// // //         console.error('❌ TOC extraction error:', err);
// // //         setError('Failed to extract TOC');
// // //         setToc([]);
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };

// // //     extractTOC();
// // //   }, [pdfDoc]);

// // //   return { toc, loading, error };
// // // };

// // // export default useTOCExtractor;

// // // /* -----------------------------------------------
// // //  * Helper Functions
// // //  * ---------------------------------------------*/

// // // // ✅ Recursively process outline-based TOC
// // // const processOutlineItems = (items, result, level = 0) => {
// // //   for (const item of items) {
// // //     if (item.title) {
// // //       result.push({
// // //         title: cleanTitle(item.title),
// // //         pageNumber: item.dest ? extractPageNumber(item.dest) : 1,
// // //         level,
// // //       });
// // //     }
// // //     if (item.items && item.items.length > 0) {
// // //       processOutlineItems(item.items, result, level + 1);
// // //     }
// // //   }
// // // };

// // // // ✅ Extracts page number from PDF destination
// // // const extractPageNumber = (dest) => {
// // //   if (!dest) return 1;
// // //   try {
// // //     if (Array.isArray(dest)) {
// // //       const [pageRef] = dest;
// // //       if (pageRef && typeof pageRef === 'object' && 'num' in pageRef) {
// // //         return pageRef.num + 1;
// // //       }
// // //     }
// // //   } catch (e) {
// // //     console.warn('extractPageNumber failed:', e);
// // //   }
// // //   return 1;
// // // };

// // // // ✅ Clean extra dots/spaces in TOC titles
// // // const cleanTitle = (title) => title.replace(/\.+$/g, '').trim();

// // // /**
// // //  * Fallback: scans text content of the first few pages
// // //  * to detect a Table of Contents block
// // //  */
// // // // const extractTOCFromPages = async (pdfDoc) => {
// // // //   const tocItems = [];
// // // //   const maxPagesToCheck = Math.min(5, pdfDoc.numPages);
// // // //   const tocRegex = /(table\s+of\s+contents|contents|index)/i;

// // // //   try {
// // // //     for (let i = 1; i <= maxPagesToCheck; i++) {
// // // //       const page = await pdfDoc.getPage(i);
// // // //       const textContent = await page.getTextContent();

// // // //       // Combine fragmented text into a smoother stream
// // // //       const text = textContent.items.map((t) => t.str).join(' ');
// // // //       console.log(`🔍 Checking page ${i} (${textContent.items.length} fragments)`);

// // // //       // If "Table of Contents" or similar keyword appears in the whole text
// // // //       if (tocRegex.test(text)) {
// // // //         console.log(`✅ Possible TOC section detected on page ${i}`);

// // // //         // Rebuild readable lines
// // // //         const lines = reconstructLines(textContent.items);
// // // //         console.log(`📄 Reconstructed ${lines.length} lines`);

// // // //         let foundTOC = false;
// // // //         for (const line of lines) {
// // // //           const cleanLine = line.trim();

// // // //           if (tocRegex.test(cleanLine)) {
// // // //             foundTOC = true;
// // // //             continue;
// // // //           }

// // // //           if (foundTOC && cleanLine.length > 3) {
// // // //             // Simple pattern: "Chapter title .... 12"
// // // //             const pageMatch = cleanLine.match(/(\d+)\s*$/);
// // // //             if (pageMatch) {
// // // //               const title = cleanLine.replace(pageMatch[0], '').trim();
// // // //               if (title && title.length > 2) {
// // // //                 tocItems.push({
// // // //                   title: cleanTitle(title),
// // // //                   pageNumber: parseInt(pageMatch[1]),
// // // //                   level: 0,
// // // //                 });
// // // //               }
// // // //             }
// // // //           }

// // // //           // Stop when TOC block likely ends
// // // //           if (foundTOC && tocItems.length > 30) break;
// // // //         }

// // // //         // Stop after first TOC found
// // // //         if (tocItems.length > 0) break;
// // // //       }
// // // //     }
// // // //   } catch (err) {
// // // //     console.error('⚠️ Fallback TOC extraction failed:', err);
// // // //   }

// // // //   console.log('🧾 Fallback TOC Items:', tocItems);
// // // //   return tocItems;
// // // // };


// // // // const extractTOCFromPages = async (pdfDoc) => {
// // // //   const tocItems = [];
// // // //   const maxPagesToCheck = Math.min(5, pdfDoc.numPages);
// // // //   const tocRegex = /(table\s+of\s+contents|contents|index)/i;

// // // //   try {
// // // //     for (let i = 1; i <= maxPagesToCheck; i++) {
// // // //       const page = await pdfDoc.getPage(i);
// // // //       const textContent = await page.getTextContent();
// // // //       const text = textContent.items.map((t) => t.str).join(' ');

// // // //       console.log(`🔍 Checking page ${i} (${textContent.items.length} fragments)`);

// // // //       if (tocRegex.test(text)) {
// // // //         console.log(`✅ Possible TOC section detected on page ${i}`);

// // // //         const lines = reconstructLines(textContent.items);
// // // //         console.log(`📄 Reconstructed ${lines.length} lines`);

// // // //         let foundTOC = false;
// // // //         for (let j = 0; j < lines.length; j++) {
// // // //           const cleanLine = lines[j].trim();

// // // //           // When we see the header
// // // //           if (tocRegex.test(cleanLine)) {
// // // //             foundTOC = true;
// // // //             continue;
// // // //           }

// // // //           if (foundTOC && cleanLine.length > 3) {
// // // //             // Match patterns like: "1. Introduction 5", "Chapter One .... 10", etc.
// // // //             const match =
// // // //               cleanLine.match(/^(?:\d+\.\s*)?(.*?)(?:\.{2,}|\s+|–|-|—)+(\d{1,3})$/) ||
// // // //               cleanLine.match(/^([A-Za-z].+?)\s+(\d{1,3})$/);

// // // //             if (match) {
// // // //               const [, titleRaw, pageRaw] = match;
// // // //               const title = cleanTitle(titleRaw);
// // // //               const pageNumber = parseInt(pageRaw);

// // // //               if (title && pageNumber && !Number.isNaN(pageNumber)) {
// // // //                 tocItems.push({
// // // //                   title,
// // // //                   pageNumber,
// // // //                   level: detectLevel(title),
// // // //                 });
// // // //               }
// // // //             }

// // // //             // Handle case where page number appears on next line (2-line TOC entry)
// // // //             else if (j + 1 < lines.length) {
// // // //               const nextLine = lines[j + 1].trim();
// // // //               const pageNumMatch = nextLine.match(/^(\d{1,3})$/);
// // // //               if (pageNumMatch) {
// // // //                 tocItems.push({
// // // //                   title: cleanTitle(cleanLine),
// // // //                   pageNumber: parseInt(pageNumMatch[1]),
// // // //                   level: detectLevel(cleanLine),
// // // //                 });
// // // //               }
// // // //             }
// // // //           }

// // // //           if (foundTOC && tocItems.length > 50) break;
// // // //         }

// // // //         if (tocItems.length > 0) break;
// // // //       }
// // // //     }
// // // //   } catch (err) {
// // // //     console.error('⚠️ Fallback TOC extraction failed:', err);
// // // //   }

// // // //   console.log('🧾 Fallback TOC Items:', tocItems);
// // // //   return tocItems;
// // // // };

// // // const extractTOCFromPages = async (pdfDoc) => {
// // //   const tocItems = [];
// // //   const maxPagesToCheck = Math.min(5, pdfDoc.numPages);
// // //   const tocRegex = /(table\s+of\s+contents|contents|index)/i;

// // //   console.log("🧠 Starting fallback TOC extraction...");

// // //   try {
// // //     for (let i = 1; i <= maxPagesToCheck; i++) {
// // //       const page = await pdfDoc.getPage(i);
// // //       const textContent = await page.getTextContent();

// // //       console.log(`🔍 Checking page ${i} (${textContent.items.length} fragments)`);

// // //       if (textContent.items.length > 1500) {
// // //         console.warn(`⚠️ Skipping page ${i}: too many fragments (${textContent.items.length})`);
// // //         continue; // skip very dense pages
// // //       }

// // //       const text = textContent.items.map((t) => t.str).join(" ");
// // //       if (!tocRegex.test(text)) continue;

// // //       console.log(`✅ Possible TOC section detected on page ${i}`);
// // //       const lines = reconstructLines(textContent.items);
// // //       console.log(`📄 Reconstructed ${lines.length} lines`);

// // //       let foundTOC = false;
// // //       let processed = 0;

// // //       for (let j = 0; j < lines.length; j++) {
// // //         const cleanLine = lines[j].trim();
// // //         if (!cleanLine) continue;

// // //         // Yield control back every 200 lines to keep UI responsive
// // //         if (++processed % 200 === 0) await new Promise((r) => setTimeout(r, 0));

// // //         if (tocRegex.test(cleanLine)) {
// // //           foundTOC = true;
// // //           continue;
// // //         }

// // //         if (!foundTOC) continue;

// // //         // Match formats like: "1. Title ..... 5", "Title — 10", "Title 3"
// // //         const match =
// // //           cleanLine.match(/^(?:\d+\.\s*)?(.*?)(?:\.{2,}|\s+|–|-|—)+(\d{1,3})$/) ||
// // //           cleanLine.match(/^([A-Za-z].+?)\s+(\d{1,3})$/);

// // //         if (match) {
// // //           const [, titleRaw, pageRaw] = match;
// // //           const title = cleanTitle(titleRaw);
// // //           const pageNumber = parseInt(pageRaw);

// // //           if (title && pageNumber && !Number.isNaN(pageNumber)) {
// // //             tocItems.push({
// // //               title,
// // //               pageNumber,
// // //               level: detectLevel(title),
// // //             });
// // //           }
// // //         } else if (j + 1 < lines.length) {
// // //           const nextLine = lines[j + 1].trim();
// // //           const pageNumMatch = nextLine.match(/^(\d{1,3})$/);
// // //           if (pageNumMatch) {
// // //             tocItems.push({
// // //               title: cleanTitle(cleanLine),
// // //               pageNumber: parseInt(pageNumMatch[1]),
// // //               level: detectLevel(cleanLine),
// // //             });
// // //           }
// // //         }

// // //         // Stop if too many TOC entries
// // //         if (tocItems.length > 10) {
// // //           console.warn("⚙️ Stopping early — TOC limit reached (100 items)");
// // //           break;
// // //         }
// // //       }

// // //       if (tocItems.length > 0) break;
// // //     }
// // //   } catch (err) {
// // //     console.error("⚠️ Fallback TOC extraction failed:", err);
// // //   }

// // //   console.log("🧾 Fallback TOC Items:", tocItems);
// // //   return tocItems;
// // // };


// // // const detectLevel = (title) => {
// // //   // Detect basic hierarchy from title pattern
// // //   if (/chapter\s+\d+/i.test(title)) return 0;
// // //   if (/section\s+\d+/i.test(title)) return 1;
// // //   if (/subsection\s+\d+/i.test(title)) return 2;
// // //   if (/^\d+\.\d+/.test(title)) return 1;
// // //   if (/^\d+\.\d+\.\d+/.test(title)) return 2;
// // //   return 0;
// // // };


// // // /**
// // //  * 📚 Reconstructs more natural lines from fragmented text
// // //  * by grouping nearby text items horizontally.
// // //  */
// // // const reconstructLines = (items) => {
// // //   const lines = [];
// // //   let currentLine = '';

// // //   for (let i = 0; i < items.length; i++) {
// // //     const str = items[i].str.trim();
// // //     if (!str) continue;

// // //     currentLine += str + ' ';

// // //     // If text likely ends a line (ends with number or dot sequences)
// // //     if (/[.]{2,}|\d+$/.test(str) || str.endsWith(':')) {
// // //       lines.push(currentLine.trim());
// // //       currentLine = '';
// // //     }
// // //   }

// // //   if (currentLine) lines.push(currentLine.trim());
// // //   return lines;
// // // };

// // import { useState, useEffect } from 'react';

// // /**
// //  * Optimized TOC Extractor Hook
// //  * - Web Worker support ke liye ready
// //  * - Chunked processing for better performance
// //  * - Early termination strategies
// //  */

// // const useTOCExtractor = (pdfDoc) => {
// //   const [toc, setToc] = useState([]);
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState('');

// //   useEffect(() => {
// //     if (!pdfDoc) return;

// //     let isCancelled = false;

// //     const extractTOC = async () => {
// //       setLoading(true);
// //       setError('');
// //       setToc([]);

// //       try {
// //         console.log('🧠 Starting TOC extraction...');

// //         // Step 1: Try PDF Outline (fastest method)
// //         const outline = await pdfDoc.getOutline();
// //         if (outline && outline.length > 0) {
// //           console.log('✅ Outline found with', outline.length, 'items');
// //           const tocItems = [];
// //           processOutlineItems(outline, tocItems);
// //           if (!isCancelled) {
// //             setToc(tocItems);
// //           }
// //           setLoading(false);
// //           return;
// //         }

// //         // Step 2: Optimized Fallback
// //         console.log('⚙️ No outline. Using optimized fallback...');
// //         const fallbackToc = await extractTOCFromPagesOptimized(pdfDoc, isCancelled);
        
// //         if (!isCancelled) {
// //           setToc(fallbackToc);
// //         }
// //       } catch (err) {
// //         console.error('❌ TOC extraction error:', err);
// //         if (!isCancelled) {
// //           setError('Failed to extract TOC');
// //           setToc([]);
// //         }
// //       } finally {
// //         if (!isCancelled) {
// //           setLoading(false);
// //         }
// //       }
// //     };

// //     extractTOC();

// //     // Cleanup function
// //     return () => {
// //       isCancelled = true;
// //     };
// //   }, [pdfDoc]);

// //   return { toc, loading, error };
// // };

// // export default useTOCExtractor;

// // /* -----------------------------------------------
// //  * Helper Functions
// //  * ---------------------------------------------*/

// // const processOutlineItems = (items, result, level = 0) => {
// //   for (const item of items) {
// //     if (item.title) {
// //       result.push({
// //         title: cleanTitle(item.title),
// //         pageNumber: item.dest ? extractPageNumber(item.dest) : 1,
// //         level,
// //       });
// //     }
// //     if (item.items && item.items.length > 0) {
// //       processOutlineItems(item.items, result, level + 1);
// //     }
// //   }
// // };

// // const extractPageNumber = (dest) => {
// //   if (!dest) return 1;
// //   try {
// //     if (Array.isArray(dest)) {
// //       const [pageRef] = dest;
// //       if (pageRef && typeof pageRef === 'object' && 'num' in pageRef) {
// //         return pageRef.num + 1;
// //       }
// //     }
// //   } catch (e) {
// //     console.warn('extractPageNumber failed:', e);
// //   }
// //   return 1;
// // };

// // const cleanTitle = (title) => title.replace(/\.+$/g, '').trim();

// // /**
// //  * 🚀 OPTIMIZED FALLBACK TOC EXTRACTION
// //  * - Limited page scanning
// //  * - Chunked processing with yield
// //  * - Early termination
// //  * - Fragment count limits
// //  */
// // const extractTOCFromPagesOptimized = async (pdfDoc, isCancelled) => {
// //   const tocItems = [];
// //   const maxPagesToCheck = Math.min(3, pdfDoc.numPages); // Reduced from 5 to 3
// //   const tocRegex = /(table\s+of\s+contents|contents)/i;
// //   const MAX_FRAGMENTS = 1000; // Skip pages with too many fragments
// //   const MAX_TOC_ITEMS = 50; // Stop after finding enough items

// //   try {
// //     for (let i = 1; i <= maxPagesToCheck; i++) {
// //       if (isCancelled) break;

// //       console.log(`🔍 Checking page ${i}...`);
      
// //       const page = await pdfDoc.getPage(i);
// //       const textContent = await page.getTextContent();

// //       // Skip overly complex pages
// //       if (textContent.items.length > MAX_FRAGMENTS) {
// //         console.warn(`⚠️ Skipping page ${i}: ${textContent.items.length} fragments`);
// //         continue;
// //       }

// //       // Quick check for TOC keywords
// //       const quickSample = textContent.items
// //         .slice(0, 100)
// //         .map(t => t.str)
// //         .join(' ');
      
// //       if (!tocRegex.test(quickSample)) {
// //         console.log(`⏭️ No TOC on page ${i}`);
// //         continue;
// //       }

// //       console.log(`✅ Possible TOC on page ${i}`);

// //       // Process with chunking
// //       const items = await extractTOCFromTextContent(
// //         textContent.items, 
// //         isCancelled
// //       );
      
// //       tocItems.push(...items);

// //       // Early exit if we found enough
// //       if (tocItems.length >= MAX_TOC_ITEMS) {
// //         console.log('✅ Found sufficient TOC entries. Stopping.');
// //         break;
// //       }

// //       // If we found some items, assume TOC is complete
// //       if (tocItems.length > 5) {
// //         break;
// //       }
// //     }
// //   } catch (err) {
// //     console.error('⚠️ Fallback TOC extraction failed:', err);
// //   }

// //   console.log(`🧾 Extracted ${tocItems.length} TOC items`);
// //   return tocItems;
// // };

// // /**
// //  * 📝 Extract TOC from text content with chunked processing
// //  */
// // const extractTOCFromTextContent = async (items, isCancelled) => {
// //   const tocItems = [];
// //   const CHUNK_SIZE = 100; // Process in smaller chunks
// //   let currentText = '';
// //   let foundTOC = false;

// //   for (let i = 0; i < items.length; i += CHUNK_SIZE) {
// //     if (isCancelled) break;

// //     // Yield to browser every chunk
// //     await new Promise(resolve => setTimeout(resolve, 0));

// //     const chunk = items.slice(i, i + CHUNK_SIZE);
// //     const chunkText = chunk.map(item => item.str).join(' ');
// //     currentText += chunkText + ' ';

// //     // Look for TOC pattern
// //     if (!foundTOC && /(table\s+of\s+contents|contents)/i.test(chunkText)) {
// //       foundTOC = true;
// //       continue;
// //     }

// //     if (foundTOC) {
// //       // Simple line-based extraction
// //       const lines = currentText.split(/[\n\r]+/);
      
// //       for (const line of lines) {
// //         const cleaned = line.trim();
// //         if (cleaned.length < 3) continue;

// //         // Match: "Title ..... 123" or "Title 123"
// //         const match = cleaned.match(/^(.+?)[\s.]{2,}(\d{1,3})$/) ||
// //                       cleaned.match(/^([A-Za-z].{5,}?)\s+(\d{1,3})$/);

// //         if (match) {
// //           const [, title, pageNum] = match;
// //           const cleanedTitle = cleanTitle(title);
          
// //           if (cleanedTitle && cleanedTitle.length > 2) {
// //             tocItems.push({
// //               title: cleanedTitle,
// //               pageNumber: parseInt(pageNum),
// //               level: 0,
// //             });
// //           }
// //         }
// //       }

// //       // Clear processed text
// //       currentText = '';
// //     }

// //     // Stop if we have enough
// //     if (tocItems.length >= 50) break;
// //   }

// //   return tocItems;
// // };




// import { useState, useEffect } from 'react';

// /**
//  * Enhanced TOC Extractor Hook
//  * - Better pattern matching
//  * - Improved line reconstruction
//  * - Accurate sequence detection
//  */

// const useTOCExtractor = (pdfDoc) => {
//   const [toc, setToc] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     if (!pdfDoc) return;

//     let isCancelled = false;

//     const extractTOC = async () => {
//       setLoading(true);
//       setError('');
//       setToc([]);

//       try {
//         console.log('🧠 Starting TOC extraction...');

//         // Step 1: Try PDF Outline (most reliable)
//         const outline = await pdfDoc.getOutline();
//         if (outline && outline.length > 0) {
//           console.log('✅ Outline found with', outline.length, 'items');
//           const tocItems = [];
//           await processOutlineItems(outline, tocItems, pdfDoc);
          
//           if (!isCancelled) {
//             setToc(tocItems.sort((a, b) => a.pageNumber - b.pageNumber));
//           }
//           setLoading(false);
//           return;
//         }

//         // Step 2: Enhanced Fallback
//         console.log('⚙️ No outline. Using enhanced fallback...');
//         const fallbackToc = await extractTOCFromPagesEnhanced(pdfDoc, isCancelled);
        
//         if (!isCancelled) {
//           setToc(fallbackToc.sort((a, b) => a.pageNumber - b.pageNumber));
//         }
//       } catch (err) {
//         console.error('❌ TOC extraction error:', err);
//         if (!isCancelled) {
//           setError('Failed to extract TOC');
//           setToc([]);
//         }
//       } finally {
//         if (!isCancelled) {
//           setLoading(false);
//         }
//       }
//     };

//     extractTOC();

//     return () => {
//       isCancelled = true;
//     };
//   }, [pdfDoc]);

//   return { toc, loading, error };
// };

// export default useTOCExtractor;

// /* -----------------------------------------------
//  * Helper Functions
//  * ---------------------------------------------*/

// const processOutlineItems = async (items, result, pdfDoc, level = 0) => {
//   for (const item of items) {
//     if (item.title) {
//       let pageNum = 1;
      
//       // Better page number extraction
//       if (item.dest) {
//         pageNum = await extractPageNumberAsync(item.dest, pdfDoc);
//       }
      
//       result.push({
//         title: cleanTitle(item.title),
//         pageNumber: pageNum,
//         level,
//       });
//     }
    
//     if (item.items && item.items.length > 0) {
//       await processOutlineItems(item.items, result, pdfDoc, level + 1);
//     }
//   }
// };

// const extractPageNumberAsync = async (dest, pdfDoc) => {
//   if (!dest) return 1;
  
//   try {
//     // Array destination
//     if (Array.isArray(dest)) {
//       const [pageRef] = dest;
//       if (pageRef && typeof pageRef === 'object' && 'num' in pageRef) {
//         return pageRef.num + 1;
//       }
//     }
    
//     // Named destination
//     if (typeof dest === 'string') {
//       const resolvedDest = await pdfDoc.getDestination(dest);
//       if (resolvedDest && Array.isArray(resolvedDest)) {
//         const [pageRef] = resolvedDest;
//         if (pageRef && typeof pageRef === 'object' && 'num' in pageRef) {
//           return pageRef.num + 1;
//         }
//       }
//     }
//   } catch (e) {
//     console.warn('Page number extraction failed:', e);
//   }
  
//   return 1;
// };

// const cleanTitle = (title) => {
//   return title
//     .replace(/\.{2,}/g, '') // Remove multiple dots
//     .replace(/\s+/g, ' ')   // Normalize spaces
//     .trim();
// };

// /**
//  * 🚀 ENHANCED FALLBACK TOC EXTRACTION
//  * Better pattern matching and line reconstruction
//  */
// const extractTOCFromPagesEnhanced = async (pdfDoc, isCancelled) => {
//   const tocItems = [];
//   const maxPagesToCheck = Math.min(5, pdfDoc.numPages);
//   const tocRegex = /(table\s+of\s+contents|contents|index)/i;

//   try {
//     for (let i = 1; i <= maxPagesToCheck; i++) {
//       if (isCancelled) break;

//       console.log(`🔍 Scanning page ${i}...`);
      
//       const page = await pdfDoc.getPage(i);
//       const textContent = await page.getTextContent();

//       // Skip overly complex pages
//       if (textContent.items.length > 1500) {
//         console.warn(`⚠️ Page ${i} too complex (${textContent.items.length} items)`);
//         continue;
//       }

//       // Better line reconstruction using Y-coordinates
//       const lines = reconstructLinesWithPosition(textContent.items);
//       const fullText = lines.join('\n');

//       // Check if this page has TOC
//       if (!tocRegex.test(fullText)) {
//         console.log(`⏭️ No TOC markers on page ${i}`);
//         continue;
//       }

//       console.log(`✅ TOC detected on page ${i}`);
      
//       // Extract TOC entries
//       const entries = extractTOCEntries(lines);
      
//       if (entries.length > 0) {
//         tocItems.push(...entries);
//         console.log(`📝 Found ${entries.length} TOC entries on page ${i}`);
        
//         // Continue to next page if entries found (multi-page TOC)
//         continue;
//       }

//       // If we have entries from previous pages, stop here
//       if (tocItems.length > 0) break;
//     }
//   } catch (err) {
//     console.error('⚠️ Enhanced TOC extraction failed:', err);
//   }

//   console.log(`🧾 Total TOC entries: ${tocItems.length}`);
//   return tocItems;
// };

// /**
//  * 📐 Reconstruct lines using Y-coordinates for better accuracy
//  */
// const reconstructLinesWithPosition = (items) => {
//   if (!items || items.length === 0) return [];

//   const lines = [];
//   let currentLine = [];
//   let currentY = items[0].transform[5];
//   const LINE_THRESHOLD = 5; // Y-position difference threshold

//   for (const item of items) {
//     const itemY = item.transform[5];
//     const text = item.str.trim();
    
//     if (!text) continue;

//     // New line if Y-position changed significantly
//     if (Math.abs(itemY - currentY) > LINE_THRESHOLD) {
//       if (currentLine.length > 0) {
//         lines.push(currentLine.join(' ').trim());
//         currentLine = [];
//       }
//       currentY = itemY;
//     }

//     currentLine.push(text);
//   }

//   // Add last line
//   if (currentLine.length > 0) {
//     lines.push(currentLine.join(' ').trim());
//   }

//   return lines;
// };

// /**
//  * 📋 Extract TOC entries from lines with multiple pattern matching
//  */
// const extractTOCEntries = (lines) => {
//   const entries = [];
//   let inTOC = false;
//   const seenTitles = new Set(); // Avoid duplicates

//   for (let i = 0; i < lines.length; i++) {
//     const line = lines[i].trim();
    
//     if (!line || line.length < 3) continue;

//     // Detect TOC start
//     if (/(table\s+of\s+contents|contents|index)/i.test(line) && !inTOC) {
//       inTOC = true;
//       console.log('📍 TOC section started');
//       continue;
//     }

//     if (!inTOC) continue;

//     // Stop at common TOC end markers
//     if (/(^chapter\s+1|^introduction|^preface|^foreword)/i.test(line)) {
//       console.log('🛑 TOC section ended');
//       break;
//     }

//     // Pattern 1: "Title ..... 123" or "Title .... 123"
//     let match = line.match(/^(.+?)\.{2,}\s*(\d{1,4})$/);
    
//     // Pattern 2: "Title — 123" or "Title – 123"
//     if (!match) {
//       match = line.match(/^(.+?)\s*[—–-]\s*(\d{1,4})$/);
//     }
    
//     // Pattern 3: "1.2 Title 45" (numbered sections)
//     if (!match) {
//       match = line.match(/^(\d+\.[\d.]*\s+.+?)\s+(\d{1,4})$/);
//     }
    
//     // Pattern 4: "Title    123" (multiple spaces)
//     if (!match) {
//       match = line.match(/^(.+?)\s{3,}(\d{1,4})$/);
//     }

//     // Pattern 5: Title and page on separate lines
//     if (!match && i + 1 < lines.length) {
//       const nextLine = lines[i + 1].trim();
//       if (/^\d{1,4}$/.test(nextLine)) {
//         match = [null, line, nextLine];
//         i++; // Skip next line
//       }
//     }

//     if (match) {
//       const [, titleRaw, pageRaw] = match;
//       const title = cleanTitle(titleRaw);
//       const pageNumber = parseInt(pageRaw);

//       // Validate entry
//       if (
//         title &&
//         title.length > 2 &&
//         pageNumber > 0 &&
//         pageNumber < 10000 &&
//         !seenTitles.has(title.toLowerCase())
//       ) {
//         seenTitles.add(title.toLowerCase());
        
//         entries.push({
//           title,
//           pageNumber,
//           level: detectLevel(title),
//         });
//       }
//     }
//   }

//   return entries;
// };

// /**
//  * 🎯 Detect hierarchy level from title
//  */
// const detectLevel = (title) => {
//   // Chapter level
//   if (/^chapter\s+\d+/i.test(title)) return 0;
//   if (/^part\s+\d+/i.test(title)) return 0;
  
//   // Section level (1.1, 2.3, etc.)
//   if (/^\d+\.\d+\s/.test(title)) return 1;
  
//   // Subsection level (1.1.1, 2.3.4, etc.)
//   if (/^\d+\.\d+\.\d+\s/.test(title)) return 2;
  
//   // Numbered chapters/sections
//   if (/^\d+\s/.test(title)) return 0;
  
//   // Default
//   return 0;
// };





import { useState, useEffect } from 'react';

/**
 * Enhanced TOC Extractor Hook
 * - Better pattern matching
 * - Improved line reconstruction
 * - Accurate sequence detection
 */

const useTOCExtractor = (pdfDoc) => {
  const [toc, setToc] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!pdfDoc) return;

    let isCancelled = false;

    const extractTOC = async () => {
      setLoading(true);
      setError('');
      setToc([]);

      try {
        console.log('🧠 Starting TOC extraction...');

        // Step 1: Try PDF Outline (most reliable)
        const outline = await pdfDoc.getOutline();
        if (outline && outline.length > 0) {
          console.log('✅ Outline found with', outline.length, 'items');
          const tocItems = [];
          await processOutlineItems(outline, tocItems, pdfDoc);
          
          if (!isCancelled) {
            setToc(tocItems.sort((a, b) => a.pageNumber - b.pageNumber));
          }
          setLoading(false);
          return;
        }

        // Step 2: Enhanced Fallback
        console.log('⚙️ No outline. Using enhanced fallback...');
        const fallbackToc = await extractTOCFromPagesEnhanced(pdfDoc, isCancelled);
        
        if (!isCancelled) {
          setToc(fallbackToc.sort((a, b) => a.pageNumber - b.pageNumber));
        }
      } catch (err) {
        console.error('❌ TOC extraction error:', err);
        if (!isCancelled) {
          setError('Failed to extract TOC');
          setToc([]);
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    };

    extractTOC();

    return () => {
      isCancelled = true;
    };
  }, [pdfDoc]);

  return { toc, loading, error };
};

export default useTOCExtractor;

/* -----------------------------------------------
 * Helper Functions
 * ---------------------------------------------*/

const processOutlineItems = async (items, result, pdfDoc, level = 0) => {
  for (const item of items) {
    if (item.title) {
      let pageNum = 1;
      
      // Better page number extraction
      if (item.dest) {
        pageNum = await extractPageNumberAsync(item.dest, pdfDoc);
      }
      
      result.push({
        title: cleanTitle(item.title),
        pageNumber: pageNum,
        level,
      });
    }
    
    if (item.items && item.items.length > 0) {
      await processOutlineItems(item.items, result, pdfDoc, level + 1);
    }
  }
};

const extractPageNumberAsync = async (dest, pdfDoc) => {
  if (!dest) return 1;
  
  try {
    // Array destination
    if (Array.isArray(dest)) {
      const [pageRef] = dest;
      if (pageRef && typeof pageRef === 'object' && 'num' in pageRef) {
        return pageRef.num + 1;
      }
    }
    
    // Named destination
    if (typeof dest === 'string') {
      const resolvedDest = await pdfDoc.getDestination(dest);
      if (resolvedDest && Array.isArray(resolvedDest)) {
        const [pageRef] = resolvedDest;
        if (pageRef && typeof pageRef === 'object' && 'num' in pageRef) {
          return pageRef.num + 1;
        }
      }
    }
  } catch (e) {
    console.warn('Page number extraction failed:', e);
  }
  
  return 1;
};

const cleanTitle = (title) => {
  return title
    .replace(/\.{2,}/g, '') // Remove multiple dots
    .replace(/\s+/g, ' ')   // Normalize spaces
    .trim();
};

/**
 * 🚀 ENHANCED FALLBACK TOC EXTRACTION
 * Better pattern matching and line reconstruction
 */
const extractTOCFromPagesEnhanced = async (pdfDoc, isCancelled) => {
  const tocItems = [];
  const maxPagesToCheck = Math.min(10, pdfDoc.numPages); // Increased from 5 to 10
  const tocRegex = /(table\s+of\s+contents|contents|index)/i;
  let tocStarted = false;

  try {
    for (let i = 1; i <= maxPagesToCheck; i++) {
      if (isCancelled) break;

      console.log(`🔍 Scanning page ${i}...`);
      
      const page = await pdfDoc.getPage(i);
      const textContent = await page.getTextContent();

      // Skip overly complex pages
      if (textContent.items.length > 1500) {
        console.warn(`⚠️ Page ${i} too complex (${textContent.items.length} items)`);
        
        // But if TOC already started, don't skip
        if (!tocStarted) continue;
      }

      // Better line reconstruction using Y-coordinates
      const lines = reconstructLinesWithPosition(textContent.items);
      const fullText = lines.join('\n');

      // Check if this page has TOC markers
      const hasTOCMarker = tocRegex.test(fullText);
      
      if (hasTOCMarker) {
        tocStarted = true;
        console.log(`✅ TOC page detected: ${i}`);
      }

      // If TOC hasn't started yet and no marker found, skip
      if (!tocStarted && !hasTOCMarker) {
        console.log(`⏭️ No TOC markers on page ${i}`);
        continue;
      }

      // Extract TOC entries (pass tocStarted flag)
      const entries = extractTOCEntries(lines, tocStarted && !hasTOCMarker);
      
      if (entries.length > 0) {
        tocItems.push(...entries);
        console.log(`📝 Found ${entries.length} TOC entries on page ${i} (Total: ${tocItems.length})`);
        tocStarted = true;
      } else if (tocStarted) {
        // If TOC was started but no entries found on this page, likely ended
        console.log(`✋ TOC likely ended at page ${i-1}`);
        break;
      }

      // Safety limit
      if (tocItems.length > 200) {
        console.log('⚠️ Reached 200 TOC items limit');
        break;
      }
    }
  } catch (err) {
    console.error('⚠️ Enhanced TOC extraction failed:', err);
  }

  console.log(`🧾 Total TOC entries: ${tocItems.length}`);
  return tocItems;
};

/**
 * 📐 Reconstruct lines using Y-coordinates for better accuracy
 */
const reconstructLinesWithPosition = (items) => {
  if (!items || items.length === 0) return [];

  const lines = [];
  let currentLine = [];
  let currentY = items[0].transform[5];
  const LINE_THRESHOLD = 5; // Y-position difference threshold

  for (const item of items) {
    const itemY = item.transform[5];
    const text = item.str.trim();
    
    if (!text) continue;

    // New line if Y-position changed significantly
    if (Math.abs(itemY - currentY) > LINE_THRESHOLD) {
      if (currentLine.length > 0) {
        lines.push(currentLine.join(' ').trim());
        currentLine = [];
      }
      currentY = itemY;
    }

    currentLine.push(text);
  }

  // Add last line
  if (currentLine.length > 0) {
    lines.push(currentLine.join(' ').trim());
  }

  return lines;
};

/**
 * 📋 Extract TOC entries from lines with multiple pattern matching
 */
const extractTOCEntries = (lines, continueFromPrevious = false) => {
  const entries = [];
  let inTOC = continueFromPrevious; // If continuing multi-page TOC
  const seenTitles = new Set(); // Avoid duplicates

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    if (!line || line.length < 3) continue;

    // Detect TOC start
    if (/(table\s+of\s+contents|contents|index)/i.test(line) && !inTOC) {
      inTOC = true;
      console.log('📍 TOC section started');
      continue;
    }

    if (!inTOC) continue;

    // Stop at common TOC end markers (but not if it's a TOC entry itself)
    const endMarkers = /(^chapter\s+1[^0-9]|^1\s+introduction|^1\.\s+introduction|^part\s+i[^a-z])/i;
    if (endMarkers.test(line) && !line.match(/\.{2,}\s*\d+/)) {
      console.log('🛑 TOC section ended at:', line);
      break;
    }

    // Pattern 1: "Title ..... 123" or "Title .... 123"
    let match = line.match(/^(.+?)\.{2,}\s*(\d{1,4})$/);
    
    // Pattern 2: "Title — 123" or "Title – 123"
    if (!match) {
      match = line.match(/^(.+?)\s*[—–-]\s*(\d{1,4})$/);
    }
    
    // Pattern 3: "1.2 Title 45" (numbered sections)
    if (!match) {
      match = line.match(/^(\d+\.[\d.]*\s+.+?)\s+(\d{1,4})$/);
    }
    
    // Pattern 4: "Title    123" (multiple spaces)
    if (!match) {
      match = line.match(/^(.+?)\s{3,}(\d{1,4})$/);
    }

    // Pattern 5: Title and page on separate lines
    if (!match && i + 1 < lines.length) {
      const nextLine = lines[i + 1].trim();
      if (/^\d{1,4}$/.test(nextLine)) {
        match = [null, line, nextLine];
        i++; // Skip next line
      }
    }

    if (match) {
      const [, titleRaw, pageRaw] = match;
      const title = cleanTitle(titleRaw);
      const pageNumber = parseInt(pageRaw);

      // Validate entry
      if (
        title &&
        title.length > 2 &&
        pageNumber > 0 &&
        pageNumber < 10000 &&
        !seenTitles.has(title.toLowerCase())
      ) {
        seenTitles.add(title.toLowerCase());
        
        entries.push({
          title,
          pageNumber,
          level: detectLevel(title),
        });
      }
    }
  }

  return entries;
};

/**
 * 🎯 Detect hierarchy level from title
 */
const detectLevel = (title) => {
  // Chapter level
  if (/^chapter\s+\d+/i.test(title)) return 0;
  if (/^part\s+\d+/i.test(title)) return 0;
  
  // Section level (1.1, 2.3, etc.)
  if (/^\d+\.\d+\s/.test(title)) return 1;
  
  // Subsection level (1.1.1, 2.3.4, etc.)
  if (/^\d+\.\d+\.\d+\s/.test(title)) return 2;
  
  // Numbered chapters/sections
  if (/^\d+\s/.test(title)) return 0;
  
  // Default
  return 0;
};





