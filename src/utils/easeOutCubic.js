export function easeOutCubic(progress) {
  return 1 - (1 - progress) ** 3;
}
