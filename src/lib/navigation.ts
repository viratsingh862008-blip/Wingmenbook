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