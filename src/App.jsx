import { Navbar, Welcome, Dock } from "@/components"
import Terminal from "@/components/apps/Terminal"
import Skills from "@/components/apps/Skills"
import Safari from "@/components/apps/Safari"
import Resume from "@/components/apps/Resume"
import Finder from "@/components/apps/Finder"
import TextViewer from "@/components/apps/TextViewer"
import ImageViewer from "@/components/apps/ImageViewer"

const App = () => {
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
      <TextViewer />
      <ImageViewer />
    </main>
  )
}

export default App