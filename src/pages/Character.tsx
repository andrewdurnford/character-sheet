import { CharacterDetails } from "./CharacterDetails"
import { CharacterForm } from "./CharacterForm"

export function Character() {
  return (
    <div className="flex flex-col justify-between gap-6 sm:flex-row">
      <CharacterForm />
      <hr className="h-px border-0 bg-gray-300 sm:hidden" />
      <CharacterDetails />
    </div>
  )
}
