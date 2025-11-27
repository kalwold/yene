import React from 'react';
import { Package, Clock, MapPin, AlertTriangle, CheckCircle2, Truck } from 'lucide-react';
import StatusBadge from '../../components/StatusBadge';

export default function OrderManagement() {
  const orders = [
    {
      id: 'ORD-2024-001',
      customer: 'John Doe',
      laundry: 'Clean Pro',
      items: ['3 Shirts', '2 Pants', '1 Jacket'],
      pickupDate: '2024-03-12',
      deliveryDate: '2024-03-13',
      status: 'In Progress',
      total: '$45.50',
      tracking: 'Washing',
      problems: false,
    },
    {
      id: 'ORD-2024-002',
      customer: 'Sarah Wilson',
      laundry: 'Quick Wash',
      items: ['5 Shirts', '3 Dresses'],
      pickupDate: '2024-03-11',
      deliveryDate: '2024-03-12',
      status: 'Ready for Delivery',
      total: '$67.80',
      tracking: 'Ready',
      problems: false,
    },
    {
      id: 'ORD-2024-003',
      customer: 'Mike Johnson',
      laundry: 'Elite Laundry',
      items: ['2 Suits', '4 Shirts'],
      pickupDate: '2024-03-10',
      deliveryDate: '2024-03-14',
      status: 'Delayed',
      total: '$125.00',
      tracking: 'Processing',
      problems: true,
    },
    {
      id: 'ORD-2024-004',
      customer: 'Emily Brown',
      laundry: 'Clean Pro',
      items: ['6 Shirts', '2 Blazers', '3 Pants'],
      pickupDate: '2024-03-09',
      deliveryDate: '2024-03-11',
      status: 'Delivered',
      total: '$89.25',
      tracking: 'Completed',
      problems: false,
    },
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Urgent': return 'bg-red-100 text-red-700 border-red-200';
      case 'High': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'Normal': return 'bg-blue-100 text-blue-700 border-blue-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="space-y-6 p-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Order Management</h1>
          <p className="text-gray-600">Track and manage all customer orders in real-time.</p>
        </div>
      
      </div>

      {/* Order Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Orders</p>
              <p className="text-2xl font-bold text-gray-900">342</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">In Progress</p>
              <p className="text-2xl font-bold text-orange-600">127</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Ready for Delivery</p>
              <p className="text-2xl font-bold text-green-600">89</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Problem Orders</p>
              <p className="text-2xl font-bold text-red-600">12</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <select className="px-3 py-2 border border-gray-300 rounded-lg">
            <option>All Status</option>
            <option>In Progress</option>
            <option>Ready</option>
            <option>Delivered</option>
            <option>Delayed</option>
          </select>
          <select className="px-3 py-2 border border-gray-300 rounded-lg">
            <option>All Laundries</option>
            <option>Clean Pro</option>
            <option>Quick Wash</option>
            <option>Elite Laundry</option>
          </select>
           <input
            type="Date"
            placeholder="order Date."
            className="px-3 py-2 border border-gray-300 rounded-lg"
          />
          <input
            type="text"
            placeholder="Search orders..."
            className="px-3 py-2 border border-gray-300 rounded-lg"
          />
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-6 font-medium text-gray-600">Order Details</th>
                <th className="text-left py-3 px-6 font-medium text-gray-600">Customer</th>
                <th className="text-left py-3 px-6 font-medium text-gray-600">Items</th>
                <th className="text-left py-3 px-6 font-medium text-gray-600">Schedule</th>
                <th className="text-left py-3 px-6 font-medium text-gray-600">Tracking</th>
                <th className="text-left py-3 px-6 font-medium text-gray-600">Total</th>
                <th className="text-left py-3 px-6 font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <div>
                      <p className="font-semibold text-blue-600">{order.id}</p>
                      <p className="text-sm text-gray-600">{order.laundry}</p>
                      {order.problems && (
                        <div className="flex items-center space-x-1 mt-1">
                          <AlertTriangle className="w-3 h-3 text-red-500" />
                          <span className="text-xs text-red-600">Issue reported</span>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <p className="font-medium text-gray-900">{order.customer}</p>
                  </td>
                  <td className="py-4 px-6">
                    <div>
                      {order.items.slice(0, 2).map((item, index) => (
                        <p key={index} className="text-sm text-gray-600">{item}</p>
                      ))}
                      {order.items.length > 2 && (
                        <p className="text-xs text-gray-500">+{order.items.length - 2} more</p>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-3 h-3 text-gray-400" />
                        <span className="text-sm text-gray-600">{order.pickupDate}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Truck className="w-3 h-3 text-gray-400" />
                        <span className="text-sm text-gray-600">{order.deliveryDate}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div>
                      <StatusBadge status={order.status} variant="small" />
                      <p className="text-xs text-gray-500 mt-1">{order.tracking}</p>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <p className="font-semibold text-gray-900">{order.total}</p>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                        View
                      </button>
                      <button className="text-green-600 hover:text-green-800 text-sm font-medium">
                        Update
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