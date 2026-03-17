import { Navbar, Welcome, Dock } from "@/components"
import Terminal from "@/components/apps/Terminal"
import Skills from "@/components/apps/Skills"
import Safari from "@/components/apps/Safari"
import Resume from "@/components/apps/Resume"

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
    </main>
  )
}

export default App