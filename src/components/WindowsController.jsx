import { X, Minus, Maximize2 } from "lucide-react";

const WindowsController = ({ handleClose, handleMinimize, handleMaximize }) => {
  return (
    <div className="flex space-x-2">
      <button
        onClick={handleClose}
        className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center group"
      >
        <X size={8} strokeWidth={3} className="opacity-0 group-hover:opacity-100 text-red-900" />
      </button>
      <button 
        onClick={handleMinimize}
        className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 flex items-center justify-center group"
      >
        <Minus size={8} strokeWidth={3} className="opacity-0 group-hover:opacity-100 text-yellow-900" />
      </button>
      <button 
        onClick={handleMaximize}
        className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center group"
      >
        <Maximize2 size={8} strokeWidth={3} className="opacity-0 group-hover:opacity-100 text-green-900" />
      </button>
    </div>
  );
};

export default WindowsController;
