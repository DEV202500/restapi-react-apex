import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL || 'https://gad3915eeba9ec9-adapex.adb.il-jerusalem-1.oraclecloudapps.com/ords/my_cust/hr';

export const api = {
  getEmployees: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/empinfo/`);
      return response.data.items;
    } catch (error) {
      throw new Error('שגיאה בטעינת נתוני העובדים');
    }
  },

  addEmployee: async (employeeData) => {
    try {
      const response = await axios.post(`${BASE_URL}/emp_post_example/`, employeeData, {
        headers: { 'Content-Type': 'application/json' },
      });
      return response.data;
    } catch (error) {
      throw new Error('שגיאה בהוספת עובד חדש');
    }
  },

  updateEmployee: async (id, employeeData) => {
    try {
      const response = await axios.put(`${BASE_URL}/employees/${id}`, employeeData, {
        headers: { 'Content-Type': 'application/json' },
      });
      return response.data;
    } catch (error) {
      throw new Error('שגיאה בעדכון פרטי העובד');
    }
  },

  deleteEmployee: async (id) => {
    try {
      const response = await axios.delete(`${BASE_URL}/emp_del_example/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'שגיאה במחיקת העובד');
    }
  }
}; 