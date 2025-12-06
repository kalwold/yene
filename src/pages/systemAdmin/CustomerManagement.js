import React from 'react';
import { Users, Award, MessageCircle, Star, Mail, Phone } from 'lucide-react';
import StatusBadge from '../../components/StatusBadge';

export default function CustomerManagement() {
  const customers = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@email.com',
      phone: '+1 (555) 123-4567',
      totalOrders: 23,
      status: 'Active',
      joinDate: '2024-01-15',
      complaints: 1,
      rating: 4.8,
      totalSpent: 'Birr 234',
      lastOrder: '2024-03-10',
    },
    {
      id: 2,
      name: 'Sarah Wilson',
      email: 'sarah.w@email.com',
      phone: '+1 (555) 987-6543',
      totalOrders: 45,
      status: 'Premium',
      joinDate: '2023-11-22',
      complaints: 0,
      rating: 5.0,
      totalSpent: 'Birr 890',
      lastOrder: '2024-03-12',
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike.j@email.com',
      phone: '+1 (555) 456-7890',
      totalOrders: 12,
      status: 'Active',
      joinDate: '2024-02-08',
      complaints: 2,
      rating: 4.2,
      totalSpent: 'Birr ',
      lastOrder: '2024-03-05',
    },
    {
      id: 4,
      name: 'Emily Brown',
      email: 'emily.b@email.com',
      phone: '+1 (555) 321-0987',
      totalOrders: 67,
      status: 'VIP',
      joinDate: '2023-08-12',
      complaints: 0,
      rating: 4.9,
      totalSpent: 'Birr 230',
      lastOrder: '2024-03-11',
    },
  ];

  return (
    <div className="space-y-6 p-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Customer Management</h1>
          <p className="text-gray-600">Monitor customer activity, loyalty points, and support history.</p>
        </div>
        {/* <div className="flex space-x-3">
          <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium">
            Export Data
          </button>
          <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-lg hover:shadow-md font-medium">
            Send Campaign
          </button>
        </div> */}
      </div>

      {/* Customer Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Customers</p>
              <p className="text-2xl font-bold text-gray-900">1,247</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">VIP Customers</p>
              <p className="text-2xl font-bold text-purple-600">89</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <Award className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Active Support</p>
              <p className="text-2xl font-bold text-orange-600">15</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Avg Satisfaction</p>
              <p className="text-2xl font-bold text-green-600">4.7</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <Star className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Customer Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Customer List</h2>
          <div className="flex space-x-3">
            <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
              <option>All Customers</option>
              <option>VIP</option>
              <option>Premium</option>
              <option>Active</option>
            </select>
            <input
              type="text"
              placeholder="Search customers..."
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm w-64"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-6 font-medium text-gray-600">Customer</th>
                <th className="text-left py-3 px-6 font-medium text-gray-600">Contact</th>
                <th className="text-left py-3 px-6 font-medium text-gray-600">Orders</th>
                <th className="text-left py-3 px-6 font-medium text-gray-600">Total Spent</th>
                <th className="text-left py-3 px-6 font-medium text-gray-600">Rating</th>
                <th className="text-left py-3 px-6 font-medium text-gray-600">Status</th>
                <th className="text-left py-3 px-6 font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <div>
                      <p className="font-semibold text-gray-900">{customer.name}</p>
                      <p className="text-sm text-gray-500">Since {customer.joinDate}</p>
                      {customer.complaints > 0 && (
                        <div className="flex items-center space-x-1 mt-1">
                          <MessageCircle className="w-3 h-3 text-red-400" />
                          <span className="text-xs text-red-600">{customer.complaints} complaints</span>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-900">{customer.email}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-900">{customer.phone}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div>
                      <p className="font-medium text-gray-900">{customer.totalOrders}</p>
                      <p className="text-sm text-gray-500">Last: {customer.lastOrder}</p>
                    </div>
                  </td>
                 
                  <td className="py-4 px-6">
                    <p className="font-medium text-green-600">{customer.totalSpent}</p>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="font-medium text-gray-900">{customer.rating}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <StatusBadge status={customer.status} variant="small" />
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                        View
                      </button>
                      <button className="text-green-600 hover:text-green-800 text-sm font-medium">
                        Message
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}