import { Navbar, Welcome, Dock } from "@/components"
import Terminal from "@/components/apps/Terminal"
import windowWrapper from "@/hoc/windowWrapper"

const TerminalApp = windowWrapper(Terminal, "terminal", "me@abhinash: ~");

const App = () => {
  return (
    <main>
      <Navbar />
      <Welcome />
      
      {/* Interactive Windows */}
      <TerminalApp />

      <Dock />
    </main>
  )
}

export default App