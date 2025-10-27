// src/components/PublishingGuidelines.jsx
import React from 'react';
import { CheckCircle } from "lucide-react";

const PublishingGuidelines = () => {
  const guidelines = [
    "Ensure your content is original and doesn't violate copyrights",
    "Provide high-quality cover image (min. 800x1200 pixels)",
    "Format your manuscript properly before uploading",
    "Set appropriate pricing for your target audience",
    "Create engaging quizzes to increase reader interaction"
  ];

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Publishing Guidelines</h3>
      <ul className="space-y-3">
        {guidelines.map((guideline, index) => (
          <li key={index} className="flex items-start">
            {/* <i data-lucide="check-circle" className="h-5 w-5 text-green-500 mr-2 mt-0.5"></i> */}
              <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
            <span className="text-sm text-gray-700">{guideline}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PublishingGuidelines;// src/components/PublishingGuidelines.jsx
