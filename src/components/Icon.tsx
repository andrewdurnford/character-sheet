const icons = {
  "circle-outline": "○",
  "circle-fill": "●",
}

export type IconName = keyof typeof icons

type IconProps = {
  name: IconName
}

export function Icon({ name }: IconProps) {
  return <div>{icons[name]}</div>
}
