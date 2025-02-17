import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
        ברוכים הבאים למערכת ניהול העובדים
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* כרטיס רשימת עובדים */}
        <Link 
          to="/employees"
          className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          <div className="text-xl font-semibold text-blue-600 mb-2">
            רשימת עובדים
          </div>
          <p className="text-gray-600">
            צפייה ברשימת כל העובדים במערכת, כולל פרטים מלאים על כל עובד
          </p>
        </Link>

        {/* כרטיס הוספת עובד */}
        <Link 
          to="/add-employee"
          className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          <div className="text-xl font-semibold text-green-600 mb-2">
            הוספת עובד חדש
          </div>
          <p className="text-gray-600">
            הוספת עובד חדש למערכת, כולל פרטים אישיים ומקצועיים
          </p>
        </Link>
      </div>

      {/* סיכום מערכת */}
      <div className="mt-12 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          אודות המערכת
        </h2>
        <p className="text-gray-600">
          מערכת ניהול העובדים מאפשרת לך לנהל את כל המידע על העובדים בארגון במקום אחד.
          המערכת מציעה ממשק נוח לצפייה בנתוני העובדים והוספת עובדים חדשים.
        </p>
      </div>
    </div>
  );
};

export default Dashboard; 