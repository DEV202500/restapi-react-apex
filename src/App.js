import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import EmployeeList from './components/EmployeeList';
import AddEmployeeForm from './components/AddEmployeeForm';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-transparent bg-clip-text animate-gradient">
            ברוכים הבאים למערכת ניהול העובדים
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            מערכת חכמה לניהול משאבי אנוש
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mt-12 animate-slide-up">
          {/* Card 1 */}
          <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-8 card-shadow hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500">
              <span className="text-2xl text-white">👥</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">רשימת עובדים</h3>
            <p className="text-gray-600 mb-6">צפייה ברשימת כל העובדים במערכת, כולל פרטים מלאים על כל עובד</p>
            <Link 
              to="/employees" 
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
            >
              לצפייה ברשימה
              <span className="mr-2">→</span>
            </Link>
          </div>

          {/* Card 2 */}
          <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-8 card-shadow hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500">
              <span className="text-2xl text-white">➕</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">הוספת עובד חדש</h3>
            <p className="text-gray-600 mb-6">הוספת עובד חדש למערכת, כולל פרטים אישיים ומקצועיים</p>
            <Link 
              to="/add-employee" 
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200"
            >
              להוספת עובד
              <span className="mr-2">→</span>
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">אודות המערכת</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-indigo-100">
                <span className="text-xl">🔍</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">חיפוש מתקדם</h3>
              <p className="text-gray-600">חיפוש מהיר ויעיל של עובדים לפי מגוון פרמטרים</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-purple-100">
                <span className="text-xl">📊</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">ניהול נתונים</h3>
              <p className="text-gray-600">ניהול פשוט ונוח של כל נתוני העובדים</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-pink-100">
                <span className="text-xl">🔄</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">עדכונים בזמן אמת</h3>
              <p className="text-gray-600">עדכון מיידי של נתונים ושינויים במערכת</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/employees" element={<EmployeeList />} />
          <Route path="/add-employee" element={<AddEmployeeForm />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App; 