import { X, Minus, Maximize2 } from "lucide-react";
import PropTypes from "prop-types";

const WindowsController = ({ handleClose, handleMinimize, handleMaximize }) => {
  return (
    <div className="flex space-x-2">
      <button
        onClick={handleClose}
        aria-label="Close window"
        className="relative w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-1 focus:ring-offset-gray-800 flex items-center justify-center group before:absolute before:-inset-2 before:rounded-full"
      >
        <X size={8} strokeWidth={3} className="opacity-0 group-hover:opacity-100 text-red-900" />
      </button>
      <button 
        onClick={handleMinimize}
        aria-label="Minimize window"
        className="relative w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-1 focus:ring-offset-gray-800 flex items-center justify-center group before:absolute before:-inset-2 before:rounded-full"
      >
        <Minus size={8} strokeWidth={3} className="opacity-0 group-hover:opacity-100 text-yellow-900" />
      </button>
      <button 
        onClick={handleMaximize}
        aria-label="Maximize window"
        className="relative w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-1 focus:ring-offset-gray-800 flex items-center justify-center group before:absolute before:-inset-2 before:rounded-full"
      >
        <Maximize2 size={8} strokeWidth={3} className="opacity-0 group-hover:opacity-100 text-green-900" />
      </button>
    </div>
  );
};

WindowsController.propTypes = {
  handleClose: PropTypes.func.isRequired,
  handleMinimize: PropTypes.func.isRequired,
  handleMaximize: PropTypes.func.isRequired,
};

export default WindowsController;
