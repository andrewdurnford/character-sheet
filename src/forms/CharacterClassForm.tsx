import { useForm } from "react-hook-form"
import { useCharacterStore } from "../useCharacterStore"
import { classes } from "../utils/classes"

type CharacterClassFormValues = {
  classId: keyof typeof classes
}

interface CharacterClassFormProps {
  onCancel: () => void
}

export function CharacterClassForm({ onCancel }: CharacterClassFormProps) {
  const classId = useCharacterStore((state) => state.classId)
  const setClass = useCharacterStore((state) => state.setClass)
  const { handleSubmit, register } = useForm<CharacterClassFormValues>({
    mode: "onSubmit",
    defaultValues: {
      classId,
    },
  })

  function onSubmit(data: CharacterClassFormValues) {
    setClass(data.classId)
    onCancel()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <button
          type="button"
          onClick={onCancel}
          className="mb-4 block hover:underline"
        >
          Back
        </button>
        <label htmlFor="classId" className="mb-1 inline-block font-medium">
          Class
        </label>
        {Object.entries(classes).map(([classId, name]) => (
          <div key={classId}>
            <input
              id={classId}
              type="radio"
              value={classId}
              {...register("classId")}
            />{" "}
            <label htmlFor={classId}>{name}</label>
          </div>
        ))}
        <button
          type="submit"
          className="mt-6 rounded border border-black bg-gray-200 px-1"
        >
          Save
        </button>
      </div>
    </form>
  )
}
