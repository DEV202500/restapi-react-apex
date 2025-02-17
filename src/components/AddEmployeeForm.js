import React, { useState } from 'react';
import { api } from '../services/api';
import Toast from './Toast';

const AddEmployeeForm = () => {
  const [formData, setFormData] = useState({
    ename: '',
    ejob: '',
    mgr: '',
    sal: '',
    comm: '',
    deptno: ''
  });

  const [toast, setToast] = useState({
    show: false,
    message: '',
    type: 'success'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const employeeData = {
        ...formData,
        mgr: formData.mgr ? Number(formData.mgr) : null,
        sal: Number(formData.sal),
        comm: formData.comm ? Number(formData.comm) : null,
        deptno: Number(formData.deptno)
      };

      await api.addEmployee(employeeData);
      setToast({
        show: true,
        message: 'העובד נוסף בהצלחה!',
        type: 'success'
      });
      setFormData({
        ename: '',
        ejob: '',
        mgr: '',
        sal: '',
        comm: '',
        deptno: ''
      });
    } catch (err) {
      setToast({
        show: true,
        message: err.message,
        type: 'error'
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="px-6 py-4 bg-gradient-to-r from-blue-50 to-blue-100">
          <h2 className="text-2xl font-bold text-gray-900">הוספת עובד חדש</h2>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* שם העובד */}
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">שם העובד</label>
              <input
                type="text"
                name="ename"
                value={formData.ename}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="הכנס שם עובד"
              />
            </div>

            {/* תפקיד */}
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">תפקיד</label>
              <input
                type="text"
                name="ejob"
                value={formData.ejob}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="הכנס תפקיד"
              />
            </div>

            {/* מספר מנהל */}
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">מספר מנהל</label>
              <input
                type="number"
                name="mgr"
                value={formData.mgr}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="הכנס מספר מנהל"
              />
            </div>

            {/* משכורת */}
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">משכורת</label>
              <input
                type="number"
                name="sal"
                value={formData.sal}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="הכנס משכורת"
              />
            </div>

            {/* עמלה */}
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">עמלה</label>
              <input
                type="number"
                name="comm"
                value={formData.comm}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="הכנס עמלה"
              />
            </div>

            {/* מספר מחלקה */}
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">מספר מחלקה</label>
              <input
                type="number"
                name="deptno"
                value={formData.deptno}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="הכנס מספר מחלקה"
              />
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
            >
              הוסף עובד
            </button>
          </div>
        </form>
      </div>

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

export default AddEmployeeForm; 