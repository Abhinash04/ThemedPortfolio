import { techStack } from "@/constants";
import { Check, Flag } from "lucide-react";

const TechStackGrid = () => {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {techStack.map(({ category, items }) => (
          <div key={category} className="mb-2">
            <h3 className="text-green-300 font-bold mb-2 flex items-center gap-2 border-b border-gray-700/50 pb-1 w-max">
              <Check size={16} className="text-green-400" /> {category}
            </h3>
            <ul className="pl-6 space-y-1 list-disc list-inside marker:text-gray-500">
              {items.map((item, i) => (
                <li key={i} className="text-gray-300">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-8 pt-4 flex flex-col sm:flex-row justify-between text-xs text-gray-500">
        <p className="flex items-center gap-1.5 mb-2 sm:mb-0">
          <Check size={14} className="text-green-500" /> {techStack.length} of{" "}
          {techStack.length} stacks loaded successfully (100%)
        </p>
        <p className="flex items-center gap-1.5">
          <Flag size={12} className="text-gray-500" fill="currentColor" />{" "}
          Render time: 6ms
        </p>
      </div>
    </>
  );
};

export default TechStackGrid;
