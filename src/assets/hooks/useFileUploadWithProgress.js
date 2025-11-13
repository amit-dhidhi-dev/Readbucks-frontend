// // hooks/useFileUploadWithProgress.js
// import { useState } from 'react';

// export const useFileUploadWithProgress = () => {
//   const [uploads, setUploads] = useState({});

//   const uploadFile = (file, presignedUrl, uploadId = Date.now().toString()) => {
//     return new Promise((resolve, reject) => {
//       const xhr = new XMLHttpRequest();

//       // Initial state set karo
//       setUploads(prev => ({
//         ...prev,
//         [uploadId]: {
//           progress: 0,
//           isUploading: true,
//           fileName: file.name
//         }
//       }));

//       xhr.upload.addEventListener('progress', (event) => {
//         if (event.lengthComputable) {
//           const percentComplete = (event.loaded / event.total) * 100;
//           setUploads(prev => ({
//             ...prev,
//             [uploadId]: {
//               ...prev[uploadId],
//               progress: percentComplete
//             }
//           }));
//         }
//       });

//       xhr.addEventListener('load', () => {
//         if (xhr.status === 200) {
//           setUploads(prev => ({
//             ...prev,
//             [uploadId]: {
//               ...prev[uploadId],
//               isUploading: false,
//               progress: 100,
//               isComplete: true
//             }
//           }));
//           resolve();
//         } else {
//           reject(new Error(`Upload failed with status: ${xhr.status}`));
//         }
//       });

//       xhr.addEventListener('error', () => {
//         setUploads(prev => ({
//           ...prev,
//           [uploadId]: {
//             ...prev[uploadId],
//             isUploading: false,
//             error: 'Upload failed'
//           }
//         }));
//         reject(new Error('Upload failed due to network error'));
//       });

//       xhr.open('PUT', presignedUrl);
//       xhr.setRequestHeader('Content-Type', file.type);
//       xhr.send(file);
//     });
//   };

//   const getUploadProgress = (uploadId) => {
//     return uploads[uploadId]?.progress || 0;
//   };

//   const isUploading = (uploadId) => {
//     return uploads[uploadId]?.isUploading || false;
//   };

//   const clearUpload = (uploadId) => {
//     setUploads(prev => {
//       const newUploads = { ...prev };
//       delete newUploads[uploadId];
//       return newUploads;
//     });
//   };

//   return {
//     uploadFile,
//     getUploadProgress,
//     isUploading,
//     clearUpload,
//     uploads,
//   };
// };