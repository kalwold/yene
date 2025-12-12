import { useState } from 'react';
import { X } from 'lucide-react';
export default function UserForm({ onClose, onSubmit, laundries , roles}) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: '' ,
    laundryId: '',
    status: '',
  });
 
  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      ...formData,
      laundryName: formData.role === 'laundry_admin' && formData.laundryId
        ? laundries.find(l => l.id === formData.laundryId)?.name
        : undefined,
    };

    if (formData.role === 'system_admin') {
      const { laundryId, ...rest } = userData;
      onSubmit(rest);
    } else {
      onSubmit(userData);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">Create New User</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                First Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                placeholder="John Doe"
              />
            </div>
               <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                Last Name 
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                placeholder="+1 (555) 000-0000"
              />
            </div>

            <div>
              <label htmlFor="role" className="block text-sm font-semibold text-gray-700 mb-2">
                User Role *
              </label>
              {/* <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none bg-white"
              >
                <option value="staff">Staff</option>
                <option value="laundry_admin">Laundry Admin</option>
                <option value="system_admin">System Admin</option>
              </select> */}
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none bg-white"
              >
                <option value="">Select a role</option>
                {roles.map(role => (
                  <option key={role} value={role}>
                    {role.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </option>
                ))}
              </select> 
            </div>

            {formData.role !== 'system_admin' && (
              <div className="md:col-span-2">
                <label htmlFor="laundryId" className="block text-sm font-semibold text-gray-700 mb-2">
                  Assign to Laundry 
                </label>
                <select
                  id="laundryId"
                  name="laundryId"
                  value={formData.laundryId}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none bg-white"
                >
                  <option value="">Select a laundry</option>
                  {laundries.map(laundry => (
                    <option key={laundry.id} value={laundry.id}>
                      {laundry.name} - {laundry.location}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* <div>
              <label htmlFor="status" className="block text-sm font-semibold text-gray-700 mb-2">
                Status
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none bg-white"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div> */}
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm"
            >
              Create User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
