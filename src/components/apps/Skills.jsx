import windowWrapper from "@/hoc/windowWrapper";
import TechStackGrid from "./TechStackGrid";

const Skills = () => {
  return (
    <div className="font-normal relative h-full bg-gray-900/95 overflow-y-auto text-white text-sm p-4 font-mono">
      <div className="flex flex-row items-center space-x-1.5 pb-4">
        <span className="text-yellow-200">
          @abhinash <span className="text-green-300">~</span>
        </span>
        <span className="text-red-400">{">"}</span>
        <span className="pl-1 text-white">show tech stack</span>
      </div>
      
      <TechStackGrid />
    </div>
  );
};

const SkillsWindow = windowWrapper(Skills, "skills");
export default SkillsWindow;
