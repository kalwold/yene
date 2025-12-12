
import { Trash2, Edit, Shield, User as UserIcon } from 'lucide-react';
import { useState } from 'react';


export default function UserTable({ users, onDelete, onEdit }) {


  const getRoleBadge = (role) => {
    role = role.toLowerCase();
console.log("Getting role badge for role:", role);
    const styles = {
      system_admin: 'bg-red-100 text-red-700 border-red-200',
      laundry_admin: 'bg-blue-100 text-blue-700 border-blue-200',

    };

    const icons = {
      system_admin: <Shield size={14} />,
      laundry_admin: <UserIcon size={14} />,
    };

    const labels = {
      system_admin: 'System Admin',
      laundry_admin: 'Laundry Admin',
     
    };

    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${styles[role]}`}>
        {icons[role]}
        {labels[role]}
      </span>
    );
  };

  const getStatusBadge = (status) => {
    return status === 'ACTIVE' ? (
      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 border border-green-200">
        Active
      </span>
    ) : (
      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200">
        Inactive
      </span>
    );
  };

  return (
   <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className='bg-gray-50'>
            <tr >
              <th className="text-left py-3 px-6 font-medium text-gray-600">
                Name
              </th>
              <th className="text-left py-3 px-6 font-medium text-gray-600">
                Contact
              </th>
              <th className="text-left py-3 px-6 font-medium text-gray-600">
                Role
              </th>
              <th className="text-left py-3 px-6 font-medium text-gray-600">
                Laundry
              </th>
              <th className="text-left py-3 px-6 font-medium text-gray-600">
                Status
              </th>
              <th className="text-left py-3 px-6 font-medium text-gray-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center">
                  <div className="flex flex-col items-center justify-center text-gray-400">
                    <UserIcon size={48} className="mb-3 opacity-50" />
                    <p className="text-lg font-medium">No users found</p>
                    <p className="text-sm">Try adjusting your search or filter to find users.</p>
                  </div>
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.userId} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-semibold">
                        {user.firstName.charAt(0).toUpperCase()}
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-semibold text-gray-800">{user.firstName} {user.lastName}</p>
                        <p className="text-xs text-gray-500">ID: {user.userId}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      <p className="text-gray-800 font-medium">{user.email}</p>
                      <p className="text-gray-500">{user.mobile}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {getRoleBadge(user.roleName)}
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-800">
                      {user.companyName || <span className="text-gray-400 italic">N/A</span>}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(user.status)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onEdit(user)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit user"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => onDelete(user.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete user"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
