import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Footer } from "./index";

test("renders the footer", () => {
  render(<Footer />);
  expect(screen.getByRole("contentinfo")).toBeInTheDocument();
});
