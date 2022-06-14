import { render, screen } from "@testing-library/react";
import axios from "axios";
import { Provider } from "react-redux";
import { getStore } from "../../../store/store";

import NewBooks from "../NewBooks";

jest.mock("axios");
jest.mock("../card/NewBooksCard", () => {
  return ({ data }: any) => <div data-testid="card">{data.isbn13}</div>;
});

const renderWithRedux = (component: JSX.Element) => render(<Provider store={getStore()}>{component}</Provider>);

describe("NewBooks", () => {
  test("loading", () => {
    (axios.get as jest.Mock).mockResolvedValueOnce(null);

    renderWithRedux(<NewBooks />);
    expect(screen.getByText(/load/i)).toBeInTheDocument();
    expect(screen.queryByText(/error/i)).not.toBeInTheDocument();
    expect(screen.getByTestId("cards")).toHaveTextContent("");
  });

  test("error", async () => {
    (axios.get as jest.Mock).mockRejectedValueOnce(null);

    renderWithRedux(<NewBooks />);

    expect(await screen.findByText(/error/i)).toBeInTheDocument();
    expect(screen.queryByText(/load/i)).not.toBeInTheDocument();
    expect(screen.getByTestId("cards")).toHaveTextContent("");
  });

  test("success", async () => {
    (axios.get as jest.Mock).mockResolvedValueOnce({
      data: {
        error: "0",
        total: "5",
        books: [
          {
            title: "Azure Pipelines Succinctly",
            subtitle: "",
            isbn13: "9781642002133",
            price: "$0.00",
            image: "https://itbook.store/img/books/9781642002133.png",
            url: "https://itbook.store/books/9781642002133",
          },
          {
            title: "Microsoft Excel Inside Out",
            subtitle: "Office 2021 and Microsoft 365",
            isbn13: "9780137559534",
            price: "$42.16",
            image: "https://itbook.store/img/books/9780137559534.png",
            url: "https://itbook.store/books/9780137559534",
          },
          {
            title: "Windows Internals, Part 2, 7th Edition",
            subtitle: "",
            isbn13: "9780135462409",
            price: "$53.49",
            image: "https://itbook.store/img/books/9780135462409.png",
            url: "https://itbook.store/books/9780135462409",
          },
          {
            title: "Microsoft Office Inside Out",
            subtitle: "Office 2021 and Microsoft 365",
            isbn13: "9780137564095",
            price: "$36.93",
            image: "https://itbook.store/img/books/9780137564095.png",
            url: "https://itbook.store/books/9780137564095",
          },
          {
            title: "Microsoft Excel Step by Step",
            subtitle: "Office 2021 and Microsoft 365",
            isbn13: "9780137564279",
            price: "$30.62",
            image: "https://itbook.store/img/books/9780137564279.png",
            url: "https://itbook.store/books/9780137564279",
          },
        ],
      },
    });

    renderWithRedux(<NewBooks />);

    const cardsList = await screen.findAllByTestId("card");

    expect(screen.queryByText(/error/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/load/i)).not.toBeInTheDocument();
    expect(screen.getByTestId("cards")).not.toHaveTextContent("");

    expect(cardsList).toHaveLength(5);
    expect(cardsList[0]).toHaveTextContent("9781642002133");
    expect(cardsList[1]).toHaveTextContent("9780137559534");
  });
});
