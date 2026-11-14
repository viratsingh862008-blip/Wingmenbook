// @vitest-environment jsdom

import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import App from "./App";

vi.mock("gsap", () => ({
  gsap: {
    context: (callback: () => void) => {
      callback();
      return { revert: () => undefined };
    },
    fromTo: (
      _target: unknown,
      _from: unknown,
      to: { onComplete?: () => void }
    ) => {
      to.onComplete?.();
    },
    to: (_target: unknown, options: { onComplete?: () => void }) => {
      options.onComplete?.();
    }
  }
}));

beforeEach(() => {
  Object.defineProperty(window, "matchMedia", {
    configurable: true,
    value: (media: string) => ({
      matches: true,
      media,
      onchange: null,
      addListener: () => undefined,
      removeListener: () => undefined,
      addEventListener: () => undefined,
      removeEventListener: () => undefined,
      dispatchEvent: () => true
    })
  });
});

afterEach(() => {
  cleanup();
});

describe("interactive brand book", () => {
  it("opens the book when the 3D cover surface is activated", () => {
    render(<App />);

    fireEvent.click(screen.getByRole("button", { name: "Open the 4WINGMEN brand book" }));

    expect(screen.getByText("Complete digital growth.")).toBeTruthy();
    expect(screen.getByRole("progressbar", { name: "Book progress" }).getAttribute("aria-valuenow")).toBe("18");
  });

  it("supports guided and free exploration through the chapter index", () => {
    render(<App />);

    fireEvent.click(screen.getByRole("button", { name: "SWITCH TO FREE" }));
    fireEvent.click(screen.getByRole("button", { name: "Open chapter index" }));

    expect(screen.getByRole("dialog", { name: "Chapter index" })).toBeTruthy();

    fireEvent.click(screen.getByRole("button", { name: /OUR POINT OF VIEW/i }));

    expect(screen.queryByRole("dialog", { name: "Chapter index" })).toBeNull();
    expect(screen.getByText("Complete digital growth.")).toBeTruthy();
  });

  it("closes the chapter index with Escape", () => {
    render(<App />);

    fireEvent.click(screen.getByRole("button", { name: "SWITCH TO FREE" }));
    fireEvent.click(screen.getByRole("button", { name: "Open chapter index" }));
    fireEvent.keyDown(screen.getByRole("button", { name: "Close chapter index" }), { key: "Escape" });

    expect(screen.queryByRole("dialog", { name: "Chapter index" })).toBeNull();
    expect(screen.getByRole("button", { name: "Open chapter index" })).toBeTruthy();
  });

  it("uses unmodified arrow keys for chapter navigation", () => {
    render(<App />);

    fireEvent.keyDown(window, { key: "ArrowRight" });

    expect(screen.getByText("Complete digital growth.")).toBeTruthy();
  });

  it("does not hijack Shift+Arrow text-selection shortcuts", () => {
    render(<App />);

    fireEvent.keyDown(window, { key: "ArrowRight", shiftKey: true });

    expect(screen.getByRole("button", { name: "Open the 4WINGMEN brand book" })).toBeTruthy();
  });

  it("does not hijack arrow keys when focus is on the book button", () => {
    render(<App />);

    const bookButton = screen.getByRole("button", { name: "Open the 4WINGMEN brand book" });
    fireEvent.keyDown(bookButton, { key: "ArrowRight" });

    expect(screen.getByRole("button", { name: "Open the 4WINGMEN brand book" })).toBeTruthy();
  });
});
