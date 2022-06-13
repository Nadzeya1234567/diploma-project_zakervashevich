import { screen, render } from "@testing-library/react";
import Username from "../Username";

describe("FormCard", () => {
  test("Include username", () => {
    render(<Username />);
    const contentElement = screen.getByText(/username/i);
    expect(contentElement).toBeInTheDocument();
  });
});
