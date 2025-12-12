import { useEffect, useState } from 'react';
import { UserPlus, Search } from 'lucide-react';
import UserForm from './UserForm';
import UserTable from './UserTable';
import { apiClient } from '../../Services/ApiService';
import Loading from '../../components/Loading';

const apiService = {
  async getAllLaundries() {
    try {    
      const response =  await apiClient.get(`/companies`); 
       console.log('Fetched companies', response.data);
        return response.data;
        
    } catch (error) {   
        console.error('Error fetching services:', error);
        throw error;
    }
  },

    async getAllusers() {
    try {    
      const response =  await apiClient.get(`/users/live`); 
       console.log('Fetched users', response.data);
        return response.data;
        
    } catch (error) {   
        console.error('Error fetching services:', error);
        throw error;
    }
  },
  async addUser(userData) {
    try {
      const response = await apiClient.post('/users/new', userData);
      return response.data;
    } catch (error) {
      console.error('Error adding user:', error);
      throw error;
    }
}

}




function UserManagement() {
    const [laundries, setLaundries] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("") ;
    const [users, setUsers] = useState([]);



    const fetchInitialData = async () => {
    setLoading(true);
    try {
      // Fetch all data in parallel
      const [users, laundries] = await Promise.all([
        apiService.getAllusers(),
        apiService.getAllLaundries()
      ]);

      setLaundries(laundries);
      setUsers(users);
  
      console.log('Configured datas:', users, laundries);
    } catch (error) {
      console.error('Error fetching initial data:', error);
    } finally {
      setLoading(false);
    }
  };

       // Fetch initial data
  useEffect(() => {
    fetchInitialData();
  }, []);

 
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleCreateUser = (userData) => {
    const newUser = {
      ...userData,
      id: `u${users.length + 1}`,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setUsers([...users, newUser]);
    setShowForm(false);
  };

  const handleDeleteUser = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  const handleEditUser = (user) => {
    // Implement edit user functionality here
    console.log('Edit user:', user);
  };

  const filteredUsers = users.filter(user =>
    user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.mobile.includes(searchQuery)
  );

 

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-full">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">User Management</h1>
          <p className="text-gray-600">Manage system users, laundry admins, and staff members</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search users by name, email, or phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
              />
            </div>
            <button
              onClick={() => setShowForm(true)}
             className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-lg hover:shadow-md font-medium">
          
              <UserPlus size={20} />
              Add New User
            </button>
          </div>
        </div>

        <UserTable
          users={filteredUsers}
          onDelete={handleDeleteUser}
          onEdit={handleEditUser}
        />

        {showForm && (
          <UserForm
            onClose={() => setShowForm(false)}
            onSubmit={handleCreateUser}
            laundries={laundries}
            roles={['system_admin', 'laundry_admin']}

          />
        )}
         {loading && <Loading />} 
      </div>
    </div>
  )
}

export default UserManagement