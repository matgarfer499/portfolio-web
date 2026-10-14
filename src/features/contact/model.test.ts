import { describe, expect, it } from 'vitest';
import { magnetPull, mailtoHref } from './model';

const rect = { left: 100, top: 100, width: 200, height: 50 };

describe('magnetPull', () => {
  it('does not move when the pointer is at the centre', () => {
    expect(magnetPull(200, 125, rect, 6)).toEqual({ x: 0, y: 0 });
  });

  it('leans toward the pointer, at most `max` at the edges', () => {
    expect(magnetPull(300, 150, rect, 6)).toEqual({ x: 6, y: 6 });
    expect(magnetPull(100, 100, rect, 6)).toEqual({ x: -6, y: -6 });
    expect(magnetPull(250, 125, rect, 6)).toEqual({ x: 3, y: 0 });
  });

  it('never exceeds `max`, even past the edge', () => {
    expect(magnetPull(900, -400, rect, 6)).toEqual({ x: 6, y: -6 });
  });
});

describe('mailtoHref', () => {
  it('opens the email app with the subject and the message ready', () => {
    expect(
      mailtoHref('me@example.com', {
        name: 'Ada & co',
        message: 'Hi there\nBye',
      }),
    ).toBe(
      'mailto:me@example.com?subject=Portfolio%20%E2%80%94%20Ada%20%26%20co&body=Hi%20there%0ABye',
    );
  });
});
