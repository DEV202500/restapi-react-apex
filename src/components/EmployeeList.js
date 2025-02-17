import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import EditEmployeeModal from './EditEmployeeModal';
import ConfirmDialog from './ConfirmDialog';
import Toast from './Toast';

// אייקונים פשוטים בתור SVG
const PencilIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
  </svg>
);

const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
  </svg>
);

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [employeesPerPage] = useState(5);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    employeeId: null
  });
  const [toast, setToast] = useState({
    show: false,
    message: '',
    type: 'success'
  });

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const data = await api.getEmployees();
        // סינון נתונים לא תקינים
        const validEmployees = data.filter(emp => emp && emp.empno);
        setEmployees(validEmployees);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  // חיפוש עם בדיקות תקינות
  const filteredEmployees = employees.filter(employee => {
    if (!employee) return false;
    
    const searchLower = searchTerm.toLowerCase();
    const nameMatch = employee.ename ? employee.ename.toLowerCase().includes(searchLower) : false;
    const jobMatch = employee.job ? employee.job.toLowerCase().includes(searchLower) : false;
    const empNoMatch = employee.empno ? employee.empno.toString().includes(searchTerm) : false;
    
    return nameMatch || jobMatch || empNoMatch;
  });

  // דפדוף
  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = filteredEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);
  const totalPages = Math.ceil(filteredEmployees.length / employeesPerPage);

  // איפוס מספר העמוד כשהחיפוש משתנה
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleEdit = (employee) => {
    setEditingEmployee(employee);
  };

  const handleSave = async (id, updatedData) => {
    try {
      await api.updateEmployee(id, updatedData);
      // רענון רשימת העובדים
      const data = await api.getEmployees();
      setEmployees(data.filter(emp => emp && emp.empno));
      setEditingEmployee(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await api.deleteEmployee(id);
      // רענון רשימת העובדים
      const data = await api.getEmployees();
      setEmployees(data.filter(emp => emp && emp.empno));
      setConfirmDialog({ isOpen: false, employeeId: null });
      // הצגת הודעת הצלחה מהשרת
      setToast({
        show: true,
        message: response.success || 'העובד נמחק בהצלחה',
        type: 'success'
      });
    } catch (err) {
      setError(err.message);
      // הצגת הודעת שגיאה
      setToast({
        show: true,
        message: err.message || 'שגיאה במחיקת העובד',
        type: 'error'
      });
    }
  };

  const handleDeleteClick = (id) => {
    setConfirmDialog({
      isOpen: true,
      employeeId: id
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <span className="block sm:inline">{error}</span>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden mx-4 sm:mx-auto max-w-7xl my-6">
      <div className="px-4 py-5 sm:px-6 bg-gradient-to-r from-blue-50 to-blue-100">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900">רשימת עובדים</h3>
        
        {/* חיפוש */}
        <div className="mt-4">
          <div className="relative">
            <input
              type="text"
              placeholder="חיפוש לפי שם, תפקיד או מספר עובד..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* טבלה ריספונסיבית */}
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full align-middle">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">מספר עובד</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">שם</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">תפקיד</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">משכורת</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">מחלקה</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">פעולות</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentEmployees.map((employee) => (
                <tr key={employee.empno} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.empno}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{employee.ename}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.job}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${employee.sal}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.deptno}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-2 space-x-reverse">
                      <button
                        onClick={() => handleEdit(employee)}
                        className="text-blue-600 hover:text-blue-800 p-1 rounded-full hover:bg-blue-100 transition-colors duration-200"
                        title="ערוך עובד"
                      >
                        <PencilIcon />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(employee.empno)}
                        className="text-red-600 hover:text-red-800 p-1 rounded-full hover:bg-red-100 transition-colors duration-200"
                        title="מחק עובד"
                      >
                        <TrashIcon />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* כרטיסיות למובייל */}
      <div className="md:hidden">
        {currentEmployees.map((employee) => (
          <div key={employee.empno} className="p-4 border-b">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-medium text-gray-900">{employee.ename}</h3>
                <p className="text-sm text-gray-500">{employee.job}</p>
              </div>
              <div className="flex space-x-2 space-x-reverse">
                <button
                  onClick={() => handleEdit(employee)}
                  className="text-blue-600 hover:text-blue-800 p-1 rounded-full hover:bg-blue-100 transition-colors duration-200"
                  title="ערוך עובד"
                >
                  <PencilIcon />
                </button>
                <button
                  onClick={() => handleDeleteClick(employee.empno)}
                  className="text-red-600 hover:text-red-800 p-1 rounded-full hover:bg-red-100 transition-colors duration-200"
                  title="מחק עובד"
                >
                  <TrashIcon />
                </button>
              </div>
            </div>
            <div className="mt-2 grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500">מספר עובד:</span>
                <span className="mr-1 text-gray-900">{employee.empno}</span>
              </div>
              <div>
                <span className="text-gray-500">משכורת:</span>
                <span className="mr-1 text-gray-900">${employee.sal}</span>
              </div>
              <div>
                <span className="text-gray-500">מחלקה:</span>
                <span className="mr-1 text-gray-900">{employee.deptno}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* דפדוף */}
      {totalPages > 1 && (
        <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
          <div className="flex items-center justify-center space-x-2 space-x-reverse">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded-md ${
                currentPage === 1
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              הקודם
            </button>
            
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                onClick={() => paginate(index + 1)}
                className={`px-3 py-1 rounded-md ${
                  currentPage === index + 1
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {index + 1}
              </button>
            ))}

            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded-md ${
                currentPage === totalPages
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              הבא
            </button>
          </div>
          <div className="text-center mt-2 text-sm text-gray-600">
            מציג {indexOfFirstEmployee + 1}-{Math.min(indexOfLastEmployee, filteredEmployees.length)} מתוך {filteredEmployees.length} עובדים
          </div>
        </div>
      )}

      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        onClose={() => setConfirmDialog({ isOpen: false, employeeId: null })}
        onConfirm={() => handleDelete(confirmDialog.employeeId)}
        title="אישור מחיקת עובד"
        message="האם אתה בטוח שברצונך למחוק עובד זה? פעולה זו אינה ניתנת לביטול."
      />

      {editingEmployee && (
        <EditEmployeeModal
          employee={editingEmployee}
          onClose={() => setEditingEmployee(null)}
          onSave={handleSave}
        />
      )}

      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ ...toast, show: false })}
        />
      )}
    </div>
  );
};

export default EmployeeList; 