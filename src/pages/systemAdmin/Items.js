import React, { useEffect, useState } from 'react'
import { Trash2, Edit } from 'lucide-react';
import { apiClient } from '../../Services/ApiService';
import Loading from '../../components/Loading';



function Items() {

    const [showModal, setShowModal] = useState(false); 
    const [editingItem, setEditingItem] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("") ;
;
  const [items, setItems] = useState([]); 
  const [newItem, setNewItem] = useState({ name: "", description: "" });

    useEffect(() => { 
      const fetchItems = async () => {
      try{
    setLoading(true);
const response =  await apiClient.get(`/items`); 
setItems(response.data);
console.log("Fetched items:", response.data);

      }
      catch(err){
        console.error("Error fetching items:", err);
        setError("Failed to load items. Please try again later.");
      }finally{
        setLoading(false);
          }}
      fetchItems();
  }, []);

  const resetForm = () => {
    setNewItem({ name: "", description: "" });
    setEditingItem(null);
    setShowModal(false);
  }
  const handleAddItem = async () => {

    if (!newItem.name || !newItem.description) return;
    try {
      const response = await apiClient.post('/items', newItem);
const itemToAdd = response.data;

   
    setNewItem({ name: "", description: "" });
    setShowModal(false); 
    } catch (error) {
      
      if (
        error.response &&
        error.response.status !== 500 &&
        error.response.data?.message
      ) {
        setError(error.response.data.message);
      } else if (error.request && !error.response) {
        setError("Network error. Please check your internet connection.");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }

  };
   const handleEdit = (item) => {
    setEditingItem(item);
    setNewItem({ name: item.name, description: item.description });
    setShowModal(true);
  };
  const handleCancel = () => {
    resetForm();
  };
    const handleDelete = (itemId) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      setItems(items.filter(item => item.id !== itemId));
    }
  };

  return (
    <>
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Item Management</h1>
          <p className="text-gray-600">Manage and monitor all registered laundry items.</p>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium">
            Export Data
          </button>
          <button onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-lg hover:shadow-md font-medium">
            Add Item
          </button>
        </div>
      </div>

   

      {/* Laundry Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">All items</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-6 font-medium text-gray-600">Item ID</th>
                <th className="text-left py-3 px-6 font-medium text-gray-600">name</th>
                <th className="text-left py-3 px-6 font-medium text-gray-600">Description</th>
                <th className="text-left py-3 px-6 font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>

              {items.map((item) => (
                <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <div>
                      <p className="font-semibold text-gray-900">{item.id}</p>
                      
                    </div>
                  </td>
                   <td className="py-4 px-6">
                    <div>
                      <p className="font-semibold text-gray-900">{item.name}</p>
                      
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex flex-wrap gap-1">
                        <p className="font-semibold text-gray-900">{item.description}</p>
                    </div>
                  </td>
                
              
                 
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <button 
                      onClick={() => handleEdit(item)}
                      className="text-blue-600 hover:text-blue-800 p-1">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                      onClick={() => handleDelete(item.id)}
                      className="text-red-600 hover:text-red-800 p-1">
                        <Trash2 className="w-4 h-4" />
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

       {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-full max-w-md p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-4">
            {editingItem ? 'Edit Item' : 'Add New Item'}
            </h2>

            {/* FORM */}
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Item Name</label>
                <input
                  type="text"
                  className="mt-1 w-full border rounded-lg px-3 py-2"
                  value={newItem.name}
                  onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Description</label>
                <textarea
                  className="mt-1 w-full border rounded-lg px-3 py-2"
                  value={newItem.description}
                  onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                />
              </div>
            </div>

            {/* BUTTONS */}
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={handleCancel}
                className="px-4 py-2 border rounded-lg text-gray-700"
              >
                Cancel
              </button>

              <button
                onClick={handleAddItem}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
              >
                 {editingItem ? 'Update Item' : 'Add Item'}
              </button>
            </div>
          </div>
        </div>
      )}

    </>
  );
}

export default Items