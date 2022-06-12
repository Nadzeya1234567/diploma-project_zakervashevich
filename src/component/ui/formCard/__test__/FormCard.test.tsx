import { screen, render } from "@testing-library/react";
import FormCard from "../FormCard";

describe("FormCard", () => {
  test("Include children", () => {
    const someText = "dfdfdf";
    render(<FormCard>{someText}</FormCard>);
    const contentElement = screen.getByText(someText);
    expect(contentElement).toBeInTheDocument();
  });

  test("With header", () => {
    const header = "Header Text";
    render(<FormCard header={header} />);
    const contentElement = screen.getByText(header);
    expect(contentElement).toBeInTheDocument();
  });

  test("With loader", () => {
    render(<FormCard loading />);
    const contentElement = screen.getByRole("progressbar");
    expect(contentElement).toBeInTheDocument();
  });
});
