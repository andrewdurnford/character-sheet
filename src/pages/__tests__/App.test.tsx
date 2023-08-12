import { render, screen } from "@testing-library/react"
import App from "../App"

it("renders app", () => {
  render(<App />)
  screen.getByText("Character Sheet")
})
