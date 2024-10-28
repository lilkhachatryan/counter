import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Counter from "../components/Counter";
import { getInitialValue } from "../mocks/mockBackend";

jest.mock("../mocks/mockBackend");

describe("Counter Component", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("WHEN a user clicks the Increment button THEN the number SHOULD increment by one", async () => {
    getInitialValue.mockResolvedValueOnce({ data: 10 });
    render(<Counter />);
    await waitFor(() =>
      expect(screen.getByText("Counter: 10")).toBeInTheDocument()
    );

    const incrementButton = screen.getByText("Increment");
    fireEvent.click(incrementButton);

    expect(screen.getByText("Counter: 11")).toBeInTheDocument();
  });

  test("WHEN a user clicks the Decrement button THEN the number SHOULD decrement by one", async () => {
    getInitialValue.mockResolvedValueOnce({ data: 10 });
    render(<Counter />);
    await waitFor(() =>
      expect(screen.getByText("Counter: 10")).toBeInTheDocument()
    );

    const decrementButton = screen.getByText("Decrement");
    fireEvent.click(decrementButton);

    expect(screen.getByText("Counter: 9")).toBeInTheDocument();
  });

  test("WHEN the component mounts THEN it SHOULD fetch initial value from the mocked backend API", async () => {
    getInitialValue.mockResolvedValueOnce({ data: 15 });
    render(<Counter />);
    await waitFor(() =>
      expect(screen.getByText("Counter: 15")).toBeInTheDocument()
    );
  });

  test("WHEN fetching initial value fails THEN the counter SHOULD display 0", async () => {
    const consoleErrorMock = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
    getInitialValue.mockRejectedValueOnce(new Error("Failed to fetch"));
    render(<Counter />);
    await waitFor(() =>
      expect(screen.getByText("Counter: 0")).toBeInTheDocument()
    );
    consoleErrorMock.mockRestore();
  });

  test("WHEN a user clicks the Randomize button THEN the number SHOULD be replaced by a random number", async () => {
    getInitialValue.mockResolvedValueOnce({ data: 0 });
    render(<Counter />);
    await waitFor(() =>
      expect(screen.getByText("Counter: 0")).toBeInTheDocument()
    );

    const randomizeButton = screen.getByText("Randomize");
    fireEvent.click(randomizeButton);

    await waitFor(() => {
      const counterText = screen.getByText(/Counter:/).textContent;
      const countValue = parseInt(counterText.replace("Counter: ", ""), 10);
      expect(countValue).toBeGreaterThanOrEqual(0);
      expect(countValue).toBeLessThan(100);
    });
  });
});
