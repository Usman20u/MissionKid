import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { revealFocusedChoice } from './focusedChoice';

function fixture(rect: DOMRect) {
  const group = document.createElement('fieldset');
  group.innerHTML = '<label><input type="radio" name="choice" checked>Choice</label>';
  document.body.append(group);
  const choice = group.querySelector('label')!;
  const input = group.querySelector('input')!;
  vi.spyOn(choice, 'getBoundingClientRect').mockReturnValue(rect);
  input.focus();
  return { group, input };
}

describe('focused choice after presentation changes', () => {
  beforeEach(() => {
    vi.stubGlobal('innerWidth', 100);
    vi.stubGlobal('innerHeight', 200);
    vi.spyOn(window, 'scrollBy').mockImplementation(() => {});
    vi.spyOn(window, 'getComputedStyle').mockReturnValue({
      outlineWidth: '3px', outlineOffset: '2px',
    } as CSSStyleDeclaration);
  });

  afterEach(() => {
    document.body.replaceChildren();
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it('leaves a fully visible outline, native focus and selection alone', () => {
    const { group, input } = fixture(new DOMRect(10, 5, 80, 190));
    revealFocusedChoice(group);
    expect(window.scrollBy).not.toHaveBeenCalled();
    expect(document.activeElement).toBe(input);
    expect(input.checked).toBe(true);
  });

  it('reveals only the missing bottom distance after translated content moves a choice', () => {
    const { group, input } = fixture(new DOMRect(10, 170.25, 80, 40));
    revealFocusedChoice(group);
    expect(window.scrollBy).toHaveBeenCalledExactlyOnceWith({ left: 0, top: 16, behavior: 'instant' });
    expect(document.activeElement).toBe(input);
    expect(input.checked).toBe(true);
  });

  it('includes an outline clipped above an otherwise visible choice', () => {
    const { group } = fixture(new DOMRect(10, 2, 80, 40));
    revealFocusedChoice(group);
    expect(window.scrollBy).toHaveBeenCalledExactlyOnceWith({ left: 0, top: -3, behavior: 'instant' });
  });

  it('includes an outline clipped at the right edge', () => {
    const { group } = fixture(new DOMRect(80, 20, 18, 40));
    revealFocusedChoice(group);
    expect(window.scrollBy).toHaveBeenCalledExactlyOnceWith({ left: 3, top: 0, behavior: 'instant' });
  });

  it('preserves native scrolling when the complete choice cannot fit', () => {
    const { group } = fixture(new DOMRect(10, -20, 80, 200));
    revealFocusedChoice(group);
    expect(window.scrollBy).not.toHaveBeenCalled();
  });

  it('does not scroll a group when focus belongs elsewhere', () => {
    const { group } = fixture(new DOMRect(10, 170, 80, 40));
    const outside = document.createElement('input');
    document.body.append(outside);
    outside.focus();
    revealFocusedChoice(group);
    expect(window.scrollBy).not.toHaveBeenCalled();
    expect(document.activeElement).toBe(outside);
  });

  it('does not add a scroll after a pointer-only choice', () => {
    const { group, input } = fixture(new DOMRect(10, 170, 80, 40));
    vi.spyOn(input, 'matches').mockReturnValue(false);
    revealFocusedChoice(group);
    expect(window.scrollBy).not.toHaveBeenCalled();
  });
});
