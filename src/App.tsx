import "./App.css"
import { useState } from "react"
import Layout from "./components/Layout"
import BotBuilder from "./components/BotBuilder"
import BotInsights from "./components/BotInsights"

function App() {
  const [activeView, setActiveView] = useState<"builder" | "insights">("insights")

  return (
    <Layout activeView={activeView} setActiveView={setActiveView}>
      {activeView === "builder" ? <BotBuilder /> : <BotInsights />}
    </Layout>
  )
}

export default App
