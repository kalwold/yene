import { Home, ListOrdered, PowerOff, ServerIcon, ShoppingBagIcon, User, User2, WashingMachine } from "lucide-react"
import { FaBook,FaHourglassHalf ,  FaHome, FaHouseUser, FaPowerOff  ,FaRegUser, FaUserCog,   FaWhmcs, FaClipboardList, FaLaptopHouse, FaWarehouse, FaFile} from "react-icons/fa"
import { GoPackage } from "react-icons/go"
import { MdLocalLaundryService } from "react-icons/md"


export const navigation = [
    {
        key: 'dashboard',
        label: 'Dashboard',
        path: '/admin/dashboard',
        icon:  <Home />,
        role: 'SYSTEM_ADMIN'
    },
    {
        key: 'customers',
        label: 'Customer Management',
        path: '/admin/customers',
        
        icon: <User />,
      
        role: 'SYSTEM_ADMIN'
    },
    {
        key: 'laundry',
        label: 'Laundry Management',
          path: '/admin/laundry',
        icon:  <WashingMachine />,
     
        role: 'SYSTEM_ADMIN'
       
    },
    {
        key: 'orders',
        label: 'Order Management',
        path: '/admin/orders',
        icon: <ListOrdered />,
       
        role: 'SYSTEM_ADMIN'
    },

        {
        key: 'services',
        label: 'Services',
        path: '/admin/services',
        icon:  <ServerIcon />,
        role: 'SYSTEM_ADMIN'
    },
            {
        key: 'items',
        label: 'Items',
        path: '/admin/items',
        icon: <ShoppingBagIcon />,
        role: 'SYSTEM_ADMIN'
    },
    
            {
        key: 'users',
        label: 'User Management',
        path: '/admin/users',
        icon: <User2 />,
        role: 'SYSTEM_ADMIN'
    },
{
        key: 'dashboard',
        label: 'Dashboard',
        path: '/laundryAdmin/dashboard',
        icon:  <Home />,
        role: 'LAUNDRY_ADMIN'
    },
    {
        key: 'orders',
        label: 'Order Management',
        path: '/laundryAdmin/orders',
        icon: <ListOrdered />,
      role: 'LAUNDRY_ADMIN'
    },
        {
        key: 'services',
        label: 'Service & Pricing',
        path: '/laundryAdmin/services',
        icon: <ListOrdered />,
      role: 'LAUNDRY_ADMIN'
    },
     {
        key: 'logout',
        label: 'logout',
        path: '/logout',
        icon: <PowerOff />,
        role: 'ALL'
       
    }
];
