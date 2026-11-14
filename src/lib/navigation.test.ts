import { describe, expect, it } from "vitest";
import {
  getNextChapter,
  getPreviousChapter,
  clampChapterIndex,
  getSwipeDirection,
  getTransitionDirection,
  shouldNavigateWithKeyboard
} from "./navigation";

describe("chapter navigation", () => {
  it("advances to the next chapter without exceeding the final chapter", () => {
    expect(getNextChapter(0, 3)).toBe(1);
    expect(getNextChapter(2, 3)).toBe(2);
  });

  it("moves to the previous chapter without going below the cover", () => {
    expect(getPreviousChapter(2)).toBe(1);
    expect(getPreviousChapter(0)).toBe(0);
  });

  it("clamps arbitrary chapter indexes to the valid range", () => {
    expect(clampChapterIndex(-2, 4)).toBe(0);
    expect(clampChapterIndex(9, 4)).toBe(3);
    expect(clampChapterIndex(0, 0)).toBe(0);
  });
});

describe("keyboard navigation guards", () => {
  it("accepts left and right arrows from non-interactive content", () => {
    expect(shouldNavigateWithKeyboard("ArrowRight", { tagName: "SECTION" })).toBe(true);
    expect(shouldNavigateWithKeyboard("ArrowLeft", { tagName: "MAIN" })).toBe(true);
  });

  it("does not hijack arrows from editable or interactive elements", () => {
    for (const tagName of ["INPUT", "TEXTAREA", "SELECT", "BUTTON", "A"]) {
      expect(shouldNavigateWithKeyboard("ArrowRight", { tagName })).toBe(false);
    }
    expect(shouldNavigateWithKeyboard("ArrowLeft", { tagName: "DIV", isContentEditable: true })).toBe(false);
    expect(shouldNavigateWithKeyboard("ArrowLeft", null)).toBe(true);
  });

  it("ignores keys other than the chapter arrow keys", () => {
    expect(shouldNavigateWithKeyboard("Enter", { tagName: "MAIN" })).toBe(false);
  });
});

describe("page-turn direction", () => {
  it("uses forward direction for the next or current chapter", () => {
    expect(getTransitionDirection(0, 1)).toBe(1);
    expect(getTransitionDirection(2, 2)).toBe(1);
  });

  it("uses backward direction for earlier chapters", () => {
    expect(getTransitionDirection(3, 1)).toBe(-1);
  });
});

describe("swipe navigation", () => {
  it("moves forward on a sufficiently long left swipe", () => {
    expect(getSwipeDirection(220, 100, 120, 105)).toBe("next");
  });

  it("moves backward on a sufficiently long right swipe", () => {
    expect(getSwipeDirection(100, 100, 210, 104)).toBe("previous");
  });

  it("ignores short or mostly vertical gestures", () => {
    expect(getSwipeDirection(100, 100, 135, 102)).toBe(null);
    expect(getSwipeDirection(100, 100, 80, 170)).toBe(null);
  });

  it("uses a safe threshold for slow smaller movements", () => {
    expect(getSwipeDirection(100, 100, 35, 105, 70)).toBe(null);
  });
});
