export function clampChapterIndex(index: number, chapterCount: number): number {
  if (chapterCount <= 0) return 0;
  return Math.min(Math.max(index, 0), chapterCount - 1);
}

export function getNextChapter(index: number, chapterCount: number): number {
  return clampChapterIndex(index + 1, chapterCount);
}

export function getPreviousChapter(index: number): number {
  return Math.max(index - 1, 0);
}

type KeyboardNavigationTarget = { tagName?: string; isContentEditable?: boolean } | null;

const INTERACTIVE_TAGS = new Set(["INPUT", "TEXTAREA", "SELECT", "BUTTON", "A"]);

export function shouldNavigateWithKeyboard(
  key: string,
  target: KeyboardNavigationTarget = null
): boolean {
  if (key !== "ArrowLeft" && key !== "ArrowRight") return false;
  if (target?.isContentEditable) return false;

  const tagName = target?.tagName?.toUpperCase();
  return !tagName || !INTERACTIVE_TAGS.has(tagName);
}

export type SwipeDirection = "next" | "previous" | null;

export function getSwipeDirection(
  startX: number,
  startY: number,
  endX: number,
  endY: number,
  threshold = 60
): SwipeDirection {
  const deltaX = endX - startX;
  const deltaY = endY - startY;

  if (Math.abs(deltaX) < threshold) return null;
  if (Math.abs(deltaX) < Math.abs(deltaY) * 1.2) return null;

  return deltaX < 0 ? "next" : "previous";
}
