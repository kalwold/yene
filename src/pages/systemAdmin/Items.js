import React, { useEffect, useState } from 'react'
import { Trash2, Edit } from 'lucide-react';



function Items() {

    const [showModal, setShowModal] = useState(false); 
    const [editingItem, setEditingItem] = useState(null);
;
  const [items, setItems] = useState([]); 
  const [newItem, setNewItem] = useState({ name: "", description: "" });

    useEffect(() => { 
    const mockItems = [
      { id: 1, name: 'Trouser', description: 'Cloth item worn on the lower body', status: 'Active' },
    { id: 2, name: 'Shirt', description: 'Cloth item worn on the upper body', status: 'Active' },
    { id: 3, name: 'Jacket', description: 'Outerwear garment for warmth', status: 'Active' },
    { id: 4, name: 'Socks', description: 'Cloth item worn on the feet', status: 'Active' },
    { id: 5, name: 'Dress', description: 'One-piece garment for women', status: 'Active' },
    { id: 6, name: 'Skirt', description: 'Cloth item worn on the lower body by women', status: 'Active' }, ];
    setItems(mockItems);
  }, []);

  const resetForm = () => {
    setNewItem({ name: "", description: "" });
    setEditingItem(null);
    setShowModal(false);
  }
  const handleAddItem = () => {

    if (!newItem.name || !newItem.description) return;

    const nextId = items.length + 1;

    const itemToAdd = {
      id: nextId,
      name: newItem.name,
      description: newItem.description,
      status: "Active"
    };

    setItems([...items, itemToAdd]);
    setNewItem({ name: "", description: "" });
    setShowModal(false); 
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