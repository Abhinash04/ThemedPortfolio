import { Navbar, Welcome, Dock } from "@/components"
import Terminal from "@/components/apps/Terminal"
import Skills from "@/components/apps/Skills"
import Safari from "@/components/apps/Safari"

const App = () => {
  return (
    <main>
      <Navbar />
      <Welcome />
      <Terminal />
      <Skills />
      <Safari />
      <Dock />
    </main>
  )
}

export default App