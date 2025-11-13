// hooks/useMultipleFileUpload.js
import { useState, useCallback } from 'react';

export const useMultipleFileUpload = () => {
  const [uploads, setUploads] = useState({});
  const [activeUploads, setActiveUploads] = useState({});

  // New upload start karna
  const startUpload = useCallback((file, uploadId = `upload_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`) => {
    setUploads(prev => ({
      ...prev,
      [uploadId]: {
        id: uploadId,
        fileName: file.name,
        fileSize: file.size,
        progress: 0,
        isUploading: true,
        isComplete: false,
        error: null,
        startTime: Date.now(),
        fileType: file.type
      }
    }));

    setActiveUploads(prev => ({
      ...prev,
      [uploadId]: true
    }));

    return uploadId;
  }, []);

  // Progress update karna
  const updateProgress = useCallback((uploadId, progress) => {
    setUploads(prev => ({
      ...prev,
      [uploadId]: {
        ...prev[uploadId],
        progress: Math.min(progress, 100) // 100% se zyada nahi hona chahiye
      }
    }));
  }, []);

  // Upload complete karna
  const completeUpload = useCallback((uploadId, fileUrl = null) => {
    setUploads(prev => ({
      ...prev,
      [uploadId]: {
        ...prev[uploadId],
        progress: 100,
        isUploading: false,
        isComplete: true,
        fileUrl: fileUrl,
        endTime: Date.now()
      }
    }));

    setActiveUploads(prev => {
      const newActive = { ...prev };
      delete newActive[uploadId];
      return newActive;
    });
  }, []);

  // Upload fail karna
  const failUpload = useCallback((uploadId, error) => {
    setUploads(prev => ({
      ...prev,
      [uploadId]: {
        ...prev[uploadId],
        isUploading: false,
        isComplete: false,
        error: error.message || 'Upload failed',
        endTime: Date.now()
      }
    }));

    setActiveUploads(prev => {
      const newActive = { ...prev };
      delete newActive[uploadId];
      return newActive;
    });
  }, []);

  // File upload function
  const uploadFile = useCallback(async (file, presignedUrl, uploadId = null) => {
    const finalUploadId = uploadId || startUpload(file);

    try {
      await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.upload.addEventListener('progress', (event) => {
          if (event.lengthComputable) {
            const percentComplete = (event.loaded / event.total) * 100;
            updateProgress(finalUploadId, percentComplete);
          }
        });

        xhr.addEventListener('load', () => {
          if (xhr.status === 200) {
            // File URL generate karo (presigned URL se)
            const fileUrl = presignedUrl.split('?')[0]; // Query parameters hata do
            completeUpload(finalUploadId, fileUrl);
            resolve(fileUrl);
          } else {
            failUpload(finalUploadId, new Error(`Upload failed with status: ${xhr.status}`));
            reject(new Error(`Upload failed with status: ${xhr.status}`));
          }
        });

        xhr.addEventListener('error', () => {
          failUpload(finalUploadId, new Error('Network error'));
          reject(new Error('Upload failed due to network error'));
        });

        xhr.addEventListener('abort', () => {
          failUpload(finalUploadId, new Error('Upload cancelled'));
          reject(new Error('Upload was cancelled'));
        });

        xhr.open('PUT', presignedUrl);
        xhr.setRequestHeader('Content-Type', file.type);
        xhr.send(file);
      });

      return finalUploadId;
    } catch (error) {
      failUpload(finalUploadId, error);
      throw error;
    }
  }, [startUpload, updateProgress, completeUpload, failUpload]);

  // Multiple files ek saath upload karna
  const uploadMultipleFiles = useCallback(async (files, presignedUrls) => {
    const uploadPromises = files.map((file, index) => {
      const presignedUrl = Array.isArray(presignedUrls) ? presignedUrls[index] : presignedUrls;
      return uploadFile(file, presignedUrl);
    });

    return Promise.all(uploadPromises);
  }, [uploadFile]);

  // Specific upload ki details get karna
  const getUpload = useCallback((uploadId) => {
    return uploads[uploadId] || null;
  }, [uploads]);

  // Sabhi active uploads get karna
  const getActiveUploads = useCallback(() => {
    return Object.values(uploads).filter(upload => upload.isUploading);
  }, [uploads]);

  // Sabhi completed uploads get karna
  const getCompletedUploads = useCallback(() => {
    return Object.values(uploads).filter(upload => upload.isComplete);
  }, [uploads]);

  // Sabhi failed uploads get karna
  const getFailedUploads = useCallback(() => {
    return Object.values(uploads).filter(upload => upload.error && !upload.isUploading);
  }, [uploads]);

  // Upload clear karna
  const clearUpload = useCallback((uploadId) => {
    setUploads(prev => {
      const newUploads = { ...prev };
      delete newUploads[uploadId];
      return newUploads;
    });

    setActiveUploads(prev => {
      const newActive = { ...prev };
      delete newActive[uploadId];
      return newActive;
    });
  }, []);

  // Sabhi uploads clear karna
  const clearAllUploads = useCallback(() => {
    setUploads({});
    setActiveUploads({});
  }, []);

  // Overall progress calculate karna (sabhi active uploads ka average)
  const getOverallProgress = useCallback(() => {
    const activeUploadsList = getActiveUploads();
    if (activeUploadsList.length === 0) return 100;

    const totalProgress = activeUploadsList.reduce((sum, upload) => sum + upload.progress, 0);
    return totalProgress / activeUploadsList.length;
  }, [getActiveUploads]);

  return {
    // State
    uploads,
    activeUploads,
    
    // Actions
    uploadFile,
    uploadMultipleFiles,
    startUpload,
    updateProgress,
    completeUpload,
    failUpload,
    
    // Getters
    getUpload,
    getActiveUploads,
    getCompletedUploads,
    getFailedUploads,
    getOverallProgress,
    
    // Cleanup
    clearUpload,
    clearAllUploads
  };
};