import React,{useState} from 'react';
import { X, EyeIcon, UsersIcon, TrendingUpIcon, DollarSign, Share2, Download, RefreshCw } from 'lucide-react';

function AnalyticsModal({ book, onClose }) {

      // Mock analytics data for books
  const generateAnalyticsData = (bookId) => {
    return {
      bookId,
      overview: {
        totalViews: 12500,
        uniqueReaders: 3200,
        completionRate: 68,
        avgReadingTime: '45min',
        shares: 450
      },
      salesData: {
        daily: [65, 59, 80, 81, 56, 55, 40, 45, 60, 75, 80, 90],
        monthly: [245, 189, 210, 195, 230, 245, 260, 240, 255, 270, 285, 300],
        revenue: [735, 472, 630, 585, 690, 735, 780, 720, 765, 810, 855, 900]
      },
      readerDemographics: {
        ageGroups: {
          '18-24': 25,
          '25-34': 45,
          '35-44': 20,
          '45+': 10
        },
        regions: {
          'North America': 40,
          'Europe': 30,
          'Asia': 20,
          'Other': 10
        }
      },
      quizPerformance: {
        participationRate: 72,
        averageScore: 78,
        topScores: [95, 92, 90, 88, 85],
        completionRate: 65
      }
    };
  };



    const analyticsData = generateAnalyticsData(book.id);
    const [timeFrame, setTimeFrame] = useState('monthly');

    // Function to get chart data based on time frame
    const getChartData = () => {
        const data = analyticsData.salesData[timeFrame];
        const maxValue = Math.max(...data);
        const labels = timeFrame === 'daily'
            ? Array.from({ length: 12 }, (_, i) => `Day ${i + 1}`)
            : timeFrame === 'weekly'
                ? ['Week 1', 'Week 2', 'Week 3', 'Week 4']
                : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        return {
            data,
            maxValue,
            labels: labels.slice(0, data.length)
        };
    };

    const chartData = getChartData();

    // Function to handle PDF export
    const handleExportPDF = () => {
        // In a real app, this would generate and download a PDF report
        alert(`Exporting analytics report for ${book.title} as PDF...`);
    };

    // Function to refresh data
    const handleRefreshData = () => {
        // In a real app, this would refresh analytics data from the server
        alert('Refreshing analytics data...');
    };


    

    return (
        <>
            <div className="fixed inset-0 bg-[#00000060] flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-xl shadow-xl w-full max-w-6xl max-h-[90vh] overflow-y-auto">
                    <div className="flex justify-between items-center p-6 border-b border-gray-200">
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900">Book Analytics</h2>
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
                        {/* Overview Cards */}
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                                <div className="flex items-center space-x-2">
                                    <EyeIcon size={20} className="text-blue-600" />
                                    <span className="text-sm text-blue-600">Views</span>
                                </div>
                                <div className="text-2xl font-bold text-gray-900 mt-2">
                                    {analyticsData.overview.totalViews.toLocaleString()}
                                </div>
                                <div className="text-xs text-blue-600 mt-1">+12% from last month</div>
                            </div>
                            <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                                <div className="flex items-center space-x-2">
                                    <UsersIcon size={20} className="text-green-600" />
                                    <span className="text-sm text-green-600">Readers</span>
                                </div>
                                <div className="text-2xl font-bold text-gray-900 mt-2">
                                    {analyticsData.overview.uniqueReaders.toLocaleString()}
                                </div>
                                <div className="text-xs text-green-600 mt-1">+8% from last month</div>
                            </div>
                            <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                                <div className="flex items-center space-x-2">
                                    <TrendingUpIcon size={20} className="text-purple-600" />
                                    <span className="text-sm text-purple-600">Completion</span>
                                </div>
                                <div className="text-2xl font-bold text-gray-900 mt-2">
                                    {analyticsData.overview.completionRate}%
                                </div>
                                <div className="text-xs text-purple-600 mt-1">+5% from last month</div>
                            </div>
                            <div className="bg-orange-50 p-4 rounded-lg border border-orange-100">
                                <div className="flex items-center space-x-2">
                                    <DollarSign size={20} className="text-orange-600" />
                                    <span className="text-sm text-orange-600">Sales</span>
                                </div>
                                <div className="text-2xl font-bold text-gray-900 mt-2">
                                    {book.sales}
                                </div>
                                <div className="text-xs text-orange-600 mt-1">+15% from last month</div>
                            </div>
                            <div className="bg-red-50 p-4 rounded-lg border border-red-100">
                                <div className="flex items-center space-x-2">
                                    <Share2 size={20} className="text-red-600" />
                                    <span className="text-sm text-red-600">Shares</span>
                                </div>
                                <div className="text-2xl font-bold text-gray-900 mt-2">
                                    {analyticsData.overview.shares}
                                </div>
                                <div className="text-xs text-red-600 mt-1">+22% from last month</div>
                            </div>
                        </div>

                        {/* Time Frame Selector */}
                        <div className="flex space-x-2">
                            {['daily', 'weekly', 'monthly'].map((frame) => (
                                <button
                                    key={frame}
                                    onClick={() => setTimeFrame(frame)}
                                    className={`px-4 py-2 rounded-lg capitalize transition-colors ${timeFrame === frame
                                        ? 'bg-blue-500 text-white shadow-sm'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                >
                                    {frame}
                                </button>
                            ))}
                        </div>

                        {/* Sales Performance */}
                        <div className="bg-white border border-gray-200 rounded-lg p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-semibold text-gray-800">Sales Performance</h3>
                                <div className="text-sm text-gray-600">
                                    Total Revenue: <span className="font-semibold text-green-600">₹{book.earnings}</span>
                                </div>
                            </div>

                            {/* Chart Container */}
                            <div className="h-64 flex items-end space-x-2 p-4 bg-gray-50 rounded-lg">
                                {chartData.data.map((value, index) => (
                                    <div key={index} className="flex-1 flex flex-col items-center space-y-2">
                                        {/* Chart Bar */}
                                        <div className="relative w-full flex justify-center">
                                            <div
                                                className="w-8 bg-gradient-to-t from-blue-500 to-blue-600 rounded-t transition-all duration-300 hover:from-blue-600 hover:to-blue-700 cursor-pointer group"
                                                style={{ height: `${(value / chartData.maxValue) * 180}px` }}
                                            >
                                                {/* Tooltip */}
                                                <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                                    {value} sales
                                                </div>
                                            </div>
                                        </div>

                                        {/* X-axis label */}
                                        <div className="text-xs text-gray-500 text-center min-h-[40px] flex items-center justify-center">
                                            {chartData.labels[index]}
                                        </div>

                                        {/* Value label */}
                                        <div className="text-xs font-medium text-gray-700">
                                            {value}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Chart Legend */}
                            <div className="flex justify-center mt-4 space-x-6">
                                <div className="flex items-center space-x-2">
                                    <div className="w-3 h-3 bg-blue-500 rounded"></div>
                                    <span className="text-sm text-gray-600">Sales Volume</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <div className="w-3 h-3 bg-green-500 rounded"></div>
                                    <span className="text-sm text-gray-600">Revenue Growth</span>
                                </div>
                            </div>
                        </div>

                        {/* Revenue Breakdown */}
                        <div className="bg-white border border-gray-200 rounded-lg p-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Revenue Breakdown</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="text-center p-4 bg-blue-50 rounded-lg">
                                    <div className="text-2xl font-bold text-blue-600">₹{book.earnings}</div>
                                    <div className="text-sm text-blue-600">Total Revenue</div>
                                </div>
                                <div className="text-center p-4 bg-green-50 rounded-lg">
                                    <div className="text-2xl font-bold text-green-600">
                                        ₹{Math.round(book.earnings / book.sales)}
                                    </div>
                                    <div className="text-sm text-green-600">Average per Sale</div>
                                </div>
                                <div className="text-center p-4 bg-purple-50 rounded-lg">
                                    <div className="text-2xl font-bold text-purple-600">
                                        {Math.round((book.sales / analyticsData.overview.uniqueReaders) * 100)}%
                                    </div>
                                    <div className="text-sm text-purple-600">Conversion Rate</div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Reader Demographics */}
                            <div className="bg-white border border-gray-200 rounded-lg p-6">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">Reader Demographics</h3>
                                <div className="space-y-4">
                                    <div>
                                        <h4 className="font-medium text-gray-700 mb-3">Age Groups</h4>
                                        {Object.entries(analyticsData.readerDemographics.ageGroups).map(([age, percent]) => (
                                            <div key={age} className="flex items-center justify-between mb-3">
                                                <span className="text-sm text-gray-600 w-16">{age}</span>
                                                <div className="flex-1 mx-4">
                                                    <div className="w-full bg-gray-200 rounded-full h-3">
                                                        <div
                                                            className="bg-green-500 h-3 rounded-full transition-all duration-500"
                                                            style={{ width: `${percent}%` }}
                                                        ></div>
                                                    </div>
                                                </div>
                                                <span className="text-sm font-medium text-gray-900 w-12 text-right">{percent}%</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-gray-700 mb-3">Regions</h4>
                                        {Object.entries(analyticsData.readerDemographics.regions).map(([region, percent]) => (
                                            <div key={region} className="flex items-center justify-between mb-3">
                                                <span className="text-sm text-gray-600 flex-1">{region}</span>
                                                <div className="w-32 bg-gray-200 rounded-full h-3 mx-4">
                                                    <div
                                                        className="bg-blue-500 h-3 rounded-full transition-all duration-500"
                                                        style={{ width: `${percent}%` }}
                                                    ></div>
                                                </div>
                                                <span className="text-sm font-medium text-gray-900 w-12 text-right">{percent}%</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Quiz Performance */}
                            <div className="bg-white border border-gray-200 rounded-lg p-6">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">Quiz Performance</h3>
                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-100">
                                            <div className="text-2xl font-bold text-blue-600">
                                                {analyticsData.quizPerformance.participationRate}%
                                            </div>
                                            <div className="text-sm text-blue-600">Participation</div>
                                        </div>
                                        <div className="text-center p-4 bg-green-50 rounded-lg border border-green-100">
                                            <div className="text-2xl font-bold text-green-600">
                                                {analyticsData.quizPerformance.averageScore}%
                                            </div>
                                            <div className="text-sm text-green-600">Avg Score</div>
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-gray-700 mb-3">Top Scores Distribution</h4>
                                        <div className="flex space-x-2">
                                            {analyticsData.quizPerformance.topScores.map((score, index) => (
                                                <div key={index} className="flex-1 text-center p-3 bg-gray-50 rounded-lg border border-gray-200">
                                                    <div className="font-semibold text-gray-900 text-lg">{score}%</div>
                                                    <div className="text-xs text-gray-500 mt-1">Rank #{index + 1}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-yellow-800">Quiz Completion Rate</span>
                                            <span className="text-sm font-semibold text-yellow-900">
                                                {analyticsData.quizPerformance.completionRate}%
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Export Options */}
                        <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                            <button
                                onClick={handleExportPDF}
                                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                <Download size={16} />
                                <span>Export PDF Report</span>
                            </button>
                            <button
                                onClick={handleRefreshData}
                                className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                            >
                                <RefreshCw size={16} />
                                <span>Refresh Data</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default AnalyticsModal
