import { Divider } from "../components/Divider"
import { CharacterBuilder } from "./character-builder"
import { CharacterSheet } from "./character-sheet"

function App() {
  return (
    <div className="mx-auto max-w-3xl p-8">
      <header>
        <h1 className="mb-6 text-2xl">Character Sheet</h1>
      </header>
      <div className="flex flex-col justify-between gap-6 sm:flex-row">
        <CharacterBuilder />
        <Divider className="sm:hidden" />
        <CharacterSheet />
      </div>
    </div>
  )
}

export default App
