// src/data/mockData.js
export const userStats = {
  totalBooks: 12,
  totalSales: 2450,
  totalEarnings: 1850.75,
  totalReaders: 1560,
  monthlyGrowth: 15.5,
};

export const userBooks = [
  {
    id: 1,
    title: "The JavaScript Mastery",
    cover: "📘",
    category: "Programming",
    price: 29.99,
    sales: 245,
    earnings: 735.00,
    rating: 4.8,
    status: "published",
    lastUpdated: "2023-10-15",
    readers: 1200,
    quizParticipants: 345
  },
  {
    id: 2,
    title: "React Patterns",
    cover: "⚛️",
    category: "Web Development",
    price: 24.99,
    sales: 189,
    earnings: 472.50,
    rating: 4.6,
    status: "published",
    lastUpdated: "2023-10-10",
    readers: 890,
    quizParticipants: 234
  },
  {
    id: 3,
    title: "AI for Beginners",
    cover: "🤖",
    category: "Artificial Intelligence",
    price: 34.99,
    sales: 156,
    earnings: 545.44,
    rating: 4.9,
    status: "published",
    lastUpdated: "2023-10-05",
    readers: 670,
    quizParticipants: 189
  },
  {
    id: 4,
    title: "Data Structures",
    cover: "📊",
    category: "Computer Science",
    price: 27.99,
    sales: 98,
    earnings: 274.40,
    rating: 4.5,
    status: "draft",
    lastUpdated: "2023-09-28",
    readers: 450,
    quizParticipants: 120
  }
];

export const quizWinners = [
  { id: 1, book: "The JavaScript Mastery", winner: "John Doe", prize: 250, date: "2023-10-12" },
  { id: 2, book: "React Patterns", winner: "Sarah Smith", prize: 200, date: "2023-10-08" },
  { id: 3, book: "AI for Beginners", winner: "Mike Johnson", prize: 300, date: "2023-10-03" }
];