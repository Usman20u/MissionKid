// Native radio focus scrolls before React applies translated text or the
// selected cue. Correct only a resulting clipped keyboard choice; do not
// change focus, selection, or the browser's handling of oversized controls.
export function revealFocusedChoice(group: HTMLElement | null): void {
  const input = document.activeElement;
  if (
    !group || !(input instanceof HTMLInputElement) || input.type !== 'radio' ||
    !group.contains(input) || !input.matches(':focus-visible')
  ) return;

  const choice = input.closest('label');
  if (!choice) return;

  const rect = choice.getBoundingClientRect();
  const style = getComputedStyle(choice);
  const outline = (parseFloat(style.outlineWidth) || 0) +
    Math.max(0, parseFloat(style.outlineOffset) || 0);
  if (
    rect.width + 2 * outline > window.innerWidth ||
    rect.height + 2 * outline > window.innerHeight
  ) return;

  const left = rect.left - outline < 0
    ? Math.floor(rect.left - outline)
    : Math.ceil(Math.max(0, rect.right + outline - window.innerWidth));
  const top = rect.top - outline < 0
    ? Math.floor(rect.top - outline)
    : Math.ceil(Math.max(0, rect.bottom + outline - window.innerHeight));

  if (left || top) window.scrollBy({ left, top, behavior: 'instant' });
}
