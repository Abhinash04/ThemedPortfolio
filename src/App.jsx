import { Navbar, Welcome, Dock } from "@/components"
import Terminal from "@/components/apps/Terminal"
import Skills from "@/components/apps/Skills"

const App = () => {
  return (
    <main>
      <Navbar />
      <Welcome />
      
      {/* Interactive Windows */}
      <Terminal />
      <Skills />

      <Dock />
    </main>
  )
}

export default App