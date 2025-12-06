import React, { useState, useEffect } from 'react';
import { Package, Clock, MapPin, AlertTriangle, CheckCircle2, Truck, Timer } from 'lucide-react';
import StatusBadge from '../../components/StatusBadge';
import Loading from '../../components/Loading';

export default function OrderManagement() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    id: '',
    status: '',
    laundry: '',
    dateFrom: '',
    dateTo: '',
  });
 
 useEffect(() => {
    // Fetch orders from API or use mock data
    // For now, we'll use static mock data
    const fetchOrders = async () => {
      // Replace with actual API call
  const mockorders = [
    {
      id: 'ORD-2024-001',
      customer: 'John Doe',
      laundry: 'Clean Pro',
      items: ['3 Shirts', '2 Pants', '1 Jacket'],
      orderDate: '2024-03-12',
      deliveryDate: '2024-03-13',
      status: 'In Progress',
      total: 'Birr .50',
      tracking: 'Washing',
      problems: false,
    },
    {
      id: 'ORD-2024-002',
      customer: 'Sarah Wilson',
      laundry: 'Quick Wash',
      items: ['5 Shirts', '3 Dresses'],
      orderDate: '2024-03-11',
      deliveryDate: '2024-03-12',
      status: 'Ready for Delivery',
      total: 'Birr .80',
      tracking: 'Ready',
      problems: false,
    },
    {
      id: 'ORD-2024-003',
      customer: 'Mike Johnson',
      laundry: 'Elite Laundry',
      items: ['2 Suits', '4 Shirts'],
      orderDate: '2024-03-10',
      deliveryDate: '2024-03-14',
      status: 'Delayed',
      total: 'Birr .00',
      tracking: 'Processing',
      problems: true,
    },
    {
      id: 'ORD-2024-004',
      customer: 'Emily Brown',
      laundry: 'Clean Pro',
      items: ['6 Shirts', '2 Blazers', '3 Pants'],
      orderDate: '2024-03-09',
      deliveryDate: '2024-03-11',
      status: 'Delivered',
      total: 'Birr .25',
      tracking: 'Completed',
      problems: false,
    },
  ];
      setOrders(mockorders);
    };

    fetchOrders();
  }, []);
 const filteredOrders = orders.filter(order => {
     const matchId = order.id.toLowerCase().includes(selectedFilters.id.toLowerCase()) 
      const matchLaundry =
    selectedFilters.laundry  === "" ||
    order.laundry?.toLowerCase().includes(selectedFilters.laundry.toLowerCase())
    
   
  const matchesStatus = selectedFilters.status === "" || 
    order.status?.toLowerCase() === selectedFilters.status.toLowerCase();

    const orderDate = new Date(order.orderDate);
      const matchesDateFrom =
        !selectedFilters.dateFrom || orderDate >= new Date(selectedFilters.dateFrom);
      const matchesDateTo =
        !selectedFilters.dateTo || orderDate <= new Date(selectedFilters.dateTo);
  
  return matchId && matchLaundry && matchesStatus && matchesDateFrom && matchesDateTo; 
});


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
              <p className="text-2xl font-bold text-gray-900">{orders.length}</p>
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
              <p className="text-2xl font-bold text-orange-600">{orders.filter((order)=> order.status === "In Progress").length}</p>
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
              <p className="text-2xl font-bold text-green-600">{orders.filter((order)=> order.status === "Ready for Delivery").length}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Delayed Orders</p>
              <p className="text-2xl font-bold text-red-600">{orders.filter((order)=> order.status === "Delayed").length}</p>
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
          <div className='flex flex-col'>
            <span className="text-gray-600 text-sm font-medium">Status</span>
          <select 
          value={selectedFilters.status}
  onChange={(e) => setSelectedFilters(prev => ({...prev, status: e.target.value}))}
          className="px-3 py-2 border border-gray-300 rounded-lg">
            <option value="">All Status</option>
            <option value="In Progress">In Progress</option>
            <option value="Ready for Delivery">Ready for Delivery</option>
            <option value="Delivered">Delivered</option>
            <option value="Delayed">Delayed</option>
          </select>
          </div>
           <div className='flex flex-col'>
            <span className="text-gray-600 text-sm font-medium">Laundry</span>
          <select
          value={selectedFilters.laundry}
  onChange={(e) => setSelectedFilters(prev => ({...prev, laundry: e.target.value}))}
          className="px-3 py-2 border border-gray-300 rounded-lg">
            <option value="">All Laundries</option>
            <option value="Clean Pro">Clean Pro</option>
            <option value="Quick Wash">Quick Wash</option>
            <option value="Elite Laundry">Elite Laundry</option>
          </select></div>
           <div className='flex flex-col'>
            <span className="text-gray-600 text-sm font-medium">ordered from</span>
           <input
            type="Date"
            placeholder="order Date."
            className="px-3 py-2 border border-gray-300 rounded-lg"
            value={selectedFilters.dateFrom}
            onChange={(e) => setSelectedFilters(prev => ({...prev, dateFrom: e.target.value}))}
          />
          </div>
           <div className='flex flex-col'>
            <span className="text-gray-600 text-sm font-medium">ordered to</span>
          <input
            type="Date"
            placeholder="order Date."
            className="px-3 py-2 border border-gray-300 rounded-lg"
              value={selectedFilters.dateTo}
            onChange={(e) => setSelectedFilters(prev => ({...prev, dateTo: e.target.value}))}
          />
          </div>
           <div className='flex flex-col md:col-span-2'>
            <span className="text-gray-600 text-sm font-medium">Search</span>
          <input
            type="text"
            placeholder="Search orders..."
            className="px-3 py-2 border border-gray-300 rounded-lg"
            value={selectedFilters.id}
            onChange={(e) => setSelectedFilters(prev => ({...prev, id: e.target.value}))}
          />
          </div>
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
                <th className="text-left py-3 px-6 font-medium text-gray-600">Order Date</th>
                <th className="text-left py-3 px-6 font-medium text-gray-600">Tracking</th>
                <th className="text-left py-3 px-6 font-medium text-gray-600">Total</th>
                <th className="text-left py-3 px-6 font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
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
                        <Timer className="w-3 h-3 text-gray-400" />
                        <span className="text-sm text-gray-600">{order.orderDate}</span>
                      </div>
                      {/* <div className="flex items-center space-x-2">
                        <Truck className="w-3 h-3 text-gray-400" />
                        <span className="text-sm text-gray-600">{order.deliveryDate}</span>
                      </div> */}
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
                    <div className="">
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                        View
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
               {loading && <Loading />} 
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}