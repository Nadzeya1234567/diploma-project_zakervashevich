import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { getStore } from "../../../store/store";
import BookPage from "../BookPage";

const renderWithRedux = (component: JSX.Element) => render(<Provider store={getStore()}>{component}</Provider>);

describe("BookPage", () => {
  test("loading", () => {
    renderWithRedux(<BookPage />);
    expect(screen.getByText(/load/i)).toBeInTheDocument();
    expect(screen.queryByText(/error/i)).not.toBeInTheDocument();
  });
});
