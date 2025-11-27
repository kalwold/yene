import { Home, ListOrdered, PowerOff, ServerIcon, ShoppingBagIcon, User, WashingMachine } from "lucide-react"
import { FaBook,FaHourglassHalf ,  FaHome, FaHouseUser, FaPowerOff  ,FaRegUser, FaUserCog,   FaWhmcs, FaClipboardList, FaLaptopHouse, FaWarehouse, FaFile} from "react-icons/fa"
import { GoPackage } from "react-icons/go"
import { MdLocalLaundryService } from "react-icons/md"


export const navigation = [
    {
        key: 'dashboard',
        label: 'Dashboard',
        path: '/admin/dashboard',
        icon:  <Home />,
        permissions: ['VIEW_DASHBOARD']
    },
    {
        key: 'customers',
        label: 'Customer Management',
        path: '/admin/customers',
        
        icon: <User />,
    },
    {
        key: 'laundry',
        label: 'Laundry Management',
          path: '/admin/laundry',
        icon:  <WashingMachine />,
       
    },
    {
        key: 'orders',
        label: 'Order Management',
        path: '/admin/orders',
        icon: <ListOrdered />
    },
    // {
    //     key: 'user',
    //     label: 'User Management',
    //     path: '/User',
    //     icon: <FaUserCog />
    // },
        {
        key: 'services',
        label: 'Services',
        path: '/admin/services',
        icon:  <ServerIcon />
    },
            {
        key: 'items',
        label: 'Items',
        path: '/admin/items',
        icon: <ShoppingBagIcon />
    },
    // {
    //     key: 'settings',
    //     label: 'Settings',
    //     path: '/settings',
    //     icon: <FaWhmcs />,
    //     children: [
  
    //         {
    //             key: 'branches',
    //             label: 'Branches',
    //             path: '/settings/branches',
    //             icon: <FaLaptopHouse />,
    //             permissions: ['GET_ALL_BRANCHES']
    //         },
    //         {
    //             key: 'role',
    //             label: 'Role',
    //             path: '/settings/role',
    //             icon: <FaUserCog />,
    //             permissions: ['GET_ALL_LIVE_ROLES']
    //         },
    //         {
    //             key: 'unauthorised-role',
    //             label: 'Unauthorised Role',
    //             path: '/settings/unauthorisedRole',
    //             icon: <FaHourglassHalf/>,
    //             permissions: ['GET_ALL_UNAUTHORIZED_ROLES']
    //         }
    //     ]
    // },

     {
        key: 'logout',
        label: 'logout',
        path: '/logout',
        icon: <PowerOff />
       
    }
];
