import React, { useEffect, useState } from 'react';
import {
    Download,
    FileText,
    FileType,
    BookOpen,
    Calendar,
    Globe,
    Book,
    CheckCircle,
    Clock,
    ChevronRight,
    Shield,
    Smartphone,
    Monitor,
    Laptop,
    Tablet,
    Printer,
} from 'lucide-react';
import { FaBook } from 'react-icons/fa';
import { useBookDetail } from '../assets/hooks/useBook';
import { useNavigate, useParams } from 'react-router-dom';
import { userApi } from '../api/userApi';

const ProfessionalBookComponent = () => {
    const [downloadStatus, setDownloadStatus] = useState({});


    const navigate = useNavigate();
    const { bookId } = useParams();
    const { book } = useBookDetail(bookId);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);



    async function getUserData(token) {
        try {
            return await userApi.getCurrentUser(token);
        } catch (error) {
            console.error("Error fetching user data:", error);
            return null;
        }
    }

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = JSON.parse(localStorage.getItem('user'))?.access_token;
                // console.log("Token in Payment Success Page:", token);

                if (!token) {
                    console.error("No token found");
                    navigate('/login'); // Redirect to login if no token
                    return;
                }

                const userData = await getUserData(token);
                // console.log("User Data in Payment Success Page:", userData);
                const data = userData.data;
                setUser(data);
                //  check user purchase book or not
                if (book && book.price > 0) {
                    if (data) {
                        const obj = data.purchase_history?.find(book => book.book_id === bookId)
                        if (!obj) {
                            // if obj not find then redirect to books page
                            navigate(import.meta.env.VITE_BOOKS_PAGE)
                        }
                    }
                }


            } catch (error) {
                console.error("Error in useEffect:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [navigate]);

    if (!loading) {
        // console.log("User State in Payment Success Page:", user);

    }




    // Handle download with improved UX    
    const handleDownload = (formatType, url) => {
        // Download status update karein
        setDownloadStatus(prev => ({
            ...prev,
            [formatType]: 'downloading'
        }));

        // Download logic yahan implement karein
        console.log(`Downloading ${formatType} from:`, url);

        // Simulate download
        setTimeout(() => {
            setDownloadStatus(prev => ({
                ...prev,
                [formatType]: 'downloaded'
            }));
        }, 2000);
    };

    const formatConfig = {
        epub: {
            name: "EPUB Format",
            description: "Best for eBook readers and mobile devices",
            icon: <BookOpen className="w-6 h-6" />,
            bgColor: "bg-purple-50",
            color: "text-purple-700",
            buttonColor: "bg-purple-600 hover:bg-purple-700",
            devices: (
                <>
                    <Monitor className="w-4 h-4" />
                    <Smartphone className="w-4 h-4" />
                    <Tablet className="w-4 h-4" />
                </>
            )
        },
        pdf: {
            name: "PDF Format",
            description: "Universal format for all devices",
            icon: <FileText className="w-6 h-6" />,
            bgColor: "bg-red-50",
            color: "text-red-700",
            buttonColor: "bg-red-600 hover:bg-red-700",
            devices: (
                <>
                    <Monitor className="w-4 h-4" />
                    <Smartphone className="w-4 h-4" />
                    <Printer className="w-4 h-4" />
                </>
            )
        },
        docx: {
            name: "Word Document",
            description: "Editable format for Microsoft Word",
            icon: <FileType className="w-6 h-6" />,
            bgColor: "bg-blue-50",
            color: "text-blue-700",
            buttonColor: "bg-blue-600 hover:bg-blue-700",
            devices: (
                <>
                    <Monitor className="w-4 h-4" />
                    <Laptop className="w-4 h-4" />
                </>
            )
        }
    };


    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
            {/* Mobile Header */}
            <header className="lg:hidden bg-white border-b shadow-sm sticky top-0 z-50">

            </header>

            <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8">

                {/* Header */}
                <div className="mb-6 lg:mb-8 text-center lg:text-left">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                        Book Purchase Confirmation
                    </h1>
                    <p className="text-gray-600 text-sm sm:text-base lg:text-lg">
                        Your book is ready to download in multiple formats
                    </p>
                </div>

                {/* Success Banner */}
                {book?.price > 0 &&
                    <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-4 sm:p-6 mb-6 lg:mb-8 shadow-lg">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <div className="flex items-start sm:items-center">
                                <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-white mr-3 sm:mr-4 flex-shrink-0 mt-1 sm:mt-0" />
                                <div>
                                    <h3 className="text-lg sm:text-xl font-semibold text-white mb-1">
                                        Purchase Successful!
                                    </h3>
                                    <p className="text-green-100 text-sm sm:text-base">
                                        Thank you for your purchase. The book is now available in your library.
                                    </p>
                                </div>
                            </div>
                            <div className="w-full sm:w-auto">
                                <span className="inline-block bg-white/20 px-3 sm:px-4 py-2 rounded-lg text-white font-medium text-sm sm:text-base w-full sm:w-auto text-center">
                                    Transaction ID: {(user?.purchase_history?.find(obj => obj.book_id == bookId).transaction_id) || Math.random().toString(36).substring(2, 10).toUpperCase()}
                                </span>
                            </div>
                        </div>
                    </div>
                }

                {/* Main Content */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="lg:flex">
                        {/* Left Section - Book Cover */}
                        <div className="lg:w-2/5 bg-gradient-to-br from-gray-900 to-gray-800 p-6 lg:p-8">
                            <div className="h-full flex flex-col items-center justify-center">
                                {/* Book Cover with Shadow */}
                                <div className="relative w-full max-w-xs sm:max-w-sm mb-6 lg:mb-8">
                                    <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-blue-500/20 rounded-2xl blur-xl"></div>
                                    {/* Image with skeleton loading */}
                                    <div className="relative aspect-[3/4]">
                                        {book?.cover_image_url && (
                                            <img
                                                src={book.cover_image_url}
                                                alt={`${book.title} cover`}
                                                className="absolute inset-0 w-full h-full object-cover"
                                                loading="lazy"
                                                onLoad={(e) => {
                                                    e.target.classList.remove('opacity-0');
                                                    e.target.nextElementSibling?.classList.add('hidden');
                                                }}
                                                onError={(e) => {
                                                    e.target.classList.add('hidden');
                                                    e.target.nextElementSibling?.classList.remove('hidden');
                                                }}
                                            />
                                        )}

                                        {/* Fallback */}
                                        <div className={`absolute inset-0 flex flex-col items-center justify-center p-4 ${book?.cover_image_url ? 'hidden' : ''
                                            }`}>
                                            <div className="w-12 h-12 md:w-16 md:h-16 mb-3">
                                                <FaBook className="w-full h-full text-blue-300" />
                                            </div>

                                            <div className="text-center">
                                                <p className="text-blue-400 text-xs font-medium bg-white/80 px-3 py-1 rounded-full">
                                                    {import.meta.env.VITE_WEBSITE_NAME}
                                                </p>
                                            </div>

                                        </div>
                                    </div>

                                    {/* Badge */}
                                    <div className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white px-3 sm:px-4 py-1 sm:py-2 rounded-full shadow-lg">
                                        <div className="flex items-center">
                                            <Book className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                                            <span className="font-semibold text-xs sm:text-sm">{book?.categories[0]}</span>
                                        </div>
                                    </div>
                                </div>


                            </div>
                        </div>

                        {/* Right Section - Book Details */}
                        <div className="lg:w-3/5 p-6 lg:p-8">
                            {/* Book Title and Author */}
                            <div className="mb-6">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                                            {book?.title}
                                        </h1>
                                        <div className="flex flex-wrap items-center gap-2">
                                            <span className="text-gray-600">by</span>
                                            <span className="font-semibold text-blue-600">
                                                {book?.author}
                                            </span>
                                            <div className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium">
                                                Bestseller
                                            </div>
                                        </div>
                                    </div>

                                </div>



                            </div>

                            {/* Book Metadata */}
                            <div className="flex flex-wrap items-center gap-4 mb-6 pb-6 border-b">
                                <div className="flex items-center text-gray-600 bg-gray-50 px-3 py-2 rounded-lg">
                                    <Book className="w-4 h-4 mr-2" />
                                    <span className="text-sm">{book?.total_pages} pages</span>
                                </div>

                                <div className="flex items-center text-gray-600 bg-gray-50 px-3 py-2 rounded-lg">
                                    <Globe className="w-4 h-4 mr-2" />
                                    <span className="text-sm">{book?.language}</span>
                                </div>

                                <div className="flex items-center text-gray-600 bg-gray-50 px-3 py-2 rounded-lg">
                                    <Calendar className="w-4 h-4 mr-2" />
                                    <span className="text-sm">{new Date(book?.created_at).getFullYear()}</span>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="mb-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
                                <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                                    {book?.description}
                                </p>
                                <div className="mt-4 flex items-center text-sm text-gray-500">
                                    <Shield className="w-4 h-4 mr-2" />
                                    DRM-Free • Lifetime Access • Free Updates
                                </div>
                            </div>

                            {/* Download Section */}
                            <div>
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
                                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center mb-3 sm:mb-0">
                                        <Download className="w-5 h-5 sm:w-6 sm:h-6 mr-3 text-blue-600" />
                                        Download Formats
                                    </h2>
                                    {/* <div className="text-sm text-gray-500 bg-gray-100 px-3 py-2 rounded-lg">
                                        Total size: {formatFileSize(totalSize)}
                                    </div> */}
                                </div>



                                <div className="space-y-4 mb-6">
                                    {Object.entries(book?.book_content_url || {}).map(([formatType, url], index) => {
                                        // Skip agar URL null ya empty hai
                                        if (!url) return null;

                                        const formatConfigItem = formatConfig[formatType];
                                        // Skip agar format configuration nahi hai
                                        if (!formatConfigItem) return null;

                                        return (
                                            <div
                                                key={index}
                                                className={`rounded-xl p-4 sm:p-5 transition-all duration-300 hover:shadow-md ${formatConfigItem?.bgColor} ${formatConfigItem?.color}`}
                                            >
                                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                                    <div className="flex items-start w-full sm:w-auto">
                                                        <div className={`p-3 rounded-lg mr-4 ${formatConfigItem?.bgColor}`}>
                                                            {formatConfigItem?.icon}
                                                        </div>
                                                        <div className="flex-1">
                                                            <div className="flex items-center justify-between mb-1">
                                                                <h4 className="font-bold text-lg text-gray-900">
                                                                    {formatConfigItem?.name}
                                                                </h4>
                                                                <span className="text-sm font-medium text-gray-700">
                                                                    {/* Agar aapke paas file size hai to yahan use karein */}
                                                                    {/* {formatFileSize(format.size)} */}
                                                                    {/* Ya phir simply format type dikhayein */}
                                                                    {formatType.toUpperCase()}
                                                                </span>
                                                            </div>
                                                            <p className="text-gray-600 text-sm mb-2">
                                                                {formatConfigItem?.description}
                                                            </p>
                                                            <div className="flex items-center space-x-2">
                                                                <span className="text-xs text-gray-500">Compatible:</span>
                                                                <div className="flex items-center space-x-1">
                                                                    {formatConfigItem?.devices}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <button
                                                        onClick={() => handleDownload(formatType, url)}
                                                        disabled={downloadStatus[formatType] === 'downloading'}
                                                        className={`px-4 py-3 rounded-lg font-semibold text-white transition-all duration-300 flex items-center justify-center w-full sm:w-40 ${downloadStatus[formatType] === 'downloaded'
                                                            ? 'bg-green-500 hover:bg-green-600'
                                                            : downloadStatus[formatType] === 'downloading'
                                                                ? 'bg-gray-400 cursor-not-allowed'
                                                                : formatConfigItem?.buttonColor
                                                            }`}
                                                    >
                                                        {downloadStatus[formatType] === 'downloading' ? (
                                                            <>
                                                                <Clock className="w-4 h-4 mr-2 animate-spin" />
                                                                <span className="hidden sm:inline">Downloading...</span>
                                                                <span className="inline sm:hidden">Processing...</span>
                                                            </>
                                                        ) : downloadStatus[formatType] === 'downloaded' ? (
                                                            <>
                                                                <CheckCircle className="w-4 h-4 mr-2" />
                                                                <span className="hidden sm:inline">Downloaded</span>
                                                                <span className="inline sm:hidden">Done</span>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <Download className="w-4 h-4 mr-2" />
                                                                Download
                                                            </>
                                                        )}
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Additional Info */}
                                <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4 sm:p-6">
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        <div className="text-center">
                                            {book &&
                                                <div className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
                                                    {Object.values(book?.book_content_url).filter(val => val != null).length}
                                                </div>
                                            }
                                            <div className="text-gray-600 text-sm">Formats</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
                                                Unlimited
                                            </div>
                                            <div className="text-gray-600 text-sm">Downloads</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
                                                24/7
                                            </div>
                                            <div className="text-gray-600 text-sm">Access</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
                                                Free
                                            </div>
                                            <div className="text-gray-600 text-sm">Updates</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="mt-6 lg:mt-8 flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
                    <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">

                        <button className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-all duration-300 flex items-center justify-center flex-1 sm:flex-none">
                            <Printer className="w-5 h-5 mr-2" />
                            Print Summary
                        </button>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                        <button onClick={() => navigate(`${import.meta.env.VITE_ACCOUNT_PAGE}?tab=library`)} className="px-6 py-3 bg-gray-800 text-white rounded-xl font-medium hover:bg-gray-900 transition-all duration-300 flex items-center justify-center flex-1 sm:flex-none order-2 sm:order-1">
                            View Library
                            <ChevronRight className="w-5 h-5 ml-2" />
                        </button>
                        <button onClick={() => navigate(import.meta.env.VITE_BOOKS_PAGE)} className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-300 flex items-center justify-center flex-1 sm:flex-none order-1 sm:order-2">
                            Continue Shopping
                        </button>
                    </div>
                </div>

                {/* Trust Badges */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                    <div className="flex flex-wrap items-center justify-center gap-6 text-gray-500 text-sm">
                        <div className="flex items-center">
                            <Shield className="w-4 h-4 mr-2 text-green-500" />
                            Secure Payment
                        </div>
                        <div className="hidden sm:block">•</div>
                        <div className="flex items-center">
                            <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                            30-Day Guarantee
                        </div>
                        <div className="hidden sm:block">•</div>
                        <div className="flex items-center">
                            <Download className="w-4 h-4 mr-2 text-green-500" />
                            Instant Access
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default ProfessionalBookComponent;