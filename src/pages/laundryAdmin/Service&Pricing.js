import { useState, useEffect } from 'react';
import { Edit, Save, Plus, X, Loader2 } from 'lucide-react';
import { apiClient } from '../../Services/ApiService';
import Loading from '../../components/Loading';

// API Service
const apiService = {
  // Get all available services (from admin configuration)
  async getAvailableServices() {
    try {    
       const response = await apiClient.get(`/services`);
       console.log('Fetched services', response.data);
        return response;
        
    } catch (error) {   
        console.error('Error fetching services:', error);
        throw error;
    }
  },

  // Get all available items (from admin configuration)
  async getAvailableItems() {
try {    
        return   apiClient.get(`/items`);

    } catch (error) {   
        console.error('Error fetching items:', error);
        throw error;
    }
  },

  // Get configured services and pricing
  async getConfiguredPricing() {
    // Simulating API call
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          data: [
            { serviceId: 'wash_fold', serviceName: 'Wash & Fold', itemId: '1', itemName: 'Shirt', price: 5.00 },
            { serviceId: 'wash_fold', serviceName: 'Wash & Fold', itemId: '2', itemName: 'Pants', price: 6.00 },
            { serviceId: 'wash_fold', serviceName: 'Wash & Fold', itemId: '3', itemName: 'Dress', price: 8.00 },
            { serviceId: 'dry_clean', serviceName: 'Dry Cleaning', itemId: '1', itemName: 'Shirt', price: 8.00 },
            { serviceId: 'dry_clean', serviceName: 'Dry Cleaning', itemId: '2', itemName: 'Pants', price: 10.00 },
            { serviceId: 'dry_clean', serviceName: 'Dry Cleaning', itemId: '3', itemName: 'Dress', price: 15.00 },
          ]
        });
      }, 500);
    });
  },

  // Add a service configuration
  async addServiceConfiguration(serviceId) {
    // Simulating API call
    return new Promise(resolve => {
      setTimeout(() => {
        console.log('Adding service configuration:', serviceId);
        resolve({ success: true, serviceId });
      }, 500);
    });
  },

  // Add item to service with price
  async addItemToService(serviceId, itemId, price) {
    // Simulating API call
    return new Promise(resolve => {
      setTimeout(() => {
        console.log('Adding item to service:', { serviceId, itemId, price });
        resolve({ success: true, data: { serviceId, itemId, price } });
      }, 500);
    });
  },

  // Update item price
  async updateItemPrice(serviceId, itemId, price) {
    // Simulating API call
    return new Promise(resolve => {
      setTimeout(() => {
        console.log('Updating item price:', { serviceId, itemId, price });
        resolve({ success: true, data: { serviceId, itemId, price } });
      }, 500);
    });
  },

  // Remove item from service
  async removeItemFromService(serviceId, itemId) {
    // Simulating API call
    return new Promise(resolve => {
      setTimeout(() => {
        console.log('Removing item from service:', { serviceId, itemId });
        resolve({ success: true });
      }, 500);
    });
  },

  // Remove service configuration
  async removeServiceConfiguration(serviceId) {
    // Simulating API call
    return new Promise(resolve => {
      setTimeout(() => {
        console.log('Removing service configuration:', serviceId);
        resolve({ success: true });
      }, 500);
    });
  },
};

const ServicesAndPricing = () => {
  const [pricing, setPricing] = useState([]);
  const [availableServices, setAvailableServices] = useState([]);
  const [availableItems, setAvailableItems] = useState([]);
  const [configuredServices, setConfiguredServices] = useState([]);
  const [showAddServiceModal, setShowAddServiceModal] = useState(false);
  const [showAddItemModal, setShowAddItemModal] = useState(null);
  const [selectedService, setSelectedService] = useState('');
  const [selectedItem, setSelectedItem] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editPrice, setEditPrice] = useState(0);
  const [loading, setLoading] = useState({
    page: true,
    services: false,
    items: false,
    addService: false,
    addItem: false,
    updatePrice: false,
  });

  // Fetch initial data
  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    setLoading(prev => ({ ...prev, page: true }));
    try {
      // Fetch all data in parallel
      const [servicesRes, itemsRes, pricingRes] = await Promise.all([
        apiService.getAvailableServices(),
        apiService.getAvailableItems(),
        apiService.getConfiguredPricing()
      ]);

      setAvailableServices(servicesRes.data);
      setAvailableItems(itemsRes.data);
      setPricing(pricingRes.data);

      // Extract configured services from pricing data
      const configuredServiceIds = [...new Set(pricingRes.data.map(item => item.serviceId))];
      setConfiguredServices(configuredServiceIds);
      console.log('Configured Services:', configuredServiceIds);
    } catch (error) {
      console.error('Error fetching initial data:', error);
      // Show error toast or message here
    } finally {
      setLoading(prev => ({ ...prev, page: false }));
    }
  };

  // Get services that are not yet configured
  const getAvailableServices = () => {
    return availableServices.filter(service => 
      !configuredServices.includes(service.id)
    );
  };

  // Get items that are not yet added to a specific service
  const getAvailableItemsForService = (serviceId) => {
    const currentServiceItems = pricing
      .filter(item => item.serviceId === serviceId)
      .map(item => item.itemId);
    
    return availableItems.filter(item => 
      !currentServiceItems.includes(item.id)
    );
  };

  // Add new service configuration
  const addService = async (service) => {
    if (!service || configuredServices.includes(service.id)) return;
    
    setLoading(prev => ({ ...prev, addService: true }));
    try {
      const response = await apiService.addServiceConfiguration(service.id);
      if (response.success) {
        // Update local state
        setConfiguredServices(prev => [...prev, service.id]);
        setShowAddServiceModal(false);
        setSelectedService('');
      }
    } catch (error) {
      console.error('Error adding service:', error);
      // Show error toast or message here
    } finally {
      setLoading(prev => ({ ...prev, addService: false }));
    }
  };

  // Add new item to a service
  const addItemToService = async () => {
    if (!selectedItem || !itemPrice || !showAddItemModal) return;

    const service = availableServices.find(s => s.id === showAddItemModal);
    const item = availableItems.find(i => i.id === selectedItem);

    if (!service || !item) return;

    setLoading(prev => ({ ...prev, addItem: true }));
    try {
      const response = await apiService.addItemToService(
        service.id,
        item.id,
        parseFloat(itemPrice)
      );

      if (response.success) {
        const newItem = {
          serviceId: service.id,
          serviceName: service.name,
          itemId: item.id,
          itemName: item.name,
          price: parseFloat(itemPrice),
        };

        // Update local state
        setPricing(prev => [...prev, newItem]);
        setShowAddItemModal(null);
        setSelectedItem('');
        setItemPrice('');
      }
    } catch (error) {
      console.error('Error adding item:', error);
      // Show error toast or message here
    } finally {
      setLoading(prev => ({ ...prev, addItem: false }));
    }
  };

  // Start editing an item
  const startEdit = (item) => {
    setEditingId(`${item.serviceId}-${item.itemId}`);
    setEditPrice(item.price);
  };

  // Save the edited item price
  const saveEdit = async (serviceId, itemId) => {
    setLoading(prev => ({ ...prev, updatePrice: true }));
    try {
      const response = await apiService.updateItemPrice(serviceId, itemId, editPrice);
      
      if (response.success) {
        // Update local state
        setPricing(prev => prev.map(item =>
          item.serviceId === serviceId && item.itemId === itemId
            ? { ...item, price: editPrice }
            : item
        ));
        setEditingId(null);
      }
    } catch (error) {
      console.error('Error updating price:', error);
      // Show error toast or message here
    } finally {
      setLoading(prev => ({ ...prev, updatePrice: false }));
    }
  };

  // Remove item from service
  const removeItem = async (serviceId, itemId) => {
    try {
      const response = await apiService.removeItemFromService(serviceId, itemId);
      
      if (response.success) {
        // Update local state
        setPricing(prev => prev.filter(item => 
          !(item.serviceId === serviceId && item.itemId === itemId)
        ));
      }
    } catch (error) {
      console.error('Error removing item:', error);
      // Show error toast or message here
    }
  };

  // Remove service entirely
  const removeService = async (serviceId) => {
    // Check if service has any items
    const hasItems = pricing.some(item => item.serviceId === serviceId);
    
    if (!hasItems) {
      // Remove from configured services
      try {
        const response = await apiService.removeServiceConfiguration(serviceId);
        if (response.success) {
          setConfiguredServices(prev => prev.filter(id => id !== serviceId));
        }
      } catch (error) {
        console.error('Error removing service:', error);
      }
    } else {
      // Optional: Show confirmation or warning
      if (window.confirm('This service has items configured. Remove all items first?')) {
        try {
          // Remove all items for this service
          const itemsToRemove = pricing.filter(item => item.serviceId === serviceId);
          
          // Call API to remove each item
          await Promise.all(
            itemsToRemove.map(item => 
              apiService.removeItemFromService(serviceId, item.itemId)
            )
          );

          // Remove service configuration
          await apiService.removeServiceConfiguration(serviceId);
          
          // Update local state
          const newPricing = pricing.filter(item => item.serviceId !== serviceId);
          setPricing(newPricing);
          setConfiguredServices(prev => prev.filter(id => id !== serviceId));
        } catch (error) {
          console.error('Error removing service and items:', error);
        }
      }
    }
  };

  // Group pricing by service for display
  const groupedPricing = pricing.reduce((acc, item) => {
    if (!acc[item.serviceId]) {
      acc[item.serviceId] = {
        serviceName: item.serviceName,
        items: []
      };
    }
    acc[item.serviceId].items.push(item);
    return acc;
  }, {});

  // Get all configured services (including those with no items yet)
  const allConfiguredServices = configuredServices.map(serviceId => {
    const service = availableServices.find(s => s.id === serviceId);
    return {
      id: serviceId,
      name: service?.name || 'Unknown Service',
      description: service?.description || '',
      items: groupedPricing[serviceId]?.items || []
    };
  });

  if (loading.page) {
    return (
      <Loading />
    );
  }

  return (
    <>
    <div className="space-y-6 p-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Service and Pricing</h1>
          <p className="text-gray-600">Configure services and set prices for items.</p>
        </div>
        <div className="flex space-x-4">
          <button 
            onClick={() => setShowAddServiceModal(true)}
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-lg hover:shadow-md font-medium flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Service</span>
          </button>
        </div>
      </div>

   

      {/* Service List */}
      <div className="space-y-6">
        {allConfiguredServices.map((service) => {
          const availableItemsCount = getAvailableItemsForService(service.id).length;
          const hasItems = service.items.length > 0;
          
          return (
            <div key={service.id} className="border border-gray-200 rounded-lg p-5">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-3">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{service.name}</h3>
                    <p className="text-sm text-gray-600">{service.description}</p>
                  </div>
                  {!hasItems && (
                    <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">
                      No items configured
                    </span>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setShowAddItemModal(service.id)}
                    disabled={availableItemsCount === 0}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Item</span>
                  </button>
                  <button
                    onClick={() => removeService(service.id)}
                    className="px-3 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50"
                  >
                    Remove Service
                  </button>
                </div>
              </div>

              {/* Show message if no items yet */}
              {!hasItems ? (
                <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                  <p className="text-gray-600 mb-4">No items configured for this service</p>
                  <button
                    onClick={() => setShowAddItemModal(service.id)}
                    disabled={availableItemsCount === 0}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Add Your First Item
                  </button>
                </div>
              ) : (
                /* Pricing Table for Each Service */
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200 bg-gray-50">
                        <th className="text-left py-2 px-4 text-sm font-semibold text-gray-700">Item</th>
                        <th className="text-left py-2 px-4 text-sm font-semibold text-gray-700">Price</th>
                        <th className="text-left py-2 px-4 text-sm font-semibold text-gray-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {service.items.map((item) => {
                        const itemKey = `${item.serviceId}-${item.itemId}`;
                        const isEditing = editingId === itemKey;
                        const itemDetails = availableItems.find(i => i.id === item.itemId);

                        return (
                          <tr key={itemKey} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-3 px-4 text-sm text-gray-800">{item.itemName}</td>
                            <td className="py-3 px-4">
                              {isEditing ? (
                                <div className="relative w-32">
                                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                                  <input
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    value={editPrice}
                                    onChange={(e) => setEditPrice(parseFloat(e.target.value) || 0)}
                                    className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    disabled={loading.updatePrice}
                                  />
                                  {loading.updatePrice && editingId === itemKey && (
                                    <div className="absolute right-2 top-1/2 -translate-y-1/2">
                                      <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
                                    </div>
                                  )}
                                </div>
                              ) : (
                                <span className="text-sm font-medium text-gray-900">
                                  ${item.price.toFixed(2)}
                                </span>
                              )}
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex items-center space-x-2">
                                {isEditing ? (
                                  <button
                                    onClick={() => saveEdit(item.serviceId, item.itemId)}
                                    className="text-green-600 hover:text-green-700 flex items-center space-x-1 disabled:opacity-50"
                                    disabled={loading.updatePrice}
                                  >
                                    {loading.updatePrice && editingId === itemKey ? (
                                      <Loader2 className="w-4 h-4 animate-spin" />
                                    ) : (
                                      <Save className="w-4 h-4" />
                                    )}
                                    <span className="text-sm">Save</span>
                                  </button>
                                ) : (
                                  <button
                                    onClick={() => startEdit(item)}
                                    className="text-blue-600 hover:text-blue-700 flex items-center space-x-1"
                                  >
                                    <Edit className="w-4 h-4" />
                                    <span className="text-sm">Edit</span>
                                  </button>
                                )}
                                <button
                                  onClick={() => removeItem(item.serviceId, item.itemId)}
                                  className="text-red-600 hover:text-red-700 text-sm"
                                >
                                  Remove
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Empty State - No services configured yet */}
      {allConfiguredServices.length === 0 && (
        <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
          <div className="mb-4">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 mb-4">
              <Plus className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No services configured</h3>
            <p className="text-gray-600 max-w-md mx-auto">
              Get started by adding your first service. You can then add items and set prices for each service.
            </p>
          </div>
          <button 
            onClick={() => setShowAddServiceModal(true)}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-lg hover:shadow-md font-medium"
          >
            Add Your First Service
          </button>
        </div>
      )}
    </div>


   {/* Add Service Modal */}
      {showAddServiceModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
              <div className="bg-white rounded-lg p-6 w-full max-w-md relative overflow-hidden">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Add New Service</h3>
              <button
                onClick={() => setShowAddServiceModal(false)}
                className="text-gray-400 hover:text-gray-600"
                disabled={loading.addService}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Service
                </label>
                <select
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                 
                  className="p-2 border border-gray-300 rounded-lg w-full"
                  disabled={loading.addService}
                >
                  <option value="">Choose a service...</option>
                  {getAvailableServices().map(service => (
                    <option key={service.id} value={service.id}>
                      {service.name} - {service.description}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  onClick={() => setShowAddServiceModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                  disabled={loading.addService}
                >
                  Cancel
                </button>
                <button
                  onClick={() => addService(availableServices.find(s => s.id === selectedService))}
                  disabled={!selectedService || loading.addService}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  {loading.addService && <Loader2 className="w-4 h-4 animate-spin" />}
                  <span>{loading.addService ? 'Adding...' : 'Add Service'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Item Modal */}
      {showAddItemModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Add Item to Service</h3>
              <button
                onClick={() => {
                  setShowAddItemModal(null);
                  setSelectedItem('');
                  setItemPrice('');
                }}
                className="text-gray-400 hover:text-gray-600"
                disabled={loading.addItem}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Item
                </label>
                <select
                  value={selectedItem}
                  onChange={(e) => setSelectedItem(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg "
                  disabled={loading.addItem}
                >
                  <option value="">Choose an item...</option>
                  {getAvailableItemsForService(showAddItemModal).map(item => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={itemPrice}
                    onChange={(e) => setItemPrice(e.target.value)}
                    className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-lg"
                    placeholder="0.00"
                    disabled={loading.addItem}
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  onClick={() => {
                    setShowAddItemModal(null);
                    setSelectedItem('');
                    setItemPrice('');
                  }}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                  disabled={loading.addItem}
                >
                  Cancel
                </button>
                <button
                  onClick={addItemToService}
                  disabled={!selectedItem || !itemPrice || loading.addItem}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  {loading.addItem && <Loader2 className="w-4 h-4 animate-spin" />}
                  <span>{loading.addItem ? 'Adding...' : 'Add Item'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      </>
  );
};

export default ServicesAndPricing;