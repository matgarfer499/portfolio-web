export function staggerDelay(index: number, stepMs = 80): { animationDelay: string } {
  return { animationDelay: `${index * stepMs}ms` };
}
