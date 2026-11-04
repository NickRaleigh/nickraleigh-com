import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { SummaryBanner } from "./SummaryBanner";

test("renders loading state", () => {
  render(<SummaryBanner state="loading" />);
  expect(screen.getByRole("status")).toBeInTheDocument();
  expect(screen.queryByText(/couldn't generate/i)).not.toBeInTheDocument();
});

test("error with no supplied message", () => {
  render(<SummaryBanner state="error" />);
  expect(screen.queryByText(/couldn't generate/i)).toBeInTheDocument();
});

test("error with supplied message", () => {
  const errorMessage = "hooooo doggy";
  render(<SummaryBanner state="error" error={errorMessage} />);
  expect(screen.getByText(errorMessage)).toBeInTheDocument();
});
