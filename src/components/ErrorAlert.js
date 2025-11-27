import { FaExclamationTriangle } from "react-icons/fa";

 export const ErrorAlert = ({ message }) => {
    return (
      <div 
        role="alert"
        className="animate-fade-in-up bg-red-50  p-3 rounded-lg "
      >
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <FaExclamationTriangle className="h-5 w-5 text-red-400" aria-hidden="true" />
          </div>
          <div className="ml-3 flex-1">
            <p className="text-sm font-medium text-red-800">{message}</p>
          </div>
        </div>
      </div>
    );
  };