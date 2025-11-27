export default function StatusBadge({ status, variant = 'default' }) {
  const getStatusStyles = (status) => {
    const statusLower = status.toLowerCase();
    
    if (statusLower.includes('active') || statusLower.includes('completed') || statusLower.includes('delivered')) {
      return 'bg-green-100 text-green-700 border-green-200';
    }
    if (statusLower.includes('pending') || statusLower.includes('processing') || statusLower.includes('pickup')) {
      return 'bg-blue-100 text-blue-700 border-blue-200';
    }
    if (statusLower.includes('suspended') || statusLower.includes('cancelled') || statusLower.includes('delayed')) {
      return 'bg-red-100 text-red-700 border-red-200';
    }
    if (statusLower.includes('washing') || statusLower.includes('drying') || statusLower.includes('progress')) {
      return 'bg-orange-100 text-orange-700 border-orange-200';
    }
    if (statusLower.includes('ready')) {
      return 'bg-purple-100 text-purple-700 border-purple-200';
    }
    
    return 'bg-gray-100 text-gray-700 border-gray-200';
  };

  const sizeClasses = variant === 'small' 
    ? 'px-2 py-1 text-xs' 
    : 'px-3 py-1 text-sm';

  return (
    <span className={`inline-flex items-center rounded-full font-medium border ${sizeClasses} ${getStatusStyles(status)}`}>
      {status}
    </span>
  );
}