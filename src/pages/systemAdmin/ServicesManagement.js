import React, { useEffect, useState } from "react";
import { Plus, Edit, Trash2, Tag, Package, Percent } from "lucide-react";
import StatusBadge from "../../components/StatusBadge";
import Loading from "../../components/Loading";
import { apiClient } from "../../Services/ApiService";

export default function ServicesAndPricing() {
  const [showModal, setShowModal] = useState(false);
  const [newServices, setNewServices] = useState({ name: "", description: "" });
  const [services, setServices] = useState([]);
  const [editingService, setEditingService] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("") ;

  useEffect(() => { 
const fetchServices = async () => {
    try{
        setLoading(true);
    const response =  await apiClient.get(`/services`); 
    setServices(response.data);
    console.log("Fetched services:", response.data);
    
          }
          catch(err){
            console.error("Error fetching services:", err);
            setError("Failed to load services. Please try again later.");
          }finally{
            setLoading(false);
              }}
      fetchServices();
  }, []);

  const handleAddService = () => {
    if (!newServices.name || !newServices.description) return;

    const nextId = services.length + 1;

    const itemToAdd = {
      id: nextId,
      name: newServices.name,
      description: newServices.description,
    };

    services.push(itemToAdd);
    setNewServices({ name: "", description: "" });
    setShowModal(false);
  };

  const handleEditService = (service) => {
    setEditingService(service);
    setNewServices({ name: service.name, description: service.description });
    setShowModal(true);

    
  };

  const handleCancel = () => {
    setNewServices({ name: "", description: "" });
    setEditingService(null);
    setShowModal(false);
  }

    const handleDelete = (serviceId) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      setServices(services.filter(service => service.id !== serviceId));
    }
  };
  return (
    <>

    <div className="space-y-6 p-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Services</h1>
          <p className="text-gray-600">Manage services.</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-lg hover:shadow-md font-medium flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Service</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">All Services</h2>
        </div>
        <div className="p-6">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((category) => (
                <div
                  key={category.id}
                  className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-green-400 rounded-xl flex items-center justify-center">
                      <Package className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex space-x-1">
                      <button 
                      onClick={()=>{handleEditService(category)}}
                      className="text-blue-600 hover:text-blue-800 p-1">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                      onClick={() => handleDelete(category.id)}
                      className="text-red-600 hover:text-red-800 p-1">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {category.description}
                  </p>
                </div>
              ))}
               {loading && <Loading />} 
            </div>
          </div>
        </div>
      </div>

    </div>

    
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-full max-w-md p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-4">
              {editingService ? "Edit Service" : "Add New Service"}
            </h2>

            {/* FORM */}
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Service Name
                </label>
                <input
                  type="text"
                  className="mt-1 w-full border rounded-lg px-3 py-2"
                  value={newServices.name}
                  onChange={(e) =>
                    setNewServices({ ...newServices, name: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  className="mt-1 w-full border rounded-lg px-3 py-2"
                  value={newServices.description}
                  onChange={(e) =>
                    setNewServices({ ...newServices, description: e.target.value })
                  }
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
                onClick={handleAddService}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
              >
                { editingService ? "Update Service" : "Add Service"}
              </button>
            </div>
          </div>
        </div>
      )}
      </>
  );
}
