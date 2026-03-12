const NavSection = ({ section, setGoURL }) => {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 mt-8">
      <div className="text-xl sm:text-2xl font-medium ml-2 mb-3 text-gray-800">
        {section.title}
      </div>
      <div className="grid grid-cols-4 sm:grid-cols-8 gap-4">
        {section.sites.map((site) => (
          <div key={site.id} className="h-28 flex flex-col items-center cursor-pointer group"
            onClick={() => {
              if (site.link.startsWith("mailto:")) {
                window.location.href = site.link;
              } else if (site.external || site.escape) {
                window.open(site.link, "_blank", "noopener,noreferrer");
              } else {
                setGoURL(site.link);
              }
            }}
          >
            <div className="w-14 h-14 mx-auto rounded-xl overflow-hidden bg-white flex items-center justify-center group-hover:scale-105 transition-transform duration-200 shadow-sm border border-gray-100">
              {site.img ? (
                <img src={site.img} alt={site.title} title={site.title} className="w-8 h-8 object-contain" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-600">
                  <span className="text-xl font-bold">{site.title.charAt(0)}</span>
                </div>
              )}
            </div>
            <span className="mt-2 text-xs text-center text-gray-600 truncate w-full group-hover:text-black">
              {site.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NavSection;
