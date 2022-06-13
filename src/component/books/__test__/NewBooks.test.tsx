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
      data: [
        {
          title: "Windows Internals, Part 2, 7th Edition",
          subtitle: "",
          isbn13: "9780135462409",
          price: "$53.49",
          image: "https://itbook.store/img/books/9780135462409.png",
          url: "https://itbook.store/books/9780135462409",
        },

        {
          title: "Microsoft Excel Data Analysis and Business Modeling, 7th Edition",
          subtitle: "Office 2021 and Microsoft 365",
          isbn13: "9780137613663",
          price: "$34.87",
          image: "https://itbook.store/img/books/9780137613663.png",
          url: "https://itbook.store/books/9780137613663",
        },

        {
          title: "Microsoft Azure Data Solutions",
          subtitle: "An Introduction",
          isbn13: "9780137252503",
          price: "$36.23",
          image: "https://itbook.store/img/books/9780137252503.png",
          url: "https://itbook.store/books/9780137252503",
        },
        {
          title: "Ansible Succinctly",
          subtitle: "",
          isbn13: "9781642002164",
          price: "$0.00",
          image: "https://itbook.store/img/books/9781642002164.png",
          url: "https://itbook.store/books/9781642002164",
        },
        {
          title: "Bash Guide",
          subtitle: "",
          isbn13: "1001651514138",
          price: "$0.00",
          image: "https://itbook.store/img/books/1001651514138.png",
          url: "https://itbook.store/books/1001651514138",
        },
      ],
    });

    renderWithRedux(<NewBooks />);

    const cardsList = await screen.findAllByTestId("card");

    expect(screen.queryByText(/error/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/load/i)).not.toBeInTheDocument();
    expect(screen.getByTestId("cards")).not.toHaveTextContent("");

    expect(cardsList).toHaveLength(5);
    expect(cardsList[0]).toHaveTextContent("9780135462409");
    expect(cardsList[1]).toHaveTextContent("9780137613663");
  });
});
