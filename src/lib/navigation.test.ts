import { describe, expect, it } from "vitest";
import { getNextChapter, getPreviousChapter, clampChapterIndex } from "./navigation";

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
  });
});
