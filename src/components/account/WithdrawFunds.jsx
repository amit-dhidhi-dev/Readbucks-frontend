import React, { useState } from 'react';
import { ArrowLeft, CreditCard, Wallet, CheckCircle, AlertCircle, Calendar, Download, Filter, Search, IndianRupee } from 'lucide-react';
import { FaPaypal, FaGooglePay,  FaUniversity } from 'react-icons/fa';

const WithdrawFunds = () => {
  const [activeTab, setActiveTab] = useState('withdraw');
  const [selectedMethod, setSelectedMethod] = useState('bank');
  const [amount, setAmount] = useState('');
  const [withdrawHistory, setWithdrawHistory] = useState([
    {
      id: 1,
      method: 'Bank Transfer',
      amount: 1500,
      status: 'completed',
      date: '2024-01-15',
      transactionId: 'TXN789456123'
    },
    {
      id: 2,
      method: 'UPI',
      amount: 800,
      status: 'pending',
      date: '2024-01-14',
      transactionId: 'TXN789456124'
    },
    {
      id: 3,
      method: 'PayPal',
      amount: 2500,
      status: 'completed',
      date: '2024-01-12',
      transactionId: 'TXN789456125'
    },
    {
      id: 4,
      method: 'Bank Transfer',
      amount: 1200,
      status: 'failed',
      date: '2024-01-10',
      transactionId: 'TXN789456126'
    }
  ]);

  const paymentMethods = [
    {
      id: 'bank',
      name: 'Bank Transfer',
      icon: <FaUniversity className="text-blue-600 text-xl" />,
      processingTime: '2-3 business days',
      minAmount: 500,
      fee: '₹10 or 2%',
      description: 'Direct transfer to your bank account'
    },
    {
      id: 'upi',
      name: 'UPI',
      icon: <FaGooglePay className="text-green-600 text-xl" />,
      processingTime: 'Instant',
      minAmount: 100,
      fee: '₹5',
      description: 'Instant transfer via UPI ID'
    },
    {
      id: 'paypal',
      name: 'PayPal',
      icon: <FaPaypal className="text-blue-500 text-xl" />,
      processingTime: '24 hours',
      minAmount: 1000,
      fee: '3%',
      description: 'International withdrawals'
    },
    {
      id: 'paytm',
      name: 'PayTM Wallet',
      icon: <Wallet className="text-blue-400" />,
      processingTime: 'Instant',
      minAmount: 100,
      fee: '₹7',
      description: 'Transfer to PayTM wallet'
    }
  ];

  const walletBalance = 4850;
  const totalEarnings = 12500;
  const availableForWithdrawal = 4850;

  const handleWithdraw = (e) => {
    e.preventDefault();
    // Handle withdrawal logic here
    alert(`Withdrawal request of ₹${amount} submitted via ${selectedMethod}`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'failed': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle size={16} />;
      case 'pending': return <AlertCircle size={16} />;
      case 'failed': return <AlertCircle size={16} />;
      default: return <AlertCircle size={16} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <button className="flex items-center text-gray-600 hover:text-gray-800 mb-4">
            <ArrowLeft size={20} className="mr-2" />
            Back to Dashboard
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Withdraw Funds</h1>
          <p className="text-gray-600 mt-2">Manage your earnings and withdraw to your preferred method</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Balance</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">₹{walletBalance}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <IndianRupee className="text-green-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Earnings</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">₹{totalEarnings}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Wallet className="text-blue-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Available for Withdrawal</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">₹{availableForWithdrawal}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <CreditCard className="text-purple-600" size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <div className="flex">
              <button
                onClick={() => setActiveTab('withdraw')}
                className={`px-6 py-4 font-medium text-sm border-b-2 transition-colors ${
                  activeTab === 'withdraw'
                    ? 'border-purple-600 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Withdraw Funds
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`px-6 py-4 font-medium text-sm border-b-2 transition-colors ${
                  activeTab === 'history'
                    ? 'border-purple-600 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Withdrawal History
              </button>
              <button
                onClick={() => setActiveTab('methods')}
                className={`px-6 py-4 font-medium text-sm border-b-2 transition-colors ${
                  activeTab === 'methods'
                    ? 'border-purple-600 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Payment Methods
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {/* Withdraw Tab */}
            {activeTab === 'withdraw' && (
              <div className="max-w-2xl">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Request Withdrawal</h2>
                
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                  <div className="flex items-start">
                    <AlertCircle className="text-yellow-600 mt-0.5 mr-3 flex-shrink-0" size={20} />
                    <div>
                      <p className="text-yellow-800 font-medium">Minimum withdrawal amount: ₹100</p>
                      <p className="text-yellow-700 text-sm mt-1">
                        Processing fees apply based on your selected payment method. Withdrawals are processed within 1-3 business days.
                      </p>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleWithdraw} className="space-y-6">
                  {/* Amount Input */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Withdrawal Amount
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <IndianRupee className="text-gray-400" size={20} />
                      </div>
                      <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Enter amount"
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                        min="100"
                        max={availableForWithdrawal}
                        required
                      />
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      Available: ₹{availableForWithdrawal}
                    </p>
                  </div>

                  {/* Payment Methods */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Select Payment Method
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {paymentMethods.map((method) => (
                        <div
                          key={method.id}
                          onClick={() => setSelectedMethod(method.id)}
                          className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                            selectedMethod === method.id
                              ? 'border-purple-500 bg-purple-50'
                              : 'border-gray-200 hover:border-purple-300'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="p-2 bg-white rounded-lg mr-3">
                                {method.icon}
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">{method.name}</p>
                                <p className="text-sm text-gray-500">{method.processingTime}</p>
                              </div>
                            </div>
                            {selectedMethod === method.id && (
                              <CheckCircle className="text-purple-600" size={20} />
                            )}
                          </div>
                          <div className="mt-3 text-xs text-gray-600">
                            <p>Fee: {method.fee} • Min: ₹{method.minAmount}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Selected Method Details */}
                  {selectedMethod && (
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-2">
                        {paymentMethods.find(m => m.id === selectedMethod)?.name} Details
                      </h4>
                      <div className="space-y-3">
                        {selectedMethod === 'bank' && (
                          <>
                            <input
                              type="text"
                              placeholder="Bank Account Number"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                              required
                            />
                            <input
                              type="text"
                              placeholder="IFSC Code"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                              required
                            />
                            <input
                              type="text"
                              placeholder="Account Holder Name"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                              required
                            />
                          </>
                        )}
                        {selectedMethod === 'upi' && (
                          <input
                            type="text"
                            placeholder="UPI ID"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                            required
                          />
                        )}
                        {selectedMethod === 'paypal' && (
                          <input
                            type="email"
                            placeholder="PayPal Email"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                            required
                          />
                        )}
                        {selectedMethod === 'paytm' && (
                          <input
                            type="tel"
                            placeholder="Registered Mobile Number"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                            required
                          />
                        )}
                      </div>
                    </div>
                  )}

                  {/* Summary */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-3">Withdrawal Summary</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Withdrawal Amount:</span>
                        <span className="font-medium">₹{amount || 0}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Processing Fee:</span>
                        <span className="font-medium">
                          {selectedMethod ? paymentMethods.find(m => m.id === selectedMethod)?.fee : '--'}
                        </span>
                      </div>
                      <div className="flex justify-between border-t border-gray-200 pt-2">
                        <span className="text-gray-800 font-medium">You'll Receive:</span>
                        <span className="text-green-600 font-bold">
                          ₹{amount ? (parseInt(amount) - (selectedMethod === 'bank' ? 10 : 5)) : 0}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={!amount || parseInt(amount) < 100 || parseInt(amount) > availableForWithdrawal}
                    className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                  >
                    Request Withdrawal
                  </button>
                </form>
              </div>
            )}

            {/* History Tab */}
            {activeTab === 'history' && (
              <div>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Withdrawal History</h2>
                  <div className="flex space-x-3 mt-4 md:mt-0">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="text"
                        placeholder="Search transactions..."
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                    <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                      <Filter size={18} className="mr-2" />
                      Filter
                    </button>
                    <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                      <Download size={18} className="mr-2" />
                      Export
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Date</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Method</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Transaction ID</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Amount</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {withdrawHistory.map((transaction) => (
                        <tr key={transaction.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4">
                            <div className="flex items-center text-sm text-gray-600">
                              <Calendar size={16} className="mr-2" />
                              {transaction.date}
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center">
                              {transaction.method === 'Bank Transfer' && <FaUniversity className="text-blue-600 mr-2" />}
                              {transaction.method === 'UPI' && <FaGooglePay className="text-green-600 mr-2" />}
                              {transaction.method === 'PayPal' && <FaPaypal className="text-blue-500 mr-2" />}
                              <span className="text-sm font-medium">{transaction.method}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-600 font-mono">
                            {transaction.transactionId}
                          </td>
                          <td className="py-3 px-4">
                            <span className="font-medium">₹{transaction.amount}</span>
                          </td>
                          <td className="py-3 px-4">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                              {getStatusIcon(transaction.status)}
                              <span className="ml-1 capitalize">{transaction.status}</span>
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Payment Methods Tab */}
            {activeTab === 'methods' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Payment Methods</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {paymentMethods.map((method) => (
                    <div key={method.id} className="border border-gray-200 rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <div className="p-3 bg-gray-100 rounded-lg mr-4">
                            {method.icon}
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{method.name}</h3>
                            <p className="text-sm text-gray-600">{method.description}</p>
                          </div>
                        </div>
                        <button className="text-purple-600 hover:text-purple-700 font-medium text-sm">
                          Edit
                        </button>
                      </div>
                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex justify-between">
                          <span>Processing Time:</span>
                          <span className="font-medium">{method.processingTime}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Minimum Amount:</span>
                          <span className="font-medium">₹{method.minAmount}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Processing Fee:</span>
                          <span className="font-medium">{method.fee}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WithdrawFunds;