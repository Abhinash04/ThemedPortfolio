import React from "react";
import TechStackGrid from "@/components/apps/TechStackGrid";

const renderResultElement = (element, id) => {
  if (!element) return null;
  if (
    typeof element === "string" || 
    React.isValidElement(element) || 
    (Array.isArray(element) && element.every(item => React.isValidElement(item) || typeof item === "string"))
  ) {
    return <span>{element}</span>;
  }

  if (element.type === "ls") {
    if(!Array.isArray(element.items)) return null;
    return (
      <div className="grid grid-cols-4 w-full">
        {element.items.map((item) => (
          <span
            key={`terminal-result-ls-${id}-${item.id}`}
            className={`${item.type === "file" ? "text-white" : "text-purple-300"}`}
          >
            {item.title}
          </span>
        ))}
      </div>
    );
  } else if (element.type === "techstack") {
    return (
      <div className="w-full mt-2 mb-4">
        <TechStackGrid />
      </div>
    );
  } else if (element.type === "help") {
    return (
      <ul className="list-disc ml-6 pb-1.5">
        <li>
          <span className="text-red-400">cat {"<file>"}</span> - See the content
          of {"<file>"}
        </li>
        <li>
          <span className="text-red-400">cd {"<dir>"}</span> - Move into
          {" <dir>"}, "cd .." to move to the parent directory, "cd" or "cd ~" to
          return to root
        </li>
        <li>
          <span className="text-red-400">ls</span> - See files and directories
          in the current directory
        </li>
        <li>
          <span className="text-red-400">clear</span> - Clear the screen
        </li>
        <li>
          <span className="text-red-400">help</span> - Display this help menu
        </li>
        <li>
          <span className="text-red-400">show tech stack</span> - Display my
          tech stack
        </li>
        <li>
          <span className="text-red-400">rm -rf /</span> - :)
        </li>
        <li>
          press <span className="text-red-400">up arrow / down arrow</span> -
          Select history commands
        </li>
        <li>
          press <span className="text-red-400">tab</span> - Auto complete
        </li>
      </ul>
    );
  }
  return null;
};

const TerminalRow = ({ row }) => {
  if (row.type !== "result") return null;

  return (
    <div className="break-all pt-1 pb-1">
      {renderResultElement(row.element, row.id)}
    </div>
  );
};

export default TerminalRow;
