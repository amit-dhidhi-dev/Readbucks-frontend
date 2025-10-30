// src/components/Dashboard.jsx
import React, { useState } from 'react';
import { 
  BookOpen, 
  DollarSign, 
  Users, 
  TrendingUp,
  Search,
  Filter,
  Plus
} from 'lucide-react';
import { userStats, userBooks, quizWinners } from '../../data/mockData';
import Sidebar from './Sidebar';
import BookCard from './BookCard';
import StatsCard from './StatsCard';
import BookForm from './BookForm';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [books, setBooks] = useState(userBooks);
  const [showBookForm, setShowBookForm] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddBook = () => {
    setEditingBook(null);
    setShowBookForm(true);
  };

  const handleEditBook = (book) => {
    setEditingBook(book);
    setShowBookForm(true);
  };

  const handleSaveBook = (bookData) => {
    if (editingBook) {
      setBooks(books.map(book => 
        book.id === editingBook.id 
          ? { ...book, ...bookData, lastUpdated: new Date().toISOString().split('T')[0] }
          : book
      ));
    } else {
      const newBook = {
        id: books.length + 1,
        ...bookData,
        cover: '📚',
        sales: 0,
        earnings: 0,
        rating: 0,
        readers: 0,
        quizParticipants: 0,
        lastUpdated: new Date().toISOString().split('T')[0]
      };
      setBooks([...books, newBook]);
    }
    setShowBookForm(false);
    setEditingBook(null);
  };

  const handleDeleteBook = (bookId) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      setBooks(books.filter(book => book.id !== bookId));
    }
  };

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Books"
          value={userStats.totalBooks}
          icon={BookOpen}
          change={userStats.monthlyGrowth}
          changeType="positive"
        />
        <StatsCard
          title="Total Sales"
          value={userStats.totalSales}
          icon={DollarSign}
          change={12.3}
          changeType="positive"
        />
        <StatsCard
          title="Total Earnings"
          value={`$${userStats.totalEarnings}`}
          icon={TrendingUp}
          change={8.7}
          changeType="positive"
        />
        <StatsCard
          title="Total Readers"
          value={userStats.totalReaders}
          icon={Users}
          change={18.2}
          changeType="positive"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Quiz Winners</h3>
          <div className="space-y-4">
            {quizWinners.map(winner => (
              <div key={winner.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{winner.winner}</p>
                  <p className="text-sm text-gray-600">{winner.book}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-green-600">${winner.prize}</p>
                  <p className="text-sm text-gray-600">{winner.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 bg-primary bg-opacity-10 rounded-lg hover:bg-opacity-20 transition-colors">
              <BookOpen className="text-primary mx-auto mb-2" size={24} />
              <p className="text-sm font-medium text-center">Create Quiz</p>
            </button>
            <button className="p-4 bg-green-100 rounded-lg hover:bg-green-200 transition-colors">
              <Users className="text-green-600 mx-auto mb-2" size={24} />
              <p className="text-sm font-medium text-center">View Readers</p>
            </button>
            <button className="p-4 bg-purple-100 rounded-lg hover:bg-purple-200 transition-colors">
              <TrendingUp className="text-purple-600 mx-auto mb-2" size={24} />
              <p className="text-sm font-medium text-center">Analytics</p>
            </button>
            <button className="p-4 bg-orange-100 rounded-lg hover:bg-orange-200 transition-colors">
              <DollarSign className="text-orange-600 mx-auto mb-2" size={24} />
              <p className="text-sm font-medium text-center">Earnings</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderMyBooks = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">My Books</h2>
          <p className="text-gray-600">Manage and track your published books</p>
        </div>
        <button
          onClick={handleAddBook}
          className="flex items-center space-x-2 bg-primary text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
        >
          <Plus size={20} />
          <span>Add New Book</span>
        </button>
      </div>

      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search books..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
          <Filter size={20} />
          <span>Filter</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredBooks.map(book => (
          <BookCard
            key={book.id}
            book={book}
            onEdit={handleEditBook}
            onDelete={handleDeleteBook}
            onViewStats={() => {}}
          />
        ))}
      </div>

      {filteredBooks.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="mx-auto text-gray-400 mb-4" size={48} />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No books found</h3>
          <p className="text-gray-600">Try adjusting your search or add a new book.</p>
        </div>
      )}
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        onAddBook={handleAddBook}
      />
      
      <main className="flex-1 ml-64 p-8">
        <div className="max-w-7xl mx-auto">
          {activeTab === 'dashboard' && renderDashboard()}
          {activeTab === 'my-books' && renderMyBooks()}
          {activeTab === 'analytics' && (
            <div className="text-center py-12">
              <BarChart3 className="mx-auto text-gray-400 mb-4" size={48} />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Analytics Coming Soon</h3>
              <p className="text-gray-600">Detailed analytics will be available here.</p>
            </div>
          )}
          {activeTab === 'quiz-winners' && (
            <div className="text-center py-12">
              <Award className="mx-auto text-gray-400 mb-4" size={48} />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Quiz Winners</h3>
              <p className="text-gray-600">Track quiz winners and prize distributions.</p>
            </div>
          )}
        </div>
      </main>

      {showBookForm && (
        <BookForm
          book={editingBook}
          onSave={handleSaveBook}
          onClose={() => {
            setShowBookForm(false);
            setEditingBook(null);
          }}
        />
      )}
    </div>
  );
};

export default Dashboard;