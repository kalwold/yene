import React, { useState } from 'react';
import { Plus, Edit, Trash2, Tag, Package, Percent } from 'lucide-react';
import StatusBadge from '../components/StatusBadge';

export default function ServicesAndPricing() {
  const [activeTab, setActiveTab] = useState('categories');

  const categories = [
    {
      id: 1,
      name: 'Wash & Fold',
      description: 'Standard washing and folding service',
      subcategories: ['Casual Wear', 'Formal Wear', 'Bedding'],
      basePrice: 'Birr .00',
      status: 'Active',
      orders: 245,
    },
    {
      id: 2,
      name: 'Dry Cleaning',
      description: 'Professional dry cleaning for delicate items',
      subcategories: ['Suits', 'Dresses', 'Coats', 'Curtains'],
      basePrice: 'Birr .00',
      status: 'Active',
      orders: 189,
    },
    {
      id: 3,
      name: 'Ironing',
      description: 'Professional pressing and ironing',
      subcategories: ['Shirts', 'Pants', 'Formal Wear'],
      basePrice: 'Birr .00',
      status: 'Active',
      orders: 156,
    },
    {
      id: 4,
      name: 'Premium Care',
      description: 'Specialized care for luxury items',
      subcategories: ['Designer Wear', 'Leather', 'Fur'],
      basePrice: 'Birr .00',
      status: 'Active',
      orders: 78,
    },
  ];

  const discounts = [
    {
      id: 1,
      name: 'New Customer',
      type: 'Percentage',
      value: '20%',
      description: 'First-time customer discount',
      validUntil: '2024-12-31',
      usage: 45,
      status: 'Active',
    },
    {
      id: 2,
      name: 'Bulk Order',
      type: 'Fixed Amount',
      value: 'Birr .00',
      description: 'Orders over Birr ',
      validUntil: '2024-06-30',
      usage: 123,
      status: 'Active',
    },
    {
      id: 3,
      name: 'Loyalty Program',
      type: 'Percentage',
      value: '15%',
      description: 'VIP customer discount',
      validUntil: 'Ongoing',
      usage: 267,
      status: 'Active',
    },
  ];

  const pricingTiers = [
    { name: 'Basic Wash', items: 'Up to 5kg', price: 'Birr .00' },
    { name: 'Standard Wash', items: 'Up to 10kg', price: 'Birr .00' },
    { name: 'Large Wash', items: 'Up to 15kg', price: 'Birr .00' },
    { name: 'XL Wash', items: 'Over 15kg', price: 'Birr .00' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Services & Pricing</h1>
          <p className="text-gray-600">Manage service categories, pricing tiers, and promotional offers.</p>
        </div>
        <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-lg hover:shadow-md font-medium flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Add Service</span>
        </button>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('categories')}
              className={`py-4 font-medium text-sm border-b-2 ${
                activeTab === 'categories'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Service Categories
            </button>
            <button
              onClick={() => setActiveTab('pricing')}
              className={`py-4 font-medium text-sm border-b-2 ${
                activeTab === 'pricing'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Pricing Tiers
            </button>
            <button
              onClick={() => setActiveTab('discounts')}
              className={`py-4 font-medium text-sm border-b-2 ${
                activeTab === 'discounts'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Discounts & Bundles
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'categories' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map((category) => (
                  <div key={category.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-green-400 rounded-xl flex items-center justify-center">
                        <Package className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex space-x-1">
                        <button className="text-blue-600 hover:text-blue-800 p-1">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-800 p-1">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{category.name}</h3>
                    <p className="text-gray-600 text-sm mb-4">{category.description}</p>
                    
                    <div className="mb-4">
                      <p className="text-sm text-gray-600 mb-2">Subcategories:</p>
                      <div className="flex flex-wrap gap-1">
                        {category.subcategories.map((sub, index) => (
                          <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                            {sub}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-lg font-bold text-green-600">{category.basePrice}</p>
                        <p className="text-xs text-gray-500">{category.orders} orders</p>
                      </div>
                      <StatusBadge status={category.status} variant="small" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'pricing' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {pricingTiers.map((tier, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">{tier.name}</h3>
                      <div className="flex space-x-1">
                        <button className="text-blue-600 hover:text-blue-800 p-1">
                          <Edit className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4">{tier.items}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-green-600">{tier.price}</span>
                      <Tag className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'discounts' && (
            <div className="space-y-6">
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Discount Name</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Type</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Value</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Description</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Valid Until</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Usage</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {discounts.map((discount) => (
                      <tr key={discount.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                              <Percent className="w-4 h-4 text-orange-600" />
                            </div>
                            <span className="font-medium text-gray-900">{discount.name}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-gray-600">{discount.type}</td>
                        <td className="py-3 px-4 font-semibold text-green-600">{discount.value}</td>
                        <td className="py-3 px-4 text-gray-600">{discount.description}</td>
                        <td className="py-3 px-4 text-gray-600">{discount.validUntil}</td>
                        <td className="py-3 px-4 text-gray-600">{discount.usage} times</td>
                        <td className="py-3 px-4">
                          <StatusBadge status={discount.status} variant="small" />
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex space-x-2">
                            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                              Edit
                            </button>
                            <button className="text-red-600 hover:text-red-800 text-sm font-medium">
                              Deactivate
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}