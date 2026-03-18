import {
  Navbar,
  Welcome,
  Dock,
  Terminal,
  Safari,
  Contact,
  Skills,
  Resume,
  Finder,
  TextViewer,
  ImageViewer,
  useWindowStore,
} from "@/features";

const VIEWER_COMPONENTS = {
  txtfile: TextViewer,
  imgfile: ImageViewer,
};

const App = () => {
  const { instances } = useWindowStore();

  return (
    <main>
      <Navbar />
      <Welcome />
      <Terminal />
      <Skills />
      <Safari />
      <Dock />
      <Resume />
      <Finder />
      {instances.map((inst) => {
        const ViewerWindow = VIEWER_COMPONENTS[inst.type];
        return ViewerWindow ? (
          <ViewerWindow key={inst.id} instanceId={inst.id} />
        ) : null;
      })}
      <Contact />
    </main>
  );
};

export default App;
