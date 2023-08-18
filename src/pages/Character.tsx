import { Divider } from "../components/Divider"
import { CharacterDetails } from "./CharacterDetails"
import { CharacterForm } from "./CharacterForm"

export function Character() {
  return (
    <div className="flex flex-col justify-between gap-6 sm:flex-row">
      <CharacterForm />
      <Divider />
      <CharacterDetails />
    </div>
  )
}
