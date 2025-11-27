import React, { useEffect, useState } from "react";
import {
  MapPin,
  Star,
  Clock,
  MoreHorizontal,
  CheckCircle,
  XCircle,
  Edit,
  Trash2,
} from "lucide-react";
import StatusBadge from "../../components/StatusBadge";

export default function LaundryManagement() {
  const [laundries, setLaundries] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingLaundry, setEditingLaundry] = useState(null);
    const [newLaundry, setNewLaundry] = useState({ name: "", location: "" , phone: "", email: ""});
    const [searchTerm, setSearchTerm] = useState('');
      const [selectedFilters, setSelectedFilters] = useState({
    service: '',
    status: '',
  });

   

  useEffect(() => {
    const laundries = [
      {
        id: 1,
        name: "Clean Pro Laundry",
        // services: ['Wash & Fold', 'Dry Cleaning', 'Ironing'],
        location: "Downtown",
        coordinates: "40.7128, -74.0060",
        // rating: 4.8,
        // reviews: 142,
        status: "Pending",
        // revenue: "$12,450",
        // orders: 89,
      },
      {
        id: 2,
        name: "Quick Wash Center",
        services: ["Express Wash", "Dry Cleaning"],
        location: "Uptown",
        coordinates: "40.7589, -73.9851",
        rating: 4.6,
        reviews: 87,
        status: "Active",
        revenue: "$8,920",
        orders: 65,
      },
      {
        id: 3,
        name: "Elite Laundry Services",
        services: ["Premium Care", "Dry Cleaning", "Alterations"],
        location: "Midtown",
        coordinates: "40.7505, -73.9934",
        rating: 4.9,
        reviews: 203,
        status: "Active",
        revenue: "$15,780",
        orders: 112,
      },
      {
        id: 4,
        name: "Budget Wash",
        services: ["Wash & Fold"],
        location: "Suburbs",
        coordinates: "40.6892, -74.0445",
        turnaroundTime: "24 hours",
        rating: 4.2,
        reviews: 56,
        status: "Suspended",
        revenue: "$3,200",
        orders: 23,
      },
    ];
    setLaundries(laundries);
  }, [laundries]);
 const handleAddLaundry = () => { 
       
    if (!newLaundry.name || !newLaundry.location) return;
    const nextId = laundries.length + 1;
    const laundryToAdd = {
      id: nextId,
      name: newLaundry.name,
      location: newLaundry.location,
      status: "Active"  ,
    };
    setLaundries([...laundries, laundryToAdd]);
    setNewLaundry({ name: "", location: "" });
    setShowModal(false); 
  };
   const handleCancel = () => {
    setNewLaundry({ name: "", location: "" });
    setEditingLaundry(null);
    setShowModal(false);
  };

const handleEditLaundry = (laundry) => {
    setEditingLaundry(laundry);
    setNewLaundry({ name: laundry.name, location: laundry.location });
    setShowModal(true);
  };

 const filteredLaundries = laundries.filter(laundry => {
     const matchesName = laundry.name.toLowerCase().includes(searchTerm.toLowerCase()) 
      const matchesService =
    selectedFilters.service  === "" ||
    (laundry.services && laundry.services.some(s =>
      s.toLowerCase().includes(selectedFilters.service.toLowerCase())
    ));
   
  const matchesStatus = selectedFilters.status === "" || 
    laundry.status?.toLowerCase() === selectedFilters.status.toLowerCase();
  
  return matchesName && matchesService && matchesStatus; 
});

  return (
    <>
    <div className="space-y-6 p-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Laundry Management
          </h1>
          <p className="text-gray-600">
            Manage and monitor all registered laundry services.
          </p>
        </div>
        <div className="flex space-x-3">
          {/* <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium">
            Export Data
          </button> */}
          <button onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-lg hover:shadow-md font-medium">
            Add Laundry
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">
                Total Laundries
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {laundries.length}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <MapPin className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Active</p>
              <p className="text-2xl font-bold text-green-600">
                {
                  laundries.filter((laundry) => laundry.status === "Active")
                    .length
                }
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Pending</p>
              <p className="text-2xl font-bold text-orange-600">
                {
                  laundries.filter((laundry) => laundry.status === "Pending")
                    .length
                }
              </p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Suspended</p>
              <p className="text-2xl font-bold text-red-600">
                {
                  laundries.filter((laundry) => laundry.status === "Suspended")
                    .length
                }
              </p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
              <XCircle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>


          {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
           <input
            type="text"
            placeholder="Search Laundries..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg"
          />
          <select 
          value={selectedFilters.status}
  onChange={(e) => setSelectedFilters(prev => ({...prev, status: e.target.value}))}
          className="px-3 py-2 border border-gray-300 rounded-lg">
            <option value="">All Status</option>
            <option value="Active">Active</option>
            <option value="Pending">Pending</option>
            <option value="Suspended">Suspended</option>
          </select>

          <select value={selectedFilters.service}
  onChange={(e) => setSelectedFilters(prev => ({...prev, service: e.target.value}))}
          className="px-3 py-2 border border-gray-300 rounded-lg">
              <option value="">All Services</option>
              <option value="Wash & Fold">Wash & Fold</option>
              <option value="Dry Cleaning">Dry Cleaning</option>
              <option value="ironing">Ironing</option>
              <option value="express">Express</option>
          </select>
         
        </div>
      </div>

      {/* Laundry Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">All Laundries</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-6 font-medium text-gray-600">
                  Laundry
                </th>
                <th className="text-left py-3 px-6 font-medium text-gray-600">
                  Services
                </th>
                <th className="text-left py-3 px-6 font-medium text-gray-600">
                  Location
                </th>
                <th className="text-left py-3 px-6 font-medium text-gray-600">
                  Rating
                </th>
                <th className="text-left py-3 px-6 font-medium text-gray-600">
                  Performance
                </th>
                <th className="text-left py-3 px-6 font-medium text-gray-600">
                  Status
                </th>
                <th className="text-left py-3 px-6 font-medium text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredLaundries.map((laundry) => (
                <tr
                  key={laundry.id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="py-4 px-6">
                    <div>
                      <p className="font-semibold text-gray-900">
                        {laundry.name}
                      </p>
                      {laundry.orders && <p className="text-sm text-gray-500">
                        {laundry.orders} orders
                      </p>}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex flex-wrap gap-1">
                      {laundry && laundry.services ? (
                        laundry.services.length === 0 ? (
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                            {"Service not specified"}
                          </span>
                        ) : (
                          <>
                            {laundry.services
                              .slice(0, 2)
                              .map((service, index) => (
                                <span
                                  key={index}
                                  className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
                                >
                                  {service}
                                </span>
                              ))}
                            {laundry.services.length > 2 && (
                              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                                +{laundry.services.length - 2}
                              </span>
                            )}
                          </>
                        )
                      ) : (
                        <span className="px-2 py-1 bg-red-100 text-red-600 text-xs rounded-full">
                          {"Laundry services not defined"}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-900">{laundry.location}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {laundry.coordinates}
                    </p>
                  </td>
                  <td className="py-4 px-6">
                   { laundry.rating && <div className="flex items-center space-x-2">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="font-medium text-gray-900">
                        {laundry.rating}
                      </span>
                      <span className="text-sm text-gray-500">
                        ({laundry.reviews})
                      </span>
                    </div>}
                  </td>
                  <td className="py-4 px-6">
                  {laundry.revenue && <div>
                      <p className="font-medium text-green-600">
                        {laundry.revenue}
                      </p>
                      <p className="text-sm text-gray-500">This month</p>
                    </div>}
                  </td>
                  <td className="py-4 px-6">
                    <StatusBadge status={laundry.status} variant="small" />
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <button onClick={()=>{handleEditLaundry(laundry)}}
                      className="text-blue-600 hover:text-blue-800 p-1">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-blue-600 hover:text-blue-800 p-1">
                       
                        <Trash2 className="w-4 h-4" />
                      </button>

                      {laundry.status === "Pending" ? null : (
                      laundry.status === "Active" ? (
                        <button className="text-red-600 hover:text-red-800 text-sm font-medium">
                          Suspend
                        </button>
                      ) : (
                        <button className="text-green-600 hover:text-green-800 text-sm font-medium">
                          Activate
                        </button>
                      ))}
                      {/* <button className="text-gray-400 hover:text-gray-600 p-1">
                        <MoreHorizontal className="w-4 h-4" />
                      </button> */}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>

     {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-full max-w-md p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-4">
              {editingLaundry ? "Edit Laundry" : "Add New Laundry"}
            </h2>

            {/* FORM */}
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Laundry Name
                </label>
                <input
                  type="text"
                  className="mt-1 w-full border rounded-lg px-3 py-2"
                  value={newLaundry.name}
                  onChange={(e) =>
                    setNewLaundry({ ...newLaundry, name: e.target.value })
                  }
                />
              </div>
 <div>
                <label className="text-sm font-medium text-gray-700">
                   Phone Number
                </label>
                <input
                  type="tel"
                  className="mt-1 w-full border rounded-lg px-3 py-2"
                  value={newLaundry.phone}
                  onChange={(e) =>
                    setNewLaundry({ ...newLaundry, phone: e.target.value })
                  }
                />
              </div>
               <div>
                <label className="text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  className="mt-1 w-full border rounded-lg px-3 py-2"
                  value={newLaundry.email}
                  onChange={(e) =>
                    setNewLaundry({ ...newLaundry, email: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Location
                </label>
                <textarea
                  className="mt-1 w-full border rounded-lg px-3 py-2"
                  value={newLaundry.location}
                  onChange={(e) =>
                    setNewLaundry({ ...newLaundry, location: e.target.value })
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
                onClick={handleAddLaundry}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
              >
                { editingLaundry ? "Update Laundry" : "Add Laundry"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
