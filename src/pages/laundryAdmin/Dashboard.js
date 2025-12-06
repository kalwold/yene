import React from "react";
import {
  Package,
  DollarSign,
  Building,
  Star,
  AlertCircle,
  TrendingUp,
} from "lucide-react";
import KPICard from "../../components/KPICard";
import StatusBadge from "../../components/StatusBadge";

export default function LaundryAdminDashboard() {
  const kpiData = [

     {
      title: "Total Orders",
      value: "127",
      change: "+12.5%",
      icon: Package,
      trend: "up",
      color: "blue",
    },
     {
      title: "Pending Orders",
      value: "20",
      change: "+12.5%",
      icon: Package,
      trend: "up",
      color: "blue",
    },
    {
      title: "Orders Today",
      value: "15",
      change: "+12.5%",
      icon: Package,
      trend: "up",
      color: "blue",
    },
    {
      title: "Revenue (MTD)",
      value: "Birr 890",
      change: "+8.2%",
      icon: DollarSign,
      trend: "up",
      color: "green",
    },

  ];

  const topServices = [
    { name: "Wash & Fold", orders: 45, revenue: "Birr 890" },
    { name: "Dry Cleaning", orders: 32, revenue: "Birr 120" },
    { name: "Express Service", orders: 28, revenue: "Birr 680" },
    { name: "Premium Care", orders: 22, revenue: "Birr 300" },
  ];

  const delayedOrders = [
    {
      id: "ORD-2024-001",
      customer: "John Doe",
      laundry: "Clean Pro",
      delay: "2 hours",
    },
    {
      id: "ORD-2024-023",
      customer: "Sarah Wilson",
      laundry: "Quick Wash",
      delay: "4 hours",
    },
    {
      id: "ORD-2024-045",
      customer: "Mike Johnson",
      laundry: "Elite Laundry",
      delay: "1 hour",
    },
  ];
  return (
    <div className="space-y-6 p-5">
      <div className="justify-between flex items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Dashboard</h1>
          <p className="text-gray-600">
            Welcome to your dashboard! Here you can find an overview of your
            laundry services, key performance indicators, and recent activities.
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Last updated</p>
          <p className="text-sm font-medium text-gray-900">2 minutes ago</p>
        </div>
      </div>

      <div className="grid grid-col-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => (
          <KPICard
            key={index}
            title={kpi.title}
            value={kpi.value}
            change={kpi.change}
            icon={kpi.icon}
            trend={kpi.trend}
            color={kpi.color}
          />
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Order Trends</h2>
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-green-600" />
            <span className="text-sm text-green-600 font-medium">+15.3%</span>
          </div>
        </div>
        <div className="h-64 bg-gradient-to-br from-blue-50 to-green-50 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-green-400 rounded-full flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <p className="text-gray-600">
              
            </p>
          </div>

          
        </div>
      </div>

      {/* Service Distribution */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Top Services</h2>
          <div className="space-y-4">
            {topServices.map((service, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{service.name}</p>
                  <p className="text-sm text-gray-600">{service.orders} orders</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-green-600">{service.revenue}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>


      {/* Alerts Section */}
      {/* <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <AlertCircle className="w-6 h-6 text-red-500" />
          <h2 className="text-xl font-semibold text-gray-900">Delayed Orders Alert</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-600">Order ID</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Customer</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Laundry</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Delay</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Action</th>
              </tr>
            </thead>
            <tbody>
              {delayedOrders.map((order) => (
                <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-blue-600">{order.id}</td>
                  <td className="py-3 px-4 text-gray-900">{order.customer}</td>
                  <td className="py-3 px-4 text-gray-900">{order.laundry}</td>
                  <td className="py-3 px-4">
                    <StatusBadge status={`Delayed ${order.delay}`} variant="small" />
                  </td>
                  <td className="py-3 px-4">
                    <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                      Contact
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div> */}

    </div>
  );
} 
