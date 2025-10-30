import React, {useState} from 'react';
import { X, Copy, CheckCircle, Twitter, Facebook, Linkedin, MessageCircle } from 'lucide-react';

function PromoteModal({ book, userData, onClose }) {

      const [copiedLink, setCopiedLink] = useState(false);

    const shareableLink = `https://bookhub.com/books/${book.id}`;
    const referralCode = `BOOKHUB${book.id}REF`;

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(shareableLink);
            setCopiedLink(true);
            setTimeout(() => setCopiedLink(false), 2000);
        } catch (err) {
            console.error('Failed to copy link:', err);
        }
    };

    const shareOnSocialMedia = (platform) => {
        const text = `Check out "${book.title}" on BookHub! ${shareableLink}`;
        let url = '';

        switch (platform) {
            case 'twitter':
                url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
                break;
            case 'facebook':
                url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareableLink)}`;
                break;
            case 'linkedin':
                url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareableLink)}`;
                break;
            case 'whatsapp':
                url = `https://wa.me/?text=${encodeURIComponent(text)}`;
                break;
        }

        window.open(url, '_blank', 'width=600,height=400');
    };

    const promotionMaterials = [
        {
            title: "Social Media Posts",
            description: "Pre-written posts for different platforms",
            content: [
                `📚 Just published "${book.title}" on BookHub! Check it out and take the quiz to win prizes! ${shareableLink}`,
                `🔥 New book alert! "${book.title}" is now available. Read, take the quiz, and earn rewards! ${shareableLink}`
            ]
        },
        {
            title: "Email Template",
            description: "Template for email marketing",
            content: [
                `Subject: Discover "${book.title}" - New on BookHub!\n\nHi there,\n\nI'm excited to share my new book "${book.title}" is now available on BookHub! Read it, take the quiz, and you could win exciting prizes.\n\nGet your copy here: ${shareableLink}\n\nUse referral code: ${referralCode} for special benefits!\n\nBest regards,\n${userData.name}`
            ]
        },
        {
            title: "Referral Program",
            description: "Share your unique referral code",
            content: [
                `Referral Code: ${referralCode}`,
                `Share this code with friends for special discounts and rewards!`
            ]
        }
    ];

    return (
        <>

            <div className="fixed inset-0 bg-[#00000060]  flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                    <div className="flex justify-between items-center p-6 border-b border-gray-200">
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900">Promote Your Book</h2>
                            <p className="text-gray-600">{book.title}</p>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    <div className="p-6 space-y-6">
                        {/* Shareable Link */}
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <h3 className="font-semibold text-blue-900 mb-2">Shareable Link</h3>
                            <div className="flex space-x-2">
                                <input
                                    type="text"
                                    value={shareableLink}
                                    readOnly
                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-white"
                                />
                                <button
                                    onClick={handleCopyLink}
                                    className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                                >
                                    {copiedLink ? <CheckCircle size={16} /> : <Copy size={16} />}
                                    <span>{copiedLink ? 'Copied!' : 'Copy'}</span>
                                </button>
                            </div>
                        </div>

                        {/* Quick Share Buttons */}
                        <div>
                            <h3 className="font-semibold text-gray-800 mb-3">Share on Social Media</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                <button
                                    onClick={() => shareOnSocialMedia('twitter')}
                                    className="flex items-center justify-center space-x-2 p-3 bg-[#1DA1F2] text-white rounded-lg hover:bg-[#1a8cd8] transition-colors"
                                >
                                    <Twitter size={20} />
                                    <span>Twitter</span>
                                </button>
                                <button
                                    onClick={() => shareOnSocialMedia('facebook')}
                                    className="flex items-center justify-center space-x-2 p-3 bg-[#4267B2] text-white rounded-lg hover:bg-[#365899] transition-colors"
                                >
                                    <Facebook size={20} />
                                    <span>Facebook</span>
                                </button>
                                <button
                                    onClick={() => shareOnSocialMedia('linkedin')}
                                    className="flex items-center justify-center space-x-2 p-3 bg-[#0077B5] text-white rounded-lg hover:bg-[#00669c] transition-colors"
                                >
                                    <Linkedin size={20} />
                                    <span>LinkedIn</span>
                                </button>
                                <button
                                    onClick={() => shareOnSocialMedia('whatsapp')}
                                    className="flex items-center justify-center space-x-2 p-3 bg-[#25D366] text-white rounded-lg hover:bg-[#20bd59] transition-colors"
                                >
                                    <MessageCircle size={20} />
                                    <span>WhatsApp</span>
                                </button>
                            </div>
                        </div>

                        {/* Promotion Materials */}
                        <div className="space-y-4">
                            <h3 className="font-semibold text-gray-800">Promotion Materials</h3>
                            {promotionMaterials.map((material, index) => (
                                <div key={index} className="border border-gray-200 rounded-lg p-4">
                                    <h4 className="font-semibold text-gray-800 mb-1">{material.title}</h4>
                                    <p className="text-sm text-gray-600 mb-3">{material.description}</p>
                                    <div className="space-y-2">
                                        {material.content.map((content, contentIndex) => (
                                            <div key={contentIndex} className="relative">
                                                <textarea
                                                    value={content}
                                                    readOnly
                                                    rows={content.split('\n').length + 1}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm"
                                                />
                                                <button
                                                    onClick={() => navigator.clipboard.writeText(content)}
                                                    className="absolute top-2 right-2 p-1 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
                                                >
                                                    <Copy size={14} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Promotion Tips */}
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                            <h3 className="font-semibold text-yellow-900 mb-2">Promotion Tips</h3>
                            <ul className="text-sm text-yellow-800 space-y-1">
                                <li>• Share during peak hours (9-11 AM, 7-9 PM)</li>
                                <li>• Use relevant hashtags for better reach</li>
                                <li>• Engage with readers in the comments</li>
                                <li>• Share quiz results and winner announcements</li>
                                <li>• Collaborate with other authors for cross-promotion</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default PromoteModal
