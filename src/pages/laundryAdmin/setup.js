import { useEffect, useState } from 'react';
import { Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';



const LaundryAdminSetup = ({ onComplete }) => {
  const [step, setStep] = useState(1);
    const [services, setServices] = useState([]);
  const [items, setItems] = useState([]);
  const [pricing, setPricing] = useState({});
const navigate = useNavigate();
const [hours, setHours] = useState({
  pickup: {},    
  delivery: {}, 
});

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  useEffect(() => {

    // load service list
    const fetchServices = async () => {
      // Simulate API call
      const response = await new Promise((resolve) => {
        setTimeout(() => {
          resolve([
            { id: '1', name: 'Wash & Fold' , items: []},
            { id: '2', name: 'Dry Cleaning' },
            { id: '3', name: 'Iron & Press' },
            { id: '4', name: 'Premium Care' },
          ]);
        }, 500);    
        });
        setServices(response.map(s => ({ ...s, selected: false })));
    };

    // load Items list
    const fetchIcons = async () => {    
        // Simulate API call
const response = await new Promise((resolve) => {
        setTimeout(() => {
          resolve([
     { id: '1', name: 'Shirt'},
    { id: '2', name: 'Pants' },
    { id: '3', name: 'Dress' },
    { id: '4', name: 'Blanket' },
          ]);
        }, 500);    
        });
        setItems(response.map(s => ({ ...s, selected: false })));

    };

    fetchIcons();
    fetchServices();
    }, []);

    const toggleDay = (type, day) => {
  setHours((prev) => {
    const updated = { ...prev[type] };

    if (updated[day]) {
      delete updated[day]; // remove day
    } else {
      updated[day] = { start: "", end: "" }; // add with interval
    }

    return {
      ...prev,
      [type]: updated,
    };
  });
};

const setDayTime = (type, day, field, value) => {
  setHours((prev) => ({
    ...prev,
    [type]: {
      ...prev[type],
      [day]: {
        ...prev[type][day],
        [field]: value, // start | end
      },
    },
  }));
};


  const selectedServices = services.filter(s => s.selected);

  const handleServiceToggle = (serviceId) => {
    setServices(services.map(s =>
      s.id === serviceId ? { ...s, selected: !s.selected } : s
    ));
  };

  const handlePriceChange = (serviceId, itemId, price) => {
    setPricing({
      ...pricing,
      [serviceId]: {
        ...pricing[serviceId],
        [itemId]: parseFloat(price) || 0,
      },
    });
  };

  const handleComplete = () => {
    // Here you would typically send the setup data to your backend API
    const setupData = {
      services: selectedServices,
      pricing,
      hours,
    };
    console.log('Setup Data:', setupData);
    console.log("Setup Complete");
    navigate('/laundryadmin/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to Your Laundry Dashboard</h1>
            <p className="text-gray-600">Let's set up your laundry service. This will only take a few minutes.</p>
          </div>

          <div className="flex items-center justify-between mb-8">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  step >= s ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  {step > s ? <Check className="w-6 h-6" /> : s}
                </div>
                {s < 3 && (
                  <div className={`w-24 h-1 mx-2 ${step > s ? 'bg-blue-600' : 'bg-gray-200'}`} />
                )}
              </div>
            ))}
          </div>

          {step === 1 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Select Services You Offer</h2>
              <div className="space-y-3">
                {services.map((service) => (
                  <label
                    key={service.id}
                    className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition"
                  >
                    <input
                      type="checkbox"
                      checked={service.selected}
                      onChange={() => handleServiceToggle(service.id)}
                      className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="ml-3 text-gray-800 font-medium">{service.name}</span>
                  </label>
                ))}
              </div>
              <button
                onClick={() => setStep(2)}
                disabled={selectedServices.length === 0}
                className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Continue
              </button>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Set Pricing for Items</h2>
              <div className="space-y-6">
                {selectedServices.map((service) => (
                  <div key={service.id} className="border rounded-lg p-4">
                    <h3 className="font-semibold text-lg mb-3">{service.name}</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {items.map((item) => (
                        <div key={item.id} className="flex items-center space-x-2">
                          <label className="text-sm text-gray-700 flex-1">{item.name}</label>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                            <input
                              type="number"
                              step="0.01"
                              min="0"
                              value={pricing[service.id]?.[item.id] || ''}
                              onChange={(e) => handlePriceChange(service.id, item.id, e.target.value)}
                              className="w-24 pl-7 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                              placeholder="0.00"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex space-x-3 mt-6">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-semibold"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
//           <div>
//   <h2 className="text-xl font-semibold mb-4">Pickup & Delivery Schedule</h2>

//   <div className="space-y-6">
//     {/* ================= PICKUP ================= */}
//     <div className="border rounded-lg p-4">
//       <h3 className="font-semibold text-lg mb-3 text-gray-800">Pickup Days & Time</h3>

//       {/* Pickup Days */}
//       <div className="mb-4">
//         <label className="block text-sm font-medium text-gray-700 mb-2">
//           Select Pickup Days
//         </label>
//         <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
//           {days.map((day) => (
//             <label key={day} className="flex items-center space-x-2">
//               <input
//                 type="checkbox"
//                 checked={hours.pickupDays.includes(day)}
//                 onChange={(e) => {
//                   const updated = e.target.checked
//                     ? [...hours.pickupDays, day]
//                     : hours.pickupDays.filter((d) => d !== day);

//                   setHours({ ...hours, pickupDays: updated });
//                 }}
//                 className="rounded border-gray-300"
//               />
//               <span className="text-sm">{day}</span>
//             </label>
//           ))}
//         </div>
//       </div>

//       {/* Pickup Time */}
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-2">
//           Pickup Time
//         </label>
//         <input
//           type="time"
//           value={hours.pickupTime}
//           onChange={(e) => setHours({ ...hours, pickupTime: e.target.value })}
//           className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
//         />
//       </div>
//     </div>

//     {/* ================= DELIVERY ================= */}
//     <div className="border rounded-lg p-4">
//       <h3 className="font-semibold text-lg mb-3 text-gray-800">Delivery Days & Time</h3>

//       {/* Delivery Days */}
//       <div className="mb-4">
//         <label className="block text-sm font-medium text-gray-700 mb-2">
//           Select Delivery Days
//         </label>
//         <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
//           {days.map((day) => (
//             <label key={day} className="flex items-center space-x-2">
//               <input
//                 type="checkbox"
//                 checked={hours.deliveryDays.includes(day)}
//                 onChange={(e) => {
//                   const updated = e.target.checked
//                     ? [...hours.deliveryDays, day]
//                     : hours.deliveryDays.filter((d) => d !== day);

//                   setHours({ ...hours, deliveryDays: updated });
//                 }}
//                 className="rounded border-gray-300"
//               />
//               <span className="text-sm">{day}</span>
//             </label>
//           ))}
//         </div>
//       </div>

//       {/* Delivery Time */}
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-2">
//           Delivery Time
//         </label>
//         <input
//           type="time"
//           value={hours.deliveryTime}
//           onChange={(e) => setHours({ ...hours, deliveryTime: e.target.value })}
//           className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
//         />
//       </div>
//     </div>
//   </div>

//   {/* ================= ACTION BUTTONS ================= */}
//   <div className="flex space-x-3 mt-6">
//     <button
//       onClick={() => setStep(2)}
//       className="flex-1 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-semibold"
//     >
//       Back
//     </button>

//     <button
//       onClick={handleComplete}
//       className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold"
//     >
//       Complete Setup
//     </button>
//   </div>
// </div>
<div className="border rounded-lg p-4">
  <h3 className="font-semibold text-lg mb-4">Pickup Days & Time Intervals</h3>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {days.map((day) => {
      const selected = hours.pickup[day];

      return (
        <div key={day} className="border rounded-lg p-3 space-y-3">
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={!!selected}
              onChange={() => toggleDay("pickup", day)}
              className="rounded border-gray-300"
            />
            <span className="font-medium">{day}</span>
          </label>

          {selected && (
            <div className="flex space-x-3">
              <input
                type="time"
                value={selected.start}
                onChange={(e) =>
                  setDayTime("pickup", day, "start", e.target.value)
                }
                className="flex-1 px-3 py-2 border rounded-lg"
                placeholder="Start"
              />
              <input
                type="time"
                value={selected.end}
                onChange={(e) =>
                  setDayTime("pickup", day, "end", e.target.value)
                }
                className="flex-1 px-3 py-2 border rounded-lg"
                placeholder="End"
              />
            </div>
          )}

          
        </div>
      );
    })}
  </div>
  <h3 className="font-semibold text-lg my-4">Delivery Days & Time Intervals</h3>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {days.map((day) => {
      const selected = hours.delivery[day];
      return (
        <div key={day} className="border rounded-lg p-3 space-y-3">
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={!!selected}
              onChange={() => toggleDay("delivery", day)} 
              className="rounded border-gray-300"
            />
            <span className="font-medium">{day}</span>
          </label>
          {selected && (
            <div className="flex space-x-3">
              <input
                type="time"
                value={selected.start}
                onChange={(e) =>
                  setDayTime("delivery", day, "start", e.target.value)
                }
                className="flex-1 px-3 py-2 border rounded-lg"
                placeholder="Start"
              />
              <input
                type="time"
                value={selected.end}
                onChange={(e) =>
                  setDayTime("delivery", day, "end", e.target.value)
                }
                className="flex-1 px-3 py-2 border rounded-lg"
                placeholder="End"
              />
            </div>
          )}
        </div>
      );
    }
    )}
  </div>
   {/* ================= ACTION BUTTONS ================= */}
  <div className="flex space-x-3 mt-6">
    <button
      onClick={() => setStep(2)}
      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-semibold"
    >
      Back
    </button>

    <button
      onClick={handleComplete}
      className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold"
    >
      Complete Setup
    </button>
  </div>
</div>



          )}
        </div>
      </div>
    </div>
  );
};

export default LaundryAdminSetup;
