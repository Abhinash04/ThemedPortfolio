import { blogPosts, projects } from "@/features/safari/constants";
import { websites, wallpapers } from "@/features/safari/config";
import { ShieldHalf } from "lucide-react";
import SafariNavSection from "@/features/safari/components/SafariNavSection";

const SafariNavPage = ({ setGoURL }) => {
  return (
    <div className="w-full h-full overflow-y-auto bg-center bg-cover"
         style={{ backgroundImage: `url(${wallpapers.day})`, height: '100%' }}>
      <div className="w-full min-h-full pb-10 bg-white/40 backdrop-blur-3xl pt-8">
        <SafariNavSection section={websites.favorites} setGoURL={setGoURL} />
        <SafariNavSection section={projects} setGoURL={setGoURL} />
        
        {/* Blogs Section */}
        <div className="mx-auto w-full max-w-3xl px-4 mt-8">
           <div className="text-xl sm:text-2xl font-medium ml-2 mb-3 text-gray-800">Blogs</div>
           <div className="bg-white/60 p-5 rounded-2xl shadow-sm flex flex-col gap-0 border border-white/50">
              {blogPosts.map(({ id, date, title, image, link }, index) => (
                <button
                  key={id}
                  type="button"
                  className={`blog-post text-left flex gap-5 cursor-pointer hover:bg-white/80 p-3 rounded-lg transition-colors ${index !== blogPosts.length - 1 ? 'border-b border-gray-200/50' : ''}`}
                  onClick={() => setGoURL(link)}
                  aria-label={`Read blog post: ${title}`}
                >
                  <div className="w-1/4 h-24 overflow-hidden rounded-md shrink-0">
                    <img src={image} alt={title} className="w-full h-full object-cover" />
                  </div>
                  <div className="w-3/4 flex flex-col justify-center gap-1">
                    <p className="text-xs text-gray-500 font-medium">{date}</p>
                    <h3 className="font-semibold text-sm text-gray-800 line-clamp-2 leading-tight">{title}</h3>
                  </div>
                </button>
              ))}
           </div>
        </div>

        <SafariNavSection section={websites.freq} setGoURL={setGoURL} />

        {/* Privacy Report */}
        <div className="mx-auto w-full max-w-3xl px-4 mt-8 mb-16">
          <div className="text-xl sm:text-2xl font-medium ml-2 mb-3 text-gray-800">Privacy Report</div>
          <div className="h-16 w-full flex items-center bg-white/60 shadow-sm rounded-2xl text-sm px-4 border border-white/50">
            <div className="flex items-center gap-2 mr-4 text-gray-700">
              <ShieldHalf className="w-8 h-8" />
              <span className="text-xl font-medium">14</span>
            </div>
            <div className="flex-1 px-2 text-gray-600 font-medium">
              In the last seven days, Safari has prevented 14 trackers from profiling you.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SafariNavPage;
